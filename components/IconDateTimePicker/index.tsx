import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import styles from "./index.style"


interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

const IconDateTimePicker: React.FC<DateTimePickerProps> = ({selectedDate, onDateChange}) => {
  const [showPicker, setShowPicker] = React.useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.buttonText}>
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : 'Tarih Seçin'}
        </Text>
        <Ionicons name="calendar" size={24} color="#555" />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default IconDateTimePicker;
