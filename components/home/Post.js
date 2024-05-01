import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native"
import { useEffect, useState } from 'react';
import HomeStyles from "./HomeStyles";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FSStyles from "../../styles/FSStyles";

const Post = () => {
    const [selectedEmotion, setSelectedEmotion] = useState(null);

    const handleEmotionPress = (emotion) => {
        if (selectedEmotion === emotion) {
            setSelectedEmotion(null); // Nếu emotion đã được chọn trước đó DELETE
        } else {
            setSelectedEmotion(emotion); // Nếu emotion chưa được chọn POST or PUT
        }
    };

    return (
        <>
            <View style={HomeStyles.containerPost}>

                <View style={HomeStyles.avatar}>
                    <TouchableOpacity>
                        <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>

                <View style={HomeStyles.contentPost}>

                    <Text style={HomeStyles.flName}>Nam</Text>

                    <Text style={HomeStyles.pContent}>
                        Đây là một đoạn văn bản rất dài.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur in ipsum vitae nunc euismod rhoncus. Sed nec arcu nunc.
                        Donec eu justo vel lacus feugiat ultrices. Nam fringilla urna quis dapibus viverra.
                    </Text>

                    <View style={HomeStyles.likeContainer}>

                        <TouchableOpacity onPress={() => handleEmotionPress('like')} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                            <AntDesign name={selectedEmotion === 'like' ? 'like1' : 'like2'} size={18} color={FSStyles.secondaryColor} />
                            <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleEmotionPress('love')} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                            <AntDesign name={selectedEmotion === 'love' ? 'heart' : 'hearto'} size={18} color={FSStyles.secondaryColor} />
                            <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleEmotionPress('haha')} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                            <MaterialCommunityIcons name={selectedEmotion === 'haha' ? 'emoticon-lol' : 'emoticon-lol-outline'} size={18} color={FSStyles.secondaryColor} />
                            <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={HomeStyles.likeContainer}>
                            <AntDesign name="message1" size={18} color={FSStyles.secondaryColor} />
                            <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </>
    )
}

export default Post