import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import { virtualDispatchRequest,virtualDispatchDetailsRequest } from '../../api/virtualDispatchRequests'
import {GET_VIRTUAL_DISPATCH_DETAILS_FAIL, GET_VIRTUAL_DISPATCH_DETAILS_START, GET_VIRTUAL_DISPATCH_START} from "../actions/dispatchInvoice/virtualDispatchActionConstants";
import {getVirtualDispatchDetailsFailAction, getVirtualDispatchDetailsSuccessAction, getVirtualDispatchFailAction, getVirtualDispatchSuccessAction} from "../actions/dispatchInvoice/virtualDispatchAction";



//Virtual Dispatch


export const getVirtualDispatchStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_DISPATCH_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualDispatchRequest(action.payload).pipe(
                map((listResponse) => getVirtualDispatchSuccessAction({virtualData: listResponse.response})),
                catchError((error) => of(getVirtualDispatchFailAction({error: error}))),
            )
        )
    )


export const getVirtualDispatchDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_DISPATCH_DETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualDispatchDetailsRequest(action.payload).pipe(
                map((listResponse) => getVirtualDispatchDetailsSuccessAction({virtualDispatchDetails: listResponse.response})),
                catchError((error) => of(getVirtualDispatchDetailsFailAction({error: error}))),
            )

        )
    )

