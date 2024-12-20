import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Modal } from "react-native";
import { Stack, useRouter } from "expo-router";
import { auth, db } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar/Navbar";
import { Ionicons } from "@expo/vector-icons";
import styles from './index.style';
import { RoleEnum } from "@/enums/role.enum";
import AddUserModal from "@/components/AddUserModal";

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [userType, setUserType] = useState("Admin");
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.log("kullanıcı verisi bulunamadı");
                    }
                }
            } catch (error) {
                console.log("Kullanıcı bilgileri alınamadı: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleAddUser = async (newUserData: any) => {
        const newUserId = `${userType}-${Date.now()}`;
        const newUserDataWithId = {
            ...newUserData,
            id: newUserId,
            role: userType === "admin" ? RoleEnum.ADMIN : RoleEnum.USER,
        };

        try {
            await setDoc(doc(db, "users", newUserId), newUserDataWithId);
            Alert.alert("Başarılı", `${userType === "admin" ? "Yeni admin" : "Yeni hasta"} başarıyla eklendi.`);
        } catch (error) {
            console.error(`${userType === "admin" ? "Admin" : "Hasta"} eklenirken bir hata oluştu:`, error);
            Alert.alert("Hata", `${userType === "admin" ? "Yeni admin" : "Yeni hasta"} eklenemedi.`);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
            </SafeAreaView>
        );
    }

    if (!userData) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text>Kullanıcı bilgileri yüklenemedi.</Text>
            </SafeAreaView>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'profile!' }} />
            <SafeAreaView style={styles.container}>
                <Navbar />
                <View style={styles.imageContainer}>
                    <Ionicons name="person-circle-outline" size={100} color={'#444'} style={{ width: 100, height: 100 }} />
                    <Text style={styles.name}>{`${userData.name} ${userData.surname}`}</Text>
                    <Text style={styles.role}>{userData.role}</Text>
                </View>
                <View style={styles.card}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#222', fontWeight: '600', fontSize: 23, marginBottom: 5, textAlign: "center" }}>BİLGİLERİM</Text>
                        <Text style={styles.infoLabel}>T.C Kimlik Numaranız: {userData.tckn}</Text>
                        <Text style={styles.infoLabel}>Doğum Tarihiniz: {userData.birthday}</Text>
                        <Text style={styles.infoLabel}>Email: {userData.email}</Text>
                    </View>
                    {userData.role === RoleEnum.ADMIN && (
                        <TouchableOpacity
                            style={styles.adminButton}
                            onPress={() => {
                                setUserType("Admin");
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.adminButtonText}>Yeni Admin Ekle</Text>
                        </TouchableOpacity>
                    )}
                    {userData.role === RoleEnum.ADMIN && (
                    <TouchableOpacity
                        style={[styles.adminButton, {backgroundColor: "#5C98A4"}]}
                        onPress={() => {
                            setUserType("User");
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.adminButtonText}>Yeni Hasta Ekle</Text>
                    </TouchableOpacity>
                )}
                </View>
                <AddUserModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    onSubmit={handleAddUser}
                    userType={userType} // Pass the userType (admin or patient)
                />
            </SafeAreaView>
        </>
    );
}

export default Profile;