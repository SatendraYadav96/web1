import { createReducer } from './reducerUtils'
import {
  LOAD_USER_PROFILE_FAIL_ACTION,
  LOAD_USER_PROFILE_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_SUCCESS_ACTION,
} from '../actions/auth/authActionConstants'
import {
    APPROVE_ACKNOWLEDGE_FAIL, APPROVE_ACKNOWLEDGE_SUCCESS, REJECT_ACKNOWLEDGE_FAIL, REJECT_ACKNOWLEDGE_SUCCESS, UNACKNOWLEDGE_LIST_FAIL, UNACKNOWLEDGE_LIST_RESET, UNACKNOWLEDGE_LIST_START, UNACKNOWLEDGE_LIST_SUCCESS,
    GRN_UPLOAD_SUCCESS, GRN_UPLOAD_FAIL, GRN_SUCCESS, GRN_FAIL, REJECT_ACKNOWLEDGE_START, APPROVE_ACKNOWLEDGE_START
} from "../actions/grn/grnActionConstants";
const initialState = {
  unacknowledged: {},
  rejectAcknowledge: {},
  approveAcknowledge : {},
  grnUpload:{},
  refreshAcknowledge: false,
  error: null,
}

const unacknowledgeListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    unacknowledged: payload.unacknowledges,
    refreshAcknowledge: false,
    error: null,
  }
}

const unacknowledgeListFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  }
}

const unacknowledgeListResetReducer = (state = initialState, payload) => {
    return {
        ...state,
        unacknowledged: [],
        error: null
    }
}

const rejectAcknowledgeStartReducer = (state = initialState, payload) =>{
    return{
        ...state,
        rejectAcknowledge: {},
        refreshAcknowledge: false,
        error: null
    }
}

const rejectAcknowledgeSuccessReducer = (state = initialState, payload) =>{
    return{
        ...state,
        rejectAcknowledge: payload.rejectAcknowledge,
        refreshAcknowledge: true,
        error: null
    }
}

const rejectAcknowledgeFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        error: payload.error,
        refreshAcknowledge: false
    }
}

const approveAcknowledgeStartReducer = (state = initialState, payload) =>{
    return{
        ...state,
        approveAcknowledge: {},
        refreshAcknowledge: false,
        error: null
    }
}

const approveAcknowledgeSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        approveAcknowledge: payload.approveAcknowledge,
        refreshAcknowledge: true,
        error: null
    }
}

const approveAcknowledgeFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        error: payload.error,
        refreshAcknowledge: false
    }
}


const grnUploadSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    grnUpload: payload.grnUpload,
    error: null,
  }
}

const grnUploadFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  }
}




export default createReducer(initialState, {
  [UNACKNOWLEDGE_LIST_SUCCESS]: unacknowledgeListSuccessReducer,
  [UNACKNOWLEDGE_LIST_FAIL]: unacknowledgeListFailReducer,
  [UNACKNOWLEDGE_LIST_RESET]: unacknowledgeListResetReducer,
  [REJECT_ACKNOWLEDGE_SUCCESS]: rejectAcknowledgeSuccessReducer,
    [REJECT_ACKNOWLEDGE_START]: rejectAcknowledgeStartReducer,
  [REJECT_ACKNOWLEDGE_FAIL]: rejectAcknowledgeFailReducer,
    [APPROVE_ACKNOWLEDGE_START]: approveAcknowledgeStartReducer,
  [APPROVE_ACKNOWLEDGE_SUCCESS]: approveAcknowledgeSuccessReducer,
  [APPROVE_ACKNOWLEDGE_FAIL]: approveAcknowledgeFailReducer,
  [GRN_SUCCESS]: grnUploadSuccessReducer,
  [GRN_FAIL]: grnUploadFailReducer,
})
