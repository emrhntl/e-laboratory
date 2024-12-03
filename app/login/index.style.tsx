import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5c98a4',
    },
    innerContainer: {
        flex: 2,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: 'center',
        borderTopLeftRadius: 100,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#5c98a4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width :180,
        height: 180,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 24,
        fontWeight: 'medium',
        color: '#000',
        marginBottom: 24,
    },
    // adminButton: {
    //     backgroundColor: '#f6f6f6',
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     marginTop: 30
    // },
    // adminButtonText: {
    //     color: '#000',
    // },
    linkText: {
        color: '#5c98a4',
        fontWeight: '500',
        marginTop: 12,
    },
    loginButton: {
        backgroundColor: '#5c98a4',
      },
    loginButtonText: {
        color: '#fff',
      }
});
