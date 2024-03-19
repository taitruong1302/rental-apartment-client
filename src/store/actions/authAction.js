import actionTypes from './actionTypes'
import * as services from '../../services/authService'
import { toast } from 'react-toastify'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await services.apiRegister(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        }
        else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}

export const login = (payload) => async (dispatch) => {
    try {
        const response = await services.apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
            toast.success(response.data.msg)
        }
        else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
            toast.error(response.data.msg)
        }
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})