import {GET_AGEING_REPORT_START} from '../actions/reports/ageingReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getAgeingReportSuccessAction,getAgeingReportFailAction} from '../actions/reports/ageingReportActions'
import { ageingReportRequest } from '../../api/reportRequests'



//AGEING REPORT EPICS

export const getAgeingReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_AGEING_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            ageingReportRequest(action.payload).pipe(
                map((listResponse) => getAgeingReportSuccessAction({ageingList: listResponse.response})),
                catchError((error) => of(getAgeingReportFailAction({error: error}))),
            )
        )
    )
