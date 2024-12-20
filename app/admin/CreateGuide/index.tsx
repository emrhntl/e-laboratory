import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from './index.style';
import { Stack, usePathname, useRouter } from 'expo-router';
import Navbar from '@/components/Navbar/Navbar';
import Input from '@/components/Input/input';
import Dropdown from '@/components/Dropdown/Dropdown';

import { MassUnitEnum } from '@/enums/massUnit.enum';
import { VolumeUnitEnum } from '@/enums/volumeUnit.enum';
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import CustomSearchDropdown from '@/components/CustomSearchDropdown/CustomSearhDropdown';
import Audit from '@/entity/audit';
import { auditService } from '@/services/service.list';

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
  const [currentAuditList, setCurrentAuditList] = useState<Audit[]>([]);

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

  const fetchAuditList = async () => {
    try {
      const currentAuditList: Audit[] = await auditService.getAll();
      console.log(currentAuditList)
      setCurrentAuditList(currentAuditList);
    } catch (err: any) {
      console.error('Audit listesi alınırken hata oluştu:', err.message || err);
    } finally {
    }
  };

  useEffect(() => {
    fetchAuditList();
  },[])

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

        <AdminTabs router={router} />

        <View style={styles.formContainer}>
          {/* <SearchBar value={searchText} onChange={setSearchText} iconName={"search-outline"} placeholder={"Kılavuz Arayın..."} /> */}
          <View>
            <View>
              <Input
                placeholder="Kılavuz Adı Giriniz..."
                value={guideName}
                onChangeText={setGuideName}
                iconName="file-tray-full-outline"
              />
              <CustomSearchDropdown data={currentAuditList.map((audit) => { return {label:`${audit.name} | ${audit.unit}`,value:audit.name}})} placeholder='Tetkik Seçiniz' onSelect={() => {}} style={{width:'45%'}}  />
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
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CreateGuide;