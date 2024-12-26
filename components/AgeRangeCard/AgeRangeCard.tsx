import React from 'react';
import { Text, View } from 'react-native';

import styles from './AgeRangeCard.style';

interface AgeRangeCardProps {
    minAge: string;
    maxAge: string;
    unit: string;
    minValue?: string;
    maxValue?: string;
    standartDeviation?: string;
    average?: string;
    ciMinValue?: string;
    ciMaxValue?: string;
}

const AgeRangeCard: React.FC<AgeRangeCardProps> = ({
    minAge,
    maxAge,
    unit,
    minValue,
    maxValue,
    standartDeviation,
    average,
    ciMinValue,
    ciMaxValue,
}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.header}>
                Yaş Aralığı: {minAge} - {maxAge} {unit}
            </Text>

            {(minValue || maxValue || standartDeviation || average) && (
                <View style={styles.inlineSection}>
                    {minValue || maxValue ? (
                        <Text style={styles.inlineText}>
                            <Text style={styles.bold}>Min | Max: </Text> {minValue || '-'} | {maxValue || '-'}
                        </Text>
                    ) : null}

                    {average || standartDeviation ? (
                        <Text style={styles.inlineText}>
                            <Text style={styles.bold}>Geometrik: </Text> {average || '-'} ± {standartDeviation || '-'}
                        </Text>
                    ) : null}
                </View>
            )}

            {(ciMinValue || ciMaxValue) && (
                <Text style={styles.inlineText}>
                    <Text style={styles.bold}>CI (Min | Max): </Text> {ciMinValue || '-'} | {ciMaxValue || '-'}
                </Text>
            )}
        </View>
    );
};

export default AgeRangeCard;
