import { StyleSheet } from "react-native";
export default StyleSheet.create({
    dropdownContainer: {
      flex: 1,
      margin: 3,
    },
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 25,
      borderColor: '#ccc',
      paddingVertical: 5,
      paddingHorizontal: 12,
      backgroundColor: '#f9f9f9',
    },
    selectedValue: {
      flex: 1,
      fontSize: 16,
      color: '#aaa'
    },
    option: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      optionText: {
        fontSize: 16,
        color: '#aaa'
      },
      optionsContainer:{
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        marginTop: 5,
        maxHeight: 150, 
        overflow: 'scroll',
      },
      scrollView: {
        maxHeight: 150,
      },
  });