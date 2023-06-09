import { createReducer } from './reducerUtils'
import {
    GET_MONTHLY_APPROVAL_SUCCESS,
    GET_MONTHLY_APPROVAL_FAIL,
    GET_MONTHLY_APPROVAL_DETAILS_SUCCESS,
    GET_MONTHLY_APPROVAL_DETAILS_FAIL,
    RESET_PLAN_SUCCESS,
    RESET_PLAN_FAIL,
    UNLOCK_PLAN_SUCCESS,
    UNLOCK_PLAN_FAIL,
    APPROVE_PLAN_SUCCESS,
    APPROVE_PLAN_FAIL, REJECT_PLAN_SUCCESS, REJECT_PLAN_FAIL, MONTHLY_TO_SPECIAL_SUCCESS, MONTHLY_TO_SPECIAL_FAIL
} from "../actions/approval/monthlyApprovalActionConstants";



//ITEM_WISE REPORT REDUCER


const initialState = {
    monthlyApprovalList: [],
    monthlyApprovalLoading: false,
    monthlyApprovalDetailsList: [],
    monthlyApprovalDetailsLoading: false,
    resetPlanList: [],
    resetPlanLoading: false,
    unlockPlanList: [],
    unlockPlanLoading: false,
    approvePlanList: [],
    approvePlanLoading: false,
    rejectPlanList: [],
    rejectPlanLoading: false,
    monthlyToSpecialList: [],
    monthlyToSpecialLoading: false,
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

const getMonthlyApprovalDetailsSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        monthlyApprovalDetailsList:payload.monthlyApprovalDetailsList,
        monthlyApprovalDetailsLoading: false

    }
}

const getMonthlyApprovalDetailsFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyApprovalDetailsList:[],
        monthlyApprovalDetailsLoading: false,
        error: payload.error,

    }
}


const resetPlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        resetPlanList:payload.resetPlanList,
        resetPlanLoading: false

    }
}

const resetPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        resetPlanList:[],
        resetPlanLoading: false,
        error: payload.error,

    }
}


const unlockPlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        unlockPlanList:payload.unlockPlanList,
        unlockPlanLoading: false

    }
}

const unlockPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        unlockPlanList:[],
        unlockPlanLoading: false,
        error: payload.error,

    }
}

const approvePlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        approvePlanList:payload.approvePlanList,
        approvePlanLoading: false

    }
}

const approvePlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        approvePlanList:[],
        approvePlanLoading: false,
        error: payload.error,

    }
}


const rejectPlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        rejectPlanList:payload.rejectPlanList,
        rejectPlanLoading: false

    }
}

const rejectPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        rejectPlanList:[],
        rejectPlanLoading: false,
        error: payload.error,

    }
}


const monthlyToSpecialSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        monthlyToSpecialList:payload.monthlyToSpecialList,
        monthlyToSpecialLoading: false

    }
}

const monthlyToSpecialFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyToSpecialList:[],
        monthlyToSpecialLoading: false,
        error: payload.error,

    }
}



export default createReducer(initialState, {
    [GET_MONTHLY_APPROVAL_SUCCESS]: getMonthlyApprovalSuccessReducer,
    [GET_MONTHLY_APPROVAL_FAIL]: getMonthlyApprovalFailReducer,
    [GET_MONTHLY_APPROVAL_DETAILS_SUCCESS]: getMonthlyApprovalDetailsSuccessReducer,
    [GET_MONTHLY_APPROVAL_DETAILS_FAIL]: getMonthlyApprovalDetailsFailReducer,
    [RESET_PLAN_SUCCESS]: resetPlanSuccessReducer,
    [RESET_PLAN_FAIL]: resetPlanFailReducer,
    [UNLOCK_PLAN_SUCCESS]: unlockPlanSuccessReducer,
    [UNLOCK_PLAN_FAIL]: unlockPlanFailReducer,
    [APPROVE_PLAN_SUCCESS]: approvePlanSuccessReducer,
    [APPROVE_PLAN_FAIL]: approvePlanFailReducer,
    [REJECT_PLAN_SUCCESS]: rejectPlanSuccessReducer,
    [REJECT_PLAN_FAIL]: rejectPlanFailReducer,
    [MONTHLY_TO_SPECIAL_SUCCESS]: monthlyToSpecialSuccessReducer,
    [MONTHLY_TO_SPECIAL_FAIL]: monthlyToSpecialFailReducer,
})
