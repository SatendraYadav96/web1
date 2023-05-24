import {GET_MONTHLYDISPATCH_START, GET_EMPLOYEEINVOICEDETAILS_START, GET_PRINT_INVOICE_START, GET_GENERATE_INVOICE_START, GET_GENERATE_LABEL_START} from '../actions/dispatchInvoice/monthlyDispatchActionConstant'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getMonthlyDispatchSuccessAction, getMonthlyDispatchFailAction, getEmployeeInvoiceDetailSuccessAction,
    getEmployeeInvoiceDetailFailAction, getPrintInvoiceSuccessAction, getPrintInvoiceFailAction, getGenerateInvoiceSuccessAction, getGenerateInvoiceFailAction, getGenerateLabelSuccessAction, getGenerateLabelFailAction
} from '../actions/dispatchInvoice/monthlyDispatchAction'
import { monthlyDispatchRequest,employeeInvoiceDetailsRequest } from '../../api/monthlyDispatchRequests'
import {generateInvoiceRequest, generateLabelRequest, printInvoiceRequest} from "../../api/invoiceRequests";


//Monthly Dispatch
export const getMonthlyDispatchStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_MONTHLYDISPATCH_START),
        debounceTime(4000),
        switchMap((action) =>
            monthlyDispatchRequest(action.payload).pipe(
                map((listResponse) => getMonthlyDispatchSuccessAction({monthList: listResponse.response})),
                catchError((error) => of(getMonthlyDispatchFailAction({error: error}))),
            )
        )
    )


// monthly dispatch Employee Invoice Details
export const getEmployeeInvoiceDetailsStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_EMPLOYEEINVOICEDETAILS_START),
        debounceTime(4000),
        switchMap((action) =>
            employeeInvoiceDetailsRequest(action.payload).pipe(
                map((listResponse) => getEmployeeInvoiceDetailSuccessAction({invoiceList: listResponse.response})),
                catchError((error) => of(getEmployeeInvoiceDetailFailAction({error: error}))),
            )
        )
    )


//Monthly Dispatch Print Invoice
export const getPrintInvoiceStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_PRINT_INVOICE_START),
        debounceTime(4000),
        switchMap((action) =>
            printInvoiceRequest(action.payload).pipe(
                map((listResponse) => getPrintInvoiceSuccessAction({printList: listResponse.response})),
                catchError((error) => of(getPrintInvoiceFailAction({error: error}))),
            )
        )
    )


//Monthly Dispatch Generate Invoice
export const getGenerateInvoiceStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_GENERATE_INVOICE_START),
        debounceTime(4000),
        switchMap((action) =>
            generateInvoiceRequest(action.payload).pipe(
                map((listResponse) => getGenerateInvoiceSuccessAction({generateInvoiceList: listResponse.response})),
                catchError((error) => of(getGenerateInvoiceFailAction({error: error}))),
            )
        )
    )


//Monthly Dispatch Generate Label
export const getGenerateLabelStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_GENERATE_LABEL_START),
        debounceTime(4000),
        switchMap((action) =>
            generateLabelRequest(action.payload).pipe(
                map((listResponse) => getGenerateLabelSuccessAction({generateLabelList: listResponse.response})),
                catchError((error) => of(getGenerateLabelFailAction({error: error}))),
            )
        )
    )

