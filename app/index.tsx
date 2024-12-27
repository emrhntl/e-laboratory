import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { RoleEnum } from '../enums/role.enum';
import { useAuth } from './context/AuthContext';

const Splash = () => {
  const router = useRouter();
  const { user } = useAuth();

  const logo = require("../assets/images/logo.png");

  useEffect(() => {
    const redirectBasedOnRole = () => {
      if (!user) {
        router.replace('/login');
      } else {
        switch (user.role) {
          case RoleEnum.ADMIN:
            router.replace('/admin/CreateGuide');
            break;
          case RoleEnum.USER:
            router.replace('/user/MyAnalysis');
            break;
          default:
            router.replace('/login');
            break;
        }
      }
    };

    const timer = setTimeout(redirectBasedOnRole, 1500);

    return () => clearTimeout(timer);
  }, [user, router]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default Splash;
