import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image, Alert, Platform, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserStyles from './UserStyles'
import FSStyles from "../../styles/FSStyles"
import API, { endpoints } from '../../API';
import FormData from 'form-data';
import mime from 'mime'


const SignUp = ({ onBackToSignIn }) => {
    const [user, setUser] = useState({
        'first_name': "",
        'last_name': "",
        'username': "",
        'password': "",
        'email': "",
        'date_of_birth': "",
        'number_phone': "",
        'avatar': "",
        'cover_photo': ""
    });

    const [loading, setLoading] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState();//xác nhận password
    const [showDatePicker, setShowDatePicker] = useState(false);//show pop up chọn day of birth

    const handleSignUpPress = async () => {
        if (user.password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        let form = new FormData();
        for (let key in user) {
            if (user[key] && (key === 'avatar' || key === 'cover_photo')) {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].uri.split('/').pop(),
                    type: user[key].type
                });
            } else {
                form.append(key, user[key]);
            }
        }

        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            Alert.alert('Success', 'User registered successfully');
        } catch (error) {
            Alert.alert('Error', `Failed to register user: ${error.message}`);
        } finally {
            setLoading(false);
            onBackToSignIn();
        }
    };

    //vào thư viện của thiết bị chọn ảnh
    const pickImage = async (field) => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissions denied!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const mimeType = mime.getType(asset.uri);
            change(field, { ...asset, type: mimeType });
        }
    }

    //cập nhật giá trị cho state user
    const change = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    //cập nhật day of birth lên state user
    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setShowDatePicker(Platform.OS === 'ios');
            change('date_of_birth', selectedDate.toISOString().split('T')[0]);
        }
    };

    const handleBackToSignInPress = () => {
        // Xử lý khi người dùng nhấn nút trở lại đăng nhập
        onBackToSignIn();
    };

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={UserStyles.container}>
                    <ImageBackground source={require('../images/background_login2.jpg')}
                        style={[UserStyles.backgroundImage]}>
                        <View style={{ position: 'absolute', top: 60, left: 20 }}>
                            <TouchableOpacity onPress={handleBackToSignInPress}>
                                <Ionicons name="arrow-back" size={24} color={FSStyles.colorWhite} />
                            </TouchableOpacity>
                        </View>

                        <View style={[UserStyles.containerLogo2, { position: 'absolute', top: 60, left: 100 }]}>
                            <Text style={[UserStyles.styleTitle]}>FORMER STUDENT</Text>
                            <Text style={[UserStyles.stylesText, { fontSize: 18, fontStyle: "italic" }]}>Register</Text>
                        </View>

                        <View style={[UserStyles.containerContent, { marginTop: 150 }]}>
                            <View style={[UserStyles.containerContent, UserStyles.containerChildContent]}>
                                <TextInput
                                    value={user.first_name} onChangeText={t => change('first_name', t)}
                                    placeholder="First Name..."
                                    placeholderTextColor={FSStyles.colorWhite}
                                    style={[UserStyles.input, UserStyles.input2]}
                                    keyboardType="default">
                                </TextInput>
                                <TextInput
                                    value={user.last_name} onChangeText={t => change('last_name', t)}
                                    placeholder="Last Name..."
                                    placeholderTextColor={FSStyles.colorWhite}
                                    style={[UserStyles.input, UserStyles.input2]}
                                    keyboardType="default">
                                </TextInput>
                            </View>
                            <TextInput
                                value={user.email} onChangeText={t => change('email', t)}
                                placeholder="Email..."
                                placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}
                                keyboardType="email-address">
                            </TextInput>
                            <View style={[UserStyles.containerContent, UserStyles.containerChildContent]}>
                                <TextInput
                                    value={user.number_phone} onChangeText={t => change('number_phone', t)}
                                    placeholder="Number Phone..."
                                    placeholderTextColor={FSStyles.colorWhite}
                                    style={[UserStyles.input, UserStyles.input2, { width: "60%" }]}
                                    keyboardType="phone-pad">
                                </TextInput>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Text style={[UserStyles.input, { width: "100%", padding: 14 }]}>
                                        {user.date_of_birth ? user.date_of_birth : "Day Of Birth..."}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date(user.date_of_birth || Date.now())}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                            <TextInput
                                value={user.username} onChangeText={t => change('username', t)}
                                placeholder="MSSV..."
                                placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}
                                keyboardType="numeric">
                            </TextInput>
                            <TextInput
                                value={user.password} onChangeText={t => change('password', t)}
                                secureTextEntry={true}
                                placeholder="Password..."
                                placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}>
                            </TextInput>
                            <TextInput
                                value={confirmPassword} onChangeText={t => setConfirmPassword(t)}
                                secureTextEntry={true}
                                placeholder="Confirm Password..."
                                placeholderTextColor={FSStyles.colorWhite}
                                style={[UserStyles.input]}>
                            </TextInput>

                            <TouchableOpacity style={UserStyles.button} onPress={() => pickImage('avatar')}>
                                <Text style={UserStyles.stylesText}>Up Load Avatar</Text>
                            </TouchableOpacity>

                            {user.avatar ? <Image source={{ uri: user.avatar.uri }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 15 }} /> : ""}

                            <TouchableOpacity style={UserStyles.button} onPress={() => pickImage('cover_photo')}>
                                <Text style={UserStyles.stylesText}> Up Load Cover Photo</Text>
                            </TouchableOpacity>

                            {user.cover_photo ? <Image source={{ uri: user.cover_photo.uri }} style={{ width: 160, height: 90, marginTop: 15 }} /> : ""}
                            {loading === true ? <ActivityIndicator /> : (
                                <TouchableOpacity style={[UserStyles.button, { marginBottom: 50 }]} onPress={handleSignUpPress}>
                                    <Text style={UserStyles.stylesText}>Sign Up</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ImageBackground>
                </View >
            </ScrollView>
        </>
    );
};

export default SignUp;
