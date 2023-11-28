import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {batchReconciliationReportRequest, getShipRocketReportRequest, getVirtualReconciliationReportRequest, overSamplingMailRequest, recipientReportRequest} from '../../api/reportRequests'
import {GET_BATCH_RECONCILIATION_START, GET_SHIP_ROCKET_REPORT_START, GET_VIRTUAL_RECONCILIATION_REPORT_START, OVER_SAMPLING_MAIL_START} from "../actions/reports/batchReconciliationReportActionConstants";
import {
    getBatchReconciliationFailAction,
    getBatchReconciliationSuccessAction,
    getShipRocketReportFailAction,
    getShipRocketReportSuccessAction,
    getVirtualReconciliationReportFailAction,
    getVirtualReconciliationReportSuccessAction, overSamplingMailFailAction,
    overSamplingMailSuccessAction
} from "../actions/reports/batchReconciliationReportActions";
import {SEND_OVERSAMPLING_MAIL_API} from "../../api/apiConstants";



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
                map((response) => getVirtualReconciliationReportSuccessAction({virtualReconciliationList: response.response})),
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
                map((response) => getShipRocketReportSuccessAction({shipRocketReport: response.response})),
                catchError((error) => of(getShipRocketReportFailAction({error: error}))),
            )
        )
    )


export const overSamplingMailStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_MAIL_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingMailRequest(action.payload).pipe(
                map((listResponse) => overSamplingMailSuccessAction({overSamplingMail: listResponse.response})),
                catchError((error) => of(overSamplingMailFailAction({error: error}))),
            )
        )
    )
