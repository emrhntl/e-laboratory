import Analysis from '@/entity/analysis';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './index.style';
import { guideService } from '@/services/service.list';
import Guide from '@/entity/guide';
import Dropdown from '../Dropdown/Dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuditEntity from '@/entity/audit.entity';
import User from '@/entity/user';

interface CustomModalProps {
  onClose: () => void;
  selectedAnalysis: Analysis | null;
  user: User;
}

const Icon = ({ name, color }: { name: any; color: string }) => (
  <MaterialCommunityIcons name={name} size={30} color={color} style={{ textAlign: 'center' }} />
);

const UpArrow = () => <Icon name="arrow-up" color="green" />;
const DownArrow = () => <Icon name="arrow-down" color="red" />;
const HorizontalLine = () => <Icon name="minus" color="grey" />;
const QuestionMark = () => <Icon name="help-circle" color="black" />;

const AnalysisDetail: React.FC<CustomModalProps> = ({ onClose, selectedAnalysis, user }) => {
  const [guideList, setGuideList] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedGuideName, setSelectedGuideName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [iconStates, setIconStates] = useState<Record<string, JSX.Element[]>>({});

  if (!selectedAnalysis) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchAllGuides = async () => {
      try {
        const guides = await guideService.getAll();
        setGuideList(guides);
        setSelectedGuideName(guides[0]?.name || '');
      } catch (error) {
        console.error('Guides fetch error:', error);
      } finally {
      }
    };
    fetchAllGuides();
  }, []);

  useEffect(() => {
    const guide = guideList.find((guide) => guide.name === selectedGuideName);
    setSelectedGuide(guide || null);
  }, [selectedGuideName, guideList]);

  useEffect(() => {
    if (!selectedGuide || !selectedAnalysis) return;

    const updatedIconStates: Record<string, JSX.Element[]> = {};

    selectedAnalysis.values.forEach((value) => {
      const auditValue = parseFloat(value.auditValue);

      updatedIconStates[value.auditName] = [
        renderIcon('Geo', value.auditName, auditValue, selectedGuide, user.birthday),
        renderIcon('MinMax', value.auditName, auditValue, selectedGuide, user.birthday),
        renderIcon('CI', value.auditName, auditValue, selectedGuide, user.birthday),
      ];
    });

    setIconStates(updatedIconStates);
  }, [selectedGuide, selectedAnalysis]);

  const calculateAgeInMonths = (birthDate: string): number => {
    const [day, month, year] = birthDate.split('.').map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();

    const yearsDiff = today.getFullYear() - birth.getFullYear();
    const monthsDiff = today.getMonth() - birth.getMonth();
    const daysDiff = today.getDate() - birth.getDate();

    let totalMonths = yearsDiff * 12 + monthsDiff;
    if (daysDiff < 0) {
      totalMonths -= 1;
    }

    return totalMonths;
  };

  const findAuditValuesByAge = (
    auditList: AuditEntity[],
    auditName: string,
    ageInMonths: number
  ) => {
    const audit = auditList.find((audit) => audit.auditName === auditName);
    if (!audit || !audit.valueRanges) return null;
  
    const result = Object.values(audit.valueRanges).find((range) => {
      const minAge = parseFloat(range.minAgeValue);
      const maxAge = parseFloat(range.maxAgeValue);
      
      if (range.ageType === "Yıl") {
        const ageInYears = ageInMonths / 12;
        return ageInYears >= minAge && ageInYears <= maxAge;
      } else if (range.ageType === "Ay") {
        return ageInMonths >= minAge && ageInMonths <= maxAge;
      }
  
      return false;
    });
  
    return result || null;
  };
  

const renderIcon = (
  type: 'Geo' | 'MinMax' | 'CI',
  auditName: string,
  auditValue: number,
  selectedGuide: Guide,
  userBirthDate: string
) => {
  if (!selectedGuide) return <QuestionMark />;

  const ageInMonths = calculateAgeInMonths(userBirthDate);
  const auditValues = findAuditValuesByAge(selectedGuide.auditList, auditName, ageInMonths);

  if (!auditValues) return <QuestionMark />;

  switch (type) {
    case 'Geo': {
      const average = parseFloat(auditValues.avarage);
      const standardDeviation = parseFloat(auditValues.standartDeviation);
      
      if (isNaN(average) || isNaN(standardDeviation)) return <QuestionMark />;

      const lowerBound = average - standardDeviation;
      const upperBound = average + standardDeviation;

      if (auditValue > upperBound) return <UpArrow />;
      if (auditValue < lowerBound) return <DownArrow />;
      return <HorizontalLine />;
    }

    case 'MinMax': {
      const min = parseFloat(auditValues.minValue);
      const max = parseFloat(auditValues.maxValue);

      if (isNaN(min) || isNaN(max)) return <QuestionMark />;

      if (auditValue >= min && auditValue <= max) return <HorizontalLine />;
      if (auditValue > max) return <UpArrow />;
      if (auditValue < min) return <DownArrow />;
      return <QuestionMark />;
    }

    case 'CI': {
      const ciMin = parseFloat(auditValues.ciMinValue);
      const ciMax = parseFloat(auditValues.ciMaxValue);

      if (isNaN(ciMin) || isNaN(ciMax)) return <QuestionMark />;

      if (auditValue > ciMax) return <UpArrow />;
      if (auditValue < ciMin) return <DownArrow />;
      return <HorizontalLine />;
    }

    default:
      return <QuestionMark />;
  }
};



  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalDate}>Tarih: {formatDate(selectedAnalysis.createDate)}</Text>
        <Text style={styles.modalTitle}>Tahlil Sonuçları</Text>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Dropdown
            onValueChange={setSelectedGuideName}
            options={guideList.map((guide) => guide.name)}
            placeholder="Klavuz Seçiniz"
            selectedValue={selectedGuideName}
            style={{ width: '50%' }}
          />
        </View>
        {!isLoading && guideList && selectedGuideName &&
          <ScrollView style={styles.scrollView}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Tetkik</Text>
                <Text style={styles.headerCell}>Geo | Min Max | CI</Text>
              </View>

              {selectedAnalysis.values.map((value, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.rowCell}>
                    {value.auditName}: {value.auditValue} {value.auditUnit}
                  </Text>
                  <View style={styles.iconContainer}>
                    {iconStates[value.auditName]?.[0] || <QuestionMark />}
                    <View style={styles.separator} />
                    {iconStates[value.auditName]?.[1] || <QuestionMark />}
                    <View style={styles.separator} />
                    {iconStates[value.auditName]?.[2] || <QuestionMark />}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        }
        {
          isLoading &&
          <ActivityIndicator size="large" color="#007AFF" />
        }

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnalysisDetail;
