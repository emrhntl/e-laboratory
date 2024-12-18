import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput, Modal } from "react-native";
import { Stack, useRouter } from "expo-router";
import { auth, db } from "@/constants/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar/Navbar";
import { Ionicons } from "@expo/vector-icons";
import styles from './index.style';
import { RoleEnum } from "@/enums/role.enum";

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: "",
        surname: "",
        tckn: "",
        birthday: "",
        email: "",
        password: "",
    });
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

    const handleAddAdmin = async () => {
        if (
            !newAdmin.name ||
            !newAdmin.surname ||
            !newAdmin.tckn ||
            !newAdmin.birthday ||
            !newAdmin.email ||
            !newAdmin.password
        ) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        const newAdminId = `admin-${Date.now()}`;
        const newAdminData = {
            ...newAdmin,
            id: newAdminId,
            role: RoleEnum.ADMIN,
        };

        try {
            await setDoc(doc(db, "users", newAdminId), newAdminData);
            Alert.alert("Başarılı", "Yeni admin başarıyla eklendi.");
            setNewAdmin({
                name: "",
                surname: "",
                tckn: "",
                birthday: "",
                email: "",
                password: "",
            }); // Formu sıfırla
        } catch (error) {
            console.error("Admin eklenirken bir hata oluştu:", error);
            Alert.alert("Hata", "Yeni admin eklenemedi.");
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
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.adminButtonText}>Yeni Admin Ekle</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Ionicons name="close-outline" size={30} style={styles.closeIcon} onPress={() => setModalVisible(false)} />
                        <Text style={styles.modalTitle}>Yeni Admin Bilgileri</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ad"
                            value={newAdmin.name}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Soyad"
                            value={newAdmin.surname}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, surname: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="T.C Kimlik No"
                            value={newAdmin.tckn}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, tckn: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Doğum Tarihi (GG/AA/YYYY)"
                            value={newAdmin.birthday}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, birthday: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={newAdmin.email}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Şifre"
                            secureTextEntry
                            value={newAdmin.password}
                            onChangeText={(text) => setNewAdmin({ ...newAdmin, password: text })}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>İptal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleAddAdmin}
                            >
                                <Text style={styles.saveButtonText}>Admin Ekle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default Profile;