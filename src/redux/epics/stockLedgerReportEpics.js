import {GET_STOCK_LEDGER_REPORT_START} from '../actions/reports/stockLedgerReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {getStockLedgerReportSuccessAction,getStockLedgerReportFailAction} from '../actions/reports/stockLedgerReportActions'
import {stockLedgerReportRequest} from '../../api/reportRequests'
import {getStockLedgerReportStartAction} from "../actions/reports/stockLedgerReportActions";



//STOCK_LEDGER REPORT EPICS

export const getStockLedgerReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_STOCK_LEDGER_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            stockLedgerReportRequest(action.payload).pipe(
                map((listResponse) => getStockLedgerReportSuccessAction({stockLedgerList: listResponse.response})),
                catchError((error) => of(getStockLedgerReportFailAction({error: error}))),
            )
        )
    )
