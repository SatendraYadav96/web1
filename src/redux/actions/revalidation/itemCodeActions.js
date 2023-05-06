import {GET_ITEM_CODE_START,GET_ITEM_CODE_SUCCESS,GET_ITEM_CODE_FAIL} from "./itemCodeActionConstants";

//  ITEM_CODE REPORT ACTION

export const getItemCodeStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_CODE_START,
        payload: payload,
    })
}

export const getItemCodeSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ITEM_CODE_SUCCESS,
        payload: payload,
    })
}

export const getItemCodeFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_CODE_FAIL,
        payload: payload,
    })
}
