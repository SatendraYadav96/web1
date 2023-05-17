import {GET_SPECIALDISPATCH_START,GET_SPECIALDISPATCH_SUCCESS,GET_SPECIALDISPATCH_FAIL,
GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_START,GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_SUCCESS,GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_FAIL} from "./specialDispatchActionConstant";



//Special Dispatch Action


export const getSpecialDispatchStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIALDISPATCH_START,
        payload: payload,
    })
}

export const getSpecialDispatchSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SPECIALDISPATCH_SUCCESS,
        payload: payload,
    })
}

export const getSpecialDispatchFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIALDISPATCH_FAIL,
        payload: payload,
    })
}

export const getSpecialEmployeeInvoiceDetailStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_START,
        payload: payload,
    })
}

export const getSpecialEmployeeInvoiceDetailSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const getSpecialEmployeeInvoiceDetailFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_FAIL,
        payload: payload,
    })
}
