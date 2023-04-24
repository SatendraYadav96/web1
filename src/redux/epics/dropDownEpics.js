import {
    BRAND_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_START_ACTION, DIVISION_DROPDOWN_START_ACTION, TEAM_DROPDOWN_START_ACTION
} from '../actions/dropDown/dropDownActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    businessUnitDropdownSuccessAction,
    businessUnitDropdownFailAction, brandDropdownSuccessAction, brandDropdownFailAction, divisionDropdownSuccessAction, divisionDropdownFailAction, teamDropdownSuccessAction, teamDropdownFailAction, costCenterDropdownSuccessAction, costCenterDropdownFailAction,
} from '../actions/dropDown/dropDownActions'
import {brandDropDownRequest, businessUnitDropDownRequest, costCenterDropDownRequest, divisionDropDownRequest, teamDropDownRequest} from '../../api/dropDownRequests'


//BUSINESS UNIT DROPDOWN

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
        ofType(TEAM_DROPDOWN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            costCenterDropDownRequest(action.payload).pipe(
                map((listResponse) => costCenterDropdownSuccessAction({costCenterDropdown: listResponse.response})),
                catchError((error) => of(costCenterDropdownFailAction({error: error}))),
            )
        )
    )
