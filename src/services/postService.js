import axiosConfig from '../axiogConfig'
import axios from 'axios'

export const apiGetPosts = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/getAll',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetPostById = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/post/getById',
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetLimitPosts = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/getLimit`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetAdminLimitPosts = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/limitAdmin`,
            params: query
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/getNewPost`
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiCreateNewPost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/post/createNewPost`,
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiUpdatePost = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/post/updatePost`,
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiDeletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/post/deletePost`,
            params: { postId }
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})