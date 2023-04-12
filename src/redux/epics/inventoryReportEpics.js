import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {GET_INVENTORY_REPORT_START, GET_INVENTORY_REVERSAL_HISTORY_START} from "../actions/inventory/inventoryReportActionConstants";
import {getInventoryReportFailAction, getInventoryReportSuccessAction, getInventoryReversalHistoryFailAction, getInventoryReversalHistorySuccessAction} from "../actions/inventory/inventoryReportActions";
import {inventoryReportRequest, inventoryRevarsalHistoryRequest, inventoryReversalHistoryRequest} from "../../api/inventoryRequests";

export const getInventoryReportStartEpic = (action$) =>
  action$.pipe(
    ofType(GET_INVENTORY_REPORT_START),
    debounceTime(4000),
    switchMap((action) =>
      inventoryReportRequest(action.payload).pipe(
        map((listResponse) => getInventoryReportSuccessAction({inventoryList: listResponse.response})),
        catchError((error) => of(getInventoryReportFailAction({error: error}))),
      )
    )
  )

export const getInventoryReversalHistoryStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_INVENTORY_REVERSAL_HISTORY_START),
        debounceTime(4000),
        switchMap((action) =>
            inventoryReversalHistoryRequest(action.payload).pipe(
                map((listResponse) => getInventoryReversalHistorySuccessAction({inventoryReversalHistoryList: listResponse.response})),
                catchError((error) => of(getInventoryReversalHistoryFailAction({error: error}))),
            )
        )
    )
