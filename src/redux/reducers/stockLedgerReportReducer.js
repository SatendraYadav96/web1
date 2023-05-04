import { createReducer } from './reducerUtils'
import {GET_STOCK_LEDGER_REPORT_SUCCESS,GET_STOCK_LEDGER_REPORT_FAIL} from "../actions/reports/stockLedgerReportActionConstants";



//STOCK_LEDGER REPORT REDUCER


const initialState = {
    stockLedgerList: [],
    stockLedgerReportLoading: false,
    error: {}
}

const getStockLedgerReportSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        stockLedgerList:payload.stockLedgerList,
        stockLedgerReportLoading: false

    }
}



const getStockLedgerReportFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        stockLedgerList:[],
        stockLedgerReportLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_STOCK_LEDGER_REPORT_SUCCESS]: getStockLedgerReportSuccessReducer,
    [GET_STOCK_LEDGER_REPORT_FAIL]: getStockLedgerReportFailReducer


})



