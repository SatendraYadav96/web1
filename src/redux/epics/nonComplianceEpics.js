import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {GET_COMPLIANCE_DETAILS_START, GET_MAIL_LOG_START, GET_NON_COMPLIANCE_START, OVER_SAMPLING_DETAILS_DATA_START, SAVE_NON_COMPLIANCE_ADMIN_REMARK_START, SAVE_OVER_SAMPLING_START} from "../actions/compliance/nonComplianceActionConstants";
import {complianceDetailsRequest, nonComplianceRequest, optimalMailLogRequest, optimalMailRequest, overSamplingDetailsDataRequest, saveNonComplianceAdminRemarkRequest, saveOverSamplingRequest} from "../../api/complianceRequests";
import {
    getComplianceDetailsFailAction,
    getComplianceDetailsSuccessAction,
    getMailLogFailAction,
    getMailLogStartAction,
    getMailLogSuccessAction,
    getNonComplianceFailAction,
    getNonComplianceSuccessAction, overSamplingDetailsDataFailAction, overSamplingDetailsDataSuccessAction,
    saveNonComplianceFailAction,
    saveNonComplianceSuccessAction, saveOverSamplingFailAction, saveOverSamplingSuccessAction
} from "../actions/compliance/nonComplianceActions";


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
            optimalMailLogRequest(action.payload).pipe(
                map((listResponse) => getMailLogSuccessAction({mailLogList: listResponse.response})),
                catchError((error) => of(getMailLogFailAction({error: error}))),
            )
        )
    )

export const saveNonComplianceAdminRemarkStartEpic = (action$) =>
    action$.pipe(
        ofType(SAVE_NON_COMPLIANCE_ADMIN_REMARK_START),
        debounceTime(4000),
        switchMap((action) =>
            saveNonComplianceAdminRemarkRequest(action.payload).pipe(
                map((listResponse) => saveNonComplianceSuccessAction({saveNonComplianceAdminRemark: listResponse.response})),
                catchError((error) => of(saveNonComplianceFailAction({error: error}))),
            )
        )
    )

export const saveOverSamplingStartEpic = (action$) =>
    action$.pipe(
        ofType(SAVE_OVER_SAMPLING_START),
        debounceTime(4000),
        switchMap((action) =>
            saveOverSamplingRequest(action.payload).pipe(
                map((listResponse) => saveOverSamplingSuccessAction({saveOverSampling: listResponse.response})),
                catchError((error) => of(saveOverSamplingFailAction({error: error}))),
            )
        )
    )

export const overSamplingDetailsDataStartEpic = (action$) =>
    action$.pipe(
        ofType(OVER_SAMPLING_DETAILS_DATA_START),
        debounceTime(4000),
        switchMap((action) =>
            overSamplingDetailsDataRequest(action.payload).pipe(
                map((listResponse) => overSamplingDetailsDataSuccessAction({overSamplingDetailData: listResponse.response})),
                catchError((error) => of(overSamplingDetailsDataFailAction({error: error}))),
            )
        )
    )

