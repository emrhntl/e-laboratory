import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownProps {
    options: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onValueChange,
    placeholder,
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onValueChange(option);
        setIsOpen(false);
    };

    return (
        <View style={[styles.dropdownContainer, style, isOpen && { zIndex: 1000 }]}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text style={styles.selectedValue}>
                    {selectedValue || placeholder}
                </Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#777"
                />
            </TouchableOpacity>

            {isOpen && (
                <ScrollView style={styles.optionsContainer} nestedScrollEnabled={true}>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
        zIndex: 999,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
    },
    selectedValue: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    optionsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 4,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: 150,
        zIndex: 1000,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
});
