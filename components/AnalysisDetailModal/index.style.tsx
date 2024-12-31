import { StyleSheet } from "react-native"

export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
        paddingHorizontal:"6%",
        marginBottom: 10,
        borderBottomWidth:1,
        borderBottomColor: "#bbb",
        paddingVertical: "2%",
    },
    valueTitle:{
        fontSize: 16,
        color:"#222",
        fontWeight:"500"
    },
    valueName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
    },
    valueData: {
        fontSize: 16,
        color: '#333',
    },
    scrollView: {
        maxHeight: '70%',
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
    separator: {
        width: 1,
        backgroundColor: 'grey',
        height: '100%',
        marginHorizontal: 8,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        margin: 10,
        overflow: 'hidden',
        width:'95%'
      },
      tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
      },
      headerCell: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
      },
      rowCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
      },
      iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      },

});
