import { createReducer } from './reducerUtils'
import {GET_PICKLIST_SUCCESS,GET_PICKLIST_FAIL} from "../actions/dispatchInvoice/picklistActionConstant";

const initialState = {
    picklist: [],

    loading: false,
    error: {}
}



const getPicklistFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    picklist:[],
    loading: false,
    error: payload.error,

  }
}

const getPicklistSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      picklist:payload.picklist,
      loading: false


    }
}



export default createReducer(initialState, {
    [GET_PICKLIST_SUCCESS]: getPicklistSuccessReducer,
    [GET_PICKLIST_FAIL]: getPicklistFailReducer,

})
