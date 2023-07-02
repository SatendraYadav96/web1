import {
    EDIT_BLOCK_ITEM_FAIL,
    EDIT_BLOCK_ITEM_START, EDIT_BLOCK_ITEM_SUCCESS,
    EDIT_UNIT_ALLOCATION_FAIL,
    EDIT_UNIT_ALLOCATION_START,
    EDIT_UNIT_ALLOCATION_SUCCESS, EXPORT_ALLOCATION_FAIL, EXPORT_ALLOCATION_START, EXPORT_ALLOCATION_SUCCESS,
    GET_INVENTORY_REPORT_FAIL,
    GET_INVENTORY_REPORT_START,
    GET_INVENTORY_REPORT_SUCCESS,
    GET_INVENTORY_REVERSAL_HISTORY_FAIL,
    GET_INVENTORY_REVERSAL_HISTORY_START,
    GET_INVENTORY_REVERSAL_HISTORY_SUCCESS, REVERSE_INVENTORY_FAIL, REVERSE_INVENTORY_START, REVERSE_INVENTORY_SUCCESS, SWITCH_INVENTORY_FAIL, SWITCH_INVENTORY_START, SWITCH_INVENTORY_SUCCESS
} from "./inventoryReportActionConstants";

export const getInventoryReportStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_INVENTORY_REPORT_START,
    payload: payload,
  })
}

export const getInventoryReportSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_INVENTORY_REPORT_SUCCESS,
    payload: payload,
  })
}

export const getInventoryReportFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_INVENTORY_REPORT_FAIL,
    payload: payload,
  })
}

export const getInventoryReversalHistoryStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_START,
        payload: payload,
    })
}

export const getInventoryReversalHistorySuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_SUCCESS,
        payload: payload,
    })
}

export const getInventoryReversalHistoryFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_INVENTORY_REVERSAL_HISTORY_FAIL,
        payload: payload,
    })
}

export const editUnitAllocationStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: EDIT_UNIT_ALLOCATION_START,
        payload: payload,
    })
}

export const editUnitAllocationSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_UNIT_ALLOCATION_SUCCESS,
        payload: payload,
    })
}

export const editUnitAllocationFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: EDIT_UNIT_ALLOCATION_FAIL,
        payload: payload,
    })
}
export const editBlockItemStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: EDIT_BLOCK_ITEM_START,
        payload: payload,
    })
}

export const editBlockItemSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_BLOCK_ITEM_SUCCESS,
        payload: payload,
    })
}

export const editBlockItemFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: EDIT_BLOCK_ITEM_FAIL,
        payload: payload,
    })
}

export const reverseInventoryStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: REVERSE_INVENTORY_START,
        payload: payload,
    })
}

export const reverseInventorySuccessAction = (payload) => (dispatch) =>{
    dispatch({
        type: REVERSE_INVENTORY_SUCCESS,
        payload: payload,
    })
}

export const reverseInventoryFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: REVERSE_INVENTORY_FAIL,
        payload: payload,
    })
}

export const switchInventoryStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: SWITCH_INVENTORY_START,
        payload: payload,
    })
}

export const switchInventorySuccessAction = (payload) => (dispatch) =>{
    dispatch({
        type: SWITCH_INVENTORY_SUCCESS,
        payload: payload,
    })
}

export const switchInventoryFailAction = (payload) => (dispatch) => {
    dispatch({
        type: SWITCH_INVENTORY_FAIL,
        payload: payload,
    })
}

export const exportAllocationStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: EXPORT_ALLOCATION_START,
        payload: payload,
    })
}

export const exportAllocationSuccessAction = (payload) => (dispatch) =>{
    dispatch({
        type: EXPORT_ALLOCATION_SUCCESS,
        payload: payload,
    })
}

export const exportAllocationFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EXPORT_ALLOCATION_FAIL,
        payload: payload,
    })
}
