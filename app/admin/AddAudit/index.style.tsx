import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex:3.25,
    display:'flex',
    alignItems:'center',
    width:'100%',
    justifyContent:'center'
  },
  content: {
    paddingVertical:'5%',
    height:'96%',
    width:'95%',
    backgroundColor:'#5C98A4',
    borderRadius:30,
    alignItems:'center'
  },
  title: {
    fontSize:20,
    textAlign:'center'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 8,
  },
  auditItem: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  currentListContainer: {
    flex:1,
    display:'flex',
    alignItems:'center'
  },
  text: {
    color:'#fff',
    fontSize:16,
    textAlign:'center',
    zIndex:0
  }
});
