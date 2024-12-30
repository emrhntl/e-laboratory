import AuthGuard from '@/app/utils/AuthGuard';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import Dropdown from '@/components/Dropdown/Dropdown';
import Navbar from '@/components/Navbar/Navbar';
import SearchBar from '@/components/SearchBar/Searchbar';
import User from '@/entity/user';
import { RoleEnum } from '@/enums/role.enum';
import { userService } from '@/services/service.list';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './index.style';

const formatDate = (dateString: string | undefined) => {
  if (!dateString) {
    return 'Bilinmiyor';
  }

  let date: Date | null = null;

  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts[2].length === 4) {
      const [day, month, year] = parts.map(Number);
      date = new Date(year, month - 1, day);
    }
  }
  else if (dateString.includes('.')) {
    const parts = dateString.split('.');
    if (parts[2].length === 2 || parts[2].length === 4) {
      const [day, month, year] = parts.map(Number);
      const fullYear = year < 100 ? 2000 + year : year;
      date = new Date(fullYear, month - 1, day);
    }
  }

  else if (dateString.length === 8) {
    const day = Number(dateString.slice(0, 2));
    const month = Number(dateString.slice(2, 4));
    const year = Number(dateString.slice(4, 8));
    date = new Date(year, month - 1, day);
  }

  if (!date || isNaN(date.getTime())) {
    return 'Geçersiz Tarih';
  }

  const day = String(date.getDate()).padStart(2, '0'); // Gün
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay
  const year = date.getFullYear(); // Yıl

  return `${day}.${month}.${year}`;
};

type FieldType = 'name' | 'surname' | 'email' | 'tckn' | 'birthday';

const PatientTracking: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<FieldType>('name');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [allUserList, setAllUserList] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fields = ['name', 'surname', 'email', 'tckn', 'birthday'];


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const userList = await userService.queryByField("role", RoleEnum.USER);
      setAllUserList(userList);
      setFilteredUsers(userList)
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onChangeText = (text: string) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredUsers(allUserList);
      return;
    }

    const filtered = allUserList.filter((user) =>
      user[selectedField]
        ?.toString()
        .toLowerCase()
        .includes(text.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

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
                  onChange={onChangeText}
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
                  placeholder="Select Field"
                  style={{ width: "100%" }}
                  onValueChange={setSelectedField}
                />
              </View>
            </View>
            <ScrollView>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.userItem}
                    onPress={() => router.push({
                      pathname: "/admin/ListUserAnalysis",
                      params: { user: JSON.stringify(user) }
                    })}>
                    <Text style={styles.name}>{user.name} {user.surname} (
                      {selectedField === 'birthday' && user.birthday
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