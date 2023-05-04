import {GET_STOCK_LEDGER_REPORT_START,GET_STOCK_LEDGER_REPORT_SUCCESS,GET_STOCK_LEDGER_REPORT_FAIL} from "./stockLedgerReportActionConstants";

//  STOCK_LEDGER REPORT ACTION

export const getStockLedgerReportStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_STOCK_LEDGER_REPORT_START,
        payload: payload,
    })
}

export const getStockLedgerReportSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_STOCK_LEDGER_REPORT_SUCCESS,
        payload: payload,
    })
}

export const getStockLedgerReportFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_STOCK_LEDGER_REPORT_FAIL,
        payload: payload,
    })
}
