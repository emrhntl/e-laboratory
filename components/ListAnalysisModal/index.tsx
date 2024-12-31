import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Analysis from '@/entity/analysis';
import styles from './index.style';
import { analysisService } from '@/services/service.list';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Icon = ({ name, color }: { name: any; color: string }) => (
  <MaterialCommunityIcons name={name} size={20} color={color} style={{ textAlign: 'center' }} />
);

const UpArrow = () => <Icon name="arrow-up" color="green" />;
const DownArrow = () => <Icon name="arrow-down" color="red" />;
const HorizontalLine = () => <Icon name="minus" color="grey" />;
const QuestionMark = () => <Icon name="help-circle" color="blue" />;

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAnalysis: Analysis | null;
  userId: string | null;
}

const ListAnalysisModal: React.FC<CustomModalProps> = ({ visible, onClose, selectedAnalysis, userId }) => {
  const [userAnalysis, setUserAnalysis] = useState<Analysis[]>([]);
  const [latestDifferences, setLatestDifferences] = useState<Record<string, string>>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Geçersiz Tarih'
      : `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchUserAnalysis = async () => {
      if (!userId) return;
      try {
        const userAnalysisList = await analysisService.queryByField('userId', userId);
        const sortedAnalysis = userAnalysisList.sort(
          (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
        );
        setUserAnalysis(sortedAnalysis);
        calculateDifferences(sortedAnalysis);
      } catch (error) {
        console.error('Analysis fetch error:', error);
      }
    };

    fetchUserAnalysis();
  }, [userId]);

  const calculateDifferences = (analysisList: Analysis[]) => {
    if (!selectedAnalysis) return;
  
    const differences: Record<string, string> = {};
  
    selectedAnalysis.values.forEach((currentValue) => {
      const { auditName, auditValue } = currentValue;
  
      // Geçmiş analizlerde bu auditName için en son değeri bul
      let lastPreviousValue: string | null = null;
  
      for (let i = analysisList.length - 1; i >= 0; i--) {
        const pastAnalysis = analysisList[i];
        if (new Date(pastAnalysis.createDate) < new Date(selectedAnalysis.createDate)) {
          const matchedValue = pastAnalysis.values.find(
            (prevValue) => prevValue.auditName === auditName
          );
          if (matchedValue) {
            lastPreviousValue = matchedValue.auditValue;
            break;
          }
        }
      }
  
      // Değerler karşılaştırılıyor
      if (!lastPreviousValue) {
        differences[auditName] = 'first'; // İlk analiz
      } else {
        const current = parseFloat(auditValue);
        const previous = parseFloat(lastPreviousValue);
  
        if (!isNaN(current) && !isNaN(previous)) {
          if (current > previous) {
            differences[auditName] = 'up';
          } else if (current < previous) {
            differences[auditName] = 'down';
          } else {
            differences[auditName] = 'same';
          }
        } else {
          console.warn(`Non-numeric auditValue for: ${auditName}`);
          differences[auditName] = 'unknown';
        }
      }
    });
  
    setLatestDifferences(differences);
  };
  
  
  

  const renderDifferenceIcon = (auditName: string) => {
    const status = latestDifferences[auditName];
  
    switch (status) {
      case 'up':
        return <UpArrow />;
      case 'down':
        return <DownArrow />;
      case 'same':
        return <HorizontalLine />;
      case 'first':
        return <QuestionMark />;
      default:
        console.warn(`Unhandled status for auditName: ${auditName}`);
        return <QuestionMark />;
    }
  };
  

  if (!visible || !selectedAnalysis || !userId) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalDate}>
            Tarih: {selectedAnalysis?.createDate && formatDate(selectedAnalysis.createDate)}
          </Text>
          <Text style={styles.modalTitle}>Tahlil Sonuçları</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.valueRow}>
              <Text style={styles.valueTitle}>Tetkik Adı</Text>
              <Text style={styles.valueTitle}>Sonuç</Text>
              <Text style={styles.valueTitle}>Değişim</Text>
            </View>
            {selectedAnalysis?.values.map((value, index) => (
              <View key={index} style={styles.valueRow}>
                <Text style={styles.valueName}>{value.auditName}:</Text>
                <Text style={styles.valueData}>
                  {value.auditValue} {value.auditUnit}
                </Text>
                <View>{renderDifferenceIcon(value.auditName)}</View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ListAnalysisModal;
