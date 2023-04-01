import {GET_ITEM_CONSUMPTION_REPORT_START} from '../actions/reports/itemConsumptionReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getItemConsumptionReportSuccessAction,getItemConsumptionReportFailAction} from '../actions/reports/itemConsumptionReportActions'
import { itemConsumptionReportRequest } from '../../api/reportRequests'



//ITEM CONSUMPTION REPORT EPICS

export const getItemConsumptionReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ITEM_CONSUMPTION_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            itemConsumptionReportRequest(action.payload).pipe(
                map((listResponse) => getItemConsumptionReportSuccessAction({consumptionList: listResponse.response})),
                catchError((error) => of(getItemConsumptionReportFailAction({error: error}))),
            )
        )
    )
