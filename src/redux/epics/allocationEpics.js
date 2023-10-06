import { ofType } from 'redux-observable'
import {catchError, debounceTime, forkJoin, map, of, switchMap} from 'rxjs'
import {
    GET_ALLOCATIONS_FOR_PLAN_START,
    MONTHLY_ALLOCATION_START,
    MONTHLY_COMMON_ALLOCATION_SAVE_START,
    MONTHLY_COMMON_TEAM_START,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
    MONTHLY_DIFFERENTIAL_TEAM_START,
    RECIPIENTS_TO_ALLOCATE_LIST_START,
    VIRTUAL_COMMON_ALLOCATION_SAVE_START
} from '../actions/allocation/allocationActionConstants'
import {
    itemsToAllocateListRequest,
    monthlyPlanCreateViewRequest,
    allocationsForPlanRequest,
    monthlyCommonTeamRequest,
    monthlyDifferentialTeamRequest,
    monthlyQuantityAllocatedOfUserToItemRequest,
    monthlyCommonAllocationSave,
    monthlyCommonAllocationSaveRequest,
    monthlyDifferentialAllocationSaveRequest, monthlyQuantityAllocatedDifferentialRecipientRequest, virtualCommonAllocationSaveRequest
} from '../../api/allocationRequests'
import {
    getAllocationsForPlanFailAction,
    getAllocationsForPlanStartAction,
    getAllocationsForPlanSuccessAction,
    monthlyAllocationFailAction,
    monthlyAllocationSuccessAction, monthlyCommonAllocationFailAction,
    monthlyCommonAllocationSuccessAction,
    monthlyCommonTeamFailAction,
    monthlyCommonTeamStartAction,
    monthlyCommonTeamSuccessAction, monthlyDifferentialAllocationFailAction, monthlyDifferentialAllocationSuccessAction,
    monthlyDifferentialTeamFailAction,
    monthlyDifferentialTeamStartAction,
    monthlyDifferentialTeamSuccessAction,
    recipientsToAllocateListFailAction,
    recipientsToAllocateListStartAction,
    recipientsToAllocateListSuccessAction,
    teamsToAllocateListFailAction,
    teamsToAllocateListSuccessAction, virtualCommonAllocationFailAction, virtualCommonAllocationSuccessAction
} from '../actions/allocation/allocationActions'

export const allocationsForPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ALLOCATIONS_FOR_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            allocationsForPlanRequest(action.payload).pipe(
                map((allocationResponse) =>
                    getAllocationsForPlanSuccessAction({
                                        allocations: allocationResponse.response,
                                        selectedItems: action.payload.selectedItems})),
                catchError((error) => of(getAllocationsForPlanFailAction({ error: error }))),
            ),
        ),
    )

export const monthlyPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyPlanCreateViewRequest(action.payload).pipe(
                map((planResponse) =>
                    monthlyAllocationSuccessAction({ plan: planResponse.response.plan, items: planResponse.response.item })),
                catchError((error) => of(monthlyAllocationFailAction({ error: error }))),
            ),
        ),
    )


export const recipientsToAllocateListStartEpic = (action$) =>
    action$.pipe(
        ofType(RECIPIENTS_TO_ALLOCATE_LIST_START),
        debounceTime(4000),
        switchMap((action) =>
            allocationsForPlanRequest(action.payload).pipe(
                map((allocationResponse) => recipientsToAllocateListSuccessAction({recipientAllocations: allocationResponse.response})),
                catchError((error) => of(recipientsToAllocateListFailAction({ error: error }))),
            ),
        ),
    )


export const monthlyCommonTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_COMMON_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            forkJoin(
            monthlyCommonTeamRequest(action.payload),
                monthlyQuantityAllocatedOfUserToItemRequest(action.payload)).pipe(
                map((allocationResponse) => monthlyCommonTeamSuccessAction({monthlyCommonTeam: allocationResponse[0].response, quantityAllocated:allocationResponse[1].response})),
                catchError((error) => of(monthlyCommonTeamFailAction({ error: error }))),
            ),
        ),
    )


export const monthlyDifferentialTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_DIFFERENTIAL_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            forkJoin(
                monthlyDifferentialTeamRequest(action.payload),
                monthlyQuantityAllocatedDifferentialRecipientRequest(action.payload)).pipe(
                map((allocationResponse) => monthlyDifferentialTeamSuccessAction({monthlyDifferentialTeam: allocationResponse[0].response, monthlyDifferentialQuantityAllocated:allocationResponse[1].response})),
                catchError((error) => of(monthlyDifferentialTeamFailAction({ error: error }))),
            ),
        ),
    )

export const monthlyCommonAllocationSaveStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_COMMON_ALLOCATION_SAVE_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyCommonAllocationSaveRequest(action.payload).pipe(
                map((response) => monthlyCommonAllocationSuccessAction({monthlyCommonAllocationSave: response.response})),
                catchError((error) => of(monthlyCommonAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const monthlyDifferentialAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyDifferentialAllocationSaveRequest(action.payload).pipe(
                map((response) => monthlyDifferentialAllocationSuccessAction({monthlyDifferentialAllocationSave: response.response})),
                catchError((error) => of(monthlyDifferentialAllocationFailAction({ error: error }))),
            ),
        ),
    )


export const virtualCommonAllocationSaveStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_COMMON_ALLOCATION_SAVE_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualCommonAllocationSaveRequest(action.payload).pipe(
                map((response) => virtualCommonAllocationSuccessAction({virtualCommonAllocationSave: response.response})),
                catchError((error) => of(virtualCommonAllocationFailAction({ error: error }))),
            ),
        ),
    )
