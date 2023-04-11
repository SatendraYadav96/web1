import {
    BUSINESS_UNIT_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION, BRAND_DROPDOWN_FAIL_ACTION, BRAND_DROPDOWN_START_ACTION, BRAND_DROPDOWN_SUCCESS_ACTION,

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
