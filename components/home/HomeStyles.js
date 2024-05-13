import { StyleSheet } from "react-native";
import FSStyles from '../../styles/FSStyles';


const HomeStyles = StyleSheet.create({
    avatar: {
        marginRight: 15
    },
    containerPost: {
        flex: 1,
        flexDirection: "row",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        width: "100%",
        height: 'auto',
        maxWidth: "100%",
        backgroundColor: FSStyles.colorWhite,
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    contentPost: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        height: 'auto',
    },
    flName: {
        marginBottom: 5,
        fontWeight: "bold"
    },
    pContent: {
        flex: 1,
        marginBottom: 5,
        width: "100%",
        height: "auto",
        overflow: "scroll"
    },
    likeContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5
    },
    containerTitle: {
        backgroundColor: FSStyles.colorWhite,
        padding: 20,
        borderRadius: 10,
        elevation: 50,
        marginTop: 35,
        flexDirection: "column",
    },
    postTitle: {
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    backText: {
        marginBottom: 10
    },
    scrollView: {
        paddingTop: 10,
        borderRadius: 10
    },
    inputCmt: {
        borderWidth: 1,
        borderColor: FSStyles.primaryColor,
        backgroundColor: FSStyles.colorWhite,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 60,
        width: '100%',
        marginBottom: 25,
        borderRadius: 4,
        color: FSStyles.colorBlack,
    },
    dialogContainer: {
        backgroundColor: FSStyles.colorWhite,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 50,
    },
    inputDialog: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 10,
        fontSize: 16,
    },
    buttonDialog: {
        backgroundColor: FSStyles.primaryColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTextDialog: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default HomeStyles;