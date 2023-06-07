import { createReducer } from './reducerUtils'
import {GET_MONTHLY_APPROVAL_SUCCESS,GET_MONTHLY_APPROVAL_FAIL} from "../actions/approval/monthlyApprovalActionConstants";



//ITEM_WISE REPORT REDUCER


const initialState = {
    monthlyApprovalList: [],
    monthlyApprovalLoading: false,
    error: {}
}

const getMonthlyApprovalSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        monthlyApprovalList:payload.monthlyApprovalList,
        monthlyApprovalLoading: false

    }
}



const getMonthlyApprovalFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyApprovalList:[],
        monthlyApprovalLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_MONTHLY_APPROVAL_SUCCESS]: getMonthlyApprovalSuccessReducer,
    [GET_MONTHLY_APPROVAL_FAIL]: getMonthlyApprovalFailReducer


})
