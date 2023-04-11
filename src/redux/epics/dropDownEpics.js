import {
    BRAND_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_START_ACTION
} from '../actions/dropDown/dropDownActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    businessUnitDropdownSuccessAction,
    businessUnitDropdownFailAction, brandDropdownSuccessAction, brandDropdownFailAction,
} from '../actions/dropDown/dropDownActions'
import {brandDropDownRequest, businessUnitDropDownRequest} from '../../api/dropDownRequests'


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
