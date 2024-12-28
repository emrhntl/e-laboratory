import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '@/components/Dropdown/Dropdown';
import FirestoreManager from '@/constants/firestoreManager';
import Navbar from '@/components/Navbar/Navbar';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/constants/firebaseConfig'; // Firebase yapılandırma dosyanızın doğru yolunu ekleyin
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AuthGuard from '@/app/utils/AuthGuard';
import { RoleEnum } from '@/enums/role.enum';
import SearchBar from '@/components/SearchBar/Searchbar';
import styles from './index.style';
import User from '@/entity/user';

const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return 'Bilinmiyor'; // Eğer tarih boşsa
  }

  let date: Date | null = null;

  // 1. DD/MM/YYYY veya MM/DD/YYYY formatlarını kontrol et
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts[2].length === 4) {
      // DD/MM/YYYY formatı
      const [day, month, year] = parts.map(Number);
      date = new Date(year, month - 1, day);
    }
  }
  // 2. DD.MM.YY veya DD.MM.YYYY formatını kontrol et
  else if (dateString.includes('.')) {
    const parts = dateString.split('.');
    if (parts[2].length === 2 || parts[2].length === 4) {
      const [day, month, year] = parts.map(Number);
      const fullYear = year < 100 ? 2000 + year : year; // YY'yi YYYY'ye dönüştür
      date = new Date(fullYear, month - 1, day);
    }
  }
  // 3. DDMMYYYY formatını kontrol et
  else if (dateString.length === 8) {
    const day = Number(dateString.slice(0, 2));
    const month = Number(dateString.slice(2, 4));
    const year = Number(dateString.slice(4, 8));
    date = new Date(year, month - 1, day);
  }

  // 4. Geçersiz tarih kontrolü
  if (!date || isNaN(date.getTime())) {
    return 'Geçersiz Tarih';
  }

  // Formatlama
  const day = String(date.getDate()).padStart(2, '0'); // Gün
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
  const year = date.getFullYear(); // Yıl

  return `${day}.${month}.${year}`;
};


const PatientTracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('name'); // Default to 'name'
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fields = ['name','surname', 'email', 'tckn', 'birthday'];
  const userManager = new FirestoreManager<User>('users');


  const fetchUsers = async () => {
    try {
      setLoading(true);
      let usersList: User[] = [];

      if (searchQuery) {
        
        const userQuery = query(
          collection(db, 'users'),
          where(selectedField, '>=', searchQuery),
          where(selectedField, '<=', searchQuery + '\uf8ff')
        );
        const querySnapshot = await getDocs(userQuery);

        querySnapshot.forEach((doc) => {
          usersList.push({ ...doc.data(), id: doc.id } as User);
        });
      } else {
        usersList = await userManager.getAll();
      }

      const filteredByRole = usersList.filter(user => user.role === RoleEnum.USER);
      setFilteredUsers(filteredByRole);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, selectedField]);

  return (
    <AuthGuard allowedRoles={[RoleEnum.ADMIN]} >
      <Stack.Screen options={{ title: 'PatientTracking!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <AdminTabs router={router} />
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.searchContainer}>
              <View style={styles.searchbarContainer}>
                <SearchBar
                  value={searchQuery}
                  onChange={(text) => setSearchQuery(text)}
                  placeholder="Hasta Arayın..."
                  iconName="search"
                  containerStyle={{ backgroundColor: '#fff', borderRadius: 10 }}
                  inputStyle={{ fontSize: 14, color: '#555' }}
                />
              </View>
              <View style={styles.dropdown}>
                <Dropdown
                  options={fields}
                  selectedValue={selectedField}
                  onValueChange={setSelectedField}
                  placeholder="Select Field"
                  style={{ width: "100%" }}
                />
              </View>
            </View>
            <ScrollView>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TouchableOpacity key={user.id} style={styles.userItem} onPress={()=> router.navigate("/admin/ListUserAnalysis")}>
                    <Text style={styles.name}>{user.name} {user.surname} (
                      {selectedField === 'doğum tarihi' && user.birthday
                        ? formatDate(user.birthday)
                        : String(user[selectedField as keyof User] || '')}
                      )</Text>
                    <Ionicons name='chevron-forward-outline' size={20} color={"#666"} />
                  </TouchableOpacity>
                ))
              ) : (
                <Text>Hasta bulunamadı</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default PatientTracking;