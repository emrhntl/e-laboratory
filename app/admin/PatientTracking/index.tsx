import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import styles from './index.style';
import { Stack, usePathname, useRouter } from 'expo-router';
import Navbar from '@/components/Navbar/Navbar';
import SearchBar from '@/components/SearchBar/Searchbar';
import Input from '@/components/Input/input';
import Dropdown from '@/components/Dropdown/Dropdown';

import { MassUnitEnum } from '@/enums/massUnit.enum';
import { VolumeUnitEnum } from '@/enums/volumeUnit.enum';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AuthGuard from '@/app/utils/AuthGuard';
import { RoleEnum } from '@/enums/role.enum';

const PatientTracking: React.FC = () => {
  const router = useRouter();

  return (
    <AuthGuard allowedRoles={[RoleEnum.ADMIN]} >
      <Stack.Screen options={{ title: 'PatientTracking!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <AdminTabs router={router} />

        <View style={styles.contentContainer}>

        </View>
      </SafeAreaView>
    </AuthGuard>
  );
};

export default PatientTracking;