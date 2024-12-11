import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get("window").height/12.5,
        backgroundColor: '#5C98A4',
        flexDirection: "row",
        justifyContent: 'space-between', 
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        marginBottom: 10,
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        color: '#fff',
        fontWeight: '500',
    },
    headerLogo: {
        width: 55,
        height: 55,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    }
});

