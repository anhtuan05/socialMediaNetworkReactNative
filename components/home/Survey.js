import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from "react-native"
import HomeStyles from "./HomeStyles";
import SurveyDetail from "./SurveyDetail";
import API, { endpoints } from "../../API";
import RenderHTML from "react-native-render-html";

const Survey = ({ }) => {
    const [showSurveyDetail, setShowSurveyDetail] = useState(false);
    const [selectedSurveyId, setSelectedSurveyId] = useState(null);
    const [surveys, setSurveys] = useState(null);
    const { width } = useWindowDimensions();

    const handleGoBack = () => {
        setShowSurveyDetail(false);
    }

    const handleSurveyDetail = (id) => {
        setSelectedSurveyId(id);
        setShowSurveyDetail(true);
    };

    useEffect(() => {
        const loadSurveys = async () => {
            try {
                const res = await API.get(endpoints['surveys']);
                setSurveys(res.data);
            } catch (ex) {
                console.error(ex)
            }
        };

        loadSurveys();
    }, []); // Empty dependency array to ensure useEffect only runs once

    // const toggleSurveyDetail = () => {
    //     setShowSurveyDetail(!showSurveyDetail); // Toggle the value of showSurveyDetail
    // };

    return (
        <>
            {!showSurveyDetail && surveys && surveys.map(survey => (
                <View key={survey.id} style={HomeStyles.containerPost}>
                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={{ uri: survey.created_by.avatar_url }}
                                style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>{survey.created_by.first_name} {survey.created_by.last_name}</Text>

                        <Text style={HomeStyles.postTitle}>
                            Khảo sát: {survey.title}
                        </Text>
                        <Text style={{ fontStyle: 'italic', fontSize: 15, marginTop: 5 }}>
                            Mô tả:
                        </Text>
                        <RenderHTML style={HomeStyles.surveyDescribe}
                            contentWidth={width}
                            source={{ html: survey.description }} />

                        <TouchableOpacity onPress={() => handleSurveyDetail(survey.id)} style={styles.containerButton}>
                            <Text style={styles.textButton}>Tham gia khảo sát</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            {showSurveyDetail && <SurveyDetail surveyId={selectedSurveyId} goBack={handleGoBack} />}
        </>
    )
}

const styles = StyleSheet.create({
    textButton: {
        fontSize: 17,
        color: "#f9fafb",
        fontWeight: "bold",
    },
    containerButton: {
        height: 50,
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: "#06b6d4" + "cc",
        padding: 10,
        marginBottom: 15,
        marginTop: 15,
    },
})

export default Survey;