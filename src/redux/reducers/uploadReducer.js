import {createReducer} from "./reducerUtils";
import {GET_BUISNESS_UNIT_FAIL, GET_BUISNESS_UNIT_SUCCESS} from "../actions/master/masterActionConstants";
import {
    FF_EXCEL_UPLOAD_FAIL,
    FF_EXCEL_UPLOAD_START,
    FF_EXCEL_UPLOAD_SUCCESS,
    FF_UPLOAD_FAIL,
    FF_UPLOAD_LOG_FAIL,
    FF_UPLOAD_LOG_SUCCESS,
    FF_UPLOAD_SUCCESS,
    GRN_EXCEL_UPLOAD_FAIL,
    GRN_EXCEL_UPLOAD_START,
    GRN_EXCEL_UPLOAD_SUCCESS,
    INVOICE_EXCEL_UPLOAD_FAIL,
    INVOICE_EXCEL_UPLOAD_START,
    INVOICE_EXCEL_UPLOAD_SUCCESS,
    INVOICE_UPLOAD_FAIL,
    INVOICE_UPLOAD_SUCCESS,
    MATERIAL_EXPIRY_EXCEL_FAIL, MATERIAL_EXPIRY_EXCEL_START,
    MATERIAL_EXPIRY_EXCEL_SUCCESS, MATERIAL_EXPIRY_UPLOAD_FAIL,
    MATERIAL_EXPIRY_UPLOAD_LOG_FAIL,
    MATERIAL_EXPIRY_UPLOAD_LOG_SUCCESS,
    MATERIAL_EXPIRY_UPLOAD_START,
    MATERIAL_EXPIRY_UPLOAD_SUCCESS,
    NON_COMPLIANCE_EXCEL_FAIL, NON_COMPLIANCE_EXCEL_START,
    NON_COMPLIANCE_EXCEL_SUCCESS,
    NON_COMPLIANCE_UPLOAD_FAIL,
    NON_COMPLIANCE_UPLOAD_LOG_FAIL,
    NON_COMPLIANCE_UPLOAD_LOG_SUCCESS,
    NON_COMPLIANCE_UPLOAD_START,
    NON_COMPLIANCE_UPLOAD_SUCCESS,
    OVER_SAMPLING_DETAILS_EXCEL_FAIL, OVER_SAMPLING_DETAILS_EXCEL_START,
    OVER_SAMPLING_DETAILS_EXCEL_SUCCESS,
    OVER_SAMPLING_DETAILS_UPLOAD_FAIL,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_FAIL,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_SUCCESS,
    OVER_SAMPLING_DETAILS_UPLOAD_START,
    OVER_SAMPLING_DETAILS_UPLOAD_SUCCESS,
    OVER_SAMPLING_EXCEL_FAIL, OVER_SAMPLING_EXCEL_START,
    OVER_SAMPLING_EXCEL_SUCCESS,
    OVER_SAMPLING_UPLOAD_FAIL,
    OVER_SAMPLING_UPLOAD_LOG_FAIL,
    OVER_SAMPLING_UPLOAD_LOG_SUCCESS,
    OVER_SAMPLING_UPLOAD_START,
    OVER_SAMPLING_UPLOAD_SUCCESS,
    RECIPIENT_UPLOAD_LOG_FAIL,
    RECIPIENT_UPLOAD_LOG_SUCCESS,
    TRANSPORT_EXCEL_UPLOAD_FAIL,
    TRANSPORT_EXCEL_UPLOAD_START,
    TRANSPORT_EXCEL_UPLOAD_SUCCESS,
    TRANSPORT_UPLOAD_FAIL,
    TRANSPORT_UPLOAD_SUCCESS,
    VIRTUAL_SAMPLE_UPLOAD_FAIL,
    VIRTUAL_SAMPLE_UPLOAD_LOG_FAIL,
    VIRTUAL_SAMPLE_UPLOAD_LOG_SUCCESS,
    VIRTUAL_SAMPLE_UPLOAD_START,
    VIRTUAL_SAMPLE_UPLOAD_SUCCESS,
    VIRTUAL_UPLOAD_FAIL,
    VIRTUAL_UPLOAD_SUCCESS
} from "../actions/upload/uploadActionConstants";
import {GRN_UPLOAD_FAIL, GRN_UPLOAD_SUCCESS} from "../actions/upload/uploadActionConstants";
import {overSamplingUploadLogFailAction} from "../actions/upload/uploadActions";

const initialState = {
    transportUpload: [],
    transportUploadLoading: false,
    transportUploadSuccess: false,
    transportExcelUpload: [],
    transportExcelUploadLoading: false,
    grnUpload: [],
    grnUploadLoading: false,
    grnUploadSuccess: false,
    grnExcelUpload: [],
    grnExcelUploadLoading: false,
    virtualUpload: [],
    virtualUploadLoading: false,
    invoiceUpload: [],
    invoiceUploadLoading: false,
    invoiceExcelUpload: [],
    invoiceExcelUploadLoading: false,
    virtualSample: [],
    virtualSampleLoading: false,
    virtualSampleSuccess: false,
    virtualSampleLog: [],
    virtualSampleLogLoading: false,
    ffExcelUpload: [],
    ffExcelUploadLoading: false,
    ffExcelUploadSuccess: false,
    ffUploadLog: [],
    ffUploadLogLoading: false,
    recipientUploadLog: [],
    recipientUploadLogLoading: false,
    nonComplianceUploadLog: [],
    nonComplianceUploadLogLoading: false,
    overSamplingUploadLog: [],
    overSamplingUploadLogLoading: false,
    overSamplingDetailsUploadLog:[],
    overSamplingDetailsUploadLogLoading:false,
    materialExpiryUploadLog:[],
    materialExpiryUploadLogLoading:false,
    nonComplianceExcel:[],
    nonComplianceExcelLoading:false,
    overSamplingExcel:[],
    overSamplingExcelLoading:false,
    overSamplingDetailsExcel:[],
    overSamplingDetailsExcelLoading:false,
    materialExpiryExcel:[],
    materialExpiryExcelLoading:false,
    nonComplianceUpload: [],
    nonComplianceUploadLoading: false,
    nonComplianceUploadSuccess: false,
    overSamplingUpload: [],
    overSamplingUploadLoading: false,
    overSamplingUploadSuccess: false,
    overSamplingDetailsUpload:[],
    overSamplingDetailsUploadLoading:false,
    overSamplingDetailsUploadSuccess:false,
    materialExpiryUpload:[],
    materialExpiryUploadLoading:false,
    materialExpiryUploadSuccess:false,
    error: {}
}

//TRANSPORT_UPLOAD
const transportUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportUpload:payload.transportUpload,
        transportUploadSuccess: true,
        transportUploadLoading: false

    }
}

const transportUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportUpload:[],
        transportUploadSuccess: false,
        transportUploadLoading: false,
        error: payload.error,

    }
}

//TRANSPORT_EXPORT_UPLOAD

const transportExcelUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportExcelUpload:[],
        transportExcelUploadLoading: false

    }
}

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
        grnUploadSuccess: true,
        grnUploadLoading: false

    }
}

const grnUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnUpload:[],
        grnUploadSuccess: false,
        grnUploadLoading: false,
        error: payload.error,

    }
}

//GRN_UPLOAD

const grnExcelUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        grnExcelUpload:[],
        grnExcelUploadLoading: false

    }
}

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
const invoiceExcelUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceExcelUpload:[],
        invoiceExcelUploadLoading: false

    }
}

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

// INVOICE_EXCEL_UPLOAD
const virtualSampleStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualSample: [],
        virtualSampleLoading: false,
        virtualSampleSuccess: false
    }
}

const virtualSampleSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualSample:payload.virtualSample,
        virtualSampleLoading: false,
        virtualSampleSuccess: true

    }
}

const virtualSampleFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualSample:[],
        virtualSampleLoading: false,
        error: payload.error,
        virtualSampleSuccess: false
    }
}

// SAMPLE_UPLOAD_LOG
const virtualSampleLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualSampleLog:payload.virtualSampleLog,
        virtualSampleLogLoading: false

    }
}

const virtualSampleLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualSampleLog:[],
        virtualSampleLogLoading: false,
        error: payload.error,

    }
}

// INVOICE_EXCEL_UPLOAD

const ffExcelUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffExcelUpload:[],
        ffExcelUploadLoading: false,
        ffExcelUploadSuccess: false
    }
}

const ffExcelUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffExcelUpload:payload.ffExcelUpload,
        ffExcelUploadLoading: false,
        ffExcelUploadSuccess: true
    }
}

const ffExcelUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffExcelUpload:[],
        ffExcelUploadLoading: false,
        error: payload.error,
        ffExcelUploadSuccess: false
    }
}

// SAMPLE_UPLOAD_LOG
const ffUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffUploadLog:payload.ffUploadLog,
        ffUploadLogLoading: false

    }
}

const ffUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffUploadLog:[],
        ffUploadLogLoading: false,
        error: payload.error,

    }
}


// SAMPLE_UPLOAD_LOG
const recipientUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientUploadLog:payload.recipientUploadLog,
        recipientUploadLogLoading: false

    }
}

const recipientUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientUploadLog:[],
        recipientUploadLogLoading: false,
        error: payload.error,

    }
}


// COMPLIANCE_UPLOAD_LOG
const nonComplianceUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceUploadLog:payload.nonComplianceUploadLog,
        nonComplianceUploadLogLoading: false

    }
}

const nonComplianceUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceUploadLog:[],
        nonComplianceUploadLogLoading: false,
        error: payload.error,

    }
}


// OVER_SAMPLING_UPLOAD_LOG
const overSamplingUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingUploadLog:payload.overSamplingUploadLog,
        overSamplingUploadLogLoading: false

    }
}

const overSamplingUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingUploadLog:[],
        overSamplingUploadLogLoading: false,
        error: payload.error,

    }
}



// OVER_SAMPLING_DETAILS_UPLOAD_LOG
const overSamplingDetailsUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsUploadLog:payload.overSamplingDetailsUploadLog,
        overSamplingDetailsUploadLogLoading: false

    }
}

const overSamplingDetailsUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsUploadLog:[],
        overSamplingDetailsUploadLogLoading: false,
        error: payload.error,

    }
}


// MATERIAL_EXPIRY_UPLOAD_LOG
const materialExpiryUploadLogSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryUploadLog:payload.materialExpiryUploadLog,
        materialExpiryUploadLogLoading: false

    }
}

const materialExpiryUploadLogFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryUploadLog:[],
        materialExpiryUploadLogLoading: false,
        error: payload.error,

    }
}


// NON_COMPLIANCE_EXCEL

const nonComplianceExcelStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceExcel:[],
        nonComplianceExcelLoading: false

    }
}

const nonComplianceExcelSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceExcel:payload.nonComplianceExcel,
        nonComplianceExcelLoading: false

    }
}

const nonComplianceExcelFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceExcel:[],
        nonComplianceExcelLoading: false,
        error: payload.error,

    }
}


const overSamplingExcelStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingExcel:[],
        overSamplingExcelLoading: false

    }
}

const overSamplingExcelSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingExcel:payload.overSamplingExcel,
        overSamplingExcelLoading: false

    }
}

const overSamplingExcelFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingExcel:[],
        overSamplingExcelLoading: false,
        error: payload.error,

    }
}

const overSamplingDetailsExcelStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsExcel:[],
        overSamplingDetailsExcelLoading: false

    }
}

const overSamplingDetailsExcelSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsExcel:payload.overSamplingDetailsExcel,
        overSamplingDetailsExcelLoading: false

    }
}

const overSamplingDetailsExcelFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsExcel:[],
        overSamplingDetailsExcelLoading: false,
        error: payload.error,

    }
}

const materialExpiryExcelStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryExcel:[],
        materialExpiryExcelLoading: false

    }
}

const materialExpiryExcelSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryExcel:payload.materialExpiryExcel,
        materialExpiryExcelLoading: false

    }
}

const materialExpiryExcelFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryExcel:[],
        materialExpiryExcelLoading: false,
        error: payload.error,

    }
}

// COMPLIANCE_UPLOAD

const nonComplianceUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceUpload:[],
        nonComplianceUploadLoading: false,
        nonComplianceUploadSuccess: false
    }
}

const nonComplianceUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceUpload:payload.nonComplianceUpload,
        nonComplianceUploadLoading: false,
        nonComplianceUploadSuccess: true
    }
}

const nonComplianceUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        nonComplianceUploadLog:[],
        nonComplianceUploadLogLoading: false,
        nonComplianceUploadSuccess: false,
        error: payload.error,

    }
}

// OVER_SAMPLING_UPLOAD
const overSamplingUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingUpload:[],
        overSamplingUploadLoading: false,
        overSamplingUploadSuccess: false

    }
}

const overSamplingUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingUpload:payload.overSamplingUpload,
        overSamplingUploadLoading: false,
        overSamplingUploadSuccess: true
    }
}

const overSamplingUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingUpload:[],
        overSamplingUploadLoading: false,
        overSamplingUploadSuccess: false,
        error: payload.error,

    }
}

// OVER_SAMPLING_DETAILS_UPLOAD

const overSamplingDetailsUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsUpload:[],
        overSamplingDetailsUploadLoading: false,
        overSamplingDetailsUploadSuccess: false
    }
}

const overSamplingDetailsUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsUpload:payload.overSamplingDetailsUpload,
        overSamplingDetailsUploadLoading: false,
        overSamplingDetailsUploadSuccess: true
    }
}

const overSamplingDetailsUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        overSamplingDetailsUpload:[],
        overSamplingDetailsUploadLoading: false,
        overSamplingDetailsUploadSuccess: false,
        error: payload.error,

    }
}

// MATERIAL_EXPIRY_UPLOAD
const materialExpiryUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryUpload:[],
        materialExpiryUploadLoading: false,
        materialExpiryUploadSuccess: false
    }
}

const materialExpiryUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryUpload:payload.materialExpiryUpload,
        materialExpiryUploadLoading: false,
        materialExpiryUploadSuccess: true
    }
}

const materialExpiryUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        materialExpiryUpload:[],
        materialExpiryUploadLoading: false,
        materialExpiryUploadSuccess: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [TRANSPORT_UPLOAD_SUCCESS]: transportUploadSuccessReducer,
    [TRANSPORT_UPLOAD_FAIL]: transportUploadFailReducer,
    [TRANSPORT_EXCEL_UPLOAD_SUCCESS]: transportExcelUploadSuccessReducer,
    [TRANSPORT_EXCEL_UPLOAD_START]: transportExcelUploadStartReducer,
    [TRANSPORT_EXCEL_UPLOAD_FAIL]: transportExcelUploadFailReducer,
    [GRN_UPLOAD_SUCCESS]: grnUploadSuccessReducer,
    [GRN_UPLOAD_FAIL]: grnUploadFailReducer,
    [GRN_EXCEL_UPLOAD_SUCCESS]: grnExcelUploadSuccessReducer,
    [GRN_EXCEL_UPLOAD_START]: grnExcelUploadStartReducer,
    [GRN_EXCEL_UPLOAD_FAIL]: grnExcelUploadFailReducer,
    [FF_UPLOAD_SUCCESS]: ffUploadSuccessReducer,
    [FF_UPLOAD_FAIL]: ffUploadFailReducer,
    [VIRTUAL_UPLOAD_SUCCESS]: virtualUploadSuccessReducer,
    [VIRTUAL_UPLOAD_FAIL]: virtualUploadFailReducer,
    [VIRTUAL_SAMPLE_UPLOAD_LOG_SUCCESS]: virtualSampleLogSuccessReducer,
    [VIRTUAL_SAMPLE_UPLOAD_LOG_FAIL]: virtualSampleLogFailReducer,
    [INVOICE_UPLOAD_SUCCESS]: invoiceUploadSuccessReducer,
    [INVOICE_UPLOAD_FAIL]: invoiceUploadFailReducer,
    [INVOICE_EXCEL_UPLOAD_SUCCESS]: invoiceExcelUploadSuccessReducer,
    [INVOICE_EXCEL_UPLOAD_START]: invoiceExcelUploadStartReducer,
    [INVOICE_EXCEL_UPLOAD_FAIL]: invoiceExcelUploadFailReducer,
    [FF_EXCEL_UPLOAD_START]: ffExcelUploadStartReducer,
    [FF_EXCEL_UPLOAD_SUCCESS]: ffExcelUploadSuccessReducer,
    [FF_EXCEL_UPLOAD_FAIL]: ffExcelUploadFailReducer,
    [FF_UPLOAD_LOG_SUCCESS]: ffUploadLogSuccessReducer,
    [FF_UPLOAD_LOG_FAIL]: ffUploadLogFailReducer,
    [RECIPIENT_UPLOAD_LOG_SUCCESS]: recipientUploadLogSuccessReducer,
    [RECIPIENT_UPLOAD_LOG_FAIL]: recipientUploadLogFailReducer,
    [NON_COMPLIANCE_UPLOAD_LOG_SUCCESS]: nonComplianceUploadLogSuccessReducer,
    [NON_COMPLIANCE_UPLOAD_LOG_FAIL]: nonComplianceUploadLogFailReducer,
    [VIRTUAL_SAMPLE_UPLOAD_START]:virtualSampleStartReducer,
    [VIRTUAL_SAMPLE_UPLOAD_SUCCESS]:virtualSampleSuccessReducer,
    [VIRTUAL_SAMPLE_UPLOAD_FAIL]:virtualSampleFailReducer,
    [OVER_SAMPLING_UPLOAD_LOG_SUCCESS]:overSamplingUploadLogSuccessReducer,
    [OVER_SAMPLING_UPLOAD_LOG_FAIL]:overSamplingUploadLogFailReducer,
    [OVER_SAMPLING_DETAILS_UPLOAD_LOG_SUCCESS]:overSamplingDetailsUploadLogSuccessReducer,
    [OVER_SAMPLING_DETAILS_UPLOAD_LOG_FAIL]:overSamplingDetailsUploadLogFailReducer,
    [MATERIAL_EXPIRY_UPLOAD_LOG_SUCCESS]:materialExpiryUploadLogSuccessReducer,
    [MATERIAL_EXPIRY_UPLOAD_LOG_FAIL]:materialExpiryUploadLogFailReducer,
    [NON_COMPLIANCE_EXCEL_START]:nonComplianceExcelStartReducer,
    [NON_COMPLIANCE_EXCEL_SUCCESS]:nonComplianceExcelSuccessReducer,
    [NON_COMPLIANCE_EXCEL_FAIL]:nonComplianceExcelFailReducer,
    [OVER_SAMPLING_EXCEL_START]:overSamplingExcelStartReducer,
    [OVER_SAMPLING_EXCEL_SUCCESS]:overSamplingExcelSuccessReducer,
    [OVER_SAMPLING_EXCEL_FAIL]:overSamplingExcelFailReducer,
    [OVER_SAMPLING_DETAILS_EXCEL_SUCCESS]:overSamplingDetailsExcelSuccessReducer,
    [OVER_SAMPLING_DETAILS_EXCEL_START]:overSamplingDetailsExcelStartReducer,
    [OVER_SAMPLING_DETAILS_EXCEL_FAIL]:overSamplingDetailsExcelFailReducer,
    [MATERIAL_EXPIRY_EXCEL_START]:materialExpiryExcelStartReducer,
    [MATERIAL_EXPIRY_EXCEL_SUCCESS]:materialExpiryExcelSuccessReducer,
    [MATERIAL_EXPIRY_EXCEL_FAIL]:materialExpiryExcelFailReducer,
    [NON_COMPLIANCE_UPLOAD_START]: nonComplianceUploadStartReducer,
    [NON_COMPLIANCE_UPLOAD_SUCCESS]: nonComplianceUploadSuccessReducer,
    [NON_COMPLIANCE_UPLOAD_FAIL]: nonComplianceUploadFailReducer,
    [OVER_SAMPLING_UPLOAD_START]: overSamplingUploadStartReducer,
    [OVER_SAMPLING_UPLOAD_SUCCESS]: overSamplingUploadSuccessReducer,
    [OVER_SAMPLING_UPLOAD_FAIL]: overSamplingUploadFailReducer,
    [OVER_SAMPLING_DETAILS_UPLOAD_START]: overSamplingDetailsUploadStartReducer,
    [OVER_SAMPLING_DETAILS_UPLOAD_SUCCESS]: overSamplingDetailsUploadSuccessReducer,
    [OVER_SAMPLING_DETAILS_UPLOAD_FAIL]: overSamplingDetailsUploadFailReducer,
    [MATERIAL_EXPIRY_UPLOAD_START]: materialExpiryUploadStartReducer,
    [MATERIAL_EXPIRY_UPLOAD_SUCCESS]: materialExpiryUploadSuccessReducer,
    [MATERIAL_EXPIRY_UPLOAD_FAIL]: materialExpiryUploadFailReducer
})
