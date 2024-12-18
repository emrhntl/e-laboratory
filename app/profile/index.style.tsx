import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
    card: {
    flex: 2,
    borderRadius: 20,
    alignItems: "center",
    padding: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    color: '#444',
    fontWeight: "500",
    textAlign: "center",
  },
  role: {
    fontSize: 18,
    color: "#7f8c8d",
    textAlign: "center",
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 18,
    color: "#222",
    marginVertical: 10,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "400",
    color: '#444'
  },
  adminButton: {
    width: '80%',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#e74c3c",
    alignItems: "center",
  },
  adminButtonText: {
    color: "#fff",
    fontWeight: "bold",
    
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    width: '40%',
    backgroundColor: "#e74c3c",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign:"center"
  },
  saveButton: {
    width: '40%',
    padding: 10,
    backgroundColor: "#5C98A4",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    textAlign:"center"
  },
  closeIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    width: '10%',
    height: '8%',
    top: 10,
    right: 10,
  }
});