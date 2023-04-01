import {GET_DESTRUCTION_REPORT_START} from '../actions/reports/destructionReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getDestructionReportSuccessAction,getDestructionReportFailAction} from '../actions/reports/destructionReportActions'
import { destructionReportRequest } from '../../api/reportRequests'



//DESTRUCTION REPORT EPICS

export const getDestructionReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_DESTRUCTION_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            destructionReportRequest(action.payload).pipe(
                map((listResponse) => getDestructionReportSuccessAction({destructionList: listResponse.response})),
                catchError((error) => of(getDestructionReportFailAction({error: error}))),
            )
        )
    )
