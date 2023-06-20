import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {transportUploadFailAction, transportUploadStartAction, transportUploadSuccessAction} from "../actions/upload/uploadActions";
import {TRANSPORT_UPLOAD_START} from "../actions/upload/uploadActionConstants";
import {transportUploadRequest} from "../../api/uploadRequests";


// ADD BUISNESS UNIT

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
