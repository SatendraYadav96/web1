import {GET_DEVIATION_REPORT_START} from '../actions/reports/deviationReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getDeviationReportSuccessAction,getDeviationReportFailAction} from '../actions/reports/deviationReportActions'
import { deviationReportRequest } from '../../api/reportRequests'



//DEVIATION REPORT EPICS

export const getDeviationReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_DEVIATION_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            deviationReportRequest(action.payload).pipe(
                map((listResponse) => getDeviationReportSuccessAction({deviationList: listResponse.response})),
                catchError((error) => of(getDeviationReportFailAction({error: error}))),
            )
        )
    )
