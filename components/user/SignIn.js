import React from "react"
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, Image, ScrollView } from "react-native"
import UserStyles from './UserStyles'
import FSStyles from "../../styles/FSStyles"
import SignUp from "./SignUp";

const SignIn = ({ onLogin }) => {

    const [mssv, setMssv] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignInPress = () => {
        onLogin(mssv, password);
    };

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

                            <TouchableOpacity onPress={handleSignInPress} style={UserStyles.button}>
                                <Text style={UserStyles.stylesText}>Sign In</Text>
                            </TouchableOpacity>
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