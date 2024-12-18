import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    dropdownContainer: {
        width: 120,
        zIndex: 1000,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ccc',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#FFF',
    },
    selectedValue: {
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 200,
        maxHeight: 200,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
});
