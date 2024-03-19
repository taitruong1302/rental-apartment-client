import axiosConfig from "../axiogConfig";

export const apiGetCurrentUserInfor = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/getInfor'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateUserInfor = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/v1/user/updateInfor',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})