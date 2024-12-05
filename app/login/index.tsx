import React, { useState } from 'react';
import { View, Text, Alert, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig'; // Firebase konfigürasyon dosyasını içe aktar
import styles from './index.style';
import Input from '../../components/Input/input';
import Button from '@/components/Button/button';
import { userListManager } from '@/constants/StoreList';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = await userListManager.getById(userCredential.user.uid);
        Alert.alert('Başarılı', `Hoş geldiniz ${userCredential.user.email}!`);
        Alert.alert("UYARI",user?.birthday)
        console.log(userCredential);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login!' }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.image} />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Giriş Yap</Text>
          <Input
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            iconName="mail-outline"
          />
          <Input
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            iconName="key-outline"
            secureTextEntry
          />
          <Button
            title="Giriş Yap"
            onPress={handleLogin}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />
          <Text style={{ marginVertical: 8 }}>
            Hesabınız yok mu?
            <Text style={styles.linkText} onPress={()=>router.push("/register") }>Kayıt Olun.</Text>

          </Text>
          {/* <Button
            title="Admin Girişi"
            onPress={() => Alert.alert('Admin Girişi')}
            style={styles.adminButton}
            textStyle={styles.adminButtonText}
          /> */}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
