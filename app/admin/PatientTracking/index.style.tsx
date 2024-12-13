import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  baseButton: {
    flex: 1,
    margin: 3,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    opacity: 0.5,
    borderWidth: 0.2,
  },
  baseButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn1: {
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  btn2: {
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  btn3: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25
  },
  btn4: {
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  selectText: {
    color: '#fff'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  selectedButton: {
    backgroundColor: '#5C98A4',
    opacity: 1,
  },
  formContainer: {
    flex: 3,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 25,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  unitText: {
    color: '#444', 
    fontSize: 16
  },
  separator: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#fff',
    padding:10,
    width: '60%',
    borderRadius: 25,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  testItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  testText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addContainer: {
    backgroundColor: '#5C98A4',
    width: '100%',
    height: Dimensions.get('window').height/4,
    padding: 10,
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  listContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: Dimensions.get('window').height/4,
    padding: 10,
    marginTop: 10,
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }
  



});
