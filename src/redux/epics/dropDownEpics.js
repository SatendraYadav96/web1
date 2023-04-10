import {
    BUSINESS_UNIT_DROPDOWN_START_ACTION
} from '../actions/dropDown/dropDownActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    businessUnitDropdownSuccessAction,
    businessUnitDropdownFailAction,
} from '../actions/dropDown/dropDownActions'
import { businessUnitDropDownRequest } from '../../api/dropDownRequests'


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
