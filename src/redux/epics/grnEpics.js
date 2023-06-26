import { ofType } from 'redux-observable'
import { catchError, debounceTime, map, of, switchMap } from 'rxjs'
import { uiMenuFailAction, uiMenuSuccessAction } from '../actions/ui/uiActions'
import {APPROVE_ACKNOWLEDGE_START, REJECT_ACKNOWLEDGE_START, UNACKNOWLEDGE_LIST_START,GRN_UPLOAD_START} from "../actions/grn/grnActionConstants";
import {approveAcknowledgeRequest, rejectAcknowledgeRequest, unacknowledgeListRequest,grnUploadRequest} from "../../api/grnRequests";
import {
    approveAcknowledgeFailAction, approveAcknowledgeSuccessAction, rejectAcknowledgeFailAction, rejectAcknowledgeSuccessAction, unacknowledgeListFailAction, unacknowledgeListSuccessAction,
    grnUploadSuccessAction, grnUploadFailAction, grnSuccessAction, grnFailAction
} from "../actions/grn/grnActions";

export const unacknowledgeListStartEpic = (action$) =>
  action$.pipe(
    ofType(UNACKNOWLEDGE_LIST_START),
    debounceTime(4000),
    switchMap((action) =>
        unacknowledgeListRequest(action.payload).pipe(
        map((listResponse) => unacknowledgeListSuccessAction({ unacknowledges: listResponse.response })),
        catchError((error) => of(unacknowledgeListFailAction({ error: error }))),
      ),
    ),
  )

export const rejectAcknowledgeStartEpic = (action$) =>
    action$.pipe(
        ofType(REJECT_ACKNOWLEDGE_START),
        debounceTime(4000),
        switchMap((action) =>
            rejectAcknowledgeRequest(action.payload).pipe(
            map((listResponse) => rejectAcknowledgeSuccessAction({rejectAcknowledge: listResponse.response})),
                catchError((error) => of(rejectAcknowledgeFailAction({error: error}))),
            )
        )
    )

export const approveAcknowledgeStartEpic = (action$) =>
    action$.pipe(
        ofType(APPROVE_ACKNOWLEDGE_START),
        debounceTime(4000),
        switchMap((action) =>
            approveAcknowledgeRequest(action.payload).pipe(
                map((listResponse) => approveAcknowledgeSuccessAction({approveAcknowledge: listResponse.response})),
                catchError((error) => of(approveAcknowledgeFailAction({error: error}))),
            )
        )
    )



export const grnStartEpic = (action$) =>
    action$.pipe(
        ofType(GRN_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            grnUploadRequest(action.payload).pipe(
                map((listResponse) => grnSuccessAction({grnUpload: listResponse.response})),
                catchError((error) => of(grnFailAction({error: error}))),
            )
        )
    )
