import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getNearToExpiryInputReportSuccessAction,getNearToExpiryInputReportFailAction} from '../actions/reports/nearToExpiryInputReportActions'
import {nearToExpiryInputReportRequest} from '../../api/reportRequests'
import {GET_NEAR_TO_EXPIRY_INPUT_REPORT_START} from "../actions/reports/nearToExpiryInputReportActionConstants";



//NEAR TO EXPIRY REPORT EPICS

export const getNearToExpiryInputReportStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_NEAR_TO_EXPIRY_INPUT_REPORT_START),
        debounceTime(4000),
        switchMap((action) =>
            nearToExpiryInputReportRequest(action.payload).pipe(
                map((listResponse) => getNearToExpiryInputReportSuccessAction({nearToExpiryInputList: listResponse.response})),
                catchError((error) => of(getNearToExpiryInputReportFailAction({error: error}))),
            )
        )
    )
