import {GET_RECIPIENT_REPORT_START} from '../actions/reports/recipientReportActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getRecipientReportSuccessAction,getRecipientReportFailAction} from '../actions/reports/recipientReportActions'
import { recipientReportRequest } from '../../api/reportRequests'



//RECIPIENT REPORT EPICS

export const getRecipientReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_RECIPIENT_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            recipientReportRequest(action.payload).pipe(
                map((listResponse) => getRecipientReportSuccessAction({recipientList: listResponse.response})),
                catchError((error) => of(getRecipientReportFailAction({error: error}))),
            )
        )
    )
