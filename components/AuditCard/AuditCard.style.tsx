// TetkikCard.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: '5%',
        margin: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
    deleteButton:{
        width:'10%',
        alignItems:'center'
    }
    
});

export default styles;
