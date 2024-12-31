import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeIconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        top: "5%"
    },
    mainDescription: {
        fontSize: 16,
        textAlign: "center",
        margin:"2%"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
    headerText: {
        flex: 1,
        fontWeight: "500",
        textAlign: "center",
        fontSize: 14,
        color: "#444"
    },
    auditHeader: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 5,
        marginVertical: 5,
    },
    auditHeaderText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        fontSize: 13,
        fontWeight: "500"
    },
});
