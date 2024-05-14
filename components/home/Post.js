import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image, useWindowDimensions } from "react-native"
import { useEffect, useState } from 'react';
import HomeStyles from "./HomeStyles";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FSStyles from "../../styles/FSStyles";
import API, { endpoints } from "../../API";
import Comment from "./Comment";
import RenderHTML from "react-native-render-html";
import UserPage from "../user/UserPage";


const Post = ({ userIdPosts }) => {

    const [postData, setPostData] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [showUserPage, setshowUserPage] = useState(false);
    const [postId, setPostId] = useState(null);
    const [postTitle, setPostTitle] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const [createByUserId, setCreateByUserId] = useState(null);
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (userIdPosts) {
            fetchUserPosts();
        }
        else {
            fetchPostData();
        }
    }, [userIdPosts]);

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
            alert("Error fetching user posts data: " +  error);
        }
    };

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
        setshowUserPage(false)
    };

    return (
        <>
            {!showUserPage && !showComment && postData && postData.map(post => (
                <>
                    <View style={HomeStyles.containerPost} key={post.id}>
                        <View style={HomeStyles.avatar}>
                            <TouchableOpacity onPress={() => handleUserPageClick(post.created_by.id)}>
                                <Image source={{ 
                                    uri: post.created_by.avatar_url }} 
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

                            <View style={HomeStyles.likeContainer}>

                                <TouchableOpacity style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <AntDesign name="like2" size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <AntDesign name="hearto" size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[HomeStyles.likeContainer, { marginRight: 20 }]}>
                                    <MaterialCommunityIcons name='emoticon-lol-outline' size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
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