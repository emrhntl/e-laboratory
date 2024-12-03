import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './input.style';

interface InputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName: any;
    secureTextEntry?: boolean;
}


const Input: React.FC<InputProps> = ({ placeholder, value, onChangeText, iconName, secureTextEntry = false, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
        <Ionicons name={iconName} size={24} color="#aaa" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={placeholder === "E-posta" ? "email-address" : "default"} // E-posta için klavye tipi
        autoCapitalize="none" // E-postalarda büyük harf otomatik kapalı
        {...rest}
      />
    </View>
  );
};

export default Input;
