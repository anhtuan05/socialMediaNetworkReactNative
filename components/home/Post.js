import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, useWindowDimensions, Alert } from "react-native"
import { useEffect, useState } from 'react';
import HomeStyles from "./HomeStyles";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FSStyles from "../../styles/FSStyles";
import API, { authApi, endpoints } from "../../API";
import Comment from "./Comment";
import RenderHTML from "react-native-render-html";
import UserPage from "../user/UserPage";
import FSContext from "../../FSContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Post = ({ userIdPosts }) => {

    const [postData, setPostData] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showUserPage, setshowUserPage] = useState(false);
    const [postId, setPostId] = useState(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [createByUserId, setCreateByUserId] = useState(null);
    const [user, dispatch] = useContext(FSContext);
    const [isEditing, setIsEditing] = useState(false);
    const [idEditing, setIdEditing] = useState();
    const [contentUpdate, setContentUpdate] = useState();
    const [titleUpdate, setTitleUpdate] = useState();
    const { width } = useWindowDimensions();
    const [likeTypes, setLikeTypes] = useState({});
    const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        if (userIdPosts) {
            fetchUserPosts();
        }
        else {
            fetchPostData();
        }
    }, [userIdPosts]);

    useEffect(() => {
        if (postData) {
            postData.forEach(post => {
                fetchPostLikes(post.id);
            });
        }
    }, [postData]);

    const fetchPostData = async () => {
        try {
            let response = await API.get(endpoints['posts']);
            setPostData(response.data);
        } catch (error) {
            alert("Error fetching post data: " + error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            let res = await API.get(endpoints['userPosts'](userIdPosts));
            setPostData(res.data);
        } catch (error) {
            alert("Error fetching user posts data: " + error);
        }
    };

    const fetchPostLikes = async (postId) => {
        try {
            let res = await API.get(endpoints['listLike'](postId));
            const likes = res.data;

            const likeCounts = { like: 0, tym: 0, laugh: 0 };
            likes.forEach(like => {
                if (like.type_of_like.id === 1 && like.active === true) likeCounts.tym++;
                if (like.type_of_like.id === 2 && like.active === true) likeCounts.like++;
                if (like.type_of_like.id === 3 && like.active === true) likeCounts.laugh++;
            });

            setLikeCounts(prev => ({
                ...prev,
                [postId]: likeCounts
            }));

            const userLike = likes.find(like => like.user === user.id);
            if (userLike) {
                setLikeTypes(prev => ({
                    ...prev,
                    [postId]: {
                        type: userLike.type_of_like.id,
                        active: userLike.active
                    }
                }));
            } else {
                setLikeTypes(prev => ({
                    ...prev,
                    [postId]: {
                        type: null,
                        active: null
                    }
                }));
            }
        } catch (error) {
            alert("Error fetching post likes: " + error);
        }
    };

    const handleLike = async (postId, likeType) => {
        if (likeTypes[postId] && likeTypes[postId].type === null && likeTypes[postId].active === null) {
            try {
                const access_token = await AsyncStorage.getItem('token-access');
                await authApi(access_token).post(endpoints['createLike'](postId), {
                    'type_of_like': likeType
                });
                fetchPostLikes(postId);
            } catch (error) {
                alert("Error liking post: " + error);
            }
        } else {
            if (likeTypes[postId].type !== likeType && likeTypes[postId].active !== null) {
                try {
                    const access_token = await AsyncStorage.getItem('token-access');
                    await authApi(access_token).patch(endpoints['updateLike'](postId), {
                        'type_of_like': likeType
                    });
                    fetchPostLikes(postId);
                } catch (error) {
                    alert("Error liking post: " + error);
                }
            } else {
                if (likeTypes[postId].type === likeType && likeTypes[postId].active === true) {
                    try {
                        const access_token = await AsyncStorage.getItem('token-access');
                        await authApi(access_token).patch(endpoints['unLike'](postId));
                        fetchPostLikes(postId);
                    } catch (error) {
                        alert("Error liking post: " + error);
                    }
                } else {
                    if (likeTypes[postId].type === likeType && likeTypes[postId].active === false) {
                        try {
                            const access_token = await AsyncStorage.getItem('token-access');
                            await authApi(access_token).patch(endpoints['updateLike'](postId), {
                                'type_of_like': likeType
                            });
                            fetchPostLikes(postId);
                        } catch (error) {
                            alert("Error liking post: " + error);
                        }
                    }
                }
            }
        }

    };

    const updatePost = async (postId) => {
        try {
            const access_token = await AsyncStorage.getItem('token-access');
            await authApi(access_token).patch(endpoints['PATCHpost'](postId), {
                'title': titleUpdate,
                'content': contentUpdate
            });

            setTitleUpdate("");
            setContentUpdate("");
            setIsEditing(false);

            if (userIdPosts) {
                fetchUserPosts();
            }
            else {
                fetchPostData();
            }

            alert("Update Post Success");
        } catch (error) {
            Alert.alert("Error", "Error updating post: " + error);
        }
    };

    const deletePost = async (postId) => {
        const access_token = await AsyncStorage.getItem('token-access');
        await authApi(access_token).delete(endpoints['DELETEpost'](postId));

        if (userIdPosts) {
            fetchUserPosts();
        }
        else {
            fetchPostData();
        }

        alert("Delete Success");
    };

    const openEditting = (id, title, content) => {
        setIsEditing(!isEditing);
        setIdEditing(id)
        setTitleUpdate(title)
        setContentUpdate(content)
    }

    const handleCommentClick = (id, title, content) => {
        setPostId(id); // Set the post ID
        setPostTitle(title); //Set the post Title
        setPostContent(content)
        setShowComment(true); // Show the Comment component
    };

    const handleUserPageClick = (userId) => {
        setCreateByUserId(userId)
        setshowUserPage(true);
    };

    const handleGoBack = () => {
        setShowComment(false); // Hide the Comment and UserPage component
        setshowUserPage(false);
        fetchPostData();
    };

    return (
        <>
            {isEditing && (
                <View style={[HomeStyles.dialogContainer, { marginBottom: 20 }]}>
                    <TextInput
                        value={titleUpdate}
                        onChangeText={t => setTitleUpdate(t)}
                        placeholder="Edit comment.."
                        style={HomeStyles.inputDialog}
                    />
                    <TextInput
                        value={contentUpdate}
                        onChangeText={t => setContentUpdate(t)}
                        placeholder="Edit comment.."
                        style={HomeStyles.inputDialog}
                    />
                    <TouchableOpacity onPress={() => updatePost(idEditing)} style={[HomeStyles.buttonDialog, { marginTop: 20 }]}>
                        <Text style={HomeStyles.buttonTextDialog}>Update</Text>
                    </TouchableOpacity>
                </View>
            )}
            {!showUserPage && !showComment && postData && postData.map(post => (
                <>
                    <View style={HomeStyles.containerPost} key={post.id}>
                        <View style={HomeStyles.avatar}>
                            <TouchableOpacity onPress={() => handleUserPageClick(post.created_by.id)}>
                                <Image source={{
                                    uri: post.created_by.avatar_url
                                }}
                                    style={{ width: 40, height: 40, borderRadius: 50 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={HomeStyles.contentPost}>

                            <Text style={HomeStyles.flName}>
                                {post.created_by.first_name} {post.created_by.last_name}
                            </Text>

                            <Text style={HomeStyles.pContent}>
                                {post.title}
                            </Text>

                            <RenderHTML style={HomeStyles.pContent} contentWidth={width} source={{ html: post.content }} />

                            {user.id === post.created_by.id && (
                                <>
                                    {/* Nút xóa comment */}
                                    <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}>
                                        <TouchableOpacity onPress={() => deletePost(post.id)} style={{ marginRight: 10 }}>
                                            <MaterialCommunityIcons name="delete" size={20} color="#bc2905" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Nút cập nhật comment */}
                                    <View style={{ position: 'absolute', top: 0, right: 40, zIndex: 999 }}>
                                        <TouchableOpacity onPress={() => openEditting(post.id, post.title, post.content)}>
                                            <MaterialCommunityIcons name="pencil" size={20} color={FSStyles.primaryColor} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}

                            <View style={HomeStyles.likeContainer}>

                                <TouchableOpacity onPress={() => handleLike(post.id, 2)} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <AntDesign name={
                                        likeTypes[post.id]?.active && likeTypes[post.id]?.type === 2
                                            ? "like1"
                                            : "like2"
                                    } size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>{likeCounts[post.id]?.like || 0}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleLike(post.id, 1)} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <AntDesign name={
                                        likeTypes[post.id]?.active && likeTypes[post.id]?.type === 1
                                            ? "heart"
                                            : "hearto"
                                    } size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>{likeCounts[post.id]?.tym || 0}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleLike(post.id, 3)} style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <MaterialCommunityIcons name={
                                        likeTypes[post.id]?.active && likeTypes[post.id]?.type === 3
                                            ? "emoticon-lol"
                                            : "emoticon-lol-outline"
                                    } size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>{likeCounts[post.id]?.laugh || 0}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleCommentClick(post.id, post.title, post.content)} style={HomeStyles.likeContainer}>
                                    <AntDesign name="message1" size={18} color={FSStyles.secondaryColor} />
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </>
            ))}
            {/* Render Comment component if showComment state is true */}
            {showComment && <Comment postId={postId} postTitle={postTitle} postContent={postContent} goBack={handleGoBack} />}
            {/* Render UserPage component if showUserPage state is true */}
            {showUserPage && <UserPage userId={createByUserId} onGoBack={handleGoBack} />}

        </>
    )
}

export default Post