import { createReducer } from './reducerUtils'
import {
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION, BRAND_DROPDOWN_SUCCESS_ACTION, BRAND_DROPDOWN_FAIL_ACTION,

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


//BRAND DROPDOWN

const brandDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        brandDropdown: payload.brandDropdown,
        brandDropdownLoading: false,
        error: null
    }
}

const brandDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        brandDropdown:[],
        error: payload.error,
        brandDropdownLoading: false,
    }
}


export default createReducer(initialState, {
    [BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION]: businessUnitDropdownSuccessReducer,
    [BUSINESS_UNIT_DROPDOWN_FAIL_ACTION]: businessUnitDropdownFailReducer,
    [BRAND_DROPDOWN_SUCCESS_ACTION]: brandDropdownSuccessReducer,
    [BRAND_DROPDOWN_FAIL_ACTION]: brandDropdownFailReducer,
})
