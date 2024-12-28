import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import styles from './SearchBar.style';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  iconName: any;
  containerStyle?: ViewStyle; // Dışarıdan verilebilecek stil
  inputStyle?: TextStyle;     // Dışarıdan verilebilecek stil
  iconStyle?: TextStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, iconName,containerStyle,inputStyle,iconStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
    <Ionicons name={iconName} size={24} color="#aaa" style={[styles.icon, iconStyle]}/>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBar;
