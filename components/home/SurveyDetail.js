import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Radio } from "../buttonSurvey";
import { Ionicons } from "@expo/vector-icons";
import API, { endpoints } from "../../API";
import FSStyles from "../../styles/FSStyles";
import HomeStyles from "./HomeStyles";

const SurveyDetail = ({ surveyId, goBack }) => {
    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);

    useEffect(() => {
        loadQuestions();
    }, [surveyId]);

    const loadQuestions = async () => {
        try {
            const res = await API.get(endpoints.surveyQuestions(surveyId));

            setQuestions(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    return (
        <View>
            <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 999}}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="arrow-back" size={24} color={FSStyles.colorBlack} style={[HomeStyles.backText]} />
                </TouchableOpacity>
            </View>
            <View style={[styles.container, { marginBottom: 20 }, { marginTop: 40 }]}>
                <Text style={styles.mainHeader}>Câu hỏi khảo sát</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={FSStyles.primaryColor} />
                ) : (
                    questions.map(question => (
                        <View key={question.id}>
                            <Text style={styles.header}>{question.content}</Text>
                        </View>
                    ))
                )
                }
                <View>
                    <TouchableOpacity>
                        
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Button onPress={() => {
                    alert('Cảm ơn bạn vì đã tham gia khảo sát!');
                }}>Nộp khảo sát</Button>
            </View>
        </View>
    );
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
