import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    APPROVE_PLAN_START,
    GET_MONTHLY_APPROVAL_DETAILS_START,
    GET_MONTHLY_APPROVAL_START,
    GET_SPECIAL_PLAN_APPROVAL_DETAILS_START,
    GET_SPECIAL_PLAN_APPROVAL_START, GET_VIRTUAL_APPROVAL_DOWNLOAD_START, GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START, GET_VIRTUAL_PLAN_APPROVAL_START,
    MONTHLY_TO_SPECIAL_START,
    REJECT_PLAN_START,
    RESET_PLAN_START,
    UNLOCK_PLAN_START
} from "../actions/approval/monthlyApprovalActionConstants";
import {
    approvePlanRequest, getVirtualApprovalDownload,
    monthlyApprovalDetailsRequest,
    monthlyApprovalRequest,
    monthlyToSpecialRequest,
    rejectPlanRequest,
    resetPlanRequest,
    specialPlanApprovalDetailsRequest,
    specialPlanApprovalRequest,
    unlockPlanRequest,
    virtualPlanApprovalDetailsRequest,
    virtualPlanApprovalRequest
} from "../../api/approvalRequests";
import {
    approvePlanFailAction,
    approvePlanSuccessAction,
    getMonthlyApprovalDetailsFailAction,
    getMonthlyApprovalDetailsSuccessAction,
    getMonthlyApprovalFailAction,
    getMonthlyApprovalSuccessAction, monthlyToSpecialFailAction, monthlyToSpecialSuccessAction, rejectPlanFailAction, rejectPlanSuccessAction,
    resetPlanFailAction,
    resetPlanSuccessAction, specialPlanApprovalDetailsFailAction, specialPlanApprovalDetailsSuccessAction, specialPlanApprovalFailAction, specialPlanApprovalSuccessAction,
    unlockPlanFailAction,
    unlockPlanSuccessAction, virtualApprovalDownloadFailAction, virtualApprovalDownloadSuccessAction, virtualPlanApprovalDetailsFailAction, virtualPlanApprovalDetailsSuccessAction, virtualPlanApprovalFailAction, virtualPlanApprovalSuccessAction
} from "../actions/approval/monthlyApprovalActions";

//MONTHLY APPROVAL
export const getMonthlyApprovalStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MONTHLY_APPROVAL_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyApprovalRequest(action.payload).pipe(
                map((listResponse) => getMonthlyApprovalSuccessAction({monthlyApprovalList: listResponse.response})),
                catchError((error) => of(getMonthlyApprovalFailAction({error: error}))),
            )
        )
    )


//MONTHLY APPROVAL DETAILS
export const getMonthlyApprovalDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MONTHLY_APPROVAL_DETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyApprovalDetailsRequest(action.payload).pipe(
                map((listResponse) => getMonthlyApprovalDetailsSuccessAction({monthlyApprovalDetailsList: listResponse.response})),
                catchError((error) => of(getMonthlyApprovalDetailsFailAction({error: error}))),
            )
        )
    )


//RESET_PLAN
export const resetPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(RESET_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            resetPlanRequest(action.payload).pipe(
                map((listResponse) => resetPlanSuccessAction({resetPlanList: listResponse.response})),
                catchError((error) => of(resetPlanFailAction({error: error}))),
            )
        )
    )


//UNLOCK PLAN
export const unlockPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(UNLOCK_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            unlockPlanRequest(action.payload).pipe(
                map((listResponse) => unlockPlanSuccessAction({unlockPlanList: listResponse.response})),
                catchError((error) => of(unlockPlanFailAction({error: error}))),
            )
        )
    )

//APPROVE PLAN
export const approvePlanStartEpic = (action$) =>
    action$.pipe(
        ofType(APPROVE_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            approvePlanRequest(action.payload).pipe(
                map((listResponse) => approvePlanSuccessAction({approvePlanList: listResponse.response})),
                catchError((error) => of(approvePlanFailAction({error: error}))),
            )
        )
    )

//REJECT PLAN
export const rejectPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(REJECT_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            rejectPlanRequest(action.payload).pipe(
                map((listResponse) => rejectPlanSuccessAction({rejectPlanList: listResponse.response})),
                catchError((error) => of(rejectPlanFailAction({error: error}))),
            )
        )
    )


//REJECT PLAN
export const monthlyToSpecialStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_TO_SPECIAL_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyToSpecialRequest(action.payload).pipe(
                map((listResponse) => monthlyToSpecialSuccessAction({monthlyToSpecialList: listResponse.response})),
                catchError((error) => of(monthlyToSpecialFailAction({error: error}))),
            )
        )
    )

//SPECIAL PLAN APPROVAL
export const specialPlanApprovalStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SPECIAL_PLAN_APPROVAL_START),
        debounceTime(4000),
        switchMap((action) =>
            specialPlanApprovalRequest(action.payload).pipe(
                map((listResponse) => specialPlanApprovalSuccessAction({specialPlanApprovalList: listResponse.response})),
                catchError((error) => of(specialPlanApprovalFailAction({error: error}))),
            )
        )
    )

//SPECIAL PLAN DETAILS
export const specialPlanApprovalDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SPECIAL_PLAN_APPROVAL_DETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            specialPlanApprovalDetailsRequest(action.payload).pipe(
                map((listResponse) => specialPlanApprovalDetailsSuccessAction({specialPlanApprovalDetailsList: listResponse.response})),
                catchError((error) => of(specialPlanApprovalDetailsFailAction({error: error}))),
            )
        )
    )


//VIRTUAL PLAN APPROVAL
export const virtualPlanApprovalStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_PLAN_APPROVAL_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualPlanApprovalRequest(action.payload).pipe(
                map((listResponse) => virtualPlanApprovalSuccessAction({virtualPlanApprovalList: listResponse.response})),
                catchError((error) => of(virtualPlanApprovalFailAction({error: error}))),
            )
        )
    )

//VIRTUAL PLAN DETAILS
export const virtualPlanApprovalDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualPlanApprovalDetailsRequest(action.payload).pipe(
                map((listResponse) => virtualPlanApprovalDetailsSuccessAction({virtualPlanApprovalDetailsList: listResponse.response})),
                catchError((error) => of(virtualPlanApprovalDetailsFailAction({error: error}))),
            )
        )
    )

//VIRTUAL APPROVAL DOWNLOAD
export const virtualApprovalDownloadStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_APPROVAL_DOWNLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            getVirtualApprovalDownload(action.payload).pipe(
                map((listResponse) => virtualApprovalDownloadSuccessAction({virtualApprovalDownload: listResponse.response})),
                catchError((error) => of(virtualApprovalDownloadFailAction({error: error}))),
            )
        )
    )
