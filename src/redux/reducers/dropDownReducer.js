import { createReducer } from './reducerUtils'
import {
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION,

} from '../actions/dropDown/dropDownActionConstants'


const initialState = {
    buDropdown: [],
    buDropdownLoading: false,
    error: null,

}


//BUSINESS UNIT DROPDOWN

const businessUnitDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        buDropdown: payload.buDropdown,
        buDropdownLoading: false,
        error: null

    }
}

const businessUnitDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        buDropdown:[],
        error: payload.error,
        buDropdownLoading: false,
    }
}


export default createReducer(initialState, {
    [BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION]: businessUnitDropdownSuccessReducer,
    [BUSINESS_UNIT_DROPDOWN_FAIL_ACTION]: businessUnitDropdownFailReducer,



})
