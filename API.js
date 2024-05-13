import axios from "axios";

const HOST = "https://advaita02.pythonanywhere.com"

export const endpoints = {
    'posts': '/posts/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'profile': (user_Id) => `/users/${user_Id}/profile/`,
    'userPosts': (user_Id) => `/users/${user_Id}/posts/`,
    'postComments': (post_Id) => `/posts/${post_Id}/comments/`,
    'surveys': '/surveys',
    'surveyQuestions': (survey_Id) => `/surveys/${survey_Id}/get_question/`,
    'questionAnswers': (question_Id) => `/questions/${question_Id}/get_answer/`,
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