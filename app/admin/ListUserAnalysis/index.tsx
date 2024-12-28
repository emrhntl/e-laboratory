import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { router, Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from '@/components/Dropdown/Dropdown';
import FirestoreManager from '@/constants/firestoreManager';
import Navbar from '@/components/Navbar/Navbar';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/constants/firebaseConfig'; // Firebase yapılandırma dosyanızın doğru yolunu ekleyin
import AdminTabs from '@/components/AdminTabs/admin.tabs';
import AuthGuard from "@/app/utils/AuthGuard";
import { RoleEnum } from '@/enums/role.enum';
import SearchBar from '@/components/SearchBar/Searchbar';
import styles from './index.style';
import User from '@/entity/user';

const ListUserAnalysis: React.FC = () => {
    return (
        <AuthGuard allowedRoles={[RoleEnum.ADMIN]} >
            <Stack.Screen options={{ title: 'ListUserAnalysis!' }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <Text>Hello</Text>
                </View>
            </SafeAreaView>

        </AuthGuard>
    );
};

export default ListUserAnalysis;