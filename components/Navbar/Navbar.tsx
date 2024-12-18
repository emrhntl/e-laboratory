import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Navbar.style';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
    const router = useRouter();

    return (
        <>
            <Stack.Screen options={{ title: 'Navbar!' }} />
            <View style={styles.container}>
                <TouchableOpacity>
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.headerLogo}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>E-LABORATUVAR</Text>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={() => router.push("/profile") }>
                        <Ionicons name="person-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};

export default Navbar;