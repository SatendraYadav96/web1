import {
    BUSINESS_UNIT_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION,
    BRAND_DROPDOWN_FAIL_ACTION,
    BRAND_DROPDOWN_START_ACTION,
    BRAND_DROPDOWN_SUCCESS_ACTION,
    DIVISION_DROPDOWN_START_ACTION,
    DIVISION_DROPDOWN_SUCCESS_ACTION,
    DIVISION_DROPDOWN_FAIL_ACTION,
    TEAM_DROPDOWN_START_ACTION,
    TEAM_DROPDOWN_SUCCESS_ACTION,
    TEAM_DROPDOWN_FAIL_ACTION, COST_CENTER_DROPDOWN_START_ACTION, COST_CENTER_DROPDOWN_SUCCESS_ACTION, COST_CENTER_DROPDOWN_FAIL_ACTION,

} from './dropDownActionConstants'



//BUSINESS UNIT DROPDOWN

export const businessUnitDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: BUSINESS_UNIT_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const businessUnitDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const businessUnitDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: BRAND_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}

// BRAND DROPDOWN

export const brandDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: BRAND_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const brandDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: BRAND_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const brandDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: BRAND_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}

// DIVISION DROPDOWN

export const divisionDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: DIVISION_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const divisionDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: DIVISION_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const divisionDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: DIVISION_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}

// TEAM DROPDOWN

export const teamDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: TEAM_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const teamDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TEAM_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const teamDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: TEAM_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}

// COST CENTER DROPDOWN

export const costCenterDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: COST_CENTER_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const costCenterDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: COST_CENTER_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const costCenterDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: COST_CENTER_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}
