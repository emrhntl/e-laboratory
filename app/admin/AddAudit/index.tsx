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

const AddAudit: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();


  return (
    <>
      <Stack.Screen options={{ title: 'AddAudit!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <AdminTabs router={router}/>
      </SafeAreaView>
    </>
  );
};

export default AddAudit;