import React from 'react';
import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import styles from './AuditCard.style';
import { Ionicons } from '@expo/vector-icons';

interface AuditCardProps {
  name: string;
  unit: string;
  style?: ViewStyle;
  onDelete?: () => void;
}

const AuditCard: React.FC<AuditCardProps> = ({
  name,
  unit,
  style,
  onDelete,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text>
          <Text style={styles.title}>Tetkik Adı:</Text>{' '}
          <Text style={styles.value}>{name}</Text>
        </Text>
        <Text>
          <Text style={styles.title}>Birim:</Text>{' '}
          <Text style={styles.value}>{unit}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        accessibilityLabel="Tetkik Sil"
      >
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

export default AuditCard;
