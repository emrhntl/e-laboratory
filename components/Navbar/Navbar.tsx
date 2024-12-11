import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Navbar.style';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Navbar = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { router.push("/admin") }}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.headerLogo}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>E-LABORATUVAR</Text>
            <View style={styles.icon}>
                <TouchableOpacity>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default Navbar;