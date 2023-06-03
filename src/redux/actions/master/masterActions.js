import {
    GET_BUISNESS_UNIT_START,
    GET_BUISNESS_UNIT_SUCCESS,
    GET_BUISNESS_UNIT_FAIL,
    ADD_BUISNESS_UNIT_START,
    ADD_BUISNESS_UNIT_SUCCESS,
    ADD_BUISNESS_UNIT_FAIL,
    EDIT_BUISNESS_UNIT_START,
    EDIT_BUISNESS_UNIT_SUCCESS,
    EDIT_BUISNESS_UNIT_FAIL,
    BUISNESS_UNIT_BY_ID_START,
    BUISNESS_UNIT_BY_ID_SUCCESS,
    BUISNESS_UNIT_BY_ID_FAIL,
    GET_VENDOR_START,
    GET_VENDOR_SUCCESS,
    GET_VENDOR_FAIL,
    ADD_VENDOR_START,
    ADD_VENDOR_SUCCESS,
    ADD_VENDOR_FAIL,
    EDIT_VENDOR_START,
    EDIT_VENDOR_SUCCESS,
    EDIT_VENDOR_FAIL,
    VENDOR_BY_ID_START,
    VENDOR_BY_ID_SUCCESS,
    VENDOR_BY_ID_FAIL,
    GET_COST_CENTER_START,
    GET_COST_CENTER_SUCCESS,
    GET_COST_CENTER_FAIL,
    EDIT_COST_CENTER_SUCCESS,
    EDIT_COST_CENTER_FAIL,
    GET_COST_CENTER_BY_ID_SUCCESS,
    GET_COST_CENTER_BY_ID_FAIL,
    EDIT_COST_CENTER_START,
    GET_COST_CENTER_BY_ID_START,
    GET_SAMPLES_START,
    GET_SAMPLES_SUCCESS,
    GET_SAMPLES_FAIL,
    GET_SAMPLES_BY_ID_FAIL,
    GET_SAMPLES_BY_ID_SUCCESS,
    GET_SAMPLES_BY_ID_START,
    EDIT_SAMPLES_FAIL,
    EDIT_SAMPLES_SUCCESS,
    EDIT_SAMPLES_START,
    ADD_COST_CENTER_START,
    ADD_COST_CENTER_SUCCESS,
    ADD_COST_CENTER_FAIL,
    ADD_SAMPLES_START,
    ADD_SAMPLES_SUCCESS,
    ADD_SAMPLES_FAIL,
    GET_TEAM_START,
    GET_TEAM_SUCCESS,
    GET_TEAM_FAIL,
    TEAM_BY_ID_START,
    TEAM_BY_ID_SUCCESS,
    TEAM_BY_ID_FAIL,
    EDIT_TEAM_START,
    EDIT_TEAM_SUCCESS,
    EDIT_TEAM_FAIL,
    ADD_TEAM_START,
    ADD_TEAM_SUCCESS,
    ADD_TEAM_FAIL,
    USER_BY_ID_SUCCESS,
    USER_BY_ID_FAIL,
    USER_BY_ID_START,
    EDIT_USER_FAIL,
    EDIT_USER_SUCCESS, EDIT_USER_START, ADD_USER_FAIL, ADD_USER_SUCCESS, ADD_USER_START, GET_USER_FAIL, GET_USER_SUCCESS, GET_USER_START,
} from "./masterActionConstants";


//  BUISNESS UNIT

export const getBuisnessUnitStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BUISNESS_UNIT_START,
        payload: payload,
    })
}

export const getBuisnessUnitSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_BUISNESS_UNIT_SUCCESS,
        payload: payload,
    })
}

export const getBuisnessUnitFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_BUISNESS_UNIT_FAIL,
        payload: payload,
    })
}


// ADD BUISNESS UNIT

export const addBuisnessUnitStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_BUISNESS_UNIT_START,
        payload: payload,
    })
}

export const addBuisnessUnitSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_BUISNESS_UNIT_SUCCESS,
        payload: payload,
    })
}

export const addBuisnessUnitFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_BUISNESS_UNIT_FAIL,
        payload: payload,
    })
}

//EDIT BUISNESS UNIT

export const editBuisnessUnitStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_BUISNESS_UNIT_START,
        payload: payload,
    })
}

export const editBuisnessUnitSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_BUISNESS_UNIT_SUCCESS,
        payload: payload,
    })
}

export const editBuisnessUnitFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_BUISNESS_UNIT_FAIL,
        payload: payload,
    })
}


export const getBuisnessUnitByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: BUISNESS_UNIT_BY_ID_START,
        payload: payload,
    })
}

export const getBuisnessUnitByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: BUISNESS_UNIT_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getBuisnessUnitByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: BUISNESS_UNIT_BY_ID_FAIL,
        payload: payload,
    })
}


//  TEAM

export const getTeamStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_TEAM_START,
        payload: payload,
    })
}

export const getTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_TEAM_SUCCESS,
        payload: payload,
    })
}

export const getTeamFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_TEAM_FAIL,
        payload: payload,
    })
}


// ADD TEAM

export const addTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_TEAM_START,
        payload: payload,
    })
}

export const addTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_TEAM_SUCCESS,
        payload: payload,
    })
}

export const addTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_TEAM_FAIL,
        payload: payload,
    })
}

//EDIT TEAM

export const editTeamStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_TEAM_START,
        payload: payload,
    })
}

export const editTeamSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_TEAM_SUCCESS,
        payload: payload,
    })
}

export const editTeamFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_TEAM_FAIL,
        payload: payload,
    })
}


export const getTeamByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: TEAM_BY_ID_START,
        payload: payload,
    })
}

export const getTeamByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: TEAM_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getTeamByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: TEAM_BY_ID_FAIL,
        payload: payload,
    })
}


//  USER

export const getUserStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_USER_START,
        payload: payload,
    })
}

export const getUserSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_USER_SUCCESS,
        payload: payload,
    })
}

export const getUserFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_USER_FAIL,
        payload: payload,
    })
}


// ADD TEAM

export const addUserStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_USER_START,
        payload: payload,
    })
}

export const addUserSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_USER_SUCCESS,
        payload: payload,
    })
}

export const addUserFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_USER_FAIL,
        payload: payload,
    })
}

//EDIT TEAM

export const editUserStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_USER_START,
        payload: payload,
    })
}

export const editUserSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_USER_SUCCESS,
        payload: payload,
    })
}

export const editUserFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_USER_FAIL,
        payload: payload,
    })
}


export const getUserByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: USER_BY_ID_START,
        payload: payload,
    })
}

export const getUserByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: USER_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getUserByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: USER_BY_ID_FAIL,
        payload: payload,
    })
}



//  VENDOR

export const getVendorStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VENDOR_START,
        payload: payload,
    })
}

export const getVendorSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_VENDOR_SUCCESS,
        payload: payload,
    })
}

export const getVendorFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_VENDOR_FAIL,
        payload: payload,
    })
}


// ADD VENDOR

export const addVendorStartAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_START,
    payload: payload,
  })
}

export const addVendorSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_SUCCESS,
    payload: payload,
  })
}

export const addVendorFailAction = (payload) => (dispatch) => {
  dispatch({
    type: ADD_VENDOR_FAIL,
    payload: payload,
  })
}

//EDIT VENDOR

export const editVendorStartAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_START,
    payload: payload,
  })
}

export const editVendorSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_SUCCESS,
    payload: payload,
  })
}

export const editVendorFailAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_VENDOR_FAIL,
    payload: payload,
  })
}


export const getVendorByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: VENDOR_BY_ID_START,
        payload: payload,
    })
}

export const getVendorByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: VENDOR_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getVendorByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: VENDOR_BY_ID_FAIL,
        payload: payload,
    })
}

// COST CENTER
export const getCostCenterStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_START,
        payload: payload,
    })
}

export const getCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const getCostCenterFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_FAIL,
        payload: payload,
    })
}

export const editCostCenterStartAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_START,
        payload: payload,
    })
}

export const editCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const editCostCenterFailAction = (payload) => (dispatch) => {
    dispatch({
        type: EDIT_COST_CENTER_FAIL,
        payload: payload,
    })
}


export const getCostCenterByIdStartAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_BY_ID_START,
        payload: payload,
    })
}

export const getCostCenterByIdSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: GET_COST_CENTER_BY_ID_SUCCESS,
        payload: payload,
    })
}

export const getCostCenterByIdFailAction = (payload) => (dispatch) =>{
    dispatch({
        type: GET_COST_CENTER_BY_ID_FAIL,
        payload: payload,
    })
}

export const addCostCenterStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_START,
        payload: payload,
    })
}

export const addCostCenterSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_SUCCESS,
        payload: payload,
    })
}

export const addCostCenterFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_COST_CENTER_FAIL,
        payload: payload,
    })
}


// SAMPLES
export const getSamplesStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_START,
    payload: payload,
  })
}

export const getSamplesSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_SAMPLES_SUCCESS,
    payload: payload,
  })
}

export const getSamplesFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_FAIL,
    payload: payload,
  })
}

export const editSamplesStartAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_START,
    payload: payload,
  })
}

export const editSamplesSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_SUCCESS,
    payload: payload,
  })
}

export const editSamplesFailAction = (payload) => (dispatch) => {
  dispatch({
    type: EDIT_SAMPLES_FAIL,
    payload: payload,
  })
}


export const getSamplesByIdStartAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_BY_ID_START,
    payload: payload,
  })
}

export const getSamplesByIdSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: GET_SAMPLES_BY_ID_SUCCESS,
    payload: payload,
  })
}

export const getSamplesByIdFailAction = (payload) => (dispatch) =>{
  dispatch({
    type: GET_SAMPLES_BY_ID_FAIL,
    payload: payload,
  })
}

// ADD VENDOR

export const addSamplesStartAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_SAMPLES_START,
        payload: payload,
    })
}

export const addSamplesSuccessAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_SAMPLES_SUCCESS,
        payload: payload,
    })
}

export const addSamplesFailAction = (payload) => (dispatch) => {
    dispatch({
        type: ADD_SAMPLES_FAIL,
        payload: payload,
    })
}
