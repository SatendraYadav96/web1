import {GET_ITEM_REVALIDATION_START,GET_ITEM_REVALIDATION_SUCCESS,GET_ITEM_REVALIDATION_FAIL} from "./itemRevalidationActionConstants";

//  ITEM_REVALIDATION REPORT ACTION

export const getItemRevalidationStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_REVALIDATION_START,
        payload: payload,
    })
}

export const getItemRevalidationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ITEM_REVALIDATION_SUCCESS,
        payload: payload,
    })
}

export const getItemRevalidationFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_ITEM_REVALIDATION_FAIL,
        payload: payload,
    })
}
