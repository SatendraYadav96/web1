import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {ffUploadFailAction, ffUploadSuccessAction, grnUploadFailAction, grnUploadSuccessAction, transportUploadFailAction, transportUploadStartAction, transportUploadSuccessAction, virtualUploadFailAction, virtualUploadSuccessAction} from "../actions/upload/uploadActions";
import {FF_UPLOAD_START, TRANSPORT_UPLOAD_START, VIRTUAL_UPLOAD_START} from "../actions/upload/uploadActionConstants";
import {ffUploadRequest, transportUploadRequest, virtualUploadRequest} from "../../api/uploadRequests";
import {GRN_UPLOAD_START} from "../actions/upload/uploadActionConstants";
import {grnUploadRequest} from "../../api/grnRequests";


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

