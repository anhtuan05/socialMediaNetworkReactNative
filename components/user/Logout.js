import { useContext } from "react"
import { StyleSheet, View , TouchableOpacity, Text } from "react-native"
import FSContext from "../../FSContext";
import FSStyles from "../../styles/FSStyles";

export default Logout = () => {
    const [user, dispatch] = useContext(FSContext);

    const logout = () => {
        dispatch({
            'type': 'logout'
        })
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update Avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update Cover Photo</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        backgroundColor: FSStyles.colorWhite,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 30,
    },
    button: {
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        marginBottom: 5, 
        marginTop: 5,
        backgroundColor: FSStyles.secondaryColor, 
        borderRadius: 5, 
    },
    buttonText: {
        color: FSStyles.colorWhite, 
        textAlign: 'left', 
        fontSize: 16, 
    },
});