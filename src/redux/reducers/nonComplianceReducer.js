import {createReducer} from "./reducerUtils";
import {GET_MONTHLY_APPROVAL_FAIL, GET_MONTHLY_APPROVAL_SUCCESS} from "../actions/approval/monthlyApprovalActionConstants";
import {
    GET_COMPLIANCE_DETAILS_FAIL,
    GET_COMPLIANCE_DETAILS_START,
    GET_COMPLIANCE_DETAILS_SUCCESS,
    GET_MAIL_LOG_FAIL,
    GET_MAIL_LOG_SUCCESS,
    GET_NON_COMPLIANCE_FAIL,
    GET_NON_COMPLIANCE_START,
    GET_NON_COMPLIANCE_SUCCESS, OVER_SAMPLING_DETAILS_DATA_FAIL, OVER_SAMPLING_DETAILS_DATA_SUCCESS, SAVE_MASTER_BLOCKED_RECIPIENT_FAIL, SAVE_MASTER_BLOCKED_RECIPIENT_START, SAVE_MASTER_BLOCKED_RECIPIENT_SUCCESS, SAVE_NON_COMPLIANCE_ADMIN_REMARK_FAIL,
    SAVE_NON_COMPLIANCE_ADMIN_REMARK_START, SAVE_NON_COMPLIANCE_ADMIN_REMARK_SUCCESS, SAVE_OVER_SAMPLING_FAIL, SAVE_OVER_SAMPLING_START, SAVE_OVER_SAMPLING_SUCCESS
} from "../actions/compliance/nonComplianceActionConstants";


const initialState = {
    nonComplianceList: [],
    nonComplianceLoading: false,
    complianceDetailsList: [],
    complianceDetailsLoading: false,
    mailLogList: [],
    mailLogLoading: false,
    saveNonComplianceAdminRemark: {},
    saveNonComplianceAdminRemarkSuccess:false,
    saveOverSampling:{},
    saveOverSamplingSuccess: false,
    overSamplingDetailData: [],
    saveMasterBlockedRecipient: [],
    saveMasterBlockedRecipientSuccess: false,
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

const saveNonComplianceAdminRemarkStartReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveNonComplianceAdminRemarkSuccess: false,
    }
}

const saveNonComplianceAdminRemarkSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveNonComplianceAdminRemark: payload.saveNonComplianceAdminRemark,
        saveNonComplianceAdminRemarkSuccess: true,
    }
}

const saveNonComplianceAdminRemarkFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveNonComplianceAdminRemark: {},
        saveNonComplianceAdminRemarkSuccess: false,
        error: payload.error
    }
}


const saveOverSamplingStartReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveOverSamplingSuccess: false,
    }
}

const saveOverSamplingSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveOverSampling: payload.saveOverSampling,
        saveOverSamplingSuccess: true,
    }
}

const saveOverSamplingFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveOverSampling: {},
        saveOverSamplingSuccess: false,
        error: payload.error
    }
}

const overSamplingDetailDataSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        overSamplingDetailData: payload.overSamplingDetailData
    }
}

const overSamplingDetailDataFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        overSamplingDetailData: [],
        error: payload.error
    }
}

const saveMasterRecipientBlockedStartReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveMasterBlockedRecipientSuccess: false,
    }
}

const saveMasterRecipientBlockedSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveMasterBlockedRecipient: payload.saveMasterBlockedRecipient,
        saveMasterBlockedRecipientSuccess: true,
    }
}

const saveMasterRecipientBlockedFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        saveMasterBlockedRecipient: [],
        saveMasterBlockedRecipientSuccess: false,
        error: payload.error
    }
}

export default createReducer(initialState, {
    [GET_NON_COMPLIANCE_SUCCESS]: getNonComplianceSuccessReducer,
    [GET_NON_COMPLIANCE_FAIL]: getNonComplianceFailReducer,
    [GET_COMPLIANCE_DETAILS_SUCCESS]: getComplianceDetailsSuccessReducer,
    [GET_COMPLIANCE_DETAILS_FAIL]: getComplianceDetailsFailReducer,
    [GET_MAIL_LOG_SUCCESS]: getMailLogSuccessReducer,
    [GET_MAIL_LOG_FAIL]: getMailLogFailReducer,
    [SAVE_NON_COMPLIANCE_ADMIN_REMARK_START]: saveNonComplianceAdminRemarkStartReducer,
    [SAVE_NON_COMPLIANCE_ADMIN_REMARK_SUCCESS]: saveNonComplianceAdminRemarkSuccessReducer,
    [SAVE_NON_COMPLIANCE_ADMIN_REMARK_FAIL]: saveNonComplianceAdminRemarkFailReducer,
    [SAVE_OVER_SAMPLING_START]: saveOverSamplingStartReducer,
    [SAVE_OVER_SAMPLING_SUCCESS]: saveOverSamplingSuccessReducer,
    [SAVE_OVER_SAMPLING_FAIL]: saveOverSamplingFailReducer,
    [OVER_SAMPLING_DETAILS_DATA_SUCCESS]: overSamplingDetailDataSuccessReducer,
    [OVER_SAMPLING_DETAILS_DATA_FAIL]: overSamplingDetailDataFailReducer,
    [SAVE_MASTER_BLOCKED_RECIPIENT_START]: saveMasterRecipientBlockedStartReducer,
    [SAVE_MASTER_BLOCKED_RECIPIENT_SUCCESS]: saveMasterRecipientBlockedSuccessReducer,
    [SAVE_MASTER_BLOCKED_RECIPIENT_FAIL]: saveMasterRecipientBlockedFailReducer
})
