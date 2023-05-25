import {
    BRAND_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_START_ACTION, COST_CENTER_DROPDOWN_START_ACTION, DIVISION_DROPDOWN_START_ACTION, INVOICE_DROPDOWN_START_ACTION, RECIPIENT_START_ACTION, TEAM_DROPDOWN_START_ACTION, TRANSPORT_DROPDOWN_START_ACTION
} from '../actions/dropDown/dropDownActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    businessUnitDropdownSuccessAction,
    businessUnitDropdownFailAction,
    brandDropdownSuccessAction,
    brandDropdownFailAction,
    divisionDropdownSuccessAction,
    divisionDropdownFailAction,
    teamDropdownSuccessAction,
    teamDropdownFailAction,
    costCenterDropdownSuccessAction,
    costCenterDropdownFailAction,
    recipientDropdownSuccessAction,
    recipientDropdownFailAction, invoiceDropdownSuccessAction, invoiceDropdownStartAction, invoiceDropdownFailAction, transportDropdownSuccessAction, transportDropdownFailAction,
} from '../actions/dropDown/dropDownActions'
import {brandDropDownRequest, businessUnitDropDownRequest, costCenterDropDownRequest, divisionDropDownRequest, invoiceRequest, recipientDropDownRequest, teamDropDownRequest, transportDropdownRequest} from '../../api/dropDownRequests'


//BUSINESS_UNIT_DROPDOWN
export const businessUnitDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(BUSINESS_UNIT_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            businessUnitDropDownRequest(action.payload).pipe(
                map((listResponse) => businessUnitDropdownSuccessAction({buDropdown: listResponse.response})),
                catchError((error) => of(businessUnitDropdownFailAction({error: error}))),
            )
        )
    )

//BRAND DROPDOWN
export const brandDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(BRAND_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            brandDropDownRequest(action.payload).pipe(
                map((listResponse) => brandDropdownSuccessAction({brandDropdown: listResponse.response})),
                catchError((error) => of(brandDropdownFailAction({error: error}))),
            )
        )
    )

//DIVISION DROPDOWN
export const divisionDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(DIVISION_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            divisionDropDownRequest(action.payload).pipe(
                map((listResponse) => divisionDropdownSuccessAction({divisionDropdown: listResponse.response})),
                catchError((error) => of(divisionDropdownFailAction({error: error}))),
            )
        )
    )

//TEAM DROPDOWN
export const teamDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(TEAM_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            teamDropDownRequest(action.payload).pipe(
                map((listResponse) => teamDropdownSuccessAction({teamDropdown: listResponse.response})),
                catchError((error) => of(teamDropdownFailAction({error: error}))),
            )
        )
    )

//COST CENTER DROPDOWN
export const costCenterDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(COST_CENTER_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            costCenterDropDownRequest(action.payload).pipe(
                map((listResponse) => costCenterDropdownSuccessAction({costCenterDropdown: listResponse.response})),
                catchError((error) => of(costCenterDropdownFailAction({error: error}))),
            )
        )
    )


//RECIPIENT DROPDOWN

export const recipientDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(RECIPIENT_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            recipientDropDownRequest(action.payload).pipe(
                map((listResponse) => recipientDropdownSuccessAction({recipientDropdown: listResponse.response})),
                catchError((error) => of(recipientDropdownFailAction({error: error}))),
            )
        )
    )


//RECIPIENT DROPDOWN

export const invoiceDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(INVOICE_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            invoiceRequest(action.payload).pipe(
                map((listResponse) => invoiceDropdownSuccessAction({invoiceDropdown: listResponse.response})),
                catchError((error) => of(invoiceDropdownFailAction({error: error}))),
            )
        )
    )


//TRANSPORT DROPDOWN
export const transportDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(TRANSPORT_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            transportDropdownRequest(action.payload).pipe(
                map((listResponse) => transportDropdownSuccessAction({transportDropdown: listResponse.response})),
                catchError((error) => of(transportDropdownFailAction({error: error}))),
            )
        )
    )


