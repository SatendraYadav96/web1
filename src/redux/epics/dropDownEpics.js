import {
    BRAND_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_START_ACTION,
    COST_CENTER_DROPDOWN_START_ACTION,
    DIVISION_DROPDOWN_START_ACTION,
    INVOICE_DROPDOWN_START_ACTION,
    LEGAL_ENTITY_DROPDOWN_START_ACTION, RECIPIENT_DESIGNATION_DROPDOWN_START_ACTION,
    RECIPIENT_START_ACTION,
    TEAM_DROPDOWN_START_ACTION,
    TRANSPORT_DROPDOWN_START_ACTION,
    USER_DESIGNATION_DROPDOWN_START_ACTION,
    USER_DROPDOWN_START_ACTION,
    APPROVER_DROPDOWN_START_ACTION, TSE_DROPDOWN_START_ACTION, ASSIGN_TSE_START_ACTION, GET_TSE_LIST_START_ACTION
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
    recipientDropdownFailAction,
    invoiceDropdownSuccessAction,
    invoiceDropdownStartAction,
    invoiceDropdownFailAction,
    transportDropdownSuccessAction,
    transportDropdownFailAction,
    legalEntityDropdownSuccessAction,
    legalEntityDropdownFailAction,
    userDesignationDropdownSuccessAction,
    userDesignationDropdownFailAction, userDropdownSuccessAction, userDropdownFailAction, recipientDesignationDropdownSuccessAction, recipientDesignationDropdownFailAction,
    approverDropdownSuccessAction, approverDropdownFailAction, tseDropdownStartAction, tseDropdownFailAction, tseDropdownSuccessAction, assignTseSuccessAction, assignTseFailAction, getTseListStartAction, getTseListSuccessAction, getTseListFailAction, unassignTseSuccessAction, unassignTseFailAction
} from '../actions/dropDown/dropDownActions'
import {
    brandDropDownRequest,
    businessUnitDropDownRequest,
    costCenterDropDownRequest,
    divisionDropDownRequest,
    invoiceRequest,
    legalEntityDropdownRequest, recipientDesignationDropdownRequest,
    recipientDropDownRequest,
    teamDropDownRequest,
    transportDropdownRequest,
    userDesignationDropdownRequest,
    userDropdownRequest,
    approverDropDownRequest, tseDropDownRequest, assignTseRequest, getTseListRequest, unassignTseRequest
} from '../../api/dropDownRequests'


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


//LEGAL ENTITY DROPDOWN
export const legalEntityDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(LEGAL_ENTITY_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            legalEntityDropdownRequest(action.payload).pipe(
                map((listResponse) => legalEntityDropdownSuccessAction({legalEntityDropdown: listResponse.response})),
                catchError((error) => of(legalEntityDropdownFailAction({error: error}))),
            )
        )
    )


//USER DESIGNATION DROPDOWN
export const userDesignationDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(USER_DESIGNATION_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            userDesignationDropdownRequest(action.payload).pipe(
                map((listResponse) => userDesignationDropdownSuccessAction({userDesignationDropdown: listResponse.response})),
                catchError((error) => of(userDesignationDropdownFailAction({error: error}))),
            )
        )
    )


//RECIPIENT DESIGNATION DROPDOWN
export const recipientDesignationDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(RECIPIENT_DESIGNATION_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            recipientDesignationDropdownRequest(action.payload).pipe(
                map((listResponse) => recipientDesignationDropdownSuccessAction({recipientDesignationDropdown: listResponse.response})),
                catchError((error) => of(recipientDesignationDropdownFailAction({error: error}))),
            )
        )
    )


//USER DROPDOWN
export const userDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(USER_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            userDropdownRequest(action.payload).pipe(
                map((listResponse) => userDropdownSuccessAction({userDropdown: listResponse.response})),
                catchError((error) => of(userDropdownFailAction({error: error}))),
            )
        )
    )


//APPROVER DROPDOWN

export const approverDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(APPROVER_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            approverDropDownRequest(action.payload).pipe(
                map((listResponse) => approverDropdownSuccessAction({approverDropdown: listResponse.response})),
                catchError((error) => of(approverDropdownFailAction({error: error}))),
            )
        )
    )



export const tseDropdownStartEpic = (action$) =>
    action$.pipe(
        ofType(TSE_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            tseDropDownRequest(action.payload).pipe(
                map((listResponse) => tseDropdownSuccessAction({tseDropdown: listResponse.response})),
                catchError((error) => of(tseDropdownFailAction({error: error}))),
            )
        )
    )




export const assignTseStartEpic = (action$) =>
    action$.pipe(
        ofType(ASSIGN_TSE_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            assignTseRequest(action.payload).pipe(
                map((listResponse) => assignTseSuccessAction({assignTse: listResponse.response})),
                catchError((error) => of(assignTseFailAction({error: error}))),
            )
        )
    )



export const getTseListStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_TSE_LIST_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            getTseListRequest(action.payload).pipe(
                map((listResponse) => getTseListSuccessAction({tseList: listResponse.response})),
                catchError((error) => of(getTseListFailAction({error: error}))),
            )
        )
    )


export const unassignTseStartEpic = (action$) =>
    action$.pipe(
        ofType(UNASSIGN_TSE_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            unassignTseRequest(action.payload).pipe(
                map((listResponse) => unassignTseSuccessAction({unassignTse: listResponse.response})),
                catchError((error) => of(unassignTseFailAction({error: error}))),
            )
        )
    )
