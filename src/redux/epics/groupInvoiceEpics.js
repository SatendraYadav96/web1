import {ofType} from "redux-observable";
import {GROUP_INVOICE_START, GROUP_INVOICE_UPLOAD_START} from "../actions/dispatchInvoice/groupInvoiceActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {groupInvoiceRequest} from "../../api/invoiceRequests";
import {groupInvoiceFailAction, groupInvoiceSuccessAction, groupInvoiceUploadFailAction, groupInvoiceUploadSuccessAction} from "../actions/dispatchInvoice/groupInvoiceAction";
import {invoiceGroupingRequest} from "../../api/pickingListRequests";

export const groupInvoiceStartEpic = (action$) =>
    action$.pipe(
        ofType(GROUP_INVOICE_START),
        debounceTime(4000),
        switchMap((action) =>
            groupInvoiceRequest(action.payload).pipe(
                map((listResponse) => groupInvoiceSuccessAction({groupInvoiceList: listResponse.response})),
                catchError((error) => of(groupInvoiceFailAction({error: error}))),
            )
        )
    )

export const groupInvoiceUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(GROUP_INVOICE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            invoiceGroupingRequest(action.payload).pipe(
                map((listResponse) => groupInvoiceUploadSuccessAction({groupInvoiceUploadList: listResponse.response})),
                catchError((error) => of(groupInvoiceUploadFailAction({error: error}))),
            )
        )
    )

