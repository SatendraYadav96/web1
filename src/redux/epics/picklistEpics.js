import {GET_PICKING_LIST_START, GET_PICKLIST_START, GET_PICKLIST_VIRTUAL_START} from '../actions/dispatchInvoice/picklistActionConstant'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getPicklistSuccessAction, getPicklistFailAction, getPickinglistSuccessAction, getPickinglistFailAction, getPicklistVirtualSuccessAction, getPicklistVirtualFailAction
} from '../actions/dispatchInvoice/picklistAction'
import {pickingListRequest, pickListRequest, pickListVirtualRequest} from '../../api/pickingListRequests'


export const getPickinglistStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PICKING_LIST_START),
        debounceTime(4000),
        switchMap((action) =>
            pickingListRequest(action.payload).pipe(
                map((listResponse) => getPickinglistSuccessAction({pickinglist: listResponse.response})),
                catchError((error) => of(getPickinglistFailAction({error: error}))),
            )
        )
    )

export const getPicklistStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PICKLIST_START),
        debounceTime(4000),
        switchMap((action) =>
            pickListRequest(action.payload).pipe(
                map((listResponse) => getPicklistSuccessAction({picklist: listResponse.response})),
                catchError((error) => of(getPicklistFailAction({error: error}))),
            )
        )
    )

export const getPicklistVirtualStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PICKLIST_VIRTUAL_START),
        debounceTime(4000),
        switchMap((action) =>
            pickListVirtualRequest(action.payload).pipe(
                map((listResponse) => getPicklistVirtualSuccessAction({picklistVirtual: listResponse.response})),
                catchError((error) => of(getPicklistVirtualFailAction({error: error}))),
            )
        )
    )

