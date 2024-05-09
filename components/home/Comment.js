import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import HomeStyles from "./HomeStyles";
import FSStyles from "../../styles/FSStyles";


const Comment = ({ postId, goBack, postTitle }) => {

    //fetch data from postId

    return (
        <>
            <View>
                <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}>
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons name="arrow-back" size={24} color={FSStyles.colorBlack} style={HomeStyles.backText} />
                    </TouchableOpacity>
                </View>
                <View style={[HomeStyles.containerPost, HomeStyles.containerTitle]}>
                    <Text style={HomeStyles.postTitle}>
                        {postTitle}
                    </Text>
                </View>
            </View>
            <View style={HomeStyles.scrollView}>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
                <View style={HomeStyles.containerPost}>

                    <View style={HomeStyles.avatar}>
                        <TouchableOpacity>
                            <Image source={require('../images/avatar_default.png')} style={{ width: 40, height: 40, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={HomeStyles.contentPost}>

                        <Text style={HomeStyles.flName}>Nam</Text>

                        <Text style={HomeStyles.pContent}>
                            Bài viết {postId} thật hay
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                <TextInput placeholder="Comment.." style={HomeStyles.inputCmt}></TextInput>
                <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}>
                    <TouchableOpacity>
                    <MaterialCommunityIcons name="send-circle" size={40} color={FSStyles.primaryColor} />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Comment