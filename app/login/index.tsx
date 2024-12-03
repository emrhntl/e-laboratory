import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig'; // Firebase konfigürasyon dosyasını içe aktar

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Başarılı', `Hoş geldiniz ${userCredential.user.email}!`);
        console.log(userCredential);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Giriş Yap</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;
