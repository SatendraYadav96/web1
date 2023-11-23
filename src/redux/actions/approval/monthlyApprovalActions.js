//  MONTHLY APPROVAL

import {
    APPROVE_PLAN_FAIL,
    APPROVE_PLAN_START,
    APPROVE_PLAN_SUCCESS,
    GET_MONTHLY_APPROVAL_DETAILS_FAIL,
    GET_MONTHLY_APPROVAL_DETAILS_START,
    GET_MONTHLY_APPROVAL_DETAILS_SUCCESS,
    GET_MONTHLY_APPROVAL_FAIL,
    GET_MONTHLY_APPROVAL_START,
    GET_MONTHLY_APPROVAL_SUCCESS,
    GET_SPECIAL_PLAN_APPROVAL_DETAILS_FAIL,
    GET_SPECIAL_PLAN_APPROVAL_DETAILS_START,
    GET_SPECIAL_PLAN_APPROVAL_DETAILS_SUCCESS,
    GET_SPECIAL_PLAN_APPROVAL_FAIL,
    GET_SPECIAL_PLAN_APPROVAL_START,
    GET_SPECIAL_PLAN_APPROVAL_SUCCESS, GET_VIRTUAL_APPROVAL_DOWNLOAD_FAIL,
    GET_VIRTUAL_APPROVAL_DOWNLOAD_START,
    GET_VIRTUAL_APPROVAL_DOWNLOAD_SUCCESS,
    GET_VIRTUAL_PLAN_APPROVAL_DETAILS_FAIL,
    GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START,
    GET_VIRTUAL_PLAN_APPROVAL_DETAILS_SUCCESS,
    GET_VIRTUAL_PLAN_APPROVAL_FAIL,
    GET_VIRTUAL_PLAN_APPROVAL_START,
    GET_VIRTUAL_PLAN_APPROVAL_SUCCESS,
    MONTHLY_TO_SPECIAL_FAIL,
    MONTHLY_TO_SPECIAL_START,
    MONTHLY_TO_SPECIAL_SUCCESS,
    REJECT_PLAN_FAIL,
    REJECT_PLAN_START,
    REJECT_PLAN_SUCCESS,
    RESET_PLAN_FAIL,
    RESET_PLAN_START,
    RESET_PLAN_SUCCESS,
    UNLOCK_PLAN_FAIL,
    UNLOCK_PLAN_START,
    UNLOCK_PLAN_SUCCESS
} from "./monthlyApprovalActionConstants";

export const getMonthlyApprovalStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLY_APPROVAL_START,
        payload: payload,
    })
}

export const getMonthlyApprovalSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MONTHLY_APPROVAL_SUCCESS,
        payload: payload,
    })
}

export const getMonthlyApprovalFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLY_APPROVAL_FAIL,
        payload: payload,
    })
}

export const getMonthlyApprovalDetailsStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_MONTHLY_APPROVAL_DETAILS_START,
        payload: payload,
    })
}

export const getMonthlyApprovalDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_MONTHLY_APPROVAL_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const getMonthlyApprovalDetailsFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: RESET_PLAN_FAIL,
        payload: payload,
    })
}

export const resetPlanStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: RESET_PLAN_START,
        payload: payload,
    })
}

export const resetPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: RESET_PLAN_SUCCESS,
        payload: payload,
    })
}

export const resetPlanFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: RESET_PLAN_FAIL,
        payload: payload,
    })
}

export const unlockPlanStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: UNLOCK_PLAN_START,
        payload: payload,
    })
}

export const unlockPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: UNLOCK_PLAN_SUCCESS,
        payload: payload,
    })
}

export const unlockPlanFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: UNLOCK_PLAN_FAIL,
        payload: payload,
    })
}

export const approvePlanStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: APPROVE_PLAN_START,
        payload: payload,
    })
}

export const approvePlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: APPROVE_PLAN_SUCCESS,
        payload: payload,
    })
}

export const approvePlanFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: APPROVE_PLAN_FAIL,
        payload: payload,
    })
}


export const rejectPlanStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: REJECT_PLAN_START,
        payload: payload,
    })
}

export const rejectPlanSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: REJECT_PLAN_SUCCESS,
        payload: payload,
    })
}

export const rejectPlanFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: REJECT_PLAN_FAIL,
        payload: payload,
    })
}


export const monthlyToSpecialStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: MONTHLY_TO_SPECIAL_START,
        payload: payload,
    })
}

export const monthlyToSpecialSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: MONTHLY_TO_SPECIAL_SUCCESS,
        payload: payload,
    })
}

export const monthlyToSpecialFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: MONTHLY_TO_SPECIAL_FAIL,
        payload: payload,
    })
}


export const specialPlanApprovalStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_START,
        payload: payload,
    })
}

export const specialPlanApprovalSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_SUCCESS,
        payload: payload,
    })
}

export const specialPlanApprovalFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_FAIL,
        payload: payload,
    })
}


export const specialPlanApprovalDetailsStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_DETAILS_START,
        payload: payload,
    })
}

export const specialPlanApprovalDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const specialPlanApprovalDetailsFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_SPECIAL_PLAN_APPROVAL_DETAILS_FAIL,
        payload: payload,
    })
}


export const virtualPlanApprovalStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_START,
        payload: payload,
    })
}

export const virtualPlanApprovalSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_SUCCESS,
        payload: payload,
    })
}

export const virtualPlanApprovalFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_FAIL,
        payload: payload,
    })
}


export const virtualPlanApprovalDetailsStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START,
        payload: payload,
    })
}

export const virtualPlanApprovalDetailsSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_DETAILS_SUCCESS,
        payload: payload,
    })
}

export const virtualPlanApprovalDetailsFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_PLAN_APPROVAL_DETAILS_FAIL,
        payload: payload,
    })
}

export const virtualApprovalDownloadStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_APPROVAL_DOWNLOAD_START,
        payload: payload,
    })
}

export const virtualApprovalDownloadSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_APPROVAL_DOWNLOAD_SUCCESS,
        payload: payload,
    })
}

export const virtualApprovalDownloadFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VIRTUAL_APPROVAL_DOWNLOAD_FAIL,
        payload: payload,
    })
}

