import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_DIFFERENTIAL,
    ALLOCATE_TO_TEAM,
    GET_ACTIVE_USERS_FAIL,
    GET_ACTIVE_USERS_START,
    GET_ACTIVE_USERS_SUCCESS,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    GET_BLOCKED_RECIPIENT_FAIL,
    GET_BLOCKED_RECIPIENT_START,
    GET_BLOCKED_RECIPIENT_SUCCESS,
    GET_DOWNLOAD_ALLOCATION_FAIL,
    GET_DOWNLOAD_ALLOCATION_START,
    GET_DOWNLOAD_ALLOCATION_SUCCESS,
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
    VIRTUAL_ALLOCATION_FAIL,
    VIRTUAL_ALLOCATION_START,
    VIRTUAL_ALLOCATION_SUCCESS,
    VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL,
    VIRTUAL_COMMON_ALLOCATION_SAVE_START,
    VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS,
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

export const allocateToDifferentialAction = (payload) => (dispatch)=> {
    dispatch({
        type: ALLOCATE_TO_DIFFERENTIAL,
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
