import { createReducer } from './reducerUtils'
import {GET_ITEM_REVALIDATION_SUCCESS,GET_ITEM_REVALIDATION_FAIL} from "../actions/revalidation/itemRevalidationActionConstants";

//ITEM REVALIDATION REPORT REDUCER
const initialState = {
    itemRevalidation: [],
    itemRevalidationLoading: false,
    error: {}
}

const getItemRevalidationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        itemRevalidationList:payload.itemRevalidationList,
        itemRevalidationLoading: false

    }
}

const getItemRevalidationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        itemRevalidationList:[],
        itemRevalidationLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_ITEM_REVALIDATION_SUCCESS]: getItemRevalidationSuccessReducer,
    [GET_ITEM_REVALIDATION_FAIL]: getItemRevalidationFailReducer


})



