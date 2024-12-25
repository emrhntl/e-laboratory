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
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: '3%',
  },
  adminButton: {
    width: '35%',
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  adminButtonText: {
    color: "#888",
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    bottom: 5
  },
  formContainer: {
    width: '100%',
    display: "flex",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  auditContainer: {
    width: '90%',
    display: "flex",
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    margin: 5
  },
  inputContainer: {
    width: '79%',
    marginTop: '0.5%',
  },
  selectedAuditText: {
    fontSize: 16, marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    padding: '6%',
    borderRadius: 15,
    marginBottom: '3%',
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc'
  },
  dropdown: {
    marginBottom: '1.5%'
  },
  buttonAddAudit: {
    borderRadius: 15,
    backgroundColor: '#5C98A4',
    padding: '5%',
    marginHorizontal: '10%',
    borderWidth: 1,
    borderColor: '#bbb'
  },
  analysisItem: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor: '#f5f5f5',
    margin: '1%',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius:15,    
  },
  analysisText: {
    textAlign:"center",
    fontSize: 16,
    color:"#666"
  },
  scrollContainer:{
    display:"flex",
    alignContent:"center",
    width:"80%",
    height: '20%',
  },
  deleteButton:{

  },
  datePickerContainer: {
    width: "80%",
    marginVertical: "1%",
  },
  dateButton: {
    backgroundColor: '#f5f5f5',
    padding: '5%',
    borderRadius: 15,
  },
  dateButtonText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});
