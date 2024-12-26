import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginVertical: 3,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'95%',
        alignSelf:'center',
        minHeight:95
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
        color: '#333',
    },
    inlineSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 4,
    },
    inlineText: {
        fontSize: 14,
        color: '#555',
    },
    bold: {
        fontWeight: '600',
        color: '#333',
    },
});


export default styles;