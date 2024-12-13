import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import styles from './index.style';
import { Stack, useRouter } from 'expo-router';
import Navbar from '@/components/Navbar/Navbar';
import SearchBar from '@/components/SearchBar/Searchbar';
import Input from '@/components/Input/input';
import Dropdown from '@/components/Dropdown/Dropdown';

import { MassUnitEnum } from '@/enums/massUnit.enum';
import { VolumeUnitEnum } from '@/enums/volumeUnit.enum';

const PatientTracking: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'PatientTracking!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn1, styles.selectedButton]} >
              <Text style={[styles.baseButtonText,styles.selectText]}>Hasta Takip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.baseButton, styles.btn2]} onPress={()=>router.push('/admin/AddAudit')}>
              <Text style={styles.baseButtonText}>Tetkik Ekle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn3]} onPress={()=>router.push('/admin/CreateGuide')}>
              <Text style={styles.baseButtonText}>Kılavuz Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[, styles.baseButton, styles.btn4]} onPress={()=>router.push('/admin/AddDataGuide')}>
              <Text style={styles.baseButtonText}>Kılavuza Veri Gir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PatientTracking;