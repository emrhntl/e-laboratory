import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import styles from './button.style';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};



export default Button;
