import {DELIVERY_UPDATE_FAIL, DELIVERY_UPDATE_START, DELIVERY_UPDATE_SUCCESS} from "./deliveryUpdateActionConstants";

export const deliveryUpdateStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: DELIVERY_UPDATE_START,
        payload: payload,
    })
}

export const deliveryUpdateSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: DELIVERY_UPDATE_SUCCESS,
        payload: payload,
    })
}

export const deliveryUpdateFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: DELIVERY_UPDATE_FAIL,
        payload: payload,
    })
}
