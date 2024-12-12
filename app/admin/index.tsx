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

const Admin: React.FC = () => {
  const router = useRouter();
  const [testName, setTestName] = useState('');
  const [valueRange, setValueRange] = useState('');
  const [guideName, setGuideName] = useState('');
  const [tests, setTests] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [mass, setMass] = useState<string>('');
  const [volume, setVolume] = useState<string>('');

  const massOptions = Object.values(MassUnitEnum);
  const volumeOptions = Object.values(VolumeUnitEnum);

  const addTest = () => {
    if (testName && valueRange) {
      // setTests([...tests, { testName, valueRange }]);
      setTestName('');
      setValueRange('');
    }
  };

  const createGuide = () => {
    console.log('Guide created:', guideName, tests);
    // Add your logic to handle guide creation
  };



  return (
    <>
      <Stack.Screen options={{ title: 'CreateGuide!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn1]}>
              <Text style={styles.baseButtonText}>Hasta Takip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.baseButton, styles.btn2]}>
              <Text style={styles.baseButtonText}>Tetkik Ekle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn3, styles.selectedButton]}>
              <Text style={[styles.baseButtonText, styles.selectText]}>Kılavuz Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[, styles.baseButton, styles.btn4]}>
              <Text style={styles.baseButtonText}>Kılavuza Veri Gir</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.formContainer}>
          {/* <SearchBar value={searchText} onChange={setSearchText} iconName={"search-outline"} placeholder={"Kılavuz Arayın..."} /> */}
          <View>
            <Input
              placeholder="Kılavuz Adı"
              value={testName}
              onChangeText={setTestName}
              iconName="file-tray-full-outline"
            />
            <Input
              placeholder="Tetkik Adı"
              value={testName}
              onChangeText={setTestName}
              iconName="document-text-outline"
            />

            <View style={styles.dropdownContainer}>
              <Text style={styles.unitText}>Birim Seçiniz: </Text>
              <Dropdown
                options={massOptions}
                selectedValue={mass}
                onValueChange={setMass}
                placeholder="Kütle"
              />
              <Text style={styles.separator}>/</Text>
              <Dropdown
                options={volumeOptions}
                selectedValue={volume}
                onValueChange={setVolume}
                placeholder="Hacim"
              />

            </View>
          </View>
          <View>
            {/* {tests.map((test, index) => (
            <View key={index} style={styles.testItem}>
              <Text style={styles.testText}>Tetkik Adı: {test.testName}</Text>
              <Text style={styles.testText}>Değer Aralığı: {test.valueRange}</Text>
            </View>
          ))} */}
            <TouchableOpacity style={styles.addButton} onPress={addTest}>
              <Text style={styles.buttonText}>Ekle</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.createButton} onPress={createGuide}>
            <Text style={styles.buttonText}>Oluştur</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Admin;