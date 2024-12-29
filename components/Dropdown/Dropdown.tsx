import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface DropdownProps {
    options: string[];
    selectedValue: string;
    onValueChange: (value: any) => void;
    placeholder: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onValueChange,
    placeholder,
    style,
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option: string) => {
        if (!disabled) {
            onValueChange(option);
            setIsOpen(false);
        }
    };

    return (
        <View style={[styles.dropdownContainer, style, isOpen && { zIndex: 1000 }]}>
            <TouchableOpacity
                style={[styles.dropdown, disabled && styles.disabledDropdown]}
                onPress={toggleDropdown}
                disabled={disabled}
            >
                <Text style={[styles.selectedValue, disabled && styles.disabledText]}>
                    {selectedValue || placeholder}
                </Text>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={disabled ? '#aaa' : '#777'}
                />
            </TouchableOpacity>
            {isOpen && !disabled && (
                <FlatList
                    style={styles.optionsContainer}
                    nestedScrollEnabled={true}
                    data={options}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
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
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    disabledDropdown: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
    },
    selectedValue: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    disabledText: {
        color: '#aaa',
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
