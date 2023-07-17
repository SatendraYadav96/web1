import { createReducer } from './reducerUtils'
import {
    GET_PICKING_LIST_SUCCESS,
    GET_PICKING_LIST_FAIL,
    GET_PICKLIST_SUCCESS,
    GET_PICKLIST_FAIL,
    GET_PICKLIST_VIRTUAL_SUCCESS,
    GET_PICKLIST_VIRTUAL_FAIL,
    GET_PICKLIST_STATUS_FAIL,
    GET_PICKLIST_STATUS_SUCCESS,
    GET_EMPLOYEE_POPUP_DETAILS_SUCCESS, GET_EMPLOYEE_POPUP_DETAILS_FAIL
} from "../actions/dispatchInvoice/picklistActionConstant";

const initialState = {
    pickinglist: [],
    loading: false,
    picklist: [],
    picklistLoading: false,
    picklistVirtual: [],
    picklistVirtualLoading: false,
    picklistStatus: [],
    picklistStatusLoading: false,
    employeePopup: [],
    employeePopupLoading: false,
    error: {}
}



const getPickinglistFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    pickinglist:[],
    loading: false,
    error: payload.error,

  }
}

const getPickinglistSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      pickinglist:payload.pickinglist,
      loading: false


    }
}

const getPicklistFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    picklist:[],
    picklistLoading: false,
    error: payload.error,

  }
}

const getPicklistSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      picklist:payload.picklist,
    picklistLoading: false


    }
}

const getPicklistVirtualFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    picklistVirtual:[],
    picklistVirtualLoading: false,
    error: payload.error,

  }
}

const getPicklistVirtualSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      picklistVirtual:payload.picklistVirtual,
      picklistLoadingVirtual: false


    }
}

const getPicklistStatusFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    picklistStatus:[],
    picklistStatusLoading: false,
    error: payload.error,

  }
}

const getPicklistStatusSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      picklistStatus:payload.picklistStatus,
      picklistLoadingStatus: false


    }
}

const getEmployeePopupFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    employeePopup:[],
    employeePopupLoading: false,
    error: payload.error,

  }
}

const getEmployeePopupSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      employeePopup:payload.employeePopupStatus,
      employeePopupLoading: false


    }
}


export default createReducer(initialState, {
    [GET_PICKING_LIST_SUCCESS]: getPickinglistSuccessReducer,
    [GET_PICKING_LIST_FAIL]: getPickinglistFailReducer,
    [GET_PICKLIST_SUCCESS]: getPicklistSuccessReducer,
    [GET_PICKLIST_FAIL]: getPicklistFailReducer,
    [GET_PICKLIST_VIRTUAL_SUCCESS]: getPicklistVirtualSuccessReducer,
    [GET_PICKLIST_VIRTUAL_FAIL]: getPicklistVirtualFailReducer,
    [GET_PICKLIST_STATUS_SUCCESS]: getPicklistStatusSuccessReducer,
    [GET_PICKLIST_STATUS_FAIL]: getPicklistStatusFailReducer,
    [GET_EMPLOYEE_POPUP_DETAILS_SUCCESS]: getEmployeePopupSuccessReducer,
    [GET_EMPLOYEE_POPUP_DETAILS_FAIL]: getEmployeePopupFailReducer,
})
