import {ofType} from "redux-observable";
import {INVOICE_UPLOAD_START} from "../actions/dispatchInvoice/invoiceUploadActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {invoiceUploadRequest} from "../../api/invoiceRequests";
import {invoiceUploadFailAction, invoiceUploadSuccessAction} from "../actions/dispatchInvoice/invoiceUploadAction";

export const invoiceUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(INVOICE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            invoiceUploadRequest(action.payload).pipe(
                map((listResponse) => invoiceUploadSuccessAction({invoiceUploadList: listResponse.response})),
                catchError((error) => of(invoiceUploadFailAction({error: error}))),
            )
        )
    )
