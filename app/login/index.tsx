import React, { useState } from 'react';
import { View, Text, Alert, SafeAreaView, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig'; // Firebase yapılandırması
import styles from './index.style';
import Input from '../../components/Input/input';
import Button from '@/components/Button/button';
import { userService } from '@/services/service.list';
import User from '@/entity/user';
import { RoleEnum } from '@/enums/role.enum';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const user: User | null = await userService.getById(userCredential.user.uid);

      if (user && user.role) {
        await login(user.role as RoleEnum);
        
        switch (user.role) {
          case RoleEnum.USER:
              router.replace("/user/MyAnalysis")
            break;
          case RoleEnum.ADMIN:
            router.replace("/admin/CreateGuide");
            break;
          default:
            Alert.alert('Hata', 'Bilinmeyen kullanıcı rolü!');
            router.replace('/login');
            break;
        }
        Alert.alert('Başarılı', `Hoş geldiniz ${userCredential.user.email}!`);
      } else {
        Alert.alert('Hata', 'Kullanıcı bilgisi bulunamadı.');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Giriş Başarısız', error.message || 'Bilinmeyen bir hata oluştu.');
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
            <Text style={styles.linkText} onPress={() => router.push("/register")}>Kayıt Olun.</Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
