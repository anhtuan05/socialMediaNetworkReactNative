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
        marginBottom: 10,
        width: "100%",
        height: "auto",
        overflow: "scroll"
    },
    likeContainer: {
        display: "flex",
        flexDirection: "row",
    }
})

export default HomeStyles;