import {GET_MONTHLYDISPATCH_START,GET_MONTHLYDISPATCH_SUCCESS,GET_MONTHLYDISPATCH_FAIL,
GET_EMPLOYEEINVOICEDETAILS_START,GET_EMPLOYEEINVOICEDETAILS_SUCCESS,
GET_EMPLOYEEINVOICEDETAILS_FAIL} from "./monthlyDispatchActionConstant";




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




