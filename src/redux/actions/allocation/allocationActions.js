import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_DIFFERENTIAL,
    ALLOCATE_TO_TEAM,
    EDIT_SPECIAL_PLAN_FAIL,
    EDIT_SPECIAL_PLAN_START,
    EDIT_SPECIAL_PLAN_SUCCESS,
    GET_ACTIVE_USERS_FAIL,
    GET_ACTIVE_USERS_START,
    GET_ACTIVE_USERS_SUCCESS,
    GET_ALLOCATION_STATUS_DROPDOWN_FAIL,
    GET_ALLOCATION_STATUS_DROPDOWN_START,
    GET_ALLOCATION_STATUS_DROPDOWN_SUCCESS,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    GET_BLOCKED_RECIPIENT_FAIL,
    GET_BLOCKED_RECIPIENT_START,
    GET_BLOCKED_RECIPIENT_SUCCESS,
    GET_DOWNLOAD_ALLOCATION_FAIL,
    GET_DOWNLOAD_ALLOCATION_START,
    GET_DOWNLOAD_ALLOCATION_SUCCESS,
    GET_MULTIPLE_ALLOCATION_DOWNLOAD_FAIL,
    GET_MULTIPLE_ALLOCATION_DOWNLOAD_START,
    GET_MULTIPLE_ALLOCATION_DOWNLOAD_SUCCESS,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_SUCCESS,
    MONTHLY_ALLOCATION_FAIL,
    MONTHLY_ALLOCATION_START,
    MONTHLY_ALLOCATION_SUCCESS,
    MONTHLY_COMMON_ALLOCATION_SAVE_FAIL,
    MONTHLY_COMMON_ALLOCATION_SAVE_START,
    MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_COMMON_TEAM_FAIL,
    MONTHLY_COMMON_TEAM_START,
    MONTHLY_COMMON_TEAM_SUCCESS,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_DIFFERENTIAL_TEAM_FAIL,
    MONTHLY_DIFFERENTIAL_TEAM_START,
    MONTHLY_DIFFERENTIAL_TEAM_SUCCESS,
    RECIPIENTS_TO_ALLOCATE_LIST_FAIL,
    RECIPIENTS_TO_ALLOCATE_LIST_RESET,
    RECIPIENTS_TO_ALLOCATE_LIST_START,
    RECIPIENTS_TO_ALLOCATE_LIST_SUCCESS,
    SEARCH_SPECIAL_PLAN_FAIL,
    SEARCH_SPECIAL_PLAN_START,
    SEARCH_SPECIAL_PLAN_SUCCESS,
    SPECIAL_ALLOCATION_FAIL,
    SPECIAL_ALLOCATION_START,
    SPECIAL_ALLOCATION_SUCCESS,
    SUBMIT_MONTHLY_ALLOCATION_FAIL,
    SUBMIT_MONTHLY_ALLOCATION_START,
    SUBMIT_MONTHLY_ALLOCATION_SUCCESS,
    SUBMIT_VIRTUAL_ALLOCATION_FAIL,
    SUBMIT_VIRTUAL_ALLOCATION_START,
    SUBMIT_VIRTUAL_ALLOCATION_SUCCESS,
    VIRTUAL_ALLOCATE_TO_DIFFERENTIAL,
    VIRTUAL_ALLOCATE_TO_TEAM,
    VIRTUAL_ALLOCATION_FAIL,
    VIRTUAL_ALLOCATION_START,
    VIRTUAL_ALLOCATION_SUCCESS,
    VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL,
    VIRTUAL_COMMON_ALLOCATION_SAVE_START,
    VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS,
    VIRTUAL_COMMON_TEAM_FAIL,
    VIRTUAL_COMMON_TEAM_START,
    VIRTUAL_COMMON_TEAM_SUCCESS,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    VIRTUAL_DIFFERENTIAL_TEAM_FAIL,
    VIRTUAL_DIFFERENTIAL_TEAM_START,
    VIRTUAL_DIFFERENTIAL_TEAM_SUCCESS,
} from "./allocationActionConstants";

export const monthlyAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_ALLOCATION_START,
        payload: payload,
    })
}

export const monthlyAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_ALLOCATION_SUCCESS,
        payload: payload,
    })
}

export const monthlyAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_ALLOCATION_FAIL,
        payload: payload,
    })
}

export const getAllocationsForPlanStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATIONS_FOR_PLAN_START,
        payload: payload,
    })
}

export const getAllocationsForPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
        payload: payload,
    })
}

export const getAllocationsForPlanFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATIONS_FOR_PLAN_FAIL,
        payload: payload,
    })
}

export const allocateToTeamAction = (payload) => (dispatch)=> {
    dispatch({
        type: ALLOCATE_TO_TEAM,
        payload: payload,
    })
}

export const virtualAllocateToTeamAction = (payload) => (dispatch)=> {
    dispatch({
        type: VIRTUAL_ALLOCATE_TO_TEAM,
        payload: payload,
    })
}

export const allocateToDifferentialAction = (payload) => (dispatch)=> {
    dispatch({
        type: ALLOCATE_TO_DIFFERENTIAL,
        payload: payload,
    })
}

export const virtualAllocateToDifferentialAction = (payload) => (dispatch)=> {
    dispatch({
        type: VIRTUAL_ALLOCATE_TO_DIFFERENTIAL,
        payload: payload,
    })
}

export const allocateToAllTeamsAction = (payload) => (dispatch)=> {
    dispatch({
        type: ALLOCATE_TO_ALL_TEAMS,
        payload: payload,
    })
}

export const recipientsToAllocateListStartAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENTS_TO_ALLOCATE_LIST_START,
        payload: payload,
    })
}

export const recipientsToAllocateListSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENTS_TO_ALLOCATE_LIST_SUCCESS,
        payload: payload,
    })
}

export const recipientsToAllocateListFailAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENTS_TO_ALLOCATE_LIST_FAIL,
        payload: payload,
    })
}

export const recipientsToAllocateListResetAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENTS_TO_ALLOCATE_LIST_RESET,
        payload: payload,
    })
}



export const monthlyCommonTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_TEAM_START,
        payload: payload,
    })
}

export const monthlyCommonTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_TEAM_SUCCESS,
        payload: payload,
    })
}

export const monthlyCommonTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_TEAM_FAIL,
        payload: payload,
    })
}


export const monthlyDifferentialTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_TEAM_START,
        payload: payload,
    })
}

export const monthlyDifferentialTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_TEAM_SUCCESS,
        payload: payload,
    })
}

export const monthlyDifferentialTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_TEAM_FAIL,
        payload: payload,
    })
}

export const monthlyCommonAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_ALLOCATION_SAVE_START,
        payload: payload,
    })
}

export const monthlyCommonAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS,
        payload: payload,
    })
}

export const monthlyCommonAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_COMMON_ALLOCATION_SAVE_FAIL,
        payload: payload,
    })
}


export const monthlyDifferentialAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
        payload: payload,
    })
}

export const monthlyDifferentialAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
        payload: payload,
    })
}

export const monthlyDifferentialAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
        payload: payload,
    })
}

export const virtualCommonAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_ALLOCATION_SAVE_START,
        payload: payload,
    })
}

export const virtualCommonAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS,
        payload: payload,
    })
}

export const virtualCommonAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL,
        payload: payload,
    })
}

export const getDownloadAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DOWNLOAD_ALLOCATION_START,
        payload: payload
    })
}

export const getDownloadAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DOWNLOAD_ALLOCATION_SUCCESS,
        payload: payload
    })
}

export const getDownloadAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_DOWNLOAD_ALLOCATION_FAIL,
        payload: payload
    })
}

export const getBlockedRecipientStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BLOCKED_RECIPIENT_START,
        payload: payload
    })
}

export const getBlockedRecipientSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BLOCKED_RECIPIENT_SUCCESS,
        payload: payload
    })
}

export const getBlockedRecipientFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BLOCKED_RECIPIENT_FAIL,
        payload: payload
    })
}

export const getActiveUsersStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ACTIVE_USERS_START,
        payload: payload
    })
}

export const getActiveUsersSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ACTIVE_USERS_SUCCESS,
        payload: payload
    })
}

export const getActiveUsersFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ACTIVE_USERS_FAIL,
        payload: payload
    })
}

export const virtualAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_ALLOCATION_START,
        payload: payload,
    })
}

export const virtualAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_ALLOCATION_SUCCESS,
        payload: payload,
    })
}

export const virtualAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_ALLOCATION_FAIL,
        payload: payload,
    })
}

export const searchSpecialPlanStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SEARCH_SPECIAL_PLAN_START,
        payload: payload
    })
}

export const searchSpecialPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SEARCH_SPECIAL_PLAN_SUCCESS,
        payload: payload
    })
}

export const searchSpecialPlanFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SEARCH_SPECIAL_PLAN_FAIL,
        payload: payload
    })
}

export const virtualCommonTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_TEAM_START,
        payload: payload,
    })
}

export const virtualCommonTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_TEAM_SUCCESS,
        payload: payload,
    })
}

export const virtualCommonTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_COMMON_TEAM_FAIL,
        payload: payload,
    })
}

export const getVirtualAllocationsForPlanStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START,
        payload: payload,
    })
}

export const getVirtualAllocationsForPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_SUCCESS,
        payload: payload,
    })
}

export const getVirtualAllocationsForPlanFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_FAIL,
        payload: payload,
    })
}

export const virtualDifferentialTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_TEAM_START,
        payload: payload,
    })
}

export const virtualDifferentialTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_TEAM_SUCCESS,
        payload: payload,
    })
}

export const virtualDifferentialTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_TEAM_FAIL,
        payload: payload,
    })
}

export const virtualDifferentialAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START,
        payload: payload,
    })
}

export const virtualDifferentialAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
        payload: payload,
    })
}

export const virtualDifferentialAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
        payload: payload,
    })
}

export const submitMonthlyAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_MONTHLY_ALLOCATION_START,
        payload: payload
    })
}

export const submitMonthlyAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_MONTHLY_ALLOCATION_SUCCESS,
        payload: payload
    })
}
export const submitMonthlyAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_MONTHLY_ALLOCATION_FAIL,
        payload: payload
    })
}

export const submitVirtualAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_VIRTUAL_ALLOCATION_START,
        payload: payload
    })
}

export const submitVirtualAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_VIRTUAL_ALLOCATION_SUCCESS,
        payload: payload
    })
}
export const submitVirtualAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SUBMIT_VIRTUAL_ALLOCATION_FAIL,
        payload: payload
    })
}


export const getAllocationStatusDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATION_STATUS_DROPDOWN_START,
        payload: payload
    })
}

export const getAllocationStatusDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATION_STATUS_DROPDOWN_SUCCESS,
        payload: payload
    })
}

export const getAllocationStatusDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_ALLOCATION_STATUS_DROPDOWN_FAIL,
        payload: payload
    })
}

export const getMultipleAllocationDownloadStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MULTIPLE_ALLOCATION_DOWNLOAD_START,
        payload: payload
    })
}

export const getMultipleAllocationDownloadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MULTIPLE_ALLOCATION_DOWNLOAD_SUCCESS,
        payload: payload
    })
}

export const getMultipleAllocationDownloadFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MULTIPLE_ALLOCATION_DOWNLOAD_FAIL,
        payload: payload
    })
}

export const editSpecialPlanStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_SPECIAL_PLAN_START,
        payload: payload
    })
}

export const editSpecialPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_SPECIAL_PLAN_SUCCESS,
        payload: payload
    })
}

export const editSpecialPlanFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_SPECIAL_PLAN_FAIL,
        payload: payload
    })
}

export const specialAllocationStartAction = (payload) => (dispatch) => {
    dispatch({
        type: SPECIAL_ALLOCATION_START,
        payload: payload,
    })
}

export const specialAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: SPECIAL_ALLOCATION_SUCCESS,
        payload: payload,
    })
}

export const specialAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SPECIAL_ALLOCATION_FAIL,
        payload: payload,
    })
}
