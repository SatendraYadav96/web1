import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_TEAM,
    GET_ALLOCATIONS_FOR_PLAN_FAIL, GET_ALLOCATIONS_FOR_PLAN_START, GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    MONTHLY_ALLOCATION_FAIL, MONTHLY_ALLOCATION_START, MONTHLY_ALLOCATION_SUCCESS,
    RECIPIENTS_TO_ALLOCATE_LIST_FAIL, RECIPIENTS_TO_ALLOCATE_LIST_RESET,
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

