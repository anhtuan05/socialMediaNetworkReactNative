import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"
import HomeStyles from "./HomeStyles";


const Survey = () => {
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
                        Survey
                    </Text>

                </View>

            </View>
        </>
    )
}

export default Survey