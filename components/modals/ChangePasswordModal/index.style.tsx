import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
    },
    button: {
      padding: 12,
      backgroundColor: '#007AFF',
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });