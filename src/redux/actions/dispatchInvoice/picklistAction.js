import {GET_PICKING_LIST_START, GET_PICKING_LIST_SUCCESS, GET_PICKING_LIST_FAIL, GET_PICKLIST_START, GET_PICKLIST_SUCCESS, GET_PICKLIST_FAIL, GET_PICKLIST_VIRTUAL_START, GET_PICKLIST_VIRTUAL_SUCCESS, GET_PICKLIST_VIRTUAL_FAIL} from "./picklistActionConstant";


export const getPickinglistStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKING_LIST_START,
        payload: payload,
    })
}

export const getPickinglistSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PICKING_LIST_SUCCESS,
        payload: payload,
    })
}

export const getPickinglistFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKING_LIST_FAIL,
        payload: payload,
    })
}


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


export const getPicklistVirtualStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKLIST_VIRTUAL_START,
        payload: payload,
    })
}

export const getPicklistVirtualSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PICKLIST_VIRTUAL_SUCCESS,
        payload: payload,
    })
}

export const getPicklistVirtualFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PICKLIST_VIRTUAL_FAIL,
        payload: payload,
    })
}


