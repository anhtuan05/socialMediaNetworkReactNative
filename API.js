import axios from "axios";

const HOST = "https://advaita02.pythonanywhere.com"

export const endpoints = {
    'posts': '/posts/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'profile': (user_Id) => `/users/${user_Id}/profile/`,
    'userPosts': (user_Id) => `/users/${user_Id}/posts/`,
    'postComments': (post_Id) => `/posts/${post_Id}/comments/`,
    'POSTCmt': (post_Id) => `/posts/${post_Id}/add_comment/`,
    'DELETECmt': (cmt_Id) => `/comments/${cmt_Id}/`,
    'PATCHCmt': (cmt_Id) => `/comments/${cmt_Id}/`,
}

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST
})