import axios from '../axiogConfig'
import axiosDefault from 'axios'

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/getAll'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAcreage = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/acreage/getAll'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/area/getAll'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})