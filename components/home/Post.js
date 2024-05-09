import React from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native"
import { useEffect, useState } from 'react';
import HomeStyles from "./HomeStyles";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FSStyles from "../../styles/FSStyles";
import API, { endpoints } from "../../API";
import Comment from "./Comment";


const Post = () => {

    const [postData, setPostData] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [postId, setPostId] = useState(null);
    const [postTitle, setpostTitle] = useState(null);

    useEffect(() => {
        fetchPostData();
    }, []);

    const fetchPostData = async () => {
        try {
            let response = await API.get(endpoints['posts']);
            setPostData(response.data);
        } catch (error) {
            console.error("Error fetching post data: ", error);
        }
    };

    const handleCommentClick = (id, title) => {
        setPostId(id); // Set the post ID
        setpostTitle(title); //Set the post Title
        setShowComment(true); // Show the Comment component
    };

    const handleGoBack = () => {
        setShowComment(false); // Hide the Comment component
    };

    return (
        <>
            {!showComment && postData && postData.map(post => (
                <>
                    <View style={HomeStyles.containerPost} key={post.id}>
                        <View style={HomeStyles.avatar}>
                            <TouchableOpacity>
                                <Image source={{ uri: post.created_by.avatar_url }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={HomeStyles.contentPost}>

                            <Text style={HomeStyles.flName}>{post.created_by.last_name}</Text>

                            <Text style={HomeStyles.pContent}>
                                {post.content}
                            </Text>

                            <Text style={HomeStyles.pContent}>
                                
                            </Text>

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

                                <TouchableOpacity onPress={() => handleCommentClick(post.id, post.name)} style={HomeStyles.likeContainer}>
                                    <AntDesign name="message1" size={18} color={FSStyles.secondaryColor} />
                                    <Text style={{ color: FSStyles.secondaryColor, marginLeft: 5 }}>1</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </>
            ))}
            {/* Render Comment component if showComment state is true */}
            {showComment && <Comment postId={postId} postTitle={postTitle} goBack={handleGoBack} />}
        </>
    )
}

export default Post