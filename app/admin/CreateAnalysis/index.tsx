import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert, ActivityIndicator, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './index.style';

import User from '@/entity/user';
import { RoleEnum } from '@/enums/role.enum';
import { auth, db } from '@/constants/firebaseConfig';
import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Analysis from "@/entity/analysis";
import Audit from '@/entity/audit';
import AnalysisValue from "@/entity/analysisValue";
import AuditService from '@/services/audit.service';
import { analysisService } from '@/services/service.list';
import { v4 as generateUUID } from 'uuid';

import Navbar from '@/components/Navbar/Navbar';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AddUserModal from '@/components/AddUserModal';
import CustomSearhDropdown from '@/components/CustomSearchDropdown/CustomSearhDropdown';
import CustomButton from '@/components/CustomButton/CustomButton';

const CreateAnalysis: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState("Admin");
  const [analysisValues, setAnalysisValues] = useState<AnalysisValue[]>([]);
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
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAudits = async () => {
      try {
        setLoading(true);
        const auditService = AuditService.getInstance();
        const auditList = await auditService.getAll(); // Tüm tetkikleri Firestore'dan çek
        setAudits(auditList);
      } catch (error) {
        console.error("Error fetching audits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudits();
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
        role: userType === "admin" ? RoleEnum.ADMIN : RoleEnum.USER,
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

  const handleAddValue = async () => {
    if (!selectedAudit || inputValue.trim() === "") {
      alert("Lütfen bir tetkik seçin ve değer girin.");
      return;
    }

    // tahlil değeri ekliyoruz
    const newAnalysisValue = new AnalysisValue(
      selectedAudit.name,
      inputValue,
      selectedAudit.unit
    );

    setAnalysisValues((prevValues) => [...prevValues, newAnalysisValue]);

    // inputu temizler
    setInputValue("");

    alert(`"${selectedAudit.name}" tetkiğine değer eklendi: ${inputValue}`);
  };

  const handleAddAnalysis = async () => {
    if (!selectedUser) {
      alert("Lütfen bir hasta seçin.");
      return;
    }

    if (analysisValues.length === 0) {
      alert("Lütfen en az bir tetkik değeri ekleyin.");
      return;
    }

    try {

      const newAnalysis = new Analysis(
        generateUUID(),
        selectedUser.id,
        analysisValues,
        new Date().toISOString()
      );

      const analysisData = newAnalysis.toJSON();

      const id = await analysisService.create(analysisData);

      Alert.alert('Başarılı', `Tahlil başarıyla eklendi. ID: ${id}`);


      setAnalysisValues([]);
      setSelectedUser(null);
      setSelectedAudit(null);
    } catch (error) {
      console.error("Error adding analysis:", error);
      alert("Tahlil eklenirken bir hata oluştu.");
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
                <CustomButton
                  style={styles.adminButton}
                  textStyle={styles.adminButtonText}
                  onPress={() => {
                    setUserType("User");
                    setModalVisible(true);
                  }}
                >
                  Yeni Hasta Ekle
                </CustomButton>
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
                style={styles.dropdown}
              />
              <View style={styles.auditContainer}>
                <CustomSearhDropdown
                  data={audits.map((audit) => ({
                    label: `${audit.name} (${audit.unit})`,
                    value: audit.id,
                  }))}
                  onSelect={(item) => {
                    const selected = audits.find((audit) => audit.id === item.value);
                    setSelectedAudit(selected || null);
                  }}
                  placeholder="Tetkik seçiniz..."
                  style={styles.dropdown}
                />

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Değer giriniz..."
                  />
                  <CustomButton onPress={handleAddValue} style={styles.buttonAddAudit} textStyle={{ color: '#444' }}>Değer Ekle</CustomButton>
                </View>
              </View>
              <Text style={{ color: "#fff", fontSize: 17, marginVertical: 3 }}>Tetkik Değerleri</Text>
              <ScrollView style={styles.scrollContainer}>
                {analysisValues.map((value, index) => (
                  <View key={index} style={styles.analysisItem}>
                    <Text style={styles.analysisText}>
                      {value.auditName} ({value.auditUnit}): {value.auditValue}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => console.log("silinmedi :D")}
                      accessibilityLabel="Tetkik Sil"
                    >
                      <Ionicons name="trash-outline" size={24} color="#bbb" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
              <CustomButton onPress={handleAddAnalysis} style={[styles.adminButton, { margin: "3%" }]} textStyle={[styles.adminButtonText, { fontSize: 18 }]}>Tahlil Ekle</CustomButton>
            </View>
          </View>
        </View>
        <AddUserModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={handleAddUser}
          userType={userType}
        />
      </SafeAreaView>
    </>
  );
};

export default CreateAnalysis;