import actionTypes from './actionTypes'
import * as postService from '../../services/postService'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await postService.apiGetPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            post: null
        })
    }
}

export const getPostById = (query) => async (dispatch) => {
    try {
        const response = await postService.apiGetPostById(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                posts: response.data.response
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_POST_BY_ID,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POST_BY_ID,
            post: null
        })
    }
}

export const getLimitPosts = (query) => async (dispatch) => {
    try {
        const response = await postService.apiGetLimitPosts(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_LIMIT_POSTS,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_LIMIT_POSTS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_LIMIT_POSTS,
            posts: null
        })
    }
}

export const getAdminLimitPosts = (query) => async (dispatch) => {
    try {
        const response = await postService.apiGetAdminLimitPosts(query)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ADMIN_LIMIT_POSTS,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_ADMIN_LIMIT_POSTS,
                msg: response.data.msg,
                posts: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ADMIN_LIMIT_POSTS,
            posts: null
        })
    }
}

export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await postService.apiGetNewPosts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                newPosts: response.data.response
            })
        }
        else {
            dispatch({
                type: actionTypes.GET_NEW_POST,
                msg: response.data.msg,
                newPosts: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POST,
            newPosts: null
        })
    }
}

export const editPost = (dataEdit) => ({
    type: actionTypes.EDIT_DATA,
    dataEdit
})

export const resetEditData = (dataEdit) => ({
    type: actionTypes.RESET_EDIT_DATA
})
