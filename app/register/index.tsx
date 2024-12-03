import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Link, Stack } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig'; // Firebase konfigürasyon dosyasını içe aktar
import styles from './index.style';
import Input from '../../components/Input/input';
import Button from '@/components/Button/button';

const Register = () => {
  const router = useRouter();
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
      <Stack.Screen options={{ title: 'Register!' }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.image}/>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Kayıt Ol</Text>
          <Input
            placeholder="Adınız"
            value={email}
            onChangeText={setEmail}
            iconName="person-outline"
          />
          <Input
            placeholder="Soyadınız"
            value={email}
            onChangeText={setEmail}
            iconName="person-outline"
          />
          <Input
            placeholder="E-posta adresiniz"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
          />
          <Input
            placeholder="T.C. Kimlik Numaranız"
            value={email}
            onChangeText={setEmail}
            iconName="id-card-outline"
          />
          <Input   //Bu doğum tarihi olduğu için değişecek
            placeholder="Doğum Tarihiniz"
            value={email}
            onChangeText={setEmail}
            iconName="calendar-outline"
          />
          <Input
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            iconName="key-outline"
            secureTextEntry
          />
          <Button
            title="Kayıt Ol"
            onPress={handleLogin}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />
          <Text style={{ marginVertical: 8 }}>
            Hesabınız var mı? <Text style={styles.linkText} onPress={() => router.push("/login") }>Giriş Yapın.</Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Register;
