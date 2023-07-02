import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {
    ffUploadFailAction,
    ffUploadSuccessAction, grnExcelUploadFailAction,
    grnExcelUploadSuccessAction,
    grnUploadFailAction,
    grnUploadSuccessAction,
    transportUploadFailAction,
    transportUploadStartAction,
    transportUploadSuccessAction,
    virtualUploadFailAction,
    virtualUploadSuccessAction
} from "../actions/upload/uploadActions";
import {FF_UPLOAD_START, GRN_EXCEL_UPLOAD_START, TRANSPORT_UPLOAD_START, VIRTUAL_UPLOAD_START} from "../actions/upload/uploadActionConstants";
import {ffUploadRequest, grnExcelUploadRequest, transportUploadRequest, virtualUploadRequest} from "../../api/uploadRequests";
import {GRN_UPLOAD_START} from "../actions/upload/uploadActionConstants";
import {grnUploadRequest} from "../../api/uploadRequests";


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

