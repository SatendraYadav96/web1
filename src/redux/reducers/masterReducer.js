import { createReducer } from './reducerUtils'
import {
    GET_VENDOR_SUCCESS, GET_VENDOR_FAIL,
    ADD_VENDOR_SUCCESS, ADD_VENDOR_FAIL,
    EDIT_VENDOR_SUCCESS, EDIT_VENDOR_FAIL,
    VENDOR_BY_ID_FAIL, VENDOR_BY_ID_SUCCESS,
    GET_COST_CENTER_SUCCESS, GET_COST_CENTER_FAIL
} from "../actions/master/masterActionConstants";



//VENDOR


const initialState = {
    vendorList: [],
    vendorLoading: false,
    insertVendor: [],
    insertVendorLoading: false,
    editVendor: [],
    editVendorLoading: false,
    vendorById: [],
    vendorByIdLoading:false,
    costCenterList: [],
    costCenterLoading: false,
    error: {}
}

const getVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      vendorList:payload.vendorList,
      vendorLoading: false

    }
}



const getVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    vendorList:[],
    vendorLoading: false,
    error: payload.error,

  }
}



//ADD VENDOR


const addVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      insertVendor:payload.insertVendor,
      insertVendorLoading: false

    }
}



const addVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    insertVendor:[],
    insertVendorLoading: false,
    error: payload.error,

  }
}


//EDIT VENDOR

const editVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      editVendor:payload.editVendor,
      editVendorLoading: false

    }
}



const editVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    editVendor:[],
    editVendorLoading: false,
    error: payload.error,

  }
}


const getVendorByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        vendorById:payload.vendorById,
        vendorByIdLoading: false

    }
}



const getVendorByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        vendorById:[],
        vendorByIdLoading: false,
        error: payload.error,

    }
}

const getCostCenterSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        costCenterList:payload.costCenterList,
        costCenterLoading: false

    }
}



const getCostCenterFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        costCenterList:[],
        costCenterLoading: false,
        error: payload.error,

    }
}



export default createReducer(initialState, {
    [GET_VENDOR_SUCCESS]: getVendorSuccessReducer,
    [GET_VENDOR_FAIL]: getVendorFailReducer,
    [ADD_VENDOR_SUCCESS]: addVendorSuccessReducer,
    [ADD_VENDOR_FAIL]: addVendorFailReducer,
    [EDIT_VENDOR_SUCCESS]: editVendorSuccessReducer,
    [EDIT_VENDOR_FAIL]: editVendorFailReducer,
    [VENDOR_BY_ID_SUCCESS]: getVendorByIdSuccessReducer,
    [VENDOR_BY_ID_FAIL]: getVendorByIdFailReducer,
    [GET_COST_CENTER_SUCCESS]: getCostCenterSuccessReducer,
    [GET_COST_CENTER_FAIL]: getCostCenterFailReducer,



})



