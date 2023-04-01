import {GET_PICKLIST_START,GET_PICKLIST_SUCCESS,GET_PICKLIST_FAIL} from "./picklistActionConstant";


export const getPicklistStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKLIST_START,
        payload: payload,
    })
}

export const getPicklistSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PICKLIST_SUCCESS,
        payload: payload,
    })
}

export const getPicklistFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKLIST_FAIL,
        payload: payload,
    })
}
