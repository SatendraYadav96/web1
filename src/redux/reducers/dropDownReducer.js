import { createReducer } from './reducerUtils'
import {
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION, BRAND_DROPDOWN_SUCCESS_ACTION, BRAND_DROPDOWN_FAIL_ACTION, DIVISION_DROPDOWN_SUCCESS_ACTION, DIVISION_DROPDOWN_FAIL_ACTION, TEAM_DROPDOWN_SUCCESS_ACTION, TEAM_DROPDOWN_FAIL_ACTION, COST_CENTER_DROPDOWN_SUCCESS_ACTION, COST_CENTER_DROPDOWN_FAIL_ACTION,

} from '../actions/dropDown/dropDownActionConstants'


const initialState = {
    buDropdown: [],
    buDropdownLoading: false,
    brandDropdown: [],
    brandDropdownLoading: false,
    divisionDropdown: [],
    divisionDropdownLoading: false,
    teamDropdown: [],
    teamDropdownLoading: false,
    costCenterDropdown: [],
    costCenterDropdownLoading: false,
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

//DIVISION DROPDOWN
const divisionDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        divisionDropdown: payload.divisionDropdown,
        divisionDropdownLoading: false,
        error: null
    }
}

const divisionDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        divisionDropdown:[],
        error: payload.error,
        divisionDropdownLoading: false,
    }
}

//TEAM DROPDOWN
const teamDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        teamDropdown: payload.teamDropdown,
        teamDropdownLoading: false,
        error: null
    }
}

const teamDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        teamDropdown:[],
        error: payload.error,
        teamDropdownLoading: false,
    }
}

//COST CENTER DROPDOWN
const costCenterDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        costCenterDropdown: payload.costCenterDropdown,
        costCenterDropdownLoading: false,
        error: null
    }
}

const costCenterDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        costCenterDropdown:[],
        error: payload.error,
        costCenterDropdownLoading: false,
    }
}

export default createReducer(initialState, {
    [BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION]: businessUnitDropdownSuccessReducer,
    [BUSINESS_UNIT_DROPDOWN_FAIL_ACTION]: businessUnitDropdownFailReducer,
    [BRAND_DROPDOWN_SUCCESS_ACTION]: brandDropdownSuccessReducer,
    [BRAND_DROPDOWN_FAIL_ACTION]: brandDropdownFailReducer,
    [DIVISION_DROPDOWN_SUCCESS_ACTION]: divisionDropdownSuccessReducer,
    [DIVISION_DROPDOWN_FAIL_ACTION]: divisionDropdownFailReducer,
    [TEAM_DROPDOWN_SUCCESS_ACTION]: teamDropdownSuccessReducer,
    [TEAM_DROPDOWN_FAIL_ACTION]: teamDropdownFailReducer,
    [COST_CENTER_DROPDOWN_SUCCESS_ACTION]: costCenterDropdownSuccessReducer,
    [COST_CENTER_DROPDOWN_FAIL_ACTION]: costCenterDropdownFailReducer,
})
