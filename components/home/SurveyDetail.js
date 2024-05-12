import { StyleSheet, Text, View } from "react-native"
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Radio } from "../buttonSurvey";

const SurveyDetail = () => {
    const [answer, setAnswer] = useState("")
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.mainHeader}>Có việc làm chưa?</Text>

                <Text style={styles.header}>Chọn: </Text>

                <Radio options={[
                    { label: "Có", value: "Yes" },
                    { label: "Chưa", value: "No" },
                ]}
                    checkedValue={answer}
                    onChange={setAnswer}
                    style={{ marginBottom: 15 }}
                />


                <Text></Text>
                <StatusBar style="auto" />
            </View>

            <View>
                <Button onPress={() => {
                    alert('Cảm ơn bạn vì đã tham gia khảo sát!');
                }

                }>Nộp khảo sát </Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 25
    },
    mainHeader: {
        marginBottom: 15,
        marginTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#06b6d4" + "ee",
        textTransform: "uppercase"
    },
    header: {
        marginBottom: 15,
        fontSize: 16,
        color: "#374151"
    }
});

export default SurveyDetail;