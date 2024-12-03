import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Splash = () => {
  const router = useRouter();

  const logo = require("../assets/images/logo.png");

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    },1500)
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo}/>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default Splash;
