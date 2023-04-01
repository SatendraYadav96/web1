import {GET_SPECIALDISPATCH_START,GET_SPECIALEMPLOYEEINVOICEDETAILS_START} from '../actions/dispatchInvoice/specialDispatchActionConstant'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getSpecialDispatchSuccessAction,getSpecialDispatchFailAction,getSpecialEmployeeInvoiceDetailSuccessAction,
getSpecialEmployeeInvoiceDetailFailAction} from '../actions/dispatchInvoice/specialDispatchAction'
import { specialDispatchRequest,specialEmployeeInvoiceDetailsRequest } from '../../api/specialDispatchRequests'



//Special Dispatch


export const getSpecialDispatchStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SPECIALDISPATCH_START),
        debounceTime(4000),
        switchMap((action) =>
            specialDispatchRequest(action.payload).pipe(
                map((listResponse) => getSpecialDispatchSuccessAction({specialData: listResponse.response})),
                catchError((error) => of(getSpecialDispatchFailAction({error: error}))),
            )

        )
    )




export const getSpecialEmployeeInvoiceDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SPECIALEMPLOYEEINVOICEDETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            specialEmployeeInvoiceDetailsRequest(action.payload).pipe(
                map((listResponse) => getSpecialEmployeeInvoiceDetailSuccessAction({specialInvoiceDetails: listResponse.response})),
                catchError((error) => of(getSpecialEmployeeInvoiceDetailFailAction({error: error}))),
            )

        )
    )

