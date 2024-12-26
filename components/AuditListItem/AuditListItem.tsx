import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface AuditListItemProps {
    auditName: string;
    onPress?: () => void;
}

const AuditListItem: React.FC<AuditListItemProps> = ({ auditName, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.text}>{auditName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: (Dimensions.get('window').width * 30) / 100,
        marginHorizontal: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AuditListItem;
