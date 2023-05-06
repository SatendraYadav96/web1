import {GET_SIMPLE_INVENTORY_REPORT_START} from '../actions/reports/simpleInventoryReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {getSimpleInventoryReportSuccessAction,getSimpleInventoryReportFailAction} from '../actions/reports/simpleInventoryReportActions'
import { simpleInventoryReportRequest } from '../../api/reportRequests'


//SIMPLE_INVENTORY REPORT EPICS
export const getSimpleInventoryReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SIMPLE_INVENTORY_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            simpleInventoryReportRequest(action.payload).pipe(
                map((listResponse) => getSimpleInventoryReportSuccessAction({simpleInventoryList: listResponse.response})),
                catchError((error) => of(getSimpleInventoryReportFailAction({error: error}))),
            )
        )
    )
