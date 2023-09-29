import {
    BUSINESS_UNIT_DROPDOWN_START_ACTION,
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BRAND_DROPDOWN_FAIL_ACTION,
    BRAND_DROPDOWN_START_ACTION,
    BRAND_DROPDOWN_SUCCESS_ACTION,
    DIVISION_DROPDOWN_START_ACTION,
    DIVISION_DROPDOWN_SUCCESS_ACTION,
    DIVISION_DROPDOWN_FAIL_ACTION,
    TEAM_DROPDOWN_START_ACTION,
    TEAM_DROPDOWN_SUCCESS_ACTION,
    TEAM_DROPDOWN_FAIL_ACTION,
    COST_CENTER_DROPDOWN_START_ACTION,
    COST_CENTER_DROPDOWN_SUCCESS_ACTION,
    COST_CENTER_DROPDOWN_FAIL_ACTION,
    RECIPIENT_FAIL_ACTION,
    RECIPIENT_START_ACTION,
    RECIPIENT_SUCCESS_ACTION,
    INVOICE_DROPDOWN_START_ACTION,
    INVOICE_DROPDOWN_SUCCESS_ACTION,
    INVOICE_DROPDOWN_FAIL_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION,
    TRANSPORT_DROPDOWN_START_ACTION,
    TRANSPORT_DROPDOWN_SUCCESS_ACTION,
    TRANSPORT_DROPDOWN_FAIL_ACTION,
    LEGAL_ENTITY_DROPDOWN_START_ACTION,
    LEGAL_ENTITY_DROPDOWN_SUCCESS_ACTION,
    LEGAL_ENTITY_DROPDOWN_FAIL_ACTION,
    USER_DESIGNATION_DROPDOWN_START_ACTION,
    USER_DESIGNATION_DROPDOWN_SUCCESS_ACTION,
    USER_DESIGNATION_DROPDOWN_FAIL_ACTION,
    USER_DROPDOWN_START_ACTION,
    USER_DROPDOWN_SUCCESS_ACTION,
    USER_DROPDOWN_FAIL_ACTION,
    RECIPIENT_DESIGNATION_DROPDOWN_START_ACTION,
    RECIPIENT_DESIGNATION_DROPDOWN_SUCCESS_ACTION, RECIPIENT_DESIGNATION_DROPDOWN_FAIL_ACTION,
    APPROVER_DROPDOWN_START_ACTION,APPROVER_DROPDOWN_SUCCESS_ACTION,APPROVER_DROPDOWN_FAIL_ACTION

} from './dropDownActionConstants'


//BUSINESS_UNIT_DROPDOWN
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
        type: BUSINESS_UNIT_DROPDOWN_FAIL_ACTION,
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


//RECIPIENT DROPDOWN
export const recipientDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_START_ACTION,
        payload: payload,
    })
}

export const recipientDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_SUCCESS_ACTION,
        payload: payload,
    })
}

export const recipientDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_FAIL_ACTION,
        payload: payload,
    })
}


//INVOICE DROPDOWN
export const invoiceDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const invoiceDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const invoiceDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: INVOICE_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


//TRANSPORT DROPDOWN
export const transportDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const transportDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const transportDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: TRANSPORT_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


//LEGAL ENTITY DROPDOWN
export const legalEntityDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: LEGAL_ENTITY_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const legalEntityDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: LEGAL_ENTITY_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const legalEntityDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: LEGAL_ENTITY_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


//USER DESIGNATION DROPDOWN
export const userDesignationDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DESIGNATION_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const userDesignationDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DESIGNATION_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const userDesignationDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DESIGNATION_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


//RECIPIENT DESIGNATION DROPDOWN
export const recipientDesignationDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_DESIGNATION_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const recipientDesignationDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_DESIGNATION_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const recipientDesignationDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: RECIPIENT_DESIGNATION_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


//USER DROPDOWN
export const userDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const userDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const userDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}

//APPROVER DROPDOWN

export const approverDropdownStartAction = (payload) => (dispatch) => {
    dispatch({
        type: APPROVER_DROPDOWN_START_ACTION,
        payload: payload,
    })
}

export const approverDropdownSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: APPROVER_DROPDOWN_SUCCESS_ACTION,
        payload: payload,
    })
}

export const approverDropdownFailAction = (payload) => (dispatch) => {
    dispatch({
        type: APPROVER_DROPDOWN_FAIL_ACTION,
        payload: payload,
    })
}


