import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {EDIT_BLOCK_ITEM_START, EDIT_UNIT_ALLOCATION_START, GET_INVENTORY_REPORT_START, GET_INVENTORY_REVERSAL_HISTORY_START, REVERSE_INVENTORY_START, SWITCH_INVENTORY_START} from "../actions/inventory/inventoryReportActionConstants";
import {
    editBlockItemFailAction,
    editBlockItemSuccessAction,
    editUnitAllocationFailAction,
    editUnitAllocationSuccessAction,
    getInventoryReportFailAction,
    getInventoryReportSuccessAction,
    getInventoryReversalHistoryFailAction,
    getInventoryReversalHistorySuccessAction, reverseInventoryFailAction, reverseInventorySuccessAction, switchInventoryFailAction, switchInventorySuccessAction
} from "../actions/inventory/inventoryReportActions";
import {editBlockItemRequest, editUnitAllocationRequest, inventoryReportRequest, inventoryRevarsalHistoryRequest, inventoryReversalHistoryRequest, reverseInventory, switchInventory} from "../../api/inventoryRequests";

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

export const editUnitAllocationStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_UNIT_ALLOCATION_START),
        debounceTime(4000),
        switchMap((action) =>
            editUnitAllocationRequest(action.payload).pipe(
                map((listResponse) => editUnitAllocationSuccessAction({editUnitAllocation: listResponse.response})),
                catchError((error) => of(editUnitAllocationFailAction({error: error}))),
            )
        )
    )

export const editBlockItemStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_BLOCK_ITEM_START),
        debounceTime(4000),
        switchMap((action) =>
            editBlockItemRequest(action.payload).pipe(
                map((listResponse) => editBlockItemSuccessAction({editBlockItem: listResponse.response})),
                catchError((error) => of(editBlockItemFailAction({error: error}))),
            )
        )
    )

export const reverseInventoryStartEpic = (action$) =>
    action$.pipe(
        ofType(REVERSE_INVENTORY_START),
        debounceTime(4000),
        switchMap((action) =>
            reverseInventory(action.payload).pipe(
                map((listResponse) => reverseInventorySuccessAction({reverseInventory: listResponse.response})),
                catchError((error) => of(reverseInventoryFailAction({error: error}))),
            )
        )
    )

export const switchInventoryStartEpic = (action$) =>
    action$.pipe(
        ofType(SWITCH_INVENTORY_START),
        debounceTime(4000),
        switchMap((action) =>
            switchInventory(action.payload).pipe(
                map((listResponse) => switchInventorySuccessAction({switchInventory: listResponse.response})),
                catchError((error) => of(switchInventoryFailAction({error: error}))),
            )
        )
    )
