import { StyleSheet } from "react-native"

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparan siyah arka plan
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        textAlign:"center",
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalDate: {
        fontSize: 16,
        marginBottom: 10,
        color: '#444',
        textAlign:"right"
    },
    valueRow: {
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingHorizontal:"10%",
        marginBottom: 10,
        borderBottomWidth:1,
        borderBottomColor: "#bbb",
        paddingVertical: "2%",
    },
    valueTitle:{
        fontSize: 18,
        color:"#222",
        fontWeight:"500"
    },
    valueName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        paddingHorizontal:"9%",
    },
    valueData: {
        fontSize: 16,
        color: '#333',
    },
    scrollView: {
        maxHeight: '70%', // Yüksekliği sınırlamak için
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },

});
