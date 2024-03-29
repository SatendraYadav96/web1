import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {
    ffExcelUploadFailAction,
    ffExcelUploadSuccessAction,
    ffUploadFailAction,
    ffUploadLogFailAction,
    ffUploadLogSuccessAction,
    ffUploadSuccessAction,
    grnExcelUploadFailAction,
    grnExcelUploadSuccessAction,
    grnUploadFailAction,
    grnUploadSuccessAction,
    invoiceExcelUploadFailAction,
    invoiceExcelUploadSuccessAction,
    invoiceUploadFailAction,
    invoiceUploadSuccessAction, materialExpiryExcelFailAction, materialExpiryExcelSuccessAction, materialExpiryUploadFailAction,
    materialExpiryUploadLogFailAction,
    materialExpiryUploadLogSuccessAction, materialExpiryUploadSuccessAction,
    nonComplianceExcelFailAction,
    nonComplianceExcelSuccessAction, nonComplianceUploadFailAction,
    nonComplianceUploadLogFailAction,
    nonComplianceUploadLogSuccessAction, nonComplianceUploadSuccessAction,
    overSamplingDetailsExcelFailAction,
    overSamplingDetailsExcelSuccessAction, overSamplingDetailsUploadFailAction,
    overSamplingDetailsUploadLogFailAction,
    overSamplingDetailsUploadLogSuccessAction, overSamplingDetailsUploadSuccessAction,
    overSamplingExcelFailAction,
    overSamplingExcelSuccessAction, overSamplingUploadFailAction,
    overSamplingUploadLogFailAction,
    overSamplingUploadLogSuccessAction, overSamplingUploadSuccessAction,
    recipientUploadLogFailAction,
    recipientUploadLogSuccessAction,
    transportExcelUploadFailAction,
    transportExcelUploadSuccessAction,
    transportUploadFailAction,
    transportUploadStartAction,
    transportUploadSuccessAction,
    virtualSampleFailAction,
    virtualSampleLogFailAction,
    virtualSampleLogSuccessAction,
    virtualSampleSuccessAction,
    virtualUploadFailAction,
    virtualUploadSuccessAction
} from "../actions/upload/uploadActions";
import {
    FF_EXCEL_UPLOAD_START,
    FF_UPLOAD_LOG_START,
    FF_UPLOAD_START,
    GRN_EXCEL_UPLOAD_START,
    INVOICE_EXCEL_UPLOAD_START,
    INVOICE_UPLOAD_START,
    MATERIAL_EXPIRY_EXCEL_START,
    MATERIAL_EXPIRY_UPLOAD_LOG_START, MATERIAL_EXPIRY_UPLOAD_START,
    NON_COMPLIANCE_EXCEL_START,
    NON_COMPLIANCE_UPLOAD_LOG_START, NON_COMPLIANCE_UPLOAD_START,
    OVER_SAMPLING_DETAILS_EXCEL_START,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_START, OVER_SAMPLING_DETAILS_UPLOAD_START,
    OVER_SAMPLING_EXCEL_START,
    OVER_SAMPLING_UPLOAD_LOG_START, OVER_SAMPLING_UPLOAD_START,
    RECIPIENT_UPLOAD_LOG_START,
    TRANSPORT_EXCEL_UPLOAD_START,
    TRANSPORT_UPLOAD_START,
    VIRTUAL_SAMPLE_UPLOAD_LOG_START,
    VIRTUAL_SAMPLE_UPLOAD_START,
    VIRTUAL_UPLOAD_START
} from "../actions/upload/uploadActionConstants";
import {
    ffUploadRequest,
    grnExcelUploadRequest,
    transportExcelUploadRequest,
    transportUploadRequest,
    virtualUploadRequest,
    invoicesUploadRequest,
    grnUploadRequest,
    invoiceExcelUploadRequest,
    virtualSampleRequest,
    virtualSampleLogRequest,
    ffExcelUploadRequest,
    ffUploadLogRequest,
    recipientUploadLogRequest,
    nonComplianceUploadLogRequest,
    overSamplingUploadLogRequest,
    overSamplingDetailsUploadLogRequest,
    materialExpiryUploadLogRequest,
    nonComplianceExcelRequest,
    overSamplingExcelRequest,
    overSamplingDetailsExcelRequest,
    materialExpiryExcelRequest,
    nonComplianceUploadRequest, overSamplingUploadRequest, overSamplingDetailsUploadRequest, materialExpiryUploadRequest
} from "../../api/uploadRequests";
import {GRN_UPLOAD_START} from "../actions/upload/uploadActionConstants";


// TRANSPORT_UPLOAD
export const transportUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(TRANSPORT_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            transportUploadRequest(action.payload).pipe(
                map((listResponse) => transportUploadSuccessAction({transportUpload: listResponse.response})),
                catchError((error) => of(transportUploadFailAction({error: error}))),
            )
        )
    )

// TRANSPORT_EXCEL_UPLOAD
export const transportExcelUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(TRANSPORT_EXCEL_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            transportExcelUploadRequest(action.payload).pipe(
                map((listResponse) => transportExcelUploadSuccessAction({transportExcelUpload: listResponse.response})),
                catchError((error) => of(transportExcelUploadFailAction({error: error}))),
            )
        )
    )

// GRN_UPLOAD
export const grnUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(GRN_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            grnUploadRequest(action.payload).pipe(
                map((listResponse) => grnUploadSuccessAction({grnUpload: listResponse.response})),
                catchError((error) => of(grnUploadFailAction({error: error}))),
            )
        )
    )

// GRN_EXCEL_UPLOAD
export const grnExcelUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(GRN_EXCEL_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            grnExcelUploadRequest(action.payload).pipe(
                map((listResponse) => grnExcelUploadSuccessAction({grnExcelUpload: listResponse.response})),
                catchError((error) => of(grnExcelUploadFailAction({error: error}))),
            )
        )
    )

// FF_UPLOAD
export const ffUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(FF_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            ffUploadRequest(action.payload).pipe(
                map((listResponse) => ffUploadSuccessAction({ffUpload: listResponse.response})),
                catchError((error) => of(ffUploadFailAction({error: error}))),
            )
        )
    )


// VIRTUAL_UPLOAD
export const virtualUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualUploadRequest(action.payload).pipe(
                map((listResponse) => virtualUploadSuccessAction({virtualUpload: listResponse.response})),
                catchError((error) => of(virtualUploadFailAction({error: error}))),
            )
        )
    )


// INVOICE_UPLOAD
export const invoiceUploadsStartEpic = (action$) =>
    action$.pipe(
        ofType(INVOICE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            invoicesUploadRequest(action.payload).pipe(
                map((listResponse) => invoiceUploadSuccessAction({invoiceUpload: listResponse.response})),
                catchError((error) => of(invoiceUploadFailAction({error: error}))),
            )
        )
    )


// INVOICE_EXCEL_UPLOAD
export const invoiceExcelUploadsStartEpic = (action$) =>
    action$.pipe(
        ofType(INVOICE_EXCEL_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            invoiceExcelUploadRequest(action.payload).pipe(
                map((listResponse) => invoiceExcelUploadSuccessAction({invoiceExcelUpload: listResponse.response})),
                catchError((error) => of(invoiceExcelUploadFailAction({error: error}))),
            )
        )
    )


// VIRTUAL_SAMPLE_UPLOAD
export const virtualSampleStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_SAMPLE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualSampleRequest(action.payload).pipe(
                map((listResponse) => virtualSampleSuccessAction({virtualSample: listResponse.response})),
                catchError((error) => of(virtualSampleFailAction({error: error}))),
            )
        )
    )


// VIRTUAL_SAMPLE_UPLOAD_LOG
export const virtualSampleLogStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_SAMPLE_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualSampleLogRequest(action.payload).pipe(
                map((listResponse) => virtualSampleLogSuccessAction({virtualSampleLog: listResponse.response})),
                catchError((error) => of(virtualSampleLogFailAction({error: error}))),
            )
        )
    )

// FF_UPLOAD
export const ffExcelUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(FF_EXCEL_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            ffExcelUploadRequest(action.payload).pipe(
                map((listResponse) => ffExcelUploadSuccessAction({ffExcelUpload: listResponse.response})),
                catchError((error) => of(ffExcelUploadFailAction({error: error}))),
            )
        )
    )


// FF_UPLOAD_LOG
export const ffUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(FF_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            ffUploadLogRequest(action.payload).pipe(
                map((listResponse) => ffUploadLogSuccessAction({ffUploadLog: listResponse.response})),
                catchError((error) => of(ffUploadLogFailAction({error: error}))),
            )
        )
    )

// FF_UPLOAD_LOG
export const recipientUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(RECIPIENT_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            recipientUploadLogRequest(action.payload).pipe(
                map((listResponse) => recipientUploadLogSuccessAction({recipientUploadLog: listResponse.response})),
                catchError((error) => of(recipientUploadLogFailAction({error: error}))),
            )
        )
    )

// FF_UPLOAD_LOG
export const nonComplianceUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(NON_COMPLIANCE_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            nonComplianceUploadLogRequest(action.payload).pipe(
                map((listResponse) => nonComplianceUploadLogSuccessAction({nonComplianceUploadLog: listResponse.response})),
                catchError((error) => of(nonComplianceUploadLogFailAction({error: error}))),
            )
        )
    )



export const overSamplingUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingUploadLogRequest(action.payload).pipe(
                map((listResponse) => overSamplingUploadLogSuccessAction({overSamplingUploadLog: listResponse.response})),
                catchError((error) => of(overSamplingUploadLogFailAction({error: error}))),
            )
        )
    )


export const overSamplingDetailsUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_DETAILS_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingDetailsUploadLogRequest(action.payload).pipe(
                map((listResponse) => overSamplingDetailsUploadLogSuccessAction({overSamplingDetailsUploadLog: listResponse.response})),
                catchError((error) => of(overSamplingDetailsUploadLogFailAction({error: error}))),
            )
        )
    )



export const materialExpiryUploadLogStartEpic = (action$) =>
    action$.pipe(
        ofType(MATERIAL_EXPIRY_UPLOAD_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            materialExpiryUploadLogRequest(action.payload).pipe(
                map((listResponse) => materialExpiryUploadLogSuccessAction({materialExpiryUploadLog: listResponse.response})),
                catchError((error) => of(materialExpiryUploadLogFailAction({error: error}))),
            )
        )
    )



export const nonComplianceExcelStartEpic = (action$) =>
    action$.pipe(
        ofType(NON_COMPLIANCE_EXCEL_START),
        debounceTime(4000),
        switchMap((action) =>
            nonComplianceExcelRequest(action.payload).pipe(
                map((listResponse) => nonComplianceExcelSuccessAction({nonComplianceExcel: listResponse.response})),
                catchError((error) => of(nonComplianceExcelFailAction({error: error}))),
            )
        )
    )



export const overSamplingExcelStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_EXCEL_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingExcelRequest(action.payload).pipe(
                map((listResponse) => overSamplingExcelSuccessAction({overSamplingExcel: listResponse.response})),
                catchError((error) => of(overSamplingExcelFailAction({error: error}))),
            )
        )
    )



export const overSamplingDetailsExcelStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_DETAILS_EXCEL_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingDetailsExcelRequest(action.payload).pipe(
                map((listResponse) => overSamplingDetailsExcelSuccessAction({overSamplingDetailsExcel: listResponse.response})),
                catchError((error) => of(overSamplingDetailsExcelFailAction({error: error}))),
            )
        )
    )


export const materialExpiryExcelStartEpic = (action$) =>
    action$.pipe(
        ofType(MATERIAL_EXPIRY_EXCEL_START),
        debounceTime(4000),
        switchMap((action) =>
            materialExpiryExcelRequest(action.payload).pipe(
                map((listResponse) => materialExpiryExcelSuccessAction({materialExpiryExcel: listResponse.response})),
                catchError((error) => of(materialExpiryExcelFailAction({error: error}))),
            )
        )
    )

export const nonComplianceUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(NON_COMPLIANCE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            nonComplianceUploadRequest(action.payload).pipe(
                map((listResponse) => nonComplianceUploadSuccessAction({nonComplianceUpload: listResponse.response})),
                catchError((error) => of(nonComplianceUploadFailAction({error: error}))),
            )
        )
    )

export const overSamplingUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingUploadRequest(action.payload).pipe(
                map((listResponse) => overSamplingUploadSuccessAction({overSamplingUpload: listResponse.response})),
                catchError((error) => of(overSamplingUploadFailAction({error: error}))),
            )
        )
    )

export const overSamplingDetailsUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_DETAILS_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingDetailsUploadRequest(action.payload).pipe(
                map((listResponse) => overSamplingDetailsUploadSuccessAction({overSamplingDetailsUpload: listResponse.response})),
                catchError((error) => of(overSamplingDetailsUploadFailAction({error: error}))),
            )
        )
    )

export const materialExpiryUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(MATERIAL_EXPIRY_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            materialExpiryUploadRequest(action.payload).pipe(
                map((listResponse) => materialExpiryUploadSuccessAction({materialExpiryUpload: listResponse.response})),
                catchError((error) => of(materialExpiryUploadFailAction({error: error}))),
            )
        )
    )
