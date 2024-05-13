import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, useWindowDimensions } from "react-native"
import HomeStyles from "./HomeStyles";
import FSStyles from "../../styles/FSStyles";
import RenderHTML from "react-native-render-html";
import API, { authApi, endpoints } from "../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FSContext from "../../FSContext";
import UserStyles from "../user/UserStyles";


const Comment = ({ postId, goBack, postTitle, postContent }) => {

    //fetch data from postId
    const [postCommentsData, setPostCommentsData] = useState(null);
    const [content, setContent] = useState();
    const [contentUpdate, setContentUpdate] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [idEditing, setIdEditing] = useState();
    const [user, dispatch] = useContext(FSContext)
    const { width } = useWindowDimensions();


    useEffect(() => {
        fetchPostComments();
    }, []);

    const fetchPostComments = async () => {
        try {
            let res = await API.get(endpoints['postComments'](postId));
            const sortedComments = res.data.sort((a, b) => b.id - a.id);
            setPostCommentsData(sortedComments);
        } catch (error) {
            alert("Error fetching posts cmts data: " + error);
        }
    };

    const comment = async () => {
        const access_token = await AsyncStorage.getItem('token-access');
        const res = await authApi(access_token).post(endpoints['POSTCmt'](postId), {
            'comment': content
        })
        setContent("");
        setPostCommentsData(current => [res.data, ...current]);
    }

    const deleteComment = async (commentId) => {
        const access_token = await AsyncStorage.getItem('token-access');
        await authApi(access_token).delete(endpoints['DELETECmt'](commentId));
        fetchPostComments();
        alert("Delete Success");
    };

    const updateComment = async (commentId) => {
        const access_token = await AsyncStorage.getItem('token-access');
        const res = await authApi(access_token).patch(endpoints['PATCHCmt'](commentId), {
            'comment': contentUpdate
        })
        fetchPostComments();
        setContentUpdate("");
        setIsEditing(false);
    };

    const openEditting = (id, cmt) => {
        setIsEditing(!isEditing);
        setIdEditing(id)
        setContentUpdate(cmt)
    }

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
                <TextInput value={content} onChangeText={t => setContent(t)} placeholder="Comment.." style={HomeStyles.inputCmt}></TextInput>
                <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}>
                    <TouchableOpacity onPress={comment}>
                        <MaterialCommunityIcons name="send-circle" size={40} color={FSStyles.primaryColor} />
                    </TouchableOpacity>
                </View>
            </View>

            {isEditing && (
                <View style={HomeStyles.dialogContainer}>
                    <TextInput
                        value={contentUpdate}
                        onChangeText={t => setContentUpdate(t)}
                        placeholder="Edit comment.."
                        style={HomeStyles.inputDialog}
                    />
                    <TouchableOpacity onPress={() => updateComment(idEditing)} style={HomeStyles.buttonDialog}>
                        <Text style={HomeStyles.buttonTextDialog}>Update</Text>
                    </TouchableOpacity>
                </View>
            )}

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

                            <Text style={[HomeStyles.pContent, { color: "#c2d2ef", fontSize: 12 }]}>
                                {moment(comment.updated_date).fromNow()}
                            </Text>
                            {user.id === comment.user.id && (
                                <>
                                    {/* Nút xóa comment */}
                                    <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}>
                                        <TouchableOpacity onPress={() => deleteComment(comment.id)} style={{ marginRight: 10 }}>
                                            <MaterialCommunityIcons name="delete" size={20} color="#bc2905" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Nút cập nhật comment */}
                                    <View style={{ position: 'absolute', top: 0, right: 40, zIndex: 999 }}>
                                        <TouchableOpacity onPress={() => openEditting(comment.id, comment.comment)}>
                                            <MaterialCommunityIcons name="pencil" size={20} color={FSStyles.primaryColor} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>

                    </View>
                ))}
            </View>
        </>
    )
}

export default Comment