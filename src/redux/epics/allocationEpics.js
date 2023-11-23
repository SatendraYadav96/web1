import { ofType } from 'redux-observable'
import {catchError, debounceTime, forkJoin, map, of, switchMap} from 'rxjs'
import {
    DELETE_SPECIAL_ALLOCATION_START,
    EDIT_SPECIAL_PLAN_START,
    GET_ACTIVE_USERS_START, GET_ALLOCATION_STATUS_DROPDOWN_START,
    GET_ALLOCATIONS_FOR_PLAN_START, GET_BLOCKED_RECIPIENT_START, GET_DOWNLOAD_ALLOCATION_START, GET_MULTIPLE_ALLOCATION_DOWNLOAD_START, GET_SPECIAL_ALLOCATIONS_FOR_PLAN_START, GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START,
    MONTHLY_ALLOCATION_START,
    MONTHLY_COMMON_ALLOCATION_SAVE_START,
    MONTHLY_COMMON_TEAM_START,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
    MONTHLY_DIFFERENTIAL_TEAM_START, MULTIPLE_ALLOCATION_UPLOAD_START,
    RECIPIENTS_TO_ALLOCATE_LIST_START, SEARCH_SPECIAL_PLAN_START, SPECIAL_ALLOCATION_START, SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START, SPECIAL_DIFFERENTIAL_TEAM_START, SUBMIT_MONTHLY_ALLOCATION_START, SUBMIT_SPECIAL_ALLOCATION_START, SUBMIT_VIRTUAL_ALLOCATION_START, VIRTUAL_ALLOCATION_START,
    VIRTUAL_COMMON_ALLOCATION_SAVE_START, VIRTUAL_COMMON_TEAM_START, VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START, VIRTUAL_DIFFERENTIAL_TEAM_START
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
    monthlyDifferentialAllocationSaveRequest,
    monthlyQuantityAllocatedDifferentialRecipientRequest,
    virtualCommonAllocationSaveRequest,
    getDownloadAllocationRequest,
    getBlockedRecipientRequest,
    getActiveUsersRequest,
    virtualPlanCreateViewRequest,
    searchSpecialPlanRequest,
    virtualCommonTeamRequest,
    virtualQuantityAllocatedOfUserToItemRequest,
    virtualDifferentialTeamRequest,
    virtualQuantityAllocatedDifferentialRecipientRequest,
    virtualDifferentialAllocationSaveRequest,
    submitMonthlyAllocationRequest,
    submitVirtualAllocationRequest,
    getAllocationStatusDropDownRequest,
    getMultipleAllocationDownloadRequest,
    editSpecialPlanRequest,
    specialAllocationCreateViewRequest,
    specialDifferentialTeamRequest,
    specialQuantityAllocatedDifferentialRecipientRequest,
    specialDifferentialAllocationSaveRequest,
    submitSpecialAllocationRequest,
    getMultipleAllocationCostCenterDownloadRequest, getMultipleAllocationExcelDownloadRequest, deleteSpecialAllocationRequest, getMultipleAllocationAllDownloadRequest, multipleAllocationUploadRequest
} from '../../api/allocationRequests'
import {
    deleteSpecialAllocationFailAction,
    deleteSpecialAllocationSuccessAction,
    editSpecialPlanFailAction,
    editSpecialPlanSuccessAction,
    getActiveUsersFailAction,
    getActiveUsersStartAction,
    getActiveUsersSuccessAction,
    getAllocationsForPlanFailAction,
    getAllocationsForPlanStartAction,
    getAllocationsForPlanSuccessAction,
    getAllocationStatusDropdownFailAction,
    getAllocationStatusDropdownSuccessAction,
    getBlockedRecipientFailAction,
    getBlockedRecipientSuccessAction,
    getDownloadAllocationFailAction,
    getDownloadAllocationSuccessAction,
    getMultipleAllocationDownloadFailAction,
    getMultipleAllocationDownloadSuccessAction,
    getSpecialAllocationsForPlanFailAction,
    getSpecialAllocationsForPlanSuccessAction,
    getVirtualAllocationsForPlanFailAction,
    getVirtualAllocationsForPlanSuccessAction,
    monthlyAllocationFailAction,
    monthlyAllocationSuccessAction,
    monthlyCommonAllocationFailAction,
    monthlyCommonAllocationSuccessAction,
    monthlyCommonTeamFailAction,
    monthlyCommonTeamStartAction,
    monthlyCommonTeamSuccessAction,
    monthlyDifferentialAllocationFailAction,
    monthlyDifferentialAllocationSuccessAction,
    monthlyDifferentialTeamFailAction,
    monthlyDifferentialTeamStartAction,
    monthlyDifferentialTeamSuccessAction, multipleAllocationUploadFailAction, multipleAllocationUploadSuccessAction,
    recipientsToAllocateListFailAction,
    recipientsToAllocateListStartAction,
    recipientsToAllocateListSuccessAction,
    searchSpecialPlanFailAction,
    searchSpecialPlanSuccessAction,
    specialAllocationFailAction,
    specialAllocationSuccessAction, specialDifferentialAllocationFailAction, specialDifferentialAllocationSaveFailAction, specialDifferentialAllocationSaveStartAction, specialDifferentialAllocationSaveSuccessAction, specialDifferentialAllocationSuccessAction,
    specialDifferentialTeamFailAction,
    specialDifferentialTeamSuccessAction,
    submitMonthlyAllocationFailAction,
    submitMonthlyAllocationSuccessAction, submitSpecialAllocationFailAction, submitSpecialAllocationSuccessAction,
    submitVirtualAllocationFailAction,
    submitVirtualAllocationSuccessAction,
    teamsToAllocateListFailAction,
    teamsToAllocateListSuccessAction,
    virtualAllocationFailAction,
    virtualAllocationSuccessAction,
    virtualCommonAllocationFailAction,
    virtualCommonAllocationSuccessAction,
    virtualCommonTeamFailAction,
    virtualCommonTeamSuccessAction,
    virtualDifferentialAllocationFailAction,
    virtualDifferentialAllocationSuccessAction,
    virtualDifferentialTeamFailAction,
    virtualDifferentialTeamSuccessAction
} from '../actions/allocation/allocationActions'
import {DELETE_SPECIAL_ALLOCATION_API} from "../../api/apiConstants";

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

export const virtualAllocationsForPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            allocationsForPlanRequest(action.payload).pipe(
                map((allocationResponse) =>
                    getVirtualAllocationsForPlanSuccessAction({
                        virtualAllocations: allocationResponse.response,
                        virtualSelectedItems: action.payload.selectedItems})),
                catchError((error) => of(getVirtualAllocationsForPlanFailAction({ error: error }))),
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

export const getDownloadAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_DOWNLOAD_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            getDownloadAllocationRequest(action.payload).pipe(
                map((response) => getDownloadAllocationSuccessAction({getDownloadAllocation: response.response})),
                catchError((error) => of(getDownloadAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const getBlockedRecipientStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_BLOCKED_RECIPIENT_START),
        debounceTime(4000),
        switchMap((action) =>
            getBlockedRecipientRequest(action.payload).pipe(
                map((response) => getBlockedRecipientSuccessAction({getRecipientBlocked: response.response})),
                catchError((error) => of(getBlockedRecipientFailAction({ error: error }))),
            ),
        ),
    )


export const getActiveUsersStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ACTIVE_USERS_START),
        debounceTime(4000),
        switchMap((action) =>
            getActiveUsersRequest(action.payload).pipe(
                map((response) => getActiveUsersSuccessAction({getActiveUsers: response.response})),
                catchError((error) => of(getActiveUsersFailAction({ error: error }))),
            ),
        ),
    )

export const virtualPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualPlanCreateViewRequest(action.payload).pipe(
                map((planResponse) =>
                    virtualAllocationSuccessAction({ virtualAllocation: planResponse.response })),
                catchError((error) => of(virtualAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const searchSpecialPlan = (action$) =>
    action$.pipe(
        ofType(SEARCH_SPECIAL_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            searchSpecialPlanRequest(action.payload).pipe(
                map((response) =>
                    searchSpecialPlanSuccessAction({ searchSpecialPlan: response.response })),
                catchError((error) => of(searchSpecialPlanFailAction({ error: error }))),
            ),
        ),
    )

export const virtualCommonTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_COMMON_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            forkJoin(
                virtualCommonTeamRequest(action.payload),
                virtualQuantityAllocatedOfUserToItemRequest(action.payload)).pipe(
                map((allocationResponse) => virtualCommonTeamSuccessAction({virtualCommonTeam: allocationResponse[0].response, virtualQuantityAllocated:allocationResponse[1].response})),
                catchError((error) => of(virtualCommonTeamFailAction({ error: error }))),
            ),
        ),
    )

export const virtualDifferentialTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_DIFFERENTIAL_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            forkJoin(
                virtualDifferentialTeamRequest(action.payload),
                virtualQuantityAllocatedDifferentialRecipientRequest(action.payload)).pipe(
                map((allocationResponse) => virtualDifferentialTeamSuccessAction({virtualDifferentialTeam: allocationResponse[0].response, virtualDifferentialQuantityAllocated:allocationResponse[1].response})),
                catchError((error) => of(virtualDifferentialTeamFailAction({ error: error }))),
            ),
        ),
    )

export const virtualDifferentialAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START),
        debounceTime(4000),
        switchMap((action) =>
            virtualDifferentialAllocationSaveRequest(action.payload).pipe(
                map((response) => virtualDifferentialAllocationSuccessAction({virtualDifferentialAllocationSave: response.response})),
                catchError((error) => of(virtualDifferentialAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const submitMonthlyAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(SUBMIT_MONTHLY_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            submitMonthlyAllocationRequest(action.payload).pipe(
                map((response) => submitMonthlyAllocationSuccessAction({submitMonthlyAllocation: response.response})),
                catchError((error) => of(submitMonthlyAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const submitVirtualAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(SUBMIT_VIRTUAL_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            submitVirtualAllocationRequest(action.payload).pipe(
                map((response) => submitVirtualAllocationSuccessAction({submitVirtualAllocation: response.response})),
                catchError((error) => of(submitVirtualAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const submitSpecialAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(SUBMIT_SPECIAL_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            submitSpecialAllocationRequest(action.payload).pipe(
                map((response) => submitSpecialAllocationSuccessAction({submitSpecialAllocation: response.response})),
                catchError((error) => of(submitSpecialAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const getAllocationStatusDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ALLOCATION_STATUS_DROPDOWN_START),
        debounceTime(4000),
        switchMap((action) =>
            getAllocationStatusDropDownRequest(action.payload).pipe(
                map((response) => getAllocationStatusDropdownSuccessAction({getAllocationStatusDropdown: response.response})),
                catchError((error) => of(getAllocationStatusDropdownFailAction({ error: error }))),
            ),
        ),
    )

export const getMultipleAllocationDownloadStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MULTIPLE_ALLOCATION_DOWNLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            getMultipleAllocationAllDownloadRequest(action.payload).pipe(
                map((response) => getMultipleAllocationDownloadSuccessAction({getMultipleAllocationCostCenterDownload: response.response})),
                catchError((error) => of(getMultipleAllocationDownloadFailAction({ error: error }))),
            ),
        ),
    )

export const editSpecialPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_SPECIAL_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            editSpecialPlanRequest(action.payload).pipe(
                map((response) => editSpecialPlanSuccessAction({editSpecialPlan: response.response})),
                catchError((error) => of(editSpecialPlanFailAction({ error: error }))),
            ),
        ),
    )

export const specialPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(SPECIAL_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            specialAllocationCreateViewRequest(action.payload).pipe(
                map((planResponse) =>
                    specialAllocationSuccessAction({ specialAllocation: planResponse.response })),
                catchError((error) => of(specialAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const specialAllocationsForPlanStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_SPECIAL_ALLOCATIONS_FOR_PLAN_START),
        debounceTime(4000),
        switchMap((action) =>
            allocationsForPlanRequest(action.payload).pipe(
                map((allocationResponse) =>
                    getSpecialAllocationsForPlanSuccessAction({
                        specialAllocations: allocationResponse.response,
                        specialSelectedItems: action.payload.selectedItems})),
                catchError((error) => of(getSpecialAllocationsForPlanFailAction({ error: error }))),
            ),
        ),
    )

export const specialDifferentialTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(SPECIAL_DIFFERENTIAL_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            forkJoin(
                specialDifferentialTeamRequest(action.payload),
                specialQuantityAllocatedDifferentialRecipientRequest(action.payload)).pipe(
                map((allocationResponse) => specialDifferentialTeamSuccessAction({specialDifferentialTeam: allocationResponse[0].response, specialDifferentialQuantityAllocated:allocationResponse[1].response})),
                catchError((error) => of(specialDifferentialTeamFailAction({ error: error }))),
            ),
        ),
    )

export const specialDifferentialAllocationSaveStartEpic = (action$) =>
    action$.pipe(
        ofType(SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START),
        debounceTime(4000),
        switchMap((action) =>
            specialDifferentialAllocationSaveRequest(action.payload).pipe(
                map((response) => specialDifferentialAllocationSaveSuccessAction({specialDifferentialAllocationSave: response.response})),
                catchError((error) => of(specialDifferentialAllocationSaveFailAction({ error: error }))),
            ),
        ),
    )

export const deleteSpecialAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(DELETE_SPECIAL_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            deleteSpecialAllocationRequest(action.payload).pipe(
                map((response) => deleteSpecialAllocationSuccessAction({deleteSpecialAllocation: response.response})),
                catchError((error) => of(deleteSpecialAllocationFailAction({ error: error }))),
            ),
        ),
    )

export const multipleAllocationUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(MULTIPLE_ALLOCATION_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            multipleAllocationUploadRequest(action.payload).pipe(
                map((response) => multipleAllocationUploadSuccessAction({multipleAllocationUpload: response.response})),
                catchError((error) => of(multipleAllocationUploadFailAction({ error: error }))),
            ),
        ),
    )
