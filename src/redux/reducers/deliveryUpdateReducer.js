import { createReducer } from './reducerUtils'
import {DELIVERY_UPDATE_SUCCESS, DELIVERY_UPDATE_FAIL} from "../actions/dispatchInvoice/deliveryUpdateActionConstants";


//Monthly Dispatch
const initialState = {
    deliveryUpdateList: [],
    deliveryUpdateLoading: false,
}

const deliveryUpdateSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        deliveryUpdateList:payload.deliveryUpdateList,
        deliveryUpdateLoading: false

    }
}

const deliveryUpdateFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        deliveryUpdateList:[],
        deliveryUpdateLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [DELIVERY_UPDATE_SUCCESS]: deliveryUpdateSuccessReducer,
    [DELIVERY_UPDATE_FAIL]: deliveryUpdateFailReducer,
})
