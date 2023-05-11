import {HUB_GRN_ERROR_LOG_START_ACTION, HUB_NEAR_EXPIRY_START_ACTION, HUB_PENDING_REVALIDATION_START_ACTION, ITEM_EXPIRED_DETAILS_START_ACTION, PENDING_DISPATCH_START_ACTION} from "../actions/dashboard/dashboardActionConstants";
import {ofType} from "redux-observable";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {hubGrnErrorLogRequest, hubNearExpiryRequest, hubPendingRevalidationRequest, itemExpiredDetailsRequest, pendingDispatchRequest} from "../../api/dashboardRequests";
import {
    hubGrnErrorLogFailAction,
    hubGrnErrorLogSuccessAction,
    hubNearExpiryFailAction,
    hubNearExpiryStartAction,
    hubNearExpirySuccessAction,
    hubPendingRevalidationFailAction,
    hubPendingRevalidationStartAction,
    hubPendingRevalidationSuccessAction, itemExpiredDetailsFailAction, itemExpiredDetailsSuccessAction,
    pendingDispatchFailAction,
    pendingDispatchSuccessAction
} from "../actions/dashboard/dashboardActions";
import {searchInvoiceRequest} from "../../api/invoiceRequests";
import {searchInvoiceFailAction, searchInvoiceSuccessAction} from "../actions/dispatchInvoice/searchInvoiceAction";


//PENDING_DISPATCH
export const pendingDispatchStartEpic = (action$) =>
    action$.pipe(
        ofType(PENDING_DISPATCH_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            pendingDispatchRequest(action.payload).pipe(
                map((listResponse) => pendingDispatchSuccessAction({pendingDispatchDropdown: listResponse.response})),
                catchError((error) => of(pendingDispatchFailAction({error: error}))),
            )
        )
    )


//HUB_NEAR_EXPIRY
export const hubNearExpiryStartEpic = (action$) =>
    action$.pipe(
        ofType(HUB_NEAR_EXPIRY_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            hubNearExpiryRequest(action.payload).pipe(
                map((listResponse) => hubNearExpirySuccessAction({hubNearExpiryDropdown: listResponse.response})),
                catchError((error) => of(hubNearExpiryFailAction({error: error}))),
            )
        )
    )


//HUB_PENDING_REVALIDATION
export const hubPendingRevalidationStartEpic = (action$) =>
    action$.pipe(
        ofType(HUB_PENDING_REVALIDATION_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            hubPendingRevalidationRequest(action.payload).pipe(
                map((listResponse) => hubPendingRevalidationSuccessAction({dispatchesList: listResponse.response})),
                catchError((error) => of(hubPendingRevalidationFailAction({error: error}))),
            )
        )
    )


// HUB_GRN_ERROR_LOG
export const hubGrnErrorLogStartEpic = (action$) =>
    action$.pipe(
        ofType(HUB_GRN_ERROR_LOG_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            hubGrnErrorLogRequest(action.payload).pipe(
                map((listResponse) => hubGrnErrorLogSuccessAction({hubGrnErrorLogList: listResponse.response})),
                catchError((error) => of(hubGrnErrorLogFailAction({error: error}))),
            )
        )
    )


// ITEM_EXPIRED_DETAILS
export const itemExpiredDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(ITEM_EXPIRED_DETAILS_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            itemExpiredDetailsRequest(action.payload).pipe(
                map((listResponse) => itemExpiredDetailsSuccessAction({itemExpiredDetailsList: listResponse.response})),
                catchError((error) => of(itemExpiredDetailsFailAction({error: error}))),
            )
        )
    )
