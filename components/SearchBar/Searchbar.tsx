import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import styles from './SearchBar.style';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  iconName: any;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, iconName }) => {
  return (
    <View style={styles.container}>
    <Ionicons name={iconName} size={24} color="#aaa" style={styles.icon}/>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBar;
