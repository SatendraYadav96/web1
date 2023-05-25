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
    ADD_COST_CENTER_SUCCESS, ADD_COST_CENTER_FAIL, ADD_SAMPLES_SUCCESS, ADD_SAMPLES_FAIL, GET_BUISNESS_UNIT_SUCCESS, GET_BUISNESS_UNIT_FAIL, ADD_BUISNESS_UNIT_SUCCESS, ADD_BUISNESS_UNIT_FAIL, EDIT_BUISNESS_UNIT_SUCCESS, EDIT_BUISNESS_UNIT_FAIL, BUISNESS_UNIT_BY_ID_SUCCESS, BUISNESS_UNIT_BY_ID_FAIL
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


//EDIT VENDOR

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



