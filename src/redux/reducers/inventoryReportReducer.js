import {createReducer} from "./reducerUtils";
import {GET_INVENTORY_REPORT_FAIL, GET_INVENTORY_REPORT_SUCCESS} from "../actions/inventory/inventoryReportActionConstants";

const initialState = {
  inventoryList: [],
  inventoryReportLoading: false,
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

export default createReducer(initialState, {
  [GET_INVENTORY_REPORT_SUCCESS]: getInventoryReportSuccessReducer,
  [GET_INVENTORY_REPORT_FAIL]: getInventoryReportFailReducer


})
