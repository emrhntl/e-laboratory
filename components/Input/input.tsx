import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { KeyboardTypeOptions, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import styles from './input.style';

interface InputProps extends Omit<TextInputProps, 'style' | 'keyboardType'> {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: any;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  iconName,
  secureTextEntry = false,
  style,
  inputStyle,
  keyboardType = 'default',
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons name={iconName} size={24} color="#aaa" style={styles.icon} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        {...rest}
      />
    </View>
  );
};

export default Input;
