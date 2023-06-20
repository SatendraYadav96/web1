import {createReducer} from "./reducerUtils";
import {GET_BUISNESS_UNIT_FAIL, GET_BUISNESS_UNIT_SUCCESS} from "../actions/master/masterActionConstants";
import {TRANSPORT_UPLOAD_FAIL, TRANSPORT_UPLOAD_SUCCESS} from "../actions/upload/uploadActionConstants";

const initialState = {
    transportUpload: [],
    transportUploadLoading: false,
    error: {}
}

//TRANSPORT_UPLOAD

const transportUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportUpload:payload.transportUpload,
        transportUploadLoading: false

    }
}



const transportUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportUpload:[],
        transportUploadLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [TRANSPORT_UPLOAD_SUCCESS]: transportUploadSuccessReducer,
    [TRANSPORT_UPLOAD_FAIL]: transportUploadFailReducer,
})
