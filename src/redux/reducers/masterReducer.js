import { createReducer } from './reducerUtils'
import {
    GET_VENDOR_SUCCESS,
    GET_VENDOR_FAIL,
    ADD_VENDOR_SUCCESS,
    ADD_VENDOR_FAIL,
    EDIT_VENDOR_SUCCESS,
    EDIT_VENDOR_FAIL,
    VENDOR_BY_ID_FAIL,
    VENDOR_BY_ID_SUCCESS,
    GET_COST_CENTER_SUCCESS,
    GET_COST_CENTER_FAIL,
    EDIT_COST_CENTER_FAIL,
    GET_COST_CENTER_BY_ID_SUCCESS,
    EDIT_COST_CENTER_SUCCESS,
    GET_COST_CENTER_BY_ID_FAIL,
    GET_SAMPLES_SUCCESS,
    GET_SAMPLES_FAIL,
    EDIT_SAMPLES_SUCCESS,
    GET_SAMPLES_BY_ID_SUCCESS,
    GET_SAMPLES_BY_ID_FAIL,
    EDIT_SAMPLES_FAIL,
    ADD_COST_CENTER_SUCCESS,
    ADD_COST_CENTER_FAIL,
    ADD_SAMPLES_SUCCESS,
    ADD_SAMPLES_FAIL,
    GET_BUISNESS_UNIT_SUCCESS,
    GET_BUISNESS_UNIT_FAIL,
    ADD_BUISNESS_UNIT_SUCCESS,
    ADD_BUISNESS_UNIT_FAIL,
    EDIT_BUISNESS_UNIT_SUCCESS,
    EDIT_BUISNESS_UNIT_FAIL,
    BUISNESS_UNIT_BY_ID_SUCCESS,
    BUISNESS_UNIT_BY_ID_FAIL,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAIL,
    TEAM_BY_ID_SUCCESS,
    TEAM_BY_ID_FAIL,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAIL,
    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    USER_BY_ID_SUCCESS,
    USER_BY_ID_FAIL,
    GET_BRAND_SUCCESS,
    GET_BRAND_FAIL, ADD_BRAND_SUCCESS, ADD_BRAND_FAIL, EDIT_BRAND_SUCCESS, EDIT_BRAND_FAIL, BRAND_BY_ID_SUCCESS, BRAND_BY_ID_FAIL, FF_BY_ID_FAIL, FF_BY_ID_SUCCESS, EDIT_FF_FAIL, EDIT_FF_SUCCESS, GET_FF_FAIL, GET_FF_SUCCESS
} from "../actions/master/masterActionConstants";


//VENDOR

const initialState = {
    buisnessUnitList: [],
    buisnessUnitLoading: false,
    insertBuisnessUnit: [],
    insertBuisnessUnitLoading: false,
    editBuisnessUnit: [],
    editBuisnessUnitLoading: false,
    buisnessUnitById: [],
    buisnessUnitByIdLoading:false,
    teamList: [],
    teamLoading: false,
    insertTeam: [],
    insertTeamLoading: false,
    editTeam: [],
    editTeamLoading: false,
    teamById: [],
    teamByIdLoading:false,
    userList: [],
    userLoading: false,
    insertUser: [],
    insertUserLoading: false,
    editUser: [],
    editUserLoading: false,
    userById: [],
    userByIdLoading:false,
    brandList: [],
    brandLoading: false,
    insertBrand: [],
    insertBrandLoading: false,
    editBrand: [],
    editBrandLoading: false,
    brandById: [],
    brandByIdLoading:false,
    ffList: [],
    ffLoading: false,
    insertFF: [],
    insertFFLoading: false,
    editFF: [],
    editFFLoading: false,
    ffById: [],
    ffByIdLoading:false,
    ffHistoryById: [],
    ffHistoryByIdLoading:false,
    vendorList: [],
    vendorLoading: false,
    insertVendor: [],
    insertVendorLoading: false,
    editVendor: [],
    editVendorLoading: false,
    vendorById: [],
    vendorByIdLoading:false,
    costCenterList: [],
    costCenterLoading: false,
    editCostCenterList: [],
    editCostCenterLoading: false,
    costCenterById: [],
    costCenterByIdLoading:false,
    samplesList: [],
    samplesLoading: false,
    editSamplesList: [],
    editSamplesLoading: false,
    samplesById: [],
    samplesByIdLoading:false,
    error: {}
}


//BUISNESS UNIT
const getBuisnessUnitSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        buisnessUnitList:payload.buisnessUnitList,
        buisnessUnitLoading: false

    }
}



const getBuisnessUnitFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        buisnessUnitList:[],
        buisnessUnitLoading: false,
        error: payload.error,

    }
}


//ADD BUISNESS UNIT

const addBuisnessUnitSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertBuisnessUnit:payload.insertBuisnessUnit,
        insertBuisnessUnitLoading: false

    }
}



const addBuisnessUnitFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertBuisnessUnit:[],
        insertBuisnessUnitLoading: false,
        error: payload.error,

    }
}

//EDIT BUSINESS UNIT

const editBuisnessUnitSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editBuisnessUnit:payload.editBuisnessUnit,
        editBuisnessUnitLoading: false

    }
}


const editBuisnessUnitFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editBuisnessUnit:[],
        editBuisnessUnitLoading: false,
        error: payload.error,

    }
}


const getBuisnessUnitByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        buisnessUnitById:payload.buisnessUnitById,
        buisnessUnitByIdLoading: false

    }
}

const getBuisnessUnitByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        buisnessUnitById:[],
        buisnessUnitByIdLoading: false,
        error: payload.error,

    }
}


//TEAM
const getTeamSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        teamList:payload.teamList,
        teamLoading: false

    }
}



const getTeamFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        teamList:[],
        teamLoading: false,
        error: payload.error,

    }
}


//ADD TEAM

const addTeamSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertTeam:payload.insertTeam,
        insertTeamLoading: false

    }
}



const addTeamFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertTeam:[],
        insertTeamLoading: false,
        error: payload.error,

    }
}


//EDIT TEAM

const editTeamSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editTeam:payload.editTeam,
        editTeamLoading: false

    }
}


const editTeamFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editTeam:[],
        editTeamLoading: false,
        error: payload.error,

    }
}


const getTeamByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        teamById:payload.teamById,
        teamByIdLoading: false

    }
}

const getTeamByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        teamById:[],
        teamByIdLoading: false,
        error: payload.error,

    }
}


//USER
const getUserSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        userList:payload.userList,
        userLoading: false

    }
}



const getUserFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        userList:[],
        userLoading: false,
        error: payload.error,

    }
}


//ADD USER

const addUserSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertUser:payload.insertUser,
        insertUserLoading: false

    }
}



const addUserFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertUser:[],
        insertUserLoading: false,
        error: payload.error,

    }
}


//EDIT USER

const editUserSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editUser:payload.editUser,
        editUserLoading: false

    }
}


const editUserFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editUser:[],
        editUserLoading: false,
        error: payload.error,

    }
}


const getUserByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        userById:payload.userById,
        userByIdLoading: false

    }
}

const getUserByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        userById:[],
        userByIdLoading: false,
        error: payload.error,

    }
}


//BRAND
const getBrandSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        brandList:payload.brandList,
        brandLoading: false

    }
}



const getBrandFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        brandList:[],
        brandLoading: false,
        error: payload.error,

    }
}


//ADD BRAND

const addBrandSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertBrand:payload.insertBrand,
        insertBrandLoading: false

    }
}



const addBrandFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertBrand:[],
        insertBrandLoading: false,
        error: payload.error,

    }
}


//EDIT BRAND

const editBrandSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editBrand:payload.editBrand,
        editBrandLoading: false

    }
}


const editBrandFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editBrand:[],
        editBrandLoading: false,
        error: payload.error,

    }
}


const getBrandByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        brandById:payload.brandById,
        brandByIdLoading: false

    }
}

const getBrandByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        brandById:[],
        brandByIdLoading: false,
        error: payload.error,

    }
}


//BRAND
const getFFSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        ffList:payload.ffList,
        ffLoading: false

    }
}



const getFFFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffList:[],
        ffLoading: false,
        error: payload.error,

    }
}


// //ADD BRAND
//
// const addFFSuccessReducer = (state = initialState, payload) => {
//     return {
//         ...state,
//
//         insertFF:payload.insertFF,
//         insertFFLoading: false
//
//     }
// }
//
//
//
// const addFFFailReducer = (state = initialState, payload) => {
//     return {
//         ...state,
//         insertFF:[],
//         insertFFLoading: false,
//         error: payload.error,
//
//     }
// }


//EDIT BRAND

const editFFSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editFF:payload.editFF,
        editFFLoading: false

    }
}


const editFFFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editFF:[],
        editFFLoading: false,
        error: payload.error,

    }
}


const getFFByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        ffById:payload.ffById,
        ffByIdLoading: false

    }
}

const getFFByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        ffById:[],
        ffByIdLoading: false,
        error: payload.error,

    }
}


//VENDOR
const getVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      vendorList:payload.vendorList,
      vendorLoading: false

    }
}



const getVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    vendorList:[],
    vendorLoading: false,
    error: payload.error,

  }
}



//ADD VENDOR


const addVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      insertVendor:payload.insertVendor,
      insertVendorLoading: false

    }
}



const addVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    insertVendor:[],
    insertVendorLoading: false,
    error: payload.error,

  }
}


//EDIT VENDOR

const editVendorSuccessReducer = (state = initialState, payload) => {
    return {
      ...state,

      editVendor:payload.editVendor,
      editVendorLoading: false

    }
}



const editVendorFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    editVendor:[],
    editVendorLoading: false,
    error: payload.error,

  }
}


const getVendorByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        vendorById:payload.vendorById,
        vendorByIdLoading: false

    }
}

const getVendorByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        vendorById:[],
        vendorByIdLoading: false,
        error: payload.error,

    }
}

// GET COST CENTER
const getCostCenterSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        costCenterList:payload.costCenterList,
        costCenterLoading: false

    }
}

const getCostCenterFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        costCenterList:[],
        costCenterLoading: false,
        error: payload.error,

    }
}

//ADD COST CENTER
const addCostCenterSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertCostCenter:payload.insertCostCenter,
        insertCostCenterLoading: false

    }
}



const addCostCenterFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertCostCenter:[],
        insertCostCenterLoading: false,
        error: payload.error,

    }
}


// EDIT COST CENTER
const editCostCenterSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        editCostCenter:payload.editCostCenter,
        editCostCenterLoading: false

    }
}



const editCostCenterFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        editCostCenter:[],
        editCostCenterLoading: false,
        error: payload.error,

    }
}


const getCostCenterByIdSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        costCenterById:payload.costCenterById,
        costCenterByIdLoading: false

    }
}

const getCostCenterByIdFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        costCenterById:[],
        costCenterByIdLoading: false,
        error: payload.error,

    }
}

// GET SAMPLES
const getSamplesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,

    samplesList:payload.samplesList,
    samplesLoading: false

  }
}

const getSamplesFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    samplesList:[],
    samplesLoading: false,
    error: payload.error,

  }
}

// EDIT SAMPLES
const editSamplesSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,

    editSamples:payload.editSamples,
    editSamplesLoading: false

  }
}



const editSamplesFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    editSamples:[],
    editSamplesLoading: false,
    error: payload.error,

  }
}


const getSamplesByIdSuccessReducer = (state = initialState, payload) => {
  return {
    ...state,

    samplesById:payload.samplesById,
    samplesByIdLoading: false

  }
}

const getSamplesByIdFailReducer = (state = initialState, payload) => {
  return {
    ...state,
    samplesById:[],
    samplesByIdLoading: false,
    error: payload.error,

  }
}

//ADD COST CENTER
const addSamplesSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,

        insertSamples:payload.insertSamples,
        insertSamplesLoading: false

    }
}



const addSamplesFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        insertSamples:[],
        insertSamplesLoading: false,
        error: payload.error,

    }
}


export default createReducer(initialState, {
    [GET_BUISNESS_UNIT_SUCCESS]: getBuisnessUnitSuccessReducer,
    [GET_BUISNESS_UNIT_FAIL]: getBuisnessUnitFailReducer,
    [ADD_BUISNESS_UNIT_SUCCESS]: addBuisnessUnitSuccessReducer,
    [ADD_BUISNESS_UNIT_FAIL]: addBuisnessUnitFailReducer,
    [EDIT_BUISNESS_UNIT_SUCCESS]: editBuisnessUnitSuccessReducer,
    [EDIT_BUISNESS_UNIT_FAIL]: editBuisnessUnitFailReducer,
    [BUISNESS_UNIT_BY_ID_SUCCESS]: getBuisnessUnitByIdSuccessReducer,
    [BUISNESS_UNIT_BY_ID_FAIL]: getBuisnessUnitByIdFailReducer,
    [GET_TEAM_SUCCESS]: getTeamSuccessReducer,
    [GET_TEAM_FAIL]: getTeamFailReducer,
    [ADD_TEAM_SUCCESS]: addTeamSuccessReducer,
    [ADD_TEAM_FAIL]: addTeamFailReducer,
    [EDIT_TEAM_SUCCESS]: editTeamSuccessReducer,
    [EDIT_TEAM_FAIL]: editTeamFailReducer,
    [TEAM_BY_ID_SUCCESS]: getTeamByIdSuccessReducer,
    [TEAM_BY_ID_FAIL]: getTeamByIdFailReducer,
    [GET_USER_SUCCESS]: getUserSuccessReducer,
    [GET_USER_FAIL]: getUserFailReducer,
    [ADD_USER_SUCCESS]: addUserSuccessReducer,
    [ADD_USER_FAIL]: addUserFailReducer,
    [EDIT_USER_SUCCESS]: editUserSuccessReducer,
    [EDIT_USER_FAIL]: editUserFailReducer,
    [USER_BY_ID_SUCCESS]: getUserByIdSuccessReducer,
    [USER_BY_ID_FAIL]: getUserByIdFailReducer,
    [GET_BRAND_SUCCESS]: getBrandSuccessReducer,
    [GET_BRAND_FAIL]: getBrandFailReducer,
    [ADD_BRAND_SUCCESS]: addBrandSuccessReducer,
    [ADD_BRAND_FAIL]: addBrandFailReducer,
    [EDIT_BRAND_SUCCESS]: editBrandSuccessReducer,
    [EDIT_BRAND_FAIL]: editBrandFailReducer,
    [BRAND_BY_ID_SUCCESS]: getBrandByIdSuccessReducer,
    [BRAND_BY_ID_FAIL]: getBrandByIdFailReducer,
    [GET_FF_SUCCESS]: getFFSuccessReducer,
    [GET_FF_FAIL]: getFFFailReducer,
    // [ADD_FF_SUCCESS]: addFFSuccessReducer,
    // [ADD_FF_FAIL]: addFFFailReducer,
    [EDIT_FF_SUCCESS]: editFFSuccessReducer,
    [EDIT_FF_FAIL]: editFFFailReducer,
    [FF_BY_ID_SUCCESS]: getFFByIdSuccessReducer,
    [FF_BY_ID_FAIL]: getFFByIdFailReducer,
    // [FF HISTORY_BY_ID_SUCCESS]: getFFByIdSuccessReducer,
    // [FF HISTORY_BY_ID_FAIL]: getFFByIdFailReducer,
    [GET_VENDOR_SUCCESS]: getVendorSuccessReducer,
    [GET_VENDOR_FAIL]: getVendorFailReducer,
    [ADD_VENDOR_SUCCESS]: addVendorSuccessReducer,
    [ADD_VENDOR_FAIL]: addVendorFailReducer,
    [EDIT_VENDOR_SUCCESS]: editVendorSuccessReducer,
    [EDIT_VENDOR_FAIL]: editVendorFailReducer,
    [VENDOR_BY_ID_SUCCESS]: getVendorByIdSuccessReducer,
    [VENDOR_BY_ID_FAIL]: getVendorByIdFailReducer,
    [GET_COST_CENTER_SUCCESS]: getCostCenterSuccessReducer,
    [GET_COST_CENTER_FAIL]: getCostCenterFailReducer,
    [ADD_COST_CENTER_SUCCESS]: addCostCenterSuccessReducer,
    [ADD_COST_CENTER_FAIL]: addCostCenterFailReducer,
    [EDIT_COST_CENTER_SUCCESS]: editCostCenterSuccessReducer,
    [EDIT_COST_CENTER_FAIL]: editCostCenterFailReducer,
    [GET_COST_CENTER_BY_ID_SUCCESS]: getCostCenterByIdSuccessReducer,
    [GET_COST_CENTER_BY_ID_FAIL]: getCostCenterByIdFailReducer,
    [GET_SAMPLES_SUCCESS]: getSamplesSuccessReducer,
    [GET_SAMPLES_FAIL]: getSamplesFailReducer,
    [EDIT_SAMPLES_SUCCESS]: editSamplesSuccessReducer,
    [EDIT_SAMPLES_FAIL]: editSamplesFailReducer,
    [GET_SAMPLES_BY_ID_SUCCESS]: getSamplesByIdSuccessReducer,
    [GET_SAMPLES_BY_ID_FAIL]: getSamplesByIdFailReducer,
    [ADD_SAMPLES_SUCCESS]: addSamplesSuccessReducer,
    [ADD_SAMPLES_FAIL]: addSamplesFailReducer,
  })



