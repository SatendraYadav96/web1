import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {batchReconciliationReportRequest, getShipRocketReportRequest, getVirtualReconciliationReportRequest, recipientReportRequest} from '../../api/reportRequests'
import {GET_BATCH_RECONCILIATION_START, GET_SHIP_ROCKET_REPORT_START, GET_VIRTUAL_RECONCILIATION_REPORT_START} from "../actions/reports/batchReconciliationReportActionConstants";
import {getBatchReconciliationFailAction, getBatchReconciliationSuccessAction, getShipRocketReportFailAction, getShipRocketReportSuccessAction, getVirtualReconciliationReportFailAction, getVirtualReconciliationReportSuccessAction} from "../actions/reports/batchReconciliationReportActions";



//RECIPIENT REPORT EPICS

export const getBatchReconciliationReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_BATCH_RECONCILIATION_START),
        debounceTime(4000),
        switchMap((action) =>
            batchReconciliationReportRequest(action.payload).pipe(
                map((listResponse) => getBatchReconciliationSuccessAction({batchReconciliationList: listResponse.response})),
                catchError((error) => of(getBatchReconciliationFailAction({error: error}))),
            )
        )
    )

export const getVirtualReconciliationReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_RECONCILIATION_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            getVirtualReconciliationReportRequest(action.payload).pipe(
                map((response) => getVirtualReconciliationReportSuccessAction({getVirtualReconciliationList: response.response})),
                catchError((error) => of(getVirtualReconciliationReportFailAction({error: error}))),
            )
        )
    )

export const getShipRocketReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SHIP_ROCKET_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            getShipRocketReportRequest(action.payload).pipe(
                map((response) => getShipRocketReportSuccessAction({getShipRocketReport: response.response})),
                catchError((error) => of(getShipRocketReportFailAction({error: error}))),
            )
        )
    )

