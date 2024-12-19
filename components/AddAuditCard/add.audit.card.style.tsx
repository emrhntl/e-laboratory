import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E6F1F5',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        elevation: 2,
        marginVertical:'3%'

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '35%',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        height: 35,
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 30,
        elevation: 1,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        position: 'relative',
    },
    unitText: {
        color: '#444',
        fontSize: 16
    },

    separator: {
        fontSize: 18,
    },
});


export default styles;