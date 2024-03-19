import actionTypes from "../actions/actionTypes";

const initState = {
    categories: [],
    msg: '',
    prices: [],
    acreage: [],
    areas: []
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_ACREAGE:
            return {
                ...state,
                acreage: action.acreage || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.areas || [],
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default appReducer