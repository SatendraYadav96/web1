import { ofType } from 'redux-observable'
import {catchError, debounceTime, forkJoin, map, of, switchMap} from 'rxjs'
import {GET_ALLOCATIONS_FOR_PLAN_START, MONTHLY_ALLOCATION_START, RECIPIENTS_TO_ALLOCATE_LIST_START} from '../actions/allocation/allocationActionConstants'
import {itemsToAllocateListRequest, monthlyPlanCreateViewRequest, allocationsForPlanRequest} from '../../api/allocationRequests'
import {
    getAllocationsForPlanFailAction,
    getAllocationsForPlanStartAction,
    getAllocationsForPlanSuccessAction,
    monthlyAllocationFailAction,
    monthlyAllocationSuccessAction, recipientsToAllocateListFailAction,
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
