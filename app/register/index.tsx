import React, { useState } from 'react';
import { View, Text, Alert, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/constants/firebaseConfig';
import styles from './index.style';
import Input from '../../components/Input/input';
import Button from '@/components/Button/button';
import { RoleEnum } from '@/enums/role.enum';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [tckn, setTckn] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState(RoleEnum.USER);

  const handleRegister = async () => {
    if (!email || !password || !name || !tckn || !birthday) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        email: email,
        name: name,
        surname: surname,
        tckn: tckn,
        birthday: birthday,
        role: role,
      });

      Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı!');
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("../../assets/images/logo.png")} style={styles.image} />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Kayıt Ol</Text>
          <Input
            placeholder="Adınız"
            value={name}
            onChangeText={setName}
            iconName="person-outline"
          />
          <Input
            placeholder="Soyadınız"
            value={surname}
            onChangeText={setSurname}
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
            value={tckn}
            onChangeText={setTckn}
            iconName="id-card-outline"
          />
          <Input
            placeholder="Doğum Tarihiniz (GG/AA/YYYY)"
            value={birthday}
            onChangeText={setBirthday}
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
            onPress={handleRegister}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />
          <Text style={{ marginVertical: 8 }}>
            Hesabınız var mı?{' '}
            <Text style={styles.linkText} onPress={() => router.push("/login")}>
              Giriş Yapın.
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Register;
