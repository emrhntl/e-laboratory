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
    paddingVertical: '3%',
    height: '96%',
    width: '95%',
    backgroundColor: '#5C98A4',
    borderRadius: 30,
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  searchContainer: {
    width: "100%",
    flexDirection:"row",
    justifyContent:"space-between",
    margin:"2%",
    paddingHorizontal: "6%", 
    alignItems:"center"
  },
  searchbarContainer:{
    width: "65%"
  },
  dropdown:{
    width: "33%",
  },
  userItem: {
    display:"flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignSelf:"center",
    backgroundColor: "#fff",
    alignItems:"center",
    padding: 15,
    borderRadius: 10,
    marginVertical: "2%",
    width: "90%"
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  name:{
    fontSize: 16,
    color: '#333',
  }

});
