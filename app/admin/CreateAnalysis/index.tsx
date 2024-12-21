import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import styles from './index.style';
import { Stack, useRouter } from 'expo-router';
import Navbar from '@/components/Navbar/Navbar';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import { RoleEnum } from '@/enums/role.enum';
import User from '@/entity/user';
import { auth, db } from '@/constants/firebaseConfig';
import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import AddUserModal from '@/components/AddUserModal';
import CustomSearhDropdown from '@/components/CustomSearchDropdown/CustomSearhDropdown';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAnalysis: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState("Admin");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("kullanıcı verisi bulunamadı");
          }
        }

        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('role', '==', RoleEnum.USER));
        const querySnapshot = await getDocs(q);

        const usersList: User[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new User(
            doc.id,
            data.name,
            data.surname,
            data.tckn,
            data.birthday,
            data.password,
            data.email,
            data.role
          );
        });
        setUsers(usersList); // Store the list of users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (newUserData: any) => {
    const { email, password, name, surname, tckn, birthday } = newUserData;

    try {
      // Firebase Authentication'da kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Firestore'da kullanıcı bilgilerini kaydet
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        email: email,
        name: name,
        surname: surname,
        tckn: tckn,
        birthday: birthday,
        password: password,
        role: userType === "admin" ? RoleEnum.ADMIN : RoleEnum.USER, // Rol ayarı
      });
  
      Alert.alert(
        "Başarılı",
        `${userType === "admin" ? "Yeni admin" : "Yeni hasta"} başarıyla eklendi.`
      );
    } catch (error) {
      console.error(
        `${userType === "admin" ? "Admin" : "Hasta"} eklenirken bir hata oluştu:`,
        error
      );
      Alert.alert(
        "Hata",
        `${userType === "admin" ? "Yeni admin" : "Yeni hasta"} eklenemedi.`
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Kullanıcı bilgileri yüklenemedi.</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Create Analysis' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <AdminTabs router={router} />
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.buttonContainer}>
              {userData.role === RoleEnum.ADMIN && (
                <TouchableOpacity
                  style={styles.adminButton}
                  onPress={() => {
                    setUserType("User");
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.adminButtonText}>Yeni Hasta Ekle</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.title}>Tahlil Ekle</Text>
            <View style={styles.formContainer}>
              <CustomSearhDropdown
                data={users.map((user) => ({
                  label: `${user.tckn} - ${user.name} ${user.surname}`,
                  value: user.tckn,
                }))}
                onSelect={(item) => {
                  const selected = users.find((user) => user.tckn === item.value);
                  setSelectedUser(selected || null);
                }}
                placeholder="Hasta seçiniz..."
              />
              <ScrollView>

              </ScrollView>
            </View>
          </View>
        </View>
        <AddUserModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={handleAddUser}
          userType={userType} // Pass the userType (admin or patient)
        />
      </SafeAreaView>
    </>
  );
};

export default CreateAnalysis;