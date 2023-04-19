import {createReducer} from "./reducerUtils";
import {
    EDIT_BLOCK_ITEM_FAIL,
    EDIT_BLOCK_ITEM_SUCCESS,
    EDIT_UNIT_ALLOCATION_FAIL,
    EDIT_UNIT_ALLOCATION_SUCCESS,
    GET_INVENTORY_REPORT_FAIL,
    GET_INVENTORY_REPORT_SUCCESS,
    GET_INVENTORY_REVERSAL_HISTORY_FAIL,
    GET_INVENTORY_REVERSAL_HISTORY_SUCCESS
} from "../actions/inventory/inventoryReportActionConstants";

const initialState = {
    inventoryList: [],
    inventoryReportLoading: false,
    editUnitAllocation: [],
    editUnitAllocationLoading: false,
    editBlockItem: [],
    editBlockItemLoading: false,
    error: {}
}

const getInventoryReportSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,

    inventoryList:payload.inventoryList,
    inventoryReportLoading: false

  }
}

const getInventoryReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    inventoryList:[],
    inventoryReportLoading: false,
    error: payload.error,

  }
}

const getInventoryReversalHistorySuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        inventoryReversalHistoryList:payload.inventoryReversalHistoryList,
        inventoryReportLoading: false

    }
}

const getInventoryReversalHistoryFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        inventoryReversalHistoryList:[],
        inventoryReversalHistoryLoading: false,
        error: payload.error,

    }
}

const editUnitAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editUnitAllocation:payload.editUnitAllocation,
        editUnitAllocationLoading: false

    }
}

const editUnitAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editUnitAllocation:[],
        editUnitAllocationLoading: false,
        error: payload.error,

    }
}

const editBlockItemSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editBlockItem:payload.editBlockItem,
        editBlockItemLoading: false

    }
}

const editBlockItemFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editBlockItem:[],
        editBlockItemLoading: false,
        error: payload.error,

    }
}

const reverseInventorySuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        reverseInventory:payload.reverseInventory,
        reverseInventoryLoading: false

    }
}

const reverseInventoryFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        reverseInventory:[],
        reverseInventoryLoading: false,
        error: payload.error,

    }
}

export default createReducer(initialState, {
    [GET_INVENTORY_REPORT_SUCCESS]: getInventoryReportSuccessReducer,
    [GET_INVENTORY_REPORT_FAIL]: getInventoryReportFailReducer,
    [GET_INVENTORY_REVERSAL_HISTORY_SUCCESS]: getInventoryReversalHistorySuccessReducer,
    [GET_INVENTORY_REVERSAL_HISTORY_FAIL]: getInventoryReversalHistoryFailReducer,
    [EDIT_UNIT_ALLOCATION_SUCCESS]: editUnitAllocationSuccessReducer,
    [EDIT_UNIT_ALLOCATION_FAIL]: editUnitAllocationFailReducer,
    [EDIT_BLOCK_ITEM_SUCCESS]: editBlockItemSuccessReducer,
    [EDIT_BLOCK_ITEM_FAIL]: editBlockItemFailReducer,
    [EDIT_BLOCK_ITEM_SUCCESS]: reverseInventorySuccessReducer,
    [EDIT_BLOCK_ITEM_FAIL]: reverseInventoryFailReducer,
})
