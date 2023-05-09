import {ofType} from "redux-observable";
import {GROUP_INVOICE_START} from "../actions/dispatchInvoice/groupInvoiceActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {groupInvoiceRequest} from "../../api/invoiceRequests";
import {groupInvoiceFailAction, groupInvoiceSuccessAction} from "../actions/dispatchInvoice/groupInvoiceAction";

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
