import { createReducer } from './reducerUtils'
import {GET_ITEM_CONSUMPTION_REPORT_SUCCESS,GET_ITEM_CONSUMPTION_REPORT_FAIL} from "../actions/reports/itemConsumptionReportActionConstants";



//ITEM CONSUMPTION REPORT REDUCER


const initialState = {
    consumptionList: [],
    consumptionReportLoading: false,
    error: {}
}

const getItemConsumptionReportSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      consumptionList:payload.consumptionList,
      consumptionReportLoading: false

    }
}



const getItemConsumptionReportFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    consumptionList:[],
    consumptionReportLoading: false,
    error: payload.error,

  }
}


export default createReducer(initialState, {
    [GET_ITEM_CONSUMPTION_REPORT_SUCCESS]: getItemConsumptionReportSuccessReducer,
    [GET_ITEM_CONSUMPTION_REPORT_FAIL]: getItemConsumptionReportFailReducer


})



