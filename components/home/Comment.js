import React, { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, useWindowDimensions } from "react-native"
import HomeStyles from "./HomeStyles";
import FSStyles from "../../styles/FSStyles";
import RenderHTML from "react-native-render-html";
import API, { endpoints } from "../../API";


const Comment = ({ postId, goBack, postTitle, postContent }) => {

    //fetch data from postId
    const [postCommentsData, setPostCommentsData] = useState(null);
    const { width } = useWindowDimensions();

    useEffect(() => {
        fetchPostComments();
    }, []);

    const fetchPostComments = async () => {
        try {
            let res = await API.get(endpoints['postComments'](postId));
            setPostCommentsData(res.data);
        } catch (error) {
            alert("Error fetching posts cmts data: " + error);
        }
    };

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

                    <RenderHTML style={HomeStyles.pContent} contentWidth={width} source={{ html: postContent }} />

                </View>
            </View>

            {/* post comment */}
            <View>
                <TextInput placeholder="Comment.." style={HomeStyles.inputCmt}></TextInput>
                <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="send-circle" size={40} color={FSStyles.primaryColor} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* list comment */}
            <View style={HomeStyles.scrollView}>
                {postCommentsData && postCommentsData.map(comment => (
                    <View style={HomeStyles.containerPost} key={comment.id}>

                        <View style={HomeStyles.avatar}>
                            <TouchableOpacity>
                                <Image source={{ uri: comment.user.avatar_url }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={HomeStyles.contentPost}>

                            <Text style={HomeStyles.flName}>{comment.user.first_name} {comment.user.last_name}</Text>

                            <Text style={HomeStyles.pContent}>
                                {comment.comment}
                            </Text>
                        </View>

                    </View>
                ))}
            </View>
        </>
    )
}

export default Comment