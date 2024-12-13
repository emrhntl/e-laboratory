import { StyleSheet } from "react-native";

export default StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#f6f6f6',
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 3,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
  });