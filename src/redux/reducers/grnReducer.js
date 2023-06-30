import { createReducer } from './reducerUtils'
import {
  LOAD_USER_PROFILE_FAIL_ACTION,
  LOAD_USER_PROFILE_SUCCESS_ACTION,
  LOGIN_FAIL_ACTION,
  LOGIN_SUCCESS_ACTION,
} from '../actions/auth/authActionConstants'
import {
    APPROVE_ACKNOWLEDGE_FAIL, APPROVE_ACKNOWLEDGE_SUCCESS, REJECT_ACKNOWLEDGE_FAIL, REJECT_ACKNOWLEDGE_SUCCESS, UNACKNOWLEDGE_LIST_FAIL, UNACKNOWLEDGE_LIST_RESET, UNACKNOWLEDGE_LIST_START, UNACKNOWLEDGE_LIST_SUCCESS,
    GRN_UPLOAD_SUCCESS, GRN_UPLOAD_FAIL, GRN_SUCCESS, GRN_FAIL
} from "../actions/grn/grnActionConstants";
const initialState = {
  unacknowledged: {},
  rejectAcknowledge: {},
  approveAcknowledge : {},
  grnUpload:{},
  error: null,
}

const unacknowledgeListSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    unacknowledged: payload.unacknowledges,
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

const rejectAcknowledgeSuccessReducer = (state = initialState, payload) =>{
    return{
        ...state,
        rejectAcknowledge: payload.rejectAcknowledge,
        error: null
    }
}

const rejectAcknowledgeFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        error: payload.error
    }
}

const approveAcknowledgeSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        approveAcknowledge: payload.approveAcknowledge,
        error: null
    }
}

const approveAcknowledgeFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        error: payload.error
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
  [REJECT_ACKNOWLEDGE_FAIL]: rejectAcknowledgeFailReducer,
  [APPROVE_ACKNOWLEDGE_SUCCESS]: approveAcknowledgeSuccessReducer,
  [APPROVE_ACKNOWLEDGE_FAIL]: approveAcknowledgeFailReducer,
  [GRN_SUCCESS]: grnUploadSuccessReducer,
  [GRN_FAIL]: grnUploadFailReducer,
})
