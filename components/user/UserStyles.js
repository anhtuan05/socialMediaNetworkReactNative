import { StyleSheet } from "react-native";
import FSStyles from '../../styles/FSStyles';

const UserStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: FSStyles.colorWhite,
        backgroundColor: FSStyles.colorOpacity,
        padding: 10,
        paddingLeft: 20,
        width: '100%',
        marginBottom: 25,
        borderRadius: 10,
        color: FSStyles.colorWhite,
    },
    button: {
        backgroundColor: FSStyles.primaryColor,
        padding: 15,
        width: '100%',
        borderRadius: 50,
        marginTop: 15
    },
    stylesText: {
        color: FSStyles.colorWhite,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    styleTitle: {
        color: FSStyles.colorWhite,
        fontSize: 24,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    containerContent: {
        width: '85%',
    },
    containerLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    containerLogo2: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 40
    },
    imageLogo: {
        width: 90,
        height: 113,
    },
    coverPhoto: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    userInfoContainer: {
        display: "flex",
        flexDirection: "column",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: "relative",
        left: 30,
        top: -70,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        position: "relative",
        left: 30,
        top: -50,
    },
    toggleMenuContainer:{
        backgroundColor: FSStyles.colorWhite,
        marginTop: -20
    }
});

export default UserStyles;
