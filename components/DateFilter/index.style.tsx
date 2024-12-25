import { StyleSheet } from "react-native";

export default StyleSheet.create({
    datePickerContainer: {
        width:"100%",
        height: "6%",
        flexDirection: "row",
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingHorizontal: "2%",
        borderRadius: 12,
        marginTop: "3%"
    },

    datePickerButton: {
        paddingVertical: 12, 
        paddingHorizontal: "2%", 
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: "35%", 
        marginHorizontal:"1%",
    },

    dateText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },

    filterButton: {
        paddingVertical:  12, 
        paddingHorizontal: "2%",
        backgroundColor: '#5C98A4',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: "20%", 
        marginLeft: 5, 
    },

    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});