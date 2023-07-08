import {ofType} from "redux-observable";
import {GET_INVOICE_UPLOAD_CSV_START, GET_INVOICE_UPLOAD_FAIL, GET_INVOICE_UPLOAD_START, INVOICE_UPLOAD_START} from "../actions/dispatchInvoice/invoiceUploadActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {invoiceUploadCsvRequest, invoiceUploadRequest} from "../../api/invoiceRequests";
import {invoiceUploadCsvFailAction, invoiceUploadCsvSuccessAction, invoiceUploadFailAction, invoiceUploadSuccessAction} from "../actions/dispatchInvoice/invoiceUploadAction";

export const invoiceUploadStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_INVOICE_UPLOAD_START),
        debounceTime(4000),
        switchMap((action) =>
            invoiceUploadRequest(action.payload).pipe(
                map((listResponse) => invoiceUploadSuccessAction({invoiceUploadList: listResponse.response})),
                catchError((error) => of(invoiceUploadFailAction({error: error}))),
            )
        )
    )

export const invoiceUploadCsvStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_INVOICE_UPLOAD_CSV_START),
        debounceTime(4000),
        switchMap((action) =>
            invoiceUploadCsvRequest(action.payload).pipe(
                map((listResponse) => invoiceUploadCsvSuccessAction({invoiceUploadCsvList: listResponse.response})),
                catchError((error) => of(invoiceUploadCsvFailAction({error: error}))),
            )
        )
    )
