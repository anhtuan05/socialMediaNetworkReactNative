import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"
import HomeStyles from "./HomeStyles";
import SurveyDetail from "./SurveyDetail";
import { Button } from "../buttonSurvey";

const Survey = () => {
    const [showSurveyDetail, setShowSurveyDetail] = useState(false);

    const toggleSurveyDetail = () => {
        setShowSurveyDetail(!showSurveyDetail); // Chuyển đổi giá trị của showSurveyDetail
    };

    return (
        <>
            {!showSurveyDetail && (
                <View style={HomeStyles.containerPost}>
                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')}
                                style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.contentPost}>
                            Tỉ lệ có việc làm sau khi ra trường
                        </Text>

                        <Button onPress={toggleSurveyDetail}>
                            Tham gia khảo sát
                        </Button>
                    </View>
                </View>
            )}
            {showSurveyDetail && <SurveyDetail />}
        </>
    )
}

export default Survey;
