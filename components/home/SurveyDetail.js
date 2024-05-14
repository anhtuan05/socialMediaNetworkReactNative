import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import API, { endpoints } from "../../API";
import FSStyles from "../../styles/FSStyles";
import HomeStyles from "./HomeStyles";

const SurveyDetail = ({ surveyId, goBack }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Lưu trữ trạng thái của câu trả lời cho mỗi câu hỏi
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, [surveyId]);

    const loadQuestions = async () => {
        try {
            const res = await API.get(endpoints.surveyQuestions(surveyId));
            const questions = res.data;
            // Đảm bảo mỗi câu hỏi có một mảng câu trả lời
            const questionsWithAnswers = await Promise.all(
                questions.map(async question => {
                    const answerRes = await API.get(endpoints.questionAnswers(question.id));
                    return {
                        ...question,
                        answers: answerRes.data
                    };
                })
            );
            setQuestions(questionsWithAnswers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswerClick = (questionId, answerContent) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: answerContent // Cập nhật trạng thái của câu trả lời cho câu hỏi có questionId tương ứng
        }));
    };

    const handleSubmitSurvey = async () => {
        try {
            // duyệt các answers được chọn và gửi yêu cầu tăng quantity
            for (const [questionId, answerContent] of Object.entries(selectedAnswers)) {
                const question = questions.find(q => q.id === parseInt(questionId));
                const answer = question.answers.find(a => a.content === answerContent);
                if (answer) {
                    await API.patch(endpoints.answersQuantity(answer.id));
                }
            }
            alert('Khảo sát đã được nộp!');
        } catch (error) {
            console.error('Error submitting survey:', error);
        }
    };

    return (
        <View>
            <View style={{ top: 0, left: 0, zIndex: 999, marginBottom: 10 }}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="arrow-back" size={24} color={FSStyles.colorBlack} style={[HomeStyles.backText]} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{
                    fontSize: 25,
                    color: "#06b6d4" + "cc",
                    fontWeight: "bold",
                    alignItems: "center",
                    marginBottom: 10,
                    marginTop: 10,
                }}>Câu hỏi khảo sát</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={FSStyles.primaryColor} />
                ) : (
                    questions.map(question => (
                        <View key={question.id} style={[styles.containerQuestion, { marginBottom: 20, marginTop: 10 }]}>
                            <Text style={styles.header}>{question.content}</Text>

                            <View style={styles.wrapper}>
                                {question.answers.map(answer => { // Sử dụng dữ liệu từ API
                                    const isActive = selectedAnswers[question.id] === answer.content;
                                    return (
                                        <TouchableOpacity
                                            key={answer.id}
                                            style={[styles.answer, isActive && styles.activeAnswer]}
                                            onPress={() => handleAnswerClick(question.id, answer.content)}
                                        >
                                            <MaterialIcons
                                                name={isActive ? "radio-button-checked" : "radio-button-unchecked"}
                                                size={24}
                                                color={isActive ? "#06b6b4" : "#64748b"}
                                            />
                                            <Text style={[styles.answerItem, isActive && styles.activeAnswerItem]}>
                                                {answer.content}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))
                )}
            </View>

            <View>
                <TouchableOpacity style={styles.containerButton} onPress={handleSubmitSurvey}>
                    <Text style={styles.textButton}>Nộp khảo sát</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    answerItem: {
        fontSize: 16,
        textTransform: 'capitalize',
        color: '#6b7280',
        marginLeft: 10,
    },
    activeAnswerItem: {
        color: '#374151',
    },
    answer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#f3f4f6',
        marginBottom: 10,
    },
    activeAnswer: {
        backgroundColor: '#06b6b4' + '11',
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: '100%',
    },

    inner: {
        width: 13,
        height: 13,
        backgroundColor: "grey",
        borderRadius: 20,
    },
    outter: {
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
    text: {
        fontSize: 20,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: 5,
    },
    containerQuestion: {
        flex: 1,
        padding: 20,
        marginBottom: 5,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    textButton: {
        fontSize: 17,
        color: "#f9fafb",
        fontWeight: "bold"
    },
    containerButton: {
        height: 40,
        width: "70%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: "#06b6d4" + "cc",
        padding: 10,
        marginBottom: 15,
        marginTop: 30,
        borderRadius: 30,
        width: "100%",
        height: 'auto',
    },
    mainHeader: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#06b6d4',
        textTransform: 'uppercase',
    },
    header: {
        marginBottom: 10,
        fontSize: 18,
        color: '#374151',
    },
});

export default SurveyDetail;
