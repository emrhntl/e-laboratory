import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from './index.style';
import { Stack, useRouter } from 'expo-router';
import Navbar from '@/components/Navbar/Navbar';
import Input from '@/components/Input/input';
import Dropdown from '@/components/Dropdown/Dropdown';

import { MassUnitEnum } from '@/enums/massUnit.enum';
import { VolumeUnitEnum } from '@/enums/volumeUnit.enum';

const CreateGuide: React.FC = () => {
  const router = useRouter();
  const [guideName, setGuideName] = useState('');
  const [testName, setTestName] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [valueRange, setValueRange] = useState('');
  const [massUnit, setMassUnit] = useState<string>('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [volumeUnit, setVolumeUnit] = useState<string>('');
  const [testList, setTestList] = useState<any[]>([]);

  const generateNumberOptions = (start: number, end: number): string[] =>
    Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());

  const massOptions = Object.values(MassUnitEnum);
  const volumeOptions = Object.values(VolumeUnitEnum);

  const numberOptions = generateNumberOptions(0, 25);

  const addTest = () => {
    if (ageRange && valueRange) {
      setTestList([...testList, { ageRange, valueRange }]);
      setAgeRange('');
      setValueRange('');
    }
  };

  const createGuide = () => {
    if (guideName && testName && (massUnit || volumeUnit)) {
      console.log('Guide Created:', { guideName, testName, massUnit, volumeUnit, testList });
      // Backend API call for saving guide can be added here
    } else {
      alert('Lütfen tüm alanları doldurunuz!');
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'CreateGuide!' }} />
      <SafeAreaView style={styles.container}>
        <Navbar />
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn1]} onPress={()=>router.push('/admin/PatientTracking')}>
              <Text style={styles.baseButtonText}>Hasta Takip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.baseButton, styles.btn2]} onPress={()=>router.push('/admin/AddAudit')}>
              <Text style={styles.baseButtonText}>Tetkik Ekle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.baseButton, styles.btn3, styles.selectedButton]}>
              <Text style={[styles.baseButtonText, styles.selectText]}>Kılavuz Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[, styles.baseButton, styles.btn4]} onPress={()=>router.push('/admin/AddDataGuide')}>
              <Text style={styles.baseButtonText}>Kılavuza Veri Gir</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* <SearchBar value={searchText} onChange={setSearchText} iconName={"search-outline"} placeholder={"Kılavuz Arayın..."} /> */}
          <ScrollView>
            <View>
              <Input
                placeholder="Kılavuz Adı Giriniz..."
                value={guideName}
                onChangeText={setGuideName}
                iconName="file-tray-full-outline"
              />
              <Input
                placeholder="Tetkik Adı Giriniz.."
                value={testName}
                onChangeText={setTestName}
                iconName="document-text-outline"
              />
              <View style={styles.dropdownContainer}>
                <Text style={styles.unitText}>Birim Seçiniz: </Text>
                <Dropdown
                  options={massOptions}
                  selectedValue={massUnit}
                  onValueChange={setMassUnit}
                  placeholder="Kütle"
                />
                <Text style={styles.separator}>/</Text>
                <Dropdown
                  options={volumeOptions}
                  selectedValue={volumeUnit}
                  onValueChange={setVolumeUnit}
                  placeholder="Hacim"
                />
              </View>
            </View>
            <View style={styles.addContainer}>
              <Input
                placeholder="Yaş Aralığı Giriniz..."
                value={ageRange}
                onChangeText={setAgeRange}
                iconName="calendar-outline"
              />
              <View style={styles.dropdownContainer}>
                <Text style={styles.unitText}>Değer Aralığı Giriniz:</Text>
                <Dropdown
                  options={numberOptions}
                  selectedValue={minValue}
                  onValueChange={setMinValue}
                  placeholder="min"
                />
                <Text style={styles.separator}>-</Text>
                <Dropdown
                  options={numberOptions}
                  selectedValue={maxValue}
                  onValueChange={setMaxValue}
                  placeholder="max"
                />
              </View>
              <TouchableOpacity style={styles.addButton} onPress={addTest}>
                <Text style={styles.buttonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              {testList.map((test, index) => (
                <View key={index} style={styles.testItem}>
                  <Text style={styles.testText}>
                    Yaş: {test.ageRange}, Değer: {test.valueRange}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.createButton} onPress={createGuide}>
              <Text style={styles.buttonText}>Oluştur</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateGuide;