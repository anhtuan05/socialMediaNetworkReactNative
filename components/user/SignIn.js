import React, { useContext } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, Image, ScrollView, ActivityIndicator } from "react-native"
import UserStyles from './UserStyles'
import FSStyles from "../../styles/FSStyles"
import SignUp from "./SignUp";
import FSContext from "../../FSContext";
import API, { authApi, endpoints } from "../../API";
import FormData from 'form-data';

const SignIn = ({ onLogin }) => {

    const [mssv, setMssv] = useState();
    const [password, setPassword] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState();
    const [user, dispatch] = useContext(FSContext);

    const login = async () => {
        setLoading(true);
        try {

            const formData = new FormData()
            formData.append('client_id', 'VPn47hJtuScfdJQeE7IUDeUYwGm7OXSSjSAscqEz');
            formData.append('client_secret', 'AWKjkCZA9FOZSMory3AwgC6VBjeeEWg59kswcGTbrr3ih6KCeoWAT96YH43p7mzMhlDEnpHqJyph5vnt1KrZ0r192Q6LCCIEVhIWikkPCkMJQ6Tx3XYuFNijn7Vh8Ldp');
            formData.append('username', mssv);
            formData.append('password', password);
            formData.append('grant_type', 'password');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            let res = await API.post(endpoints['login'], formData, config);

            await AsyncStorage.setItem('token-access', res.data.access_token)

            let user = await authApi(res.data.access_token).get(endpoints['current_user']);

            dispatch({
                'type': 'login',
                'payload': {
                    'first_name': user.data.first_name,
                    'last_name': user.data.last_name,
                    'avatar_url': user.data.avatar_url,
                    'cover_photo_url': user.data.cover_photo_url,
                    'date_of_birth': user.data.date_of_birth,
                    'number_phone': user.data.number_phone,
                    'email': user.data.email
                }
            })

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }
    const handleSignUpPress = () => {
        setIsSignUp(true);
    };

    const handleBackToSignIn = () => {
        setIsSignUp(false);
    };

    return <>
        {isSignUp ? (
            <SignUp onBackToSignIn={handleBackToSignIn} />
        ) :
            (<View style={UserStyles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../images/background_login.jpg')}
                        style={[UserStyles.backgroundImage]}>

                        <View style={UserStyles.containerLogo}>
                            <Image source={require('../images/logofs.png')} style={UserStyles.imageLogo}></Image>
                            <Text style={[UserStyles.styleTitle]}>FORMER STUDENT</Text>
                            <Text style={[UserStyles.stylesText, { fontSize: 18, fontStyle: "italic" }]}>Social Media</Text>
                        </View>

                        <View style={UserStyles.containerContent}>
                            <TextInput placeholder="MSSV..." placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}
                                value={mssv}
                                onChangeText={text => setMssv(text)}>
                            </TextInput>
                            <TextInput secureTextEntry={true} placeholder="Password..." placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}
                                value={password}
                                onChangeText={text => setPassword(text)}>
                            </TextInput>
                            {loading === true ? <ActivityIndicator /> : <>
                                <TouchableOpacity onPress={login} style={UserStyles.button}>
                                    <Text style={UserStyles.stylesText}>Sign In</Text>
                                </TouchableOpacity>
                            </>}
                        </View>

                        <View style={{ width: '80%' }}>
                            <TouchableOpacity onPress={handleSignUpPress}>
                                <Text style={{ color: FSStyles.colorWhite, marginTop: 40, textAlign: 'right', fontStyle: 'italic' }}>
                                    Don't have an account? Sign Up here
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </ScrollView>
            </View>)}
    </>
}

export default SignIn