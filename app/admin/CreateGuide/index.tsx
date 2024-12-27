import Input from '@/components/Input/input';
import Navbar from '@/components/Navbar/Navbar';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, Text, View } from 'react-native';
import styles from './index.style';

import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AuditListItem from '@/components/AuditListItem/AuditListItem';
import CustomButton from '@/components/CustomButton/CustomButton';
import AddAuditModal from '@/components/modals/AddAudit/AddAuditModal';
import Audit from '@/entity/audit';
import AuditEntity from '@/entity/audit.entity';
import AuditValues from '@/entity/audit.values';
import Guide from '@/entity/guide';
import { auditService, guideService } from '@/services/service.list';
import { Ionicons } from '@expo/vector-icons';
import { v4 as generateUUID } from 'uuid';
import AuthGuard from '@/app/utils/AuthGuard';
import { RoleEnum } from '@/enums/role.enum';


type PopupType = 'addAudit' | 'showAllGuides' | 'showAudit' | null;

const CreateGuide: React.FC = () => {

  const [guide, setGuide] = useState<Guide>(new Guide("", "", "", []));
  const router = useRouter();
  const [popupType, setPopupType] = useState<PopupType>(null);


  const [selectedAudit, setSelectedAudit] = useState("");


  const [guideName, setGuideName] = useState('');
  const [currentAuditList, setCurrentAuditList] = useState<Audit[]>([]);

  const closePopup = () => {
    setSelectedAudit("");
    setPopupType(null)

  }

  const fetchAuditList = async () => {
    try {
      const currentAuditList: Audit[] = await auditService.getAll();
      setCurrentAuditList(currentAuditList);
    } catch (err: any) {
      console.error('Audit listesi alınırken hata oluştu:', err.message || err);
    } finally {
    }
  };

  useEffect(() => {
    fetchAuditList();
  }, []);
  const onAddAudit = (newAuditValues: AuditValues[], auditName: string) => {

    const audit = currentAuditList.find((audit) => audit.name === auditName);

    if (!audit) {
      console.warn("Belirtilen tetkik mevcut değil.");
      Alert.alert("Hata", "Belirtilen tetkik mevcut değil.");
      return;
    }

    const newAudit: AuditEntity = new AuditEntity(
      audit.name,
      audit.unit,
      newAuditValues
    );

    if (!newAudit || !newAudit.auditName || !newAudit.unit) {
      console.warn("Geçerli bir tetkik bilgisi girilmedi.");
      Alert.alert("Hata", "Geçerli bir tetkik bilgisi girilmedi.");
      return;
    }

    setGuide((prevGuide) => {
      const isDuplicate = prevGuide.auditList.some(
        (audit) => audit.auditName === newAudit.auditName
      );

      if (isDuplicate) {
        console.warn("Bu tetkik zaten mevcut.");
        Alert.alert("Uyarı", "Bu tetkik klavuzda zaten mevcut.");
        return prevGuide;
      }
      const updatedAudits = [...prevGuide.auditList, newAudit];

      return new Guide(
        prevGuide.id,
        prevGuide.name,
        prevGuide.description,
        updatedAudits
      );
    });

  };


  const saveGuide = async () => {
    try {
      if (!guideName.trim()) {
        console.warn('Klavuz adı boş olamaz.');
        Alert.alert('Hata', 'Klavuz adı boş olamaz.');
        return;
      }

      if (guide.auditList.length === 0) {
        console.warn('En az bir tetkik eklenmelidir.');
        Alert.alert('Hata', 'En az bir tetkik eklenmelidir.');
        return;
      }

      const newGuide = new Guide(
        generateUUID(),
        guideName.trim(),
        guide.description,
        guide.auditList
      );

      if (guide.id) {
        await guideService.update(guide.id, newGuide.toJSON());
        Alert.alert('Başarı', 'Klavuz başarıyla güncellendi.');
      } else {
        const id = await guideService.create(newGuide.toJSON());
        setGuide((prevGuide) => new Guide(id, guideName, guide.description, prevGuide.auditList));
        Alert.alert('Başarı', 'Klavuz başarıyla kaydedildi.');
      }
      setGuide(new Guide("", "", "", []));
      setGuideName('');

    } catch (error) {
      console.error('Klavuz kaydedilirken hata oluştu:', error);
      Alert.alert('Hata', 'Klavuz kaydedilirken bir hata oluştu.');
    }
  };


  return (
    <AuthGuard allowedRoles={[RoleEnum.ADMIN]}>
      <Stack.Screen options={{ title: 'CreateGuide!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />

        <AdminTabs router={router} />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Klavuz Oluştur</Text>
          <Input
            style={styles.input}
            placeholder="Kılavuz Adı Giriniz..."
            value={guideName}
            onChangeText={setGuideName}
            iconName="file-tray-full-outline"
          />
          <CustomButton onPress={(() => { setPopupType("addAudit") })} style={{ width: '85%' }} textStyle={{}}>
            <Text>Klavuza tetkik ekle</Text>
          </CustomButton>
          <View style={styles.auditContainer}>
            <Text style={[styles.title, { fontSize: 16, color: 'black' }]}>Klavuza Eklenen Tetkikler</Text>
            <FlatList
              data={guide.auditList}
              keyExtractor={(item) => item.auditName}
              renderItem={({ item }) => (
                <AuditListItem auditName={item.auditName} />
              )}
              numColumns={2}
            />
          </View>

          <View style={styles.bottomContainer}>
            <CustomButton onPress={saveGuide} style={{ width: '85%' }} textStyle={{ color: 'black' }}>
              <Text>Klavuzu Kaydet</Text>
            </CustomButton>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton onPress={() => setPopupType("showAllGuides")} style={{ width: '85%', backgroundColor: '#888' }} textStyle={{ color: '#fff' }}>
            <Text>Kayıtlı Klavuz Listesini Gör</Text>
          </CustomButton>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={popupType != null}
          onRequestClose={closePopup}
        >
          <View style={styles.modalContainer}>
            <View style={styles.contentContainer} >
              <View style={styles.closeContainer}>
                <Ionicons name="close-outline" size={30} onPress={closePopup} />
              </View>

              {
                popupType == 'addAudit' &&
                <AddAuditModal
                  onAddAudit={onAddAudit}
                  auditList={currentAuditList.map((item) => (item.name))}
                  selectedAudit={selectedAudit}
                  onAuditChange={setSelectedAudit}
                  closeModal={closePopup}
                />
              }
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default CreateGuide;