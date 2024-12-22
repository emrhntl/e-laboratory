import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from './CustomButton.style';

interface CustomButtonProps {
  style?: StyleProp<ViewStyle>; // Buton için stil
  textStyle?: StyleProp<TextStyle>; // Metin için stil
  onPress: (event: GestureResponderEvent) => void; // Basıldığında çağrılacak fonksiyon
  children: React.ReactNode; // Buton içeriği
}

const CustomButton: React.FC<CustomButtonProps> = ({ style, textStyle, onPress, children }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
