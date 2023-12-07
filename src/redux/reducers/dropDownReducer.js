import { createReducer } from './reducerUtils'
import {
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION,
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION,
    BRAND_DROPDOWN_SUCCESS_ACTION,
    BRAND_DROPDOWN_FAIL_ACTION,
    DIVISION_DROPDOWN_SUCCESS_ACTION,
    DIVISION_DROPDOWN_FAIL_ACTION,
    TEAM_DROPDOWN_SUCCESS_ACTION,
    TEAM_DROPDOWN_FAIL_ACTION,
    COST_CENTER_DROPDOWN_SUCCESS_ACTION,
    COST_CENTER_DROPDOWN_FAIL_ACTION,
    RECIPIENT_SUCCESS_ACTION,
    RECIPIENT_FAIL_ACTION,
    INVOICE_DROPDOWN_SUCCESS_ACTION,
    INVOICE_DROPDOWN_FAIL_ACTION,
    TRANSPORT_DROPDOWN_SUCCESS_ACTION,
    TRANSPORT_DROPDOWN_FAIL_ACTION,
    LEGAL_ENTITY_DROPDOWN_SUCCESS_ACTION,
    LEGAL_ENTITY_DROPDOWN_FAIL_ACTION,
    USER_DESIGNATION_DROPDOWN_FAIL_ACTION,
    USER_DESIGNATION_DROPDOWN_SUCCESS_ACTION,
    USER_DROPDOWN_SUCCESS_ACTION,
    USER_DROPDOWN_FAIL_ACTION,
    RECIPIENT_DESIGNATION_DROPDOWN_SUCCESS_ACTION,
    RECIPIENT_DESIGNATION_DROPDOWN_FAIL_ACTION,
    APPROVER_DROPDOWN_SUCCESS_ACTION,
    APPROVER_DROPDOWN_FAIL_ACTION,
    TSE_DROPDOWN_SUCCESS_ACTION,
    TSE_DROPDOWN_FAIL_ACTION,
    ASSIGN_TSE_SUCCESS_ACTION,
    ASSIGN_TSE_FAIL_ACTION,
    GET_TSE_LIST_SUCCESS_ACTION,
    GET_TSE_LIST_FAIL_ACTION,
    UNASSIGN_TSE_SUCCESS_ACTION,
    UNASSIGN_TSE_FAIL_ACTION,
    ASSIGN_TSE_START_ACTION, UNASSIGN_TSE_START_ACTION


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
    recipientDropdown: [],
    recipientDropdownLoading: false,
    invoiceDropdown: [],
    invoiceDropdownLoading: false,
    transportDropdown: [],
    transportDropdownLoading: false,
    legalEntityDropdown: [],
    legalEntityDropdownLoading: false,
    userDesignationDropdown: [],
    userDesignationDropdownLoading: false,
    userDropdown: [],
    userDropdownLoading: false,
    approverDropdown:[],
    approverDropdownLoading:false,
    tseDropdown:[],
    tseDropdownLoading:false,
    assignTse:[],
    assignTseLoading:false,
    assignTseSuccess: false,
    tseList:[],
    tseListLoading:false,
    unassignTse:[],
    unassignTseLoading:false,
    unassignTseSuccess: false,
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
       brandDropdown: payload.brandDropdown.map(row =>{
           return {
               label:row.name,
               value:row.id
           }
       }),
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
        costCenterDropdown: payload.costCenterDropdown.map(row =>{
            return {
                label:row.name,
                value:row.id
            }
        }),
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

//RECIPIENT DROPDOWN
const recipientDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientDropdown: payload.recipientDropdown,
        recipientDropdownLoading: false,
        error: null

    }
}

const recipientDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientDropdown:[],
        error: payload.error,
        recipientDropdownLoading: false,
    }
}

//INVOICE DROPDOWN
const invoiceDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceDropdown: payload.invoiceDropdown,
        invoiceDropdownLoading: false,
        error: null

    }
}

const invoiceDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        invoiceDropdown:[],
        error: payload.error,
        invoiceDropdownLoading: false,
    }
}

//TRANSPORT DROPDOWN
const transportDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportDropdown: payload.transportDropdown,
        transportDropdownLoading: false,
        error: null

    }
}

const transportDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        transportDropdown:[],
        error: payload.error,
        transportDropdownLoading: false,
    }
}

//TRANSPORT DROPDOWN
const legalEntityDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        legalEntityDropdown: payload.legalEntityDropdown,
        legalEntityDropdownLoading: false,
        error: null

    }
}

const legalEntityDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        legalEntityDropdown:[],
        error: payload.error,
        legalEntityDropdownLoading: false,
    }
}

//USER DESIGNATION DROPDOWN
const userDesignationDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        userDesignationDropdown: payload.userDesignationDropdown,
        userDesignationDropdownLoading: false,
        error: null

    }
}

const userDesignationDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        userDesignationDropdown:[],
        error: payload.error,
        legalEntityDropdownLoading: false,
    }
}

//RECIPIENT DESIGNATION DROPDOWN
const recipientDesignationDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientDesignationDropdown: payload.recipientDesignationDropdown,
        recipientDesignationDropdownLoading: false,
        error: null

    }
}

const recipientDesignationDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientDesignationDropdown:[],
        error: payload.error,
        recipientDesignationDropdownLoading: false,
    }
}

//USER DROPDOWN
const userDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        userDropdown: payload.userDropdown,
        userDropdownLoading: false,
        error: null

    }
}

const userDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        userDropdown:[],
        error: payload.error,
        userDropdownLoading: false,
    }
}




//APPROVER DROPDOWN

const approverDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        approverDropdown: payload.approverDropdown,
        approverDropdownLoading: false,
        error: null

    }
}

const approverUnitDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        approverDropdown:[],
        error: payload.error,
        approverDropdownLoading: false,
    }
}


const tseDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        tseDropdown: payload.tseDropdown,
        tseDropdownLoading: false,
        error: null

    }
}

const tseDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        tseDropdown:[],
        error: payload.error,
        tseDropdownLoading: false,
    }
}

const assignTseStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        assignTse: [],
        assignTseLoading: false,
        assignTseSuccess: false,
        error: null
    }
}


const assignTseSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        assignTse: payload.assignTse,
        assignTseLoading: false,
        assignTseSuccess: true,
        error: null
    }
}

const assignTseFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        assignTse:[],
        error: payload.error,
        assignTseSuccess: false,
        assignTseLoading: false,
    }
}




const getTseListSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        tseList: payload.tseList,
        tseListLoading: false,
        error: null
    }
}

const getTseListFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        tseList:[],
        error: payload.error,
        tseListLoading: false,
    }
}

const unassignTseStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        unassignTse: payload.unassignTse,
        unassignTseLoading: false,
        unassignTseSuccess: false,
        error: null
    }
}

const unassignTseSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        unassignTse: payload.unassignTse,
        unassignTseLoading: false,
        unassignTseSuccess: true,
        error: null
    }
}

const unassignTseFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        unassignTse:[],
        unassignTseSuccess: false,
        error: payload.error,
        unassignTseLoading: false,
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
    [RECIPIENT_SUCCESS_ACTION]: recipientDropdownSuccessReducer,
    [RECIPIENT_FAIL_ACTION]: recipientDropdownFailReducer,
    [INVOICE_DROPDOWN_SUCCESS_ACTION]: invoiceDropdownSuccessReducer,
    [INVOICE_DROPDOWN_FAIL_ACTION]: invoiceDropdownFailReducer,
    [TRANSPORT_DROPDOWN_SUCCESS_ACTION]: transportDropdownSuccessReducer,
    [TRANSPORT_DROPDOWN_FAIL_ACTION]: transportDropdownFailReducer,
    [LEGAL_ENTITY_DROPDOWN_SUCCESS_ACTION]: legalEntityDropdownSuccessReducer,
    [LEGAL_ENTITY_DROPDOWN_FAIL_ACTION]: legalEntityDropdownFailReducer,
    [USER_DESIGNATION_DROPDOWN_SUCCESS_ACTION]: userDesignationDropdownSuccessReducer,
    [USER_DESIGNATION_DROPDOWN_FAIL_ACTION]: userDesignationDropdownFailReducer,
    [RECIPIENT_DESIGNATION_DROPDOWN_SUCCESS_ACTION]: recipientDesignationDropdownSuccessReducer,
    [RECIPIENT_DESIGNATION_DROPDOWN_FAIL_ACTION]: recipientDesignationDropdownFailReducer,
    [USER_DROPDOWN_SUCCESS_ACTION]: userDropdownSuccessReducer,
    [USER_DROPDOWN_FAIL_ACTION]: userDropdownFailReducer,
    [APPROVER_DROPDOWN_SUCCESS_ACTION]: approverDropdownSuccessReducer,
    [APPROVER_DROPDOWN_FAIL_ACTION]: approverUnitDropdownFailReducer,
    [TSE_DROPDOWN_SUCCESS_ACTION]:tseDropdownSuccessReducer,
    [TSE_DROPDOWN_FAIL_ACTION]:tseDropdownFailReducer,
    [ASSIGN_TSE_START_ACTION]:assignTseStartReducer,
    [ASSIGN_TSE_SUCCESS_ACTION]:assignTseSuccessReducer,
    [ASSIGN_TSE_FAIL_ACTION]:assignTseFailReducer,
    [GET_TSE_LIST_SUCCESS_ACTION]:getTseListSuccessReducer,
    [GET_TSE_LIST_FAIL_ACTION]:getTseListFailReducer,
    [UNASSIGN_TSE_SUCCESS_ACTION]:unassignTseSuccessReducer,
    [UNASSIGN_TSE_START_ACTION]:unassignTseStartReducer,
    [UNASSIGN_TSE_FAIL_ACTION]:unassignTseFailReducer,

})
