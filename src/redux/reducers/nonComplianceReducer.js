import {createReducer} from "./reducerUtils";
import {GET_MONTHLY_APPROVAL_FAIL, GET_MONTHLY_APPROVAL_SUCCESS} from "../actions/approval/monthlyApprovalActionConstants";
import {GET_COMPLIANCE_DETAILS_FAIL, GET_COMPLIANCE_DETAILS_START, GET_COMPLIANCE_DETAILS_SUCCESS, GET_MAIL_LOG_FAIL, GET_MAIL_LOG_SUCCESS, GET_NON_COMPLIANCE_FAIL, GET_NON_COMPLIANCE_START, GET_NON_COMPLIANCE_SUCCESS} from "../actions/compliance/nonComplianceActionConstants";


const initialState = {
    nonComplianceList: [],
    nonComplianceLoading: false,
    complianceDetailsList: [],
    complianceDetailsLoading: false,
    mailLogList: [],
    mailLogLoading: false,
    error: {}
}

const getNonComplianceSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        nonComplianceList:payload.nonComplianceList,
        nonComplianceLoading: false

    }
}

const getNonComplianceFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceList:[],
        nonComplianceLoading: false,
        error: payload.error,

    }
}

const getComplianceDetailsSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        complianceDetailsList:payload.complianceDetailsList,
        complianceDetailsLoading: false

    }
}

const getComplianceDetailsFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        complianceDetailsList:[],
        complianceDetailsLoading: false,
        error: payload.error,

    }
}


const getMailLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        mailLogList:payload.mailLogList,
        mailLogLoading: false

    }
}

const getMailLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        mailLogList:[],
        mailLogLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_NON_COMPLIANCE_SUCCESS]: getNonComplianceSuccessReducer,
    [GET_NON_COMPLIANCE_FAIL]: getNonComplianceFailReducer,
    [GET_COMPLIANCE_DETAILS_SUCCESS]: getComplianceDetailsSuccessReducer,
    [GET_COMPLIANCE_DETAILS_FAIL]: getComplianceDetailsFailReducer,
    [GET_MAIL_LOG_SUCCESS]: getMailLogSuccessReducer,
    [GET_MAIL_LOG_FAIL]: getMailLogFailReducer,
})
