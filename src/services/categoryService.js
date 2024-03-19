import axiosConfig from '../axiogConfig'

export const apiGetCategories = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/category/getAll',
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})