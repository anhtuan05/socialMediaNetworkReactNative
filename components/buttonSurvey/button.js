import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons";

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.text}>{props.children}</Text>
            {/* <MaterialIcons name="check-circle" size={15} color="#f9fafb"/> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: "#06b6d4" + "cc",
        margin: 10
    },
    text: {
        fontSize: 17,
        color: "#f9fafb",
        fontWeight: "bold"
    },
});



export default Button;