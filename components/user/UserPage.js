import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import HomeStyles from "../home/HomeStyles"
import UserStyles from "./UserStyles";
import API, { endpoints } from "../../API";
import FSStyles from "../../styles/FSStyles";
import Post from "../home/Post";


const UserPage = ({ userId, onGoBack }) => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            let res = await API.get(endpoints['profile'](userId));
            setProfile(res.data);
        } catch (error) {
            alert("Error fetching profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading && profile!==null  ? (
                <>
                    <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}>
                        <TouchableOpacity onPress={onGoBack}>
                            <Ionicons name="arrow-back" size={24} color={FSStyles.colorBlack} style={HomeStyles.backText} />
                        </TouchableOpacity>
                    </View>
                    <Image source={{ uri: profile.cover_photo_url }} style={[UserStyles.coverPhoto, {marginTop: 40}]} />
                    <View style={UserStyles.userInfoContainer}>
                        <Image source={{ uri: profile.avatar_url }} style={UserStyles.avatar} />
                        <Text style={UserStyles.username}> {profile.first_name} {profile.last_name}</Text>
                    </View>
                    <Post userIdPosts={profile.id}/>
                </>) : (
                <ActivityIndicator />
            )}
        </>
    );
}

export default UserPage