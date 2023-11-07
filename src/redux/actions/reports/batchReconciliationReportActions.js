import {
    GET_BATCH_RECONCILIATION_FAIL,
    GET_BATCH_RECONCILIATION_START,
    GET_BATCH_RECONCILIATION_SUCCESS, GET_SHIP_ROCKET_REPORT_FAIL,
    GET_SHIP_ROCKET_REPORT_START, GET_SHIP_ROCKET_REPORT_SUCCESS,
    GET_VIRTUAL_RECONCILIATION_REPORT_FAIL,
    GET_VIRTUAL_RECONCILIATION_REPORT_START,
    GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS
} from "./batchReconciliationReportActionConstants";
import {GET_SHIP_ROCKET_REPORT_API} from "../../../api/apiConstants";


//  BATCH_RECONCILIATION ACTION
export const getBatchReconciliationStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BATCH_RECONCILIATION_START,
        payload: payload,
    })
}

export const getBatchReconciliationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BATCH_RECONCILIATION_SUCCESS,
        payload: payload,
    })
}

export const getBatchReconciliationFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BATCH_RECONCILIATION_FAIL,
        payload: payload,
    })
}

export const getVirtualReconciliationReportStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_RECONCILIATION_REPORT_START,
        payload: payload
    })
}

export const getVirtualReconciliationReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS,
        payload: payload
    })
}

export const getVirtualReconciliationReportFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VIRTUAL_RECONCILIATION_REPORT_FAIL,
        payload: payload
    })
}

export const getShipRocketReportStartAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SHIP_ROCKET_REPORT_START,
        payload: payload
    })
}

export const getShipRocketReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SHIP_ROCKET_REPORT_SUCCESS,
        payload: payload
    })
}

export const getShipRocketReportFailAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_SHIP_ROCKET_REPORT_FAIL,
        payload: payload
    })
}
