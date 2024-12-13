import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './Dropdown.style';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onValueChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.selectedValue}>{selectedValue || placeholder}</Text>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={24} color="#aaa" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <ScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  onValueChange(option);
                  setIsOpen(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}</ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
