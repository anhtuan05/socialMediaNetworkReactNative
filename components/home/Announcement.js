import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native"
import HomeStyles from "./HomeStyles";


const Announcement = () => {
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
                        Đã like bài viết số một của bạn 2024-05-02
                    </Text>

                </View>

            </View>
        </>
    )
}

export default Announcement