import {GET_PURCHASE_REPORT_START} from '../actions/reports/purchaseReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getPurchaseReportSuccessAction,getPurchaseReportFailAction} from '../actions/reports/purchaseReportActions'
import { purchaseReportRequest } from '../../api/reportRequests'



//PURCHASE REPORT EPICS

export const getPurchaseReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PURCHASE_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            purchaseReportRequest(action.payload).pipe(
                map((listResponse) => getPurchaseReportSuccessAction({purchaseList: listResponse.response})),
                catchError((error) => of(getPurchaseReportFailAction({error: error}))),
            )
        )
    )
