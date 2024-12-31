import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  formContainer: {
    flex: 2.75,
    marginHorizontal: 20,
    backgroundColor: '#5C98A4',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    width: '95%'
  },
  input: {
    width: '85%',
    height: '10%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginVertical: '4%'
  },
  bottomContainer: {
    flex: 0.5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  auditContainer: {
    width: '80%',
    flex: 1,
    marginVertical: '5%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentContainer: {
    width: "95%",
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  closeContainer: {
    width:'100%',
    display:'flex',
    alignItems:'flex-end',
    justifyContent:'center',
    marginTop:'3%',
    left:'3%'
  },
  guideListContainer: {
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  guideItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
