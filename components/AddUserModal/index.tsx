import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from './index.style';
import DateTimePicker from '@react-native-community/datetimepicker';


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
        birthday: new Date(),
        email: "",
        password: "",
    });

    const [showPicker, setShowPicker] = useState(false);

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
        const finalUserData = {
            ...userData,
            birthday: userData.birthday.toLocaleDateString('tr-TR'),
        };

        onSubmit(finalUserData); // Send data to parent component
        setModalVisible(false); // Close modal after submit
    };

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) {
            setUserData({
                ...userData,
                birthday: selectedDate,
            });
        }
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
                    <TouchableOpacity
                        onPress={() => setShowPicker(true)}
                        style={styles.datePickerButton}
                    >
                        <Text style={styles.datePickerText}>
                            Doğum Tarihi Seçiniz: {(userData.birthday).toLocaleDateString('tr-TR')}
                        </Text>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={userData.birthday}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChange}
                            maximumDate={new Date()}
                        />
                    )}
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