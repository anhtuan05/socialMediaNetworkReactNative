import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeStyles from "../home/HomeStyles"
import UserStyles from "./UserStyles";
import FSContext from "../../FSContext";
import Logout from "./Logout";
import FSStyles from "../../styles/FSStyles";
import Post from "../home/Post";


const UserInformation = () => {
    const [user, dispatch] = useContext(FSContext);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <>
            <Image source={{ uri: user.cover_photo_url }} style={UserStyles.coverPhoto} />
            <View style={UserStyles.userInfoContainer}>
                <Image source={{ uri: user.avatar_url }} style={UserStyles.avatar} />
                <Text style={UserStyles.username}>{user.first_name} {user.last_name}</Text>
            </View>
            <View style={{ padding: 10 }}>
                {/* Update User */}
            </View>
            <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                <MaterialCommunityIcons name="account-details" size={30} color={FSStyles.primaryColor} />
            </TouchableOpacity>
            {menuVisible && (
                <View style={[UserStyles.toggleMenuContainer, { position: 'absolute', top: 65, right: 10, zIndex: 999 }]}>
                    <TouchableOpacity>
                        {/* update_photo and logout in <Logout/>*/}
                        <Logout />
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
}

export default UserInformation