import { ofType } from 'redux-observable'
import {catchError, debounceTime, forkJoin, map, of, switchMap} from 'rxjs'
import {GET_ALLOCATIONS_FOR_PLAN_START, MONTHLY_ALLOCATION_START, MONTHLY_COMMON_TEAM_START, MONTHLY_DIFFERENTIAL_TEAM_START, RECIPIENTS_TO_ALLOCATE_LIST_START} from '../actions/allocation/allocationActionConstants'
import {itemsToAllocateListRequest, monthlyPlanCreateViewRequest, allocationsForPlanRequest, monthlyCommonTeamRequest, monthlyDifferentialTeamRequest} from '../../api/allocationRequests'
import {
    getAllocationsForPlanFailAction,
    getAllocationsForPlanStartAction,
    getAllocationsForPlanSuccessAction,
    monthlyAllocationFailAction,
    monthlyAllocationSuccessAction, monthlyCommonTeamFailAction, monthlyCommonTeamStartAction, monthlyCommonTeamSuccessAction, monthlyDifferentialTeamFailAction, monthlyDifferentialTeamStartAction, recipientsToAllocateListFailAction,
    recipientsToAllocateListStartAction, recipientsToAllocateListSuccessAction,
    teamsToAllocateListFailAction,
    teamsToAllocateListSuccessAction
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
            monthlyCommonTeamRequest(action.payload).pipe(
                map((allocationResponse) => monthlyCommonTeamSuccessAction({monthlyCommonTeam: allocationResponse.response})),
                catchError((error) => of(monthlyCommonTeamFailAction({ error: error }))),
            ),
        ),
    )


export const monthlyDifferentialTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(MONTHLY_DIFFERENTIAL_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyDifferentialTeamRequest(action.payload).pipe(
                map((allocationResponse) => monthlyDifferentialTeamSuccessAction({monthlyDifferentialTeam: allocationResponse.response})),
                catchError((error) => of(monthlyDifferentialTeamFailAction({ error: error }))),
            ),
        ),
    )
