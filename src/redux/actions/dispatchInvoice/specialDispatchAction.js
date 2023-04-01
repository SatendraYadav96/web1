import {GET_SPECIALDISPATCH_START,GET_SPECIALDISPATCH_SUCCESS,GET_SPECIALDISPATCH_FAIL,
GET_SPECIALEMPLOYEEINVOICEDETAILS_START,GET_SPECIALEMPLOYEEINVOICEDETAILS_SUCCESS,GET_SPECIALEMPLOYEEINVOICEDETAILS_FAIL} from "./specialDispatchActionConstant";



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
        type: GET_SPECIALEMPLOYEEINVOICEDETAILS_START,
        payload: payload,
    })
}

export const getSpecialEmployeeInvoiceDetailSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SPECIALEMPLOYEEINVOICEDETAILS_SUCCESS,
        payload: payload,
    })
}

export const getSpecialEmployeeInvoiceDetailFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIALEMPLOYEEINVOICEDETAILS_FAIL,
        payload: payload,
    })
}
