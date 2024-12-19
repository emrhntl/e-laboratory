// AddAuditCard.tsx

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './add.audit.card.style';
import { MassUnitEnum } from '@/enums/massUnit.enum';
import { VolumeUnitEnum } from '@/enums/volumeUnit.enum';
import Dropdown from '../Dropdown/Dropdown';

interface AddAuditCardProps {
    auditName: string;
    setAuditName: (value: string) => void;
    massUnit: string;
    setMassUnit: (value: string) => void;
    volumeUnit: string;
    setVolumeUnit: (value: string) => void;
    onSubmit: () => void;
}

const AddAuditCard: React.FC<AddAuditCardProps> = ({
    auditName,
    setAuditName,
    massUnit,
    setMassUnit,
    volumeUnit,
    setVolumeUnit,
    onSubmit,
}) => {
    const massOptions = Object.values(MassUnitEnum);
    const volumeOptions = Object.values(VolumeUnitEnum);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tetkik Adı:</Text>
                <TextInput
                    style={styles.input} 
                    placeholder="Tetkik Adı Giriniz"
                    value={auditName}
                    onChangeText={setAuditName}
                />
            </View>

            <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Birim Seçiniz: </Text>
                <Dropdown
                    options={massOptions}
                    selectedValue={massUnit}
                    onValueChange={setMassUnit}
                    placeholder="Kütle"
                    style={{ width: '33%' }}
                />
                <Text style={styles.separator}> / </Text>
                <Dropdown
                    options={volumeOptions}
                    selectedValue={volumeUnit}
                    onValueChange={setVolumeUnit}
                    placeholder="Hacim"
                    style={{ width: '33%' }}
                />
            </View>
            
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Ekle</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddAuditCard;
