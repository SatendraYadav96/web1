//  MONTHLY APPROVAL

import {GET_MONTHLY_APPROVAL_FAIL, GET_MONTHLY_APPROVAL_START, GET_MONTHLY_APPROVAL_SUCCESS} from "./monthlyApprovalActionConstants";

export const getMonthlyApprovalStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLY_APPROVAL_START,
        payload: payload,
    })
}

export const getMonthlyApprovalSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MONTHLY_APPROVAL_SUCCESS,
        payload: payload,
    })
}

export const getMonthlyApprovalFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLY_APPROVAL_FAIL,
        payload: payload,
    })
}
