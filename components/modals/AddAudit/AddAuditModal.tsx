import AgeRangeCard from '@/components/AgeRangeCard/AgeRangeCard';
import Dropdown from '@/components/Dropdown/Dropdown';
import AuditValues from '@/entity/audit.values';
import React, { useState } from 'react';
import { Dimensions, FlatList, GestureResponderEvent, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './AddAuditModal.style';

interface AuditValuesFormProps {
    auditList: string[];
    selectedAudit: string;
    onAuditChange: (audit: string) => void;
    onAddAudit: (newAuditValues: AuditValues[], auditName: string) => void;
    closeModal:any
}

const AuditValuesForm: React.FC<AuditValuesFormProps> = ({
    auditList,
    selectedAudit,
    onAuditChange,
    onAddAudit,
    closeModal
}) => {


    const numericFields = [
        'standartDeviation',
        'avarage',
        'minValue',
        'maxValue',
        'ciMinValue',
        'ciMaxValue'
    ];

    const [auditValues, setAuditValues] = useState<AuditValues>(
        new AuditValues('', '', '', '', '', '', '', '', "Yıl")
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [auditValuesList, setAuditValuesList] = useState<AuditValues[]>([]);


const handleChange = (field: string, value: string) => {
    if (numericFields.includes(field)) {
        const numericValue = value.replace(',', '.');
        setAuditValues((prev) => ({
            ...prev,
            [field]: numericValue === '' || isNaN(parseFloat(numericValue)) ? '' : numericValue,
        }));
    } else {
        setAuditValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    }
};
    

    const handleAddAgeRange = () => {
        if (!selectedAudit) {
            setErrorMessage('Lütfen bir tetkik seçin.');
            return;
        }

        const minAge = Number(auditValues.minAgeValue);
        const maxAge = Number(auditValues.maxAgeValue);
        const minValue = auditValues.minValue ? Number(auditValues.minValue) : null;
        const maxValue = auditValues.maxValue ? Number(auditValues.maxValue) : null;
        const ciMinValue = auditValues.ciMinValue ? Number(auditValues.ciMinValue) : null;
        const ciMaxValue = auditValues.ciMaxValue ? Number(auditValues.ciMaxValue) : null;
        const standartDeviation = auditValues.standartDeviation ? Number(auditValues.standartDeviation) : null;
        const avarage = auditValues.avarage ? Number(auditValues.avarage) : null;

        if ((auditValues.minValue && isNaN(Number(auditValues.minValue))) ||
            (auditValues.maxValue && isNaN(Number(auditValues.maxValue)))) {
            setErrorMessage('Min ve Max değerleri sayısal olmalıdır.');
            return;
        }

        if ((auditValues.standartDeviation && isNaN(Number(auditValues.standartDeviation))) ||
            (auditValues.avarage && isNaN(Number(auditValues.avarage)))) {
            setErrorMessage('Standart Sapma ve Ortalama değerleri sayısal olmalıdır.');
            return;
        }

        if ((auditValues.ciMinValue && isNaN(Number(auditValues.ciMinValue))) ||
            (auditValues.ciMaxValue && isNaN(Number(auditValues.ciMaxValue)))) {
            setErrorMessage('CI Min ve CI Max değerleri sayısal olmalıdır.');
            return;
        }

        const isMinMaxFilled = minValue !== null && maxValue !== null;
        const isGeometricFilled = standartDeviation !== null && avarage !== null;
        const isCIFilled = ciMinValue !== null && ciMaxValue !== null;

        if (!isMinMaxFilled && !isGeometricFilled && !isCIFilled) {
            setErrorMessage('En az bir değer grubu doldurulmalıdır: Min/Max, Geometrik Değerler veya CI Min/Max.');
            return;
        }

        if (isNaN(minAge) || isNaN(maxAge) || minAge < 0 || maxAge <= 0) {
            setErrorMessage('Min ve Max yaş değerleri pozitif bir sayı olmalıdır.');
            return;
        }

        if (minAge > maxAge) {
            setErrorMessage('Min yaş değeri, Max yaş değerinden büyük olamaz.');
            return;
        }

        if (isMinMaxFilled) {
            if (minValue <= 0 || maxValue <= 0) {
                setErrorMessage('Min ve Max değerleri pozitif bir sayı olmalıdır.');
                return;
            }

            if (minValue >= maxValue) {
                setErrorMessage('Min değer, Max değerden büyük veya eşit olamaz.');
                return;
            }
        }

        if (isCIFilled) {
            if (ciMinValue <= 0 || ciMaxValue <= 0) {
                setErrorMessage('CI Min ve CI Max değerleri pozitif bir sayı olmalıdır.');
                return;
            }

            if (ciMinValue >= ciMaxValue) {
                setErrorMessage('CI Min değer, CI Max değerden büyük veya eşit olamaz.');
                return;
            }
        }
        
        if(!(isMinMaxFilled || isCIFilled || isGeometricFilled)) {
            setErrorMessage('Min/Max, Geometrik veya Confidence Intervals değerlerinden en az birisi için değer girmelisiniz!');
            return;
        }

        setErrorMessage(null);
        setAuditValuesList((prev) => [
            ...prev,
            { ...auditValues },
        ]);

        setAuditValues(new AuditValues('', '', '', '', '', '', '', '', 'Yıl'));
    };




    function onAdd(event: GestureResponderEvent): void {
        onAddAudit(auditValuesList,selectedAudit);
        setAuditValues(new AuditValues('', '', '', '', '', '', '', '', 'Yıl'));
        setAuditValuesList([]);
        closeModal();
    }

    return (
        <View style={styles.container}>
            <View style={styles.auditDropdownContainer}>
                <Text style={styles.label}>Tetkik Seçiniz:</Text>
                <Dropdown
                    options={auditList}
                    selectedValue={selectedAudit}
                    onValueChange={(audit) => onAuditChange(audit)}
                    style={styles.auditDropdown} placeholder={'Tetkik Seçiniz'}
                    disabled={auditValuesList.length != 0}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Yaş Aralığı</Text>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Min Yaş</Text>
                        <TextInput
                            style={[styles.input, { width: '75%' }]}
                            keyboardType="numeric"
                            value={auditValues.minAgeValue}
                            onChangeText={(text) => handleChange('minAgeValue', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Max Yaş</Text>
                        <TextInput
                            style={[styles.input, { width: '75%' }]}
                            keyboardType="numeric"
                            value={auditValues.maxAgeValue}
                            onChangeText={(text) => handleChange('maxAgeValue', text)}
                        />
                    </View>
                    <View style={styles.selectContainer}>
                        <Text style={[styles.inputLabel, { marginBottom: 0 }]}>Birim</Text>
                        <Dropdown
                            options={['Ay', 'Yıl']}
                            selectedValue={auditValues.ageType}
                            onValueChange={(text) => handleChange('ageType', text)}
                            style={styles.dropdown} placeholder={''} />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Min/Max Değerleri</Text>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Min</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.minValue.toString()}
                            onChangeText={(text) => handleChange('minValue', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Max</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.maxValue.toString()}
                            onChangeText={(text) => handleChange('maxValue', text)}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Geometrik Değerler</Text>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Standart Sapma</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.standartDeviation.toString()}
                            onChangeText={(text) => handleChange('standartDeviation', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Ortalama</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.avarage.toString()}
                            onChangeText={(text) => handleChange('avarage', text)}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Confidence Intervals</Text>
                <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>CI Min</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.ciMinValue.toString()}
                            onChangeText={(text) => handleChange('ciMinValue', text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>CI Max</Text>
                        <TextInput
                            style={[styles.input, { width: '85%' }]}
                            keyboardType="numeric"
                            value={auditValues.ciMaxValue.toString()}
                            onChangeText={(text) => handleChange('ciMaxValue', text)}
                        />
                    </View>
                </View>
            </View>
            {auditValuesList.length != 0 ?
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Eklenen Yaş Aralıkları</Text>
                    <FlatList
                        style={{ height: '18%', width: (Dimensions.get("window").width * 90) / 100, alignSelf: 'center' }}
                        data={auditValuesList}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <AgeRangeCard
                                minAge={item.minAgeValue}
                                maxAge={item.maxAgeValue}
                                standartDeviation={item.standartDeviation}
                                average={item.avarage}
                                minValue={item.minValue}
                                maxValue={item.maxValue}
                                ciMinValue={item.ciMinValue}
                                ciMaxValue={item.ciMaxValue}
                                unit={item.ageType}
                            />)}
                    />
                </View>
                :
                null
            }
            <TouchableOpacity style={[styles.addButton, { backgroundColor: '#e74c3c' }]} onPress={handleAddAgeRange}>
                <Text style={styles.addButtonText}>Girilen Yaş Aralığını Ekle</Text>
            </TouchableOpacity>
            {errorMessage && (
                <Text style={{ color: 'red', marginVertical: 3 }}>{errorMessage}</Text>
            )}

            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
                <Text style={styles.addButtonText}>Tetkiği Klavuza Ekle</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuditValuesForm;
