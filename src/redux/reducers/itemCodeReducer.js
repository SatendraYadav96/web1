import { createReducer } from './reducerUtils'
import {GET_ITEM_CODE_SUCCESS,GET_ITEM_CODE_FAIL} from "../actions/revalidation/itemCodeActionConstants";

//ITEM CODE REPORT REDUCER
const initialState = {
    itemCode: [],
    itemCodeLoading: false,
    error: {}
}

const getItemCodeSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        itemCodeList:payload.itemCodeList,
        itemCodeLoading: false

    }
}

const getItemCodeFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        itemCodeList:[],
        itemCodeLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_ITEM_CODE_SUCCESS]: getItemCodeSuccessReducer,
    [GET_ITEM_CODE_FAIL]: getItemCodeFailReducer


})



