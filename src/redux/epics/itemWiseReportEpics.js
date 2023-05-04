import {GET_ITEM_WISE_REPORT_START} from '../actions/reports/itemWiseReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getItemWiseReportSuccessAction,getItemWiseReportFailAction} from '../actions/reports/itemWiseReportActions'
import { itemWiseReportRequest } from '../../api/reportRequests'



//ITEM_WISE REPORT EPICS

export const getItemWiseReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ITEM_WISE_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            itemWiseReportRequest(action.payload).pipe(
                map((listResponse) => getItemWiseReportSuccessAction({itemWiseList: listResponse.response})),
                catchError((error) => of(getItemWiseReportFailAction({error: error}))),
            )
        )
    )
