import { createReducer } from './reducerUtils'
import {
  ADD_HSN_SUCCESS_ACTION,
  ADD_HSN_FAIL_ACTION,
  ADD_BOX_WEIGHT_SUCCESS_ACTION,
  ADD_BOX_WEIGHT_FAIL_ACTION
} from '../actions/hsnInvoice/hsnActionConstants'

const initialState = {
  insertHsn: [],
  hsnLoading: false,
  error: null,
  boxWeight:[],
  boxWeightLoading:false
}


//Add HSN API

const addHsnSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    insertHsn: payload.insertHsn,
    hsnLoading: false,
    error: null

  }
}

const addHsnFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    insertHsn:[],
    error: payload.error,
    hsnLoading: false,
  }
}


//Edit Invoice Header API

const addBoxWeightSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,
    boxWeight: payload.boxWeight,
    boxWeightLoading: false,
    error: null

  }
}

const addBoxWeightFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    boxWeight:[],
    error: payload.error,
    boxWeightLoading: false,
  }
}






export default createReducer(initialState, {
  [ADD_HSN_SUCCESS_ACTION]: addHsnSuccessReducer,
  [ADD_HSN_FAIL_ACTION]: addHsnFailReducer,

  [ADD_BOX_WEIGHT_SUCCESS_ACTION]: addBoxWeightSuccessReducer,
  [ADD_BOX_WEIGHT_FAIL_ACTION]: addBoxWeightFailReducer

})
