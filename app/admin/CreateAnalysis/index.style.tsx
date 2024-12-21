import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 3.25,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  content: {
    paddingVertical:'3%',
    height:'96%',
    width:'95%',
    backgroundColor:'#5C98A4',
    borderRadius:30,
    alignItems:'center'
  },
  buttonContainer:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    paddingRight: '3%',
  },
  adminButton: {
    width: '35%',
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  adminButtonText: {
    color: "#888",
    fontWeight: "bold",
  },
  title:{
    fontSize: 20,
    color: "#fff",
  
  },
  formContainer: {
    width: '100%',
    display: "flex",
    alignItems:"center",
    backgroundColor: 'red'
  },
  loadingContainer: {
    flex: 1
  },

});
