// src/components/CustomModal.tsx

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Analysis from '@/entity/analysis';
import styles from './index.style';
import AuditEntity from '@/entity/audit.entity';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAnalysis: Analysis | null;
}

const ListAnalysisModal: React.FC<CustomModalProps> = ({ visible, onClose, selectedAnalysis }) => {
  if (!selectedAnalysis) {
    return null;
  }

   // Tarih formatlama fonksiyonu
   const formatDate = (dateString: string) => {
    const date = new Date(dateString);  // Tarihi Date objesine çevir
    const day = String(date.getDate()).padStart(2, '0'); // Gün
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
    const year = date.getFullYear(); // Yıl

    // İstenilen formatta (dd.mm.yyyy) döndürür
    return `${day}.${month}.${year}`;
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalDate}>Tarih: {formatDate(selectedAnalysis.createDate)}</Text>
          <Text style={styles.modalTitle}>Tahlil Sonuçları</Text>
          <ScrollView style={styles.scrollView}>
            <View style={styles.valueRow}>
              <Text style={styles.valueTitle}>Tetkik Adı</Text>
              <Text style={styles.valueTitle}>Sonuç</Text>
            </View>
            {selectedAnalysis.values.map((value, index) => (
              <View key={index} style={styles.valueRow}>
                <Text style={styles.valueName}>{value.auditName}:</Text>
                <Text style={styles.valueData}>
                  {value.auditValue} {value.auditUnit}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ListAnalysisModal;
