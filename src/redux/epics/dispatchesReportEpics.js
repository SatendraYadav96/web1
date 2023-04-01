import {GET_DISPATCHES_REPORT_START} from '../actions/reports/dispatchesReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getDispatchesReportSuccessAction,getDispatchesReportFailAction} from '../actions/reports/dispatchesReportActions'
import { dispatchesReportRequest } from '../../api/reportRequests'



//DISPATCHES REPORT EPICS

export const getDispatchesReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_DISPATCHES_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            dispatchesReportRequest(action.payload).pipe(
                map((listResponse) => getDispatchesReportSuccessAction({dispatchesList: listResponse.response})),
                catchError((error) => of(getDispatchesReportFailAction({error: error}))),
            )
        )
    )
