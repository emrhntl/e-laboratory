import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '@/constants/firebaseConfig';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

interface ChangePasswordModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ modalVisible, setModalVisible }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setLoading(true);

      // Re-authenticate the user
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Hata', 'Kullanıcı bulunamadı.');
        return;
      }

      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Alert.alert('Başarılı', 'Şifreniz başarıyla değiştirildi.');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Şifre değiştirilemedi. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Şifrenizi Değiştirin</Text>

          <TextInput
            style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 8 }}
            placeholder="Mevcut Şifreniz"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <TextInput
            style={{ height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 8 }}
            placeholder="Yeni Şifreniz"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TouchableOpacity
            style={{ backgroundColor: '#3498db', padding: 10, borderRadius: 5 }}
            onPress={handleChangePassword}
            disabled={loading}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {loading ? 'Yükleniyor...' : 'Şifreyi Değiştir'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 10, padding: 10 }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: '#888', textAlign: 'center' }}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
