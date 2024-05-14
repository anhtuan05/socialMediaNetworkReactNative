import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import API, { authApi, endpoints } from "../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FSStyles from "../../styles/FSStyles";

const NewPost = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const handlePost = async () => {
        const access_token = await AsyncStorage.getItem('token-access');
        try {
            await authApi(access_token).post(endpoints['posts'], {
                'title': title,
                'content': content,
                'type_of_post': 2
            });
            setTitle("");
            setContent("");
            alert('Post created successfully!');
             
        } catch (error) {
            alert('Error creating post: ' + error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title..."
                style={styles.input}
            />
            <Text style={styles.label}>Content</Text>
            <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Enter content..."
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity onPress={handlePost} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    textArea: {
        height: 100,
    },
    button: {
        backgroundColor: FSStyles.primaryColor,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NewPost;
