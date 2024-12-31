import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: "2%",
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: "2%",
    },
    guideItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
        width: "95%",
        alignSelf: "center",
        padding: "5%",
        borderRadius: 10,
        marginVertical: "2%"
    },
    text:{
        fontWeight:"500",
        color: '#555'
    },
});