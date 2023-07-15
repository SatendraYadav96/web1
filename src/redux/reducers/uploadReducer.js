import {createReducer} from "./reducerUtils";
import {GET_BUISNESS_UNIT_FAIL, GET_BUISNESS_UNIT_SUCCESS} from "../actions/master/masterActionConstants";
import {
    FF_UPLOAD_FAIL,
    FF_UPLOAD_SUCCESS,
    GRN_EXCEL_UPLOAD_FAIL,
    GRN_EXCEL_UPLOAD_SUCCESS, INVOICE_EXCEL_UPLOAD_FAIL, INVOICE_EXCEL_UPLOAD_SUCCESS,
    INVOICE_UPLOAD_FAIL,
    INVOICE_UPLOAD_SUCCESS, TRANSPORT_EXCEL_UPLOAD_FAIL,
    TRANSPORT_EXCEL_UPLOAD_SUCCESS,
    TRANSPORT_UPLOAD_FAIL,
    TRANSPORT_UPLOAD_SUCCESS,
    VIRTUAL_UPLOAD_FAIL,
    VIRTUAL_UPLOAD_SUCCESS
} from "../actions/upload/uploadActionConstants";
import {GRN_UPLOAD_FAIL, GRN_UPLOAD_SUCCESS} from "../actions/upload/uploadActionConstants";

const initialState = {
    transportUpload: [],
    transportUploadLoading: false,
    transportExcelUpload: [],
    transportExcelUploadLoading: false,
    grnUpload: [],
    grnUploadLoading: false,
    grnExcelUpload: [],
    grnExcelUploadLoading: false,
    virtualUpload: [],
    virtualUploadLoading: false,
    invoiceUpload: [],
    invoiceUploadLoading: false,
    invoiceExcelUpload: [],
    invoiceExcelUploadLoading: false,
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

//TRANSPORT_EXPORT_UPLOAD
const transportExcelUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportExcelUpload:payload.transportExcelUpload,
        transportExcelUploadLoading: false

    }
}

const transportExcelUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportExcelUpload:[],
        transportExcelUploadLoading: false,
        error: payload.error,

    }
}

//GRN_UPLOAD
const grnUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnUpload:payload.grnUpload,
        grnUploadLoading: false

    }
}

const grnUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnUpload:[],
        grnUploadLoading: false,
        error: payload.error,

    }
}

//GRN_UPLOAD
const grnExcelUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnExcelUpload:payload.grnExcelUpload,
        grnExcelUploadLoading: false

    }
}

const grnExcelUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnExcelUpload:[],
        grnExcelUploadLoading: false,
        error: payload.error,

    }
}

//FF_UPLOAD
const ffUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffUpload:payload.ffUpload,
        ffUploadLoading: false

    }
}

const ffUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffUpload:[],
        ffUploadLoading: false,
        error: payload.error,

    }
}


//VIRTUAL_UPLOAD
const virtualUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualUpload:payload.virtualUpload,
        virtualUploadLoading: false

    }
}

const virtualUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualUpload:[],
        virtualUploadLoading: false,
        error: payload.error,

    }
}

// INVOICE_UPLOAD
const invoiceUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUpload:payload.invoiceUpload,
        invoiceUploadLoading: false

    }
}

const invoiceUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceUpload:[],
        invoiceUploadLoading: false,
        error: payload.error,

    }
}

// INVOICE_EXCEL_UPLOAD
const invoiceExcelUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceExcelUpload:payload.invoiceExcelUpload,
        invoiceExcelUploadLoading: false

    }
}

const invoiceExcelUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceExcelUpload:[],
        invoiceExcelUploadLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [TRANSPORT_UPLOAD_SUCCESS]: transportUploadSuccessReducer,
    [TRANSPORT_UPLOAD_FAIL]: transportUploadFailReducer,
    [TRANSPORT_EXCEL_UPLOAD_SUCCESS]: transportExcelUploadSuccessReducer,
    [TRANSPORT_EXCEL_UPLOAD_FAIL]: transportExcelUploadFailReducer,
    [GRN_UPLOAD_SUCCESS]: grnUploadSuccessReducer,
    [GRN_UPLOAD_FAIL]: grnUploadFailReducer,
    [GRN_EXCEL_UPLOAD_SUCCESS]: grnExcelUploadSuccessReducer,
    [GRN_EXCEL_UPLOAD_FAIL]: grnExcelUploadFailReducer,
    [FF_UPLOAD_SUCCESS]: ffUploadSuccessReducer,
    [FF_UPLOAD_FAIL]: ffUploadFailReducer,
    [VIRTUAL_UPLOAD_SUCCESS]: virtualUploadSuccessReducer,
    [VIRTUAL_UPLOAD_FAIL]: virtualUploadFailReducer,
    [INVOICE_UPLOAD_SUCCESS]: invoiceUploadSuccessReducer,
    [INVOICE_UPLOAD_FAIL]: invoiceUploadFailReducer,
    [INVOICE_EXCEL_UPLOAD_SUCCESS]: invoiceExcelUploadSuccessReducer,
    [INVOICE_EXCEL_UPLOAD_FAIL]: invoiceExcelUploadFailReducer,

})
