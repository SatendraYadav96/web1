import { createReducer } from './reducerUtils'
import {RECIPIENTS_TO_ALLOCATE_LIST_FAIL, RECIPIENTS_TO_ALLOCATE_LIST_RESET, RECIPIENTS_TO_ALLOCATE_LIST_START, RECIPIENTS_TO_ALLOCATE_LIST_SUCCESS} from "../actions/allocation/allocationActionConstants";
const initialState = {
    recipients: [],
    loading: false,
    error: null,
}

const recipientsToAllocateSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    recipients: payload.recipients,
    loading: false,
    error: null,
  }
}

const recipientsToAllocateFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    error: payload.error,
  }
}

const recipientsToAllocateResetReducer = (state = initialState, payload) => {
    return {
        ...state,
        loading: false,
        recipients: []
    }
}

const recipientsToAllocateStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        loading: true,
        recipients: []
    }
}

export default createReducer(initialState, {
    [RECIPIENTS_TO_ALLOCATE_LIST_SUCCESS]: recipientsToAllocateSuccessReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_FAIL]: recipientsToAllocateFailReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_RESET]: recipientsToAllocateResetReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_START]: recipientsToAllocateStartReducer,
})
