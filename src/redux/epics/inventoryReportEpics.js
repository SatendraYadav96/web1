import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {GET_INVENTORY_REPORT_START} from "../actions/inventory/inventoryReportActionConstants";
import {getInventoryReportFailAction, getInventoryReportSuccessAction} from "../actions/inventory/inventoryReportActions";
import {inventoryReportRequest} from "../../api/inventoryRequests";

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
