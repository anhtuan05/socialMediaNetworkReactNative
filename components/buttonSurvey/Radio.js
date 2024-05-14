import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Radio = ({options, checkedValue, onChange, style}) => {
    return (
        <View style={[styles.container, style]}>
            {options.map((option) => {
                let active = checkedValue == option.value;

                return (
                    <TouchableOpacity
                        style={active ? [styles.radio, styles.activeRadio] : styles.radio}
                        onPress={() => {
                            onChange(option.value);
                        }}
                        key={option.value}
                    >
                        <MaterialIcons
                            name={active ? "radio-button-checked" : "radio-button-unchecked"}
                            size={24}
                            color={active ? "#06b6b4" : "#64748b"}
                        />
                        <Text style={active ? [styles.text, styles.activeText] : styles.text}>{option.label}</Text>
                    </TouchableOpacity>)
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    radio: {
        height: 35,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10",
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 15,
        borderRadius: 15,
        margin: 5,
    },
    activeRadio: {
        backgroundColor: "#06b6b4" + "11",
    },
    text: {
        fontSize: 16,
        marginLeft: 15,
        color: "#6b7280",
    },
    activeText: {
        color: "#374151",
    },
})

export default Radio