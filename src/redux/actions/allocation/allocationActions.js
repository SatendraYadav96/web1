import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_TEAM,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    MONTHLY_ALLOCATION_FAIL,
    MONTHLY_ALLOCATION_START,
    MONTHLY_ALLOCATION_SUCCESS, MONTHLY_COMMON_ALLOCATION_SAVE_FAIL,
    MONTHLY_COMMON_ALLOCATION_SAVE_START, MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_COMMON_TEAM_FAIL,
    MONTHLY_COMMON_TEAM_START,
    MONTHLY_COMMON_TEAM_SUCCESS,
    MONTHLY_DIFFERENTIAL_TEAM_FAIL,
    MONTHLY_DIFFERENTIAL_TEAM_START,
    MONTHLY_DIFFERENTIAL_TEAM_SUCCESS,
    RECIPIENTS_TO_ALLOCATE_LIST_FAIL,
    RECIPIENTS_TO_ALLOCATE_LIST_RESET,
    RECIPIENTS_TO_ALLOCATE_LIST_START,
    RECIPIENTS_TO_ALLOCATE_LIST_SUCCESS,
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
