import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {GET_COMPLIANCE_DETAILS_START, GET_MAIL_LOG_START, GET_NON_COMPLIANCE_START} from "../actions/compliance/nonComplianceActionConstants";
import {complianceDetailsRequest, nonComplianceRequest, optimalMailRequest} from "../../api/complianceRequests";
import {getComplianceDetailsFailAction, getComplianceDetailsSuccessAction, getMailLogFailAction, getMailLogStartAction, getMailLogSuccessAction, getNonComplianceFailAction, getNonComplianceSuccessAction} from "../actions/compliance/nonComplianceActions";


//NON COMPLIANCE
export const getNonComplianceStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_NON_COMPLIANCE_START),
        debounceTime(4000),
        switchMap((action) =>
            nonComplianceRequest(action.payload).pipe(
                map((listResponse) => getNonComplianceSuccessAction({nonComplianceList: listResponse.response})),
                catchError((error) => of(getNonComplianceFailAction({error: error}))),
            )
        )
    )


//COMPLIANCE
export const getComplianceDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_COMPLIANCE_DETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            complianceDetailsRequest(action.payload).pipe(
                map((listResponse) => getComplianceDetailsSuccessAction({complianceDetailsList: listResponse.response})),
                catchError((error) => of(getComplianceDetailsFailAction({error: error}))),
            )
        )
    )


//MAIL LOG
export const getMailLogStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MAIL_LOG_START),
        debounceTime(4000),
        switchMap((action) =>
            optimalMailRequest(action.payload).pipe(
                map((listResponse) => getMailLogSuccessAction({mailLogList: listResponse.response})),
                catchError((error) => of(getMailLogFailAction({error: error}))),
            )
        )
    )
