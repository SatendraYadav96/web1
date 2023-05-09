import {ofType} from "redux-observable";
import {SEARCH_INVOICE_START} from "../actions/dispatchInvoice/searchInvoiceActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {searchInvoiceRequest} from "../../api/invoiceRequests";
import {searchInvoiceFailAction, searchInvoiceSuccessAction} from "../actions/dispatchInvoice/searchInvoiceAction";

export const searchInvoiceStartEpic = (action$) =>
    action$.pipe(
        ofType(SEARCH_INVOICE_START),
        debounceTime(4000),
        switchMap((action) =>
            searchInvoiceRequest(action.payload).pipe(
                map((listResponse) => searchInvoiceSuccessAction({searchInvoiceList: listResponse.response})),
                catchError((error) => of(searchInvoiceFailAction({error: error}))),
            )
        )
    )
