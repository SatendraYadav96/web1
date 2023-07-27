import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {batchReconciliationReportRequest, recipientReportRequest} from '../../api/reportRequests'
import {GET_BATCH_RECONCILIATION_START} from "../actions/reports/batchReconciliationReportActionConstants";
import {getBatchReconciliationFailAction, getBatchReconciliationSuccessAction} from "../actions/reports/batchReconciliationReportActions";



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
