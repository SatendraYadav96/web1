import { createReducer } from './reducerUtils'
import {GET_VENDOR_SUCCESS,GET_VENDOR_FAIL,
ADD_VENDOR_SUCCESS,ADD_VENDOR_FAIL,
EDIT_VENDOR_SUCCESS,EDIT_VENDOR_FAIL,
} from "../actions/master/masterActionConstants";



//VENDOR


const initialState = {
    vendorList: [],
    vendorLoading: false,
    insertVendor: [],
    insertVendorLoading: false,
    editVendor: [],
    editVendorLoading: false,
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



export default createReducer(initialState, {
    [GET_VENDOR_SUCCESS]: getVendorSuccessReducer,
    [GET_VENDOR_FAIL]: getVendorFailReducer,
    [ADD_VENDOR_SUCCESS]: addVendorSuccessReducer,
    [ADD_VENDOR_FAIL]: addVendorFailReducer,
    [EDIT_VENDOR_SUCCESS]: editVendorSuccessReducer,
    [EDIT_VENDOR_FAIL]: editVendorFailReducer,



})



