

import {
    GET_VIRTUAL_DISPATCH_START,
    GET_VIRTUAL_DISPATCH_SUCCESS,
    GET_VIRTUAL_DISPATCH_FAIL,
    GET_VIRTUAL_DISPATCH_DETAILS_START,
    GET_VIRTUAL_DISPATCH_DETAILS_SUCCESS,
    GET_VIRTUAL_DISPATCH_DETAILS_FAIL,
    GET_GEN_VIRTUAL_INVOICE_START,
    GET_GEN_VIRTUAL_INVOICE_SUCCESS, GET_GEN_VIRTUAL_INVOICE_FAIL
} from "./virtualDispatchActionConstants";

//Virtual Dispatch Action


export const getVirtualDispatchStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_DISPATCH_START,
        payload: payload,
    })
}

export const getVirtualDispatchSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_DISPATCH_SUCCESS,
        payload: payload,
    })
}

export const getVirtualDispatchFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_DISPATCH_FAIL,
        payload: payload,
    })
}

export const getVirtualDispatchDetailsStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_DISPATCH_DETAILS_START,
        payload: payload,
    })
}

export const getVirtualDispatchDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_DISPATCH_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const getVirtualDispatchDetailsFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_DISPATCH_DETAILS_FAIL,
        payload: payload,
    })
}

//Generate Invoice

export const getGenVirtualInvoiceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GEN_VIRTUAL_INVOICE_START,
        payload: payload,
    })
}

export const getGenVirtualInvoiceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_GEN_VIRTUAL_INVOICE_SUCCESS,
        payload: payload,
    })
}

export const getGenVirtualInvoiceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GEN_VIRTUAL_INVOICE_FAIL,
        payload: payload,
    })
}

