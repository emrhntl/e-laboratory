// AddAudit.tsx

import AddAuditCard from '@/components/AddAuditCard/add.audit.card';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AuditCard from '@/components/AuditCard/AuditCard';
import Navbar from '@/components/Navbar/Navbar';
import Audit from '@/entity/audit';
import { auditService } from '@/services/service.list';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as generateUUID } from 'uuid';
import styles from './index.style';
import AuthGuard from '@/app/utils/AuthGuard';
import { RoleEnum } from '@/enums/role.enum';


const AddAudit: React.FC = () => {
  const router = useRouter();
  const [currentAuditList, setCurrentAuditList] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [auditName, setAuditName] = useState('');
  const [massUnit, setMassUnit] = useState<string>('');
  const [volumeUnit, setVolumeUnit] = useState<string>('');

  const fetchAuditList = async () => {
    try {
      setIsLoading(true);
      const currentAuditList: Audit[] = await auditService.getAll();
      setCurrentAuditList(currentAuditList);
    } catch (err: any) {
      console.error('Audit listesi alınırken hata oluştu:', err.message || err);
      setError('Audit listesi alınırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditList();
  }, []);

  const handleCreateAudit = async () => {
    if (!auditName || !massUnit || !volumeUnit) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    try {
      setIsLoading(true);

      const newAudit = new Audit(generateUUID(), auditName, `${massUnit}/${volumeUnit}`);
      const auditData = newAudit.toJSON();

      const id = await auditService.create(auditData);

      Alert.alert('Başarılı', `Tetkik başarıyla eklendi. ID: ${id}`);

      await fetchAuditList();

      setAuditName('');
      setMassUnit('');
      setVolumeUnit('');
    } catch (err: any) {
      console.error('Tetkik eklenirken hata oluştu:', err.message || err);
      Alert.alert('Hata', 'Tetkik eklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAudit = async (auditId: string) => {
    if (!auditId) {
      Alert.alert('Uyarı', 'Geçerli bir Audit ID belirtmelisiniz.');
      return;
    }

    try {
      setIsLoading(true);

      await auditService.deleteByCustomId(auditId);

      Alert.alert('Başarılı', 'Tetkik başarıyla silindi.');

      await fetchAuditList();

    } catch (err: any) {
      console.error('Tetkik silinirken hata oluştu:', err.message || err);
      Alert.alert('Hata', 'Tetkik silinirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthGuard allowedRoles={[RoleEnum.ADMIN]}>
      <Stack.Screen options={{ title: 'Add Audit' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <AdminTabs router={router} />
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Tetkik Oluştur</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <>
                <AddAuditCard
                  auditName={auditName}
                  setAuditName={setAuditName}
                  massUnit={massUnit}
                  setMassUnit={setMassUnit}
                  volumeUnit={volumeUnit}
                  setVolumeUnit={setVolumeUnit}
                  onSubmit={handleCreateAudit}
                />
                <ScrollView>
                  <View style={styles.currentListContainer}>
                    <Text style={styles.text}>Mevcut Tetkik Listesi</Text>
                    {currentAuditList.map((audit) => (
                      <AuditCard
                        key={audit.id}
                        name={audit.name}
                        unit={audit.unit}
                        style={{ width: '90%' }}
                        onDelete={() => handleDeleteAudit(audit.id)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </>

            )}
          </View>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default AddAudit;
