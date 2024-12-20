import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './index.style';

interface AddUserModalProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (userData: any) => void;
    userType: string; // Admin mi hasta mı?
}

const AddUserModal: React.FC<AddUserModalProps> = ({ modalVisible, setModalVisible, onSubmit, userType }) => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        tckn: "",
        birthday: "",
        email: "",
        password: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setUserData({ ...userData, [field]: value });
    };

    const handleSubmit = () => {
        if (
            !userData.name ||
            !userData.surname ||
            !userData.tckn ||
            !userData.birthday ||
            !userData.email ||
            !userData.password
        ) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        onSubmit(userData); // Send data to parent component
        setModalVisible(false); // Close modal after submit
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Ionicons name="close-outline" size={30} style={styles.closeIcon} onPress={() => setModalVisible(false)} />
                    <Text style={styles.modalTitle}>
                        {userType === "Admin" ? "Yeni Admin Bilgileri" : "Yeni Hasta Bilgileri"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ad"
                        value={userData.name}
                        onChangeText={(text) => handleInputChange("name", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Soyad"
                        value={userData.surname}
                        onChangeText={(text) => handleInputChange("surname", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="T.C Kimlik No"
                        value={userData.tckn}
                        onChangeText={(text) => handleInputChange("tckn", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Doğum Tarihi (GG/AA/YYYY)"
                        value={userData.birthday}
                        onChangeText={(text) => handleInputChange("birthday", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={userData.email}
                        onChangeText={(text) => handleInputChange("email", text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        secureTextEntry
                        value={userData.password}
                        onChangeText={(text) => handleInputChange("password", text)}
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
                            onPress={handleSubmit}
                        >
                            <Text style={styles.saveButtonText}>
                                {userType === "Admin" ? "Admin Ekle" : "Hasta Ekle"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddUserModal;