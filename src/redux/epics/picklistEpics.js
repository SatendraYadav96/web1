import {GET_PICKLIST_START} from '../actions/dispatchInvoice/picklistActionConstant'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getPicklistSuccessAction,getPicklistFailAction
} from '../actions/dispatchInvoice/picklistAction'
import { pickingListRequest } from '../../api/pickingListRequests'


export const getPicklistStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PICKLIST_START),
        debounceTime(4000),
        switchMap((action) =>
            pickingListRequest(action.payload).pipe(
                map((listResponse) => getPicklistSuccessAction({picklist: listResponse.response})),
                catchError((error) => of(getPicklistFailAction({error: error}))),
            )
        )
    )
