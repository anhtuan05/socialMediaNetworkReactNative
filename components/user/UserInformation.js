import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native"
import { StyleSheet } from "react-native";
import HomeStyles from "../home/HomeStyles"
import UserStyles from "./UserStyles";
import FSContext from "../../FSContext";
import Logout from "./Logout";


const UserInformation = () => {
    const [user, dispatch] = useContext(FSContext);
    return (
        <>
            <Image source={{ uri: user.cover_photo_url }} style={styles.coverPhoto} />
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
                <Text style={styles.username}>{user.first_name} {user.last_name}</Text>
            </View>
            <View>
                <Logout/>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    coverPhoto: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    userInfoContainer: {
        display: "flex",
        flexDirection: "column",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
        position: "relative",
        left: 30,
        top: -70,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        position: "relative",
        left: 30,
        top: -50,
    },
});
export default UserInformation