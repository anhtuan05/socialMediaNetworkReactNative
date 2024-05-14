import axios from "axios";

const HOST = "https://advaita02.pythonanywhere.com"

export const endpoints = {
    'posts': '/posts/',
    'PATCHpost': (post_Id) => `/posts/${post_Id}/`,
    'DELETEpost': (post_Id) => `/posts/${post_Id}/`,
    'login': '/o/token/',
    'register': '/users/',
    'current_user': '/users/current_user/',
    'profile': (user_Id) => `/users/${user_Id}/profile/`,
    'userPosts': (user_Id) => `/users/${user_Id}/posts/`,
    'postComments': (post_Id) => `/posts/${post_Id}/comments/`,

    'surveys': '/surveys',
    'surveyQuestions': (survey_Id) => `/surveys/${survey_Id}/get_question/`,

    'POSTCmt': (post_Id) => `/posts/${post_Id}/add_comment/`,
    'DELETECmt': (cmt_Id) => `/comments/${cmt_Id}/`,
    'PATCHCmt': (cmt_Id) => `/comments/${cmt_Id}/`,
    
    'questionAnswers': (question_Id) => `/questions/${question_Id}/get_answer/`,
    'answersQuantity': (answerID) => `answers/${answerID}/plus_quantity/`,
    
    'listLike': (post_Id) => `/posts/${post_Id}/likes/`,
    'createLike': (post_Id) => `/posts/${post_Id}/like/`,
    'unLike': (post_Id) => `/posts/${post_Id}/unlike/`,
    'updateLike': (post_Id) => `/posts/${post_Id}/update_like/`,

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