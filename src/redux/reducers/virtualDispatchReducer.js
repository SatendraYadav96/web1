import { createReducer } from './reducerUtils'
import {GET_VIRTUAL_DISPATCH_DETAILS_FAIL, GET_VIRTUAL_DISPATCH_DETAILS_SUCCESS, GET_VIRTUAL_DISPATCH_FAIL, GET_VIRTUAL_DISPATCH_SUCCESS} from "../actions/dispatchInvoice/virtualDispatchActionConstants";


//Virtual Dispatch
const initialState = {
    virtualData: [],
    virtualDispatchLoading: false,
    virtualDispatchDetails: [],
    virtualDispatchDetailsLoading: false,
    error: {}
}

const getVirtualDispatchSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        virtualData:payload.virtualData,
        virtualDispatchLoading: false

    }
}

const getVirtualDispatchFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualData:[],
        virtualDispatchLoading: false,
        error: payload.error,

    }
}


//virtual invoice details
const getVirtualDispatchDetailSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        virtualDispatchDetails:payload.virtualDispatchDetails,
        virtualDispatchDetailsLoading: false

    }
}



const getVirtualDispatchDetailFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualDispatchDetails:[],
        virtualDispatchDetailsLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_VIRTUAL_DISPATCH_SUCCESS]: getVirtualDispatchSuccessReducer,
    [GET_VIRTUAL_DISPATCH_FAIL]: getVirtualDispatchFailReducer,
    [GET_VIRTUAL_DISPATCH_DETAILS_SUCCESS]: getVirtualDispatchDetailSuccessReducer,
    [GET_VIRTUAL_DISPATCH_DETAILS_FAIL]: getVirtualDispatchDetailFailReducer
})
