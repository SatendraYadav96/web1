

// TRANSPORT_UPLOAD
import {TRANSPORT_UPLOAD_FAIL, TRANSPORT_UPLOAD_START, TRANSPORT_UPLOAD_SUCCESS} from "./uploadActionConstants";

export const transportUploadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_START,
        payload: payload,
    })
}

export const transportUploadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_SUCCESS,
        payload: payload,
    })
}

export const transportUploadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_UPLOAD_FAIL,
        payload: payload,
    })
}
