import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';

const AdminAddGuide = () => {
  const [testName, setTestName] = useState('');
  const [valueRange, setValueRange] = useState('');
  const [guideName, setGuideName] = useState('');
  const [tests, setTests] = useState([]);

  const addTest = () => {
    if (testName && valueRange) {
      setTests([...tests, { testName, valueRange }]);
      setTestName('');
      setValueRange('');
    }
  };

  const createGuide = () => {
    console.log('Guide created:', guideName, tests);
    // Add your logic to handle guide creation
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>E-LABORATUVAR</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonText}>Hasta Takip</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.selectedButton]}><Text style={styles.navButtonText}>Kılavuz Ekle</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navButton}><Text style={styles.navButtonText}>Kılavuza Veri Gir</Text></TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Kılavuz Adı:</Text>
        <TextInput
          style={styles.input}
          value={guideName}
          onChangeText={setGuideName}
          placeholder="Kılavuz Adı"
        />

        <Text style={styles.label}>Tetkik Adı:</Text>
        <TextInput
          style={styles.input}
          value={testName}
          onChangeText={setTestName}
          placeholder="Tetkik Adı"
        />

        <Text style={styles.label}>Değer Aralığı:</Text>
        <TextInput
          style={styles.input}
          value={valueRange}
          onChangeText={setValueRange}
          placeholder="Değer Aralığı"
        />

        <TouchableOpacity style={styles.addButton} onPress={addTest}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>

        {tests.map((test, index) => (
          <View key={index} style={styles.testItem}>
            <Text style={styles.testText}>Tetkik Adı: {test.testName}</Text>
            <Text style={styles.testText}>Değer Aralığı: {test.valueRange}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.createButton} onPress={createGuide}>
          <Text style={styles.buttonText}>Oluştur</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdminAddGuide;