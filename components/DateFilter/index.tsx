import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from './index.style'; // Style importu

interface DateFilterProps {
    onFilter: (startDate: Date | null, endDate: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

    const handleFilter = () => {
        onFilter(startDate, endDate);
    };

    return (
        <>
            <View style={styles.datePickerContainer}>

                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
                    <Text>{startDate ? `Başlangıç: ${startDate.toLocaleDateString()}` : "Başlangıç Tarihi"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
                    <Text>{endDate ? `Bitiş: ${endDate.toLocaleDateString()}` : "Bitiş Tarihi"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Filtrele</Text>
                </TouchableOpacity>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowStartDatePicker(false);
                            if (date) setStartDate(date);
                        }}
                        maximumDate={new Date()}
                    />
                )}

                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowEndDatePicker(false);
                            if (date) setEndDate(date);
                        }}
                        maximumDate={new Date()}
                    />
                )}
            </View>
        </>
    );
};

export default DateFilter;
