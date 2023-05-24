import {
    GET_MONTHLYDISPATCH_START, GET_MONTHLYDISPATCH_SUCCESS, GET_MONTHLYDISPATCH_FAIL,
    GET_EMPLOYEEINVOICEDETAILS_START, GET_EMPLOYEEINVOICEDETAILS_SUCCESS,
    GET_EMPLOYEEINVOICEDETAILS_FAIL, GET_PRINT_INVOICE_START, GET_PRINT_INVOICE_SUCCESS, GET_PRINT_INVOICE_FAIL, GET_GENERATE_INVOICE_START, GET_GENERATE_INVOICE_SUCCESS, GET_GENERATE_INVOICE_FAIL, GET_GENERATE_LABEL_START, GET_GENERATE_LABEL_SUCCESS, GET_GENERATE_LABEL_FAIL
} from "./monthlyDispatchActionConstant";

//Monthly Dispatch Action


export const getMonthlyDispatchStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLYDISPATCH_START,
        payload: payload,
    })
}

export const getMonthlyDispatchSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MONTHLYDISPATCH_SUCCESS,
        payload: payload,
    })
}

export const getMonthlyDispatchFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLYDISPATCH_FAIL,
        payload: payload,
    })
}



// Monthly Dispatch Employee Invoice Details
export const getEmployeeInvoiceDetailStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_EMPLOYEEINVOICEDETAILS_START,
        payload: payload,
    })
}

export const getEmployeeInvoiceDetailSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_EMPLOYEEINVOICEDETAILS_SUCCESS,
        payload: payload,
    })
}

export const getEmployeeInvoiceDetailFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_EMPLOYEEINVOICEDETAILS_FAIL,
        payload: payload,
    })
}


//Monthly Dispatch Print Invoice

export const getPrintInvoiceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PRINT_INVOICE_START,
        payload: payload,
    })
}

export const getPrintInvoiceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_PRINT_INVOICE_SUCCESS,
        payload: payload,
    })
}

export const getPrintInvoiceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_PRINT_INVOICE_FAIL,
        payload: payload,
    })
}


//Monthly Dispatch Generate Invoice

export const getGenerateInvoiceStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GENERATE_INVOICE_START,
        payload: payload,
    })
}

export const getGenerateInvoiceSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_GENERATE_INVOICE_SUCCESS,
        payload: payload,
    })
}

export const getGenerateInvoiceFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GENERATE_INVOICE_FAIL,
        payload: payload,
    })
}


//Monthly Dispatch Generate Label

export const getGenerateLabelStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GENERATE_LABEL_START,
        payload: payload,
    })
}

export const getGenerateLabelSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_GENERATE_LABEL_SUCCESS,
        payload: payload,
    })
}

export const getGenerateLabelFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_GENERATE_LABEL_FAIL,
        payload: payload,
    })
}


