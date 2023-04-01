import {GET_DISPATCH_REGISTER_REPORT_START} from '../actions/reports/dispatchRegisterReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getDispatchRegisterReportSuccessAction,getDispatchRegisterReportFailAction} from '../actions/reports/dispatchRegisterReportActions'
import { dispatchRegisterReportRequest } from '../../api/reportRequests'



//DISPATCHES REPORT EPICS

export const getDispatchRegisterReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_DISPATCH_REGISTER_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            dispatchRegisterReportRequest(action.payload).pipe(
                map((listResponse) => getDispatchRegisterReportSuccessAction({dispatchRegisterList: listResponse.response})),
                catchError((error) => of(getDispatchRegisterReportFailAction({error: error}))),
            )
        )
    )
