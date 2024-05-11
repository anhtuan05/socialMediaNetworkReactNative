import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import UserStyles from './UserStyles'
import FSStyles from "../../styles/FSStyles"

const SignUp = ({ onBackToSignIn }) => {

    const handleSignUpPress = () => {
        // Xử lý logic đăng ký ở đây
        console.info("Sign Up");
    };

    const handleBackToSignInPress = () => {
        // Xử lý khi người dùng nhấn nút trở lại đăng nhập
        onBackToSignIn();
    };

    return (<>
        <View style={UserStyles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ImageBackground source={require('../images/background_login.jpg')}
                    style={[UserStyles.backgroundImage]}>
                    <View style={{ position: 'absolute', top: 60, left: 20 }}>
                        <TouchableOpacity onPress={handleBackToSignInPress}>
                            <Ionicons name="arrow-back" size={24} color={FSStyles.colorWhite} />
                        </TouchableOpacity>
                    </View>

                    <View style={UserStyles.containerLogo}>
                        <Image source={require('../images/logofs.png')} style={UserStyles.imageLogo}></Image>
                        <Text style={[UserStyles.styleTitle]}>FORMER STUDENT</Text>
                        <Text style={[UserStyles.stylesText, { fontSize: 18, fontStyle: "italic" }]}>Social Media</Text>
                    </View>

                    <View style={UserStyles.containerContent}>
                        <TextInput placeholder="MSSV..." placeholderTextColor={FSStyles.colorWhite}
                            style={[UserStyles.input]}>
                        </TextInput>
                        <TextInput secureTextEntry={true} placeholder="Password..." placeholderTextColor={FSStyles.colorWhite}
                            style={[UserStyles.input]}>
                        </TextInput>
                        <TextInput secureTextEntry={true} placeholder="Password..." placeholderTextColor={FSStyles.colorWhite}
                            style={[UserStyles.input]}>
                        </TextInput>
                        <TextInput secureTextEntry={true} placeholder="Password..." placeholderTextColor={FSStyles.colorWhite}
                            style={[UserStyles.input]}>
                        </TextInput>
                        <TextInput secureTextEntry={true} placeholder="Password..." placeholderTextColor={FSStyles.colorWhite}
                            style={[UserStyles.input]}>
                        </TextInput>

                        <TouchableOpacity style={UserStyles.button} onPress={handleSignUpPress}>
                            <Text style={UserStyles.stylesText}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    </>
    );
};

export default SignUp;
