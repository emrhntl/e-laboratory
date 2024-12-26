import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
    },
    auditDropdownContainer: {
        marginBottom: 8,
    },
    auditDropdown: {
        marginTop: 2,
    },
    subHeader: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom:3 ,
    },
    section: {
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    inputContainer: {
        flex: 1,
        marginRight: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#dcdde1',
        borderRadius: 6,
        padding: 8,
        fontSize: 14,
        width: '100%',
    },
    inputLabel: {
        fontSize: 12,
        marginBottom: 4,
        color: '#333',
    },
    selectContainer: {
        flex: 1,
        marginRight: 8,
    },
    dropdown: {
        marginTop: 4,
    },
    addButton: {
        marginTop: 8,
        backgroundColor: '#5C98A4',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
    },
    errorMessage: {
        color: 'red',
        marginVertical: 5,
        textAlign: 'center',
    },
    flatListContainer: {
        height: '15%',
        width: '90%',
        alignSelf: 'center',
    },
});

export default styles;
