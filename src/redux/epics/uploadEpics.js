import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {
    ffExcelUploadFailAction,
    ffExcelUploadSuccessAction,
    ffUploadFailAction, ffUploadLogFailAction, ffUploadLogSuccessAction,
    ffUploadSuccessAction, grnExcelUploadFailAction,
    grnExcelUploadSuccessAction,
    grnUploadFailAction,
    grnUploadSuccessAction, invoiceExcelUploadFailAction, invoiceExcelUploadSuccessAction, invoiceUploadFailAction, invoiceUploadSuccessAction, transportExcelUploadFailAction, transportExcelUploadSuccessAction,
    transportUploadFailAction,
    transportUploadStartAction,
    transportUploadSuccessAction, virtualSampleFailAction, virtualSampleLogFailAction, virtualSampleLogSuccessAction, virtualSampleSuccessAction,
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
    ffUploadLogRequest
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

