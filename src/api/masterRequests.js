import {createRequest} from './httpUtils';
import {
    GET_VENDOR_API,
    ADD_VENDOR_API,
    EDIT_VENDOR_API,
    VENDOR_BY_ID_API,
    GET_COST_CENTER_API,
    EDIT_COST_CENTER_API,
    COST_CENTER_BY_ID_API,
    GET_SAMPLES_API,
    EDIT_SAMPLES_API,
    SAMPLES_BY_ID_API,
    ADD_COST_CENTER_API,
    ADD_SAMPLES_API,
    GET_BUISNESS_UNIT_API,
    ADD_BUISNESS_UNIT_API,
    EDIT_BUISNESS_UNIT_API,
    BUISNESS_UNIT_BY_ID_API, GET_TEAM_API, TEAM_BY_ID_API, EDIT_TEAM_API, ADD_TEAM_API, GET_USER_API, ADD_USER_API, EDIT_USER_API, USER_BY_ID_API
} from "./apiConstants";

//BUISNESS_UNIT

export const buisnessUnitRequest = payload => {
    const api = {...GET_BUISNESS_UNIT_API, url: `${GET_BUISNESS_UNIT_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const addBuisnessUnitRequest=  payload => {
    return createRequest(ADD_BUISNESS_UNIT_API, payload.certificate, payload.bu)
}

export const editBuisnessUnitRequest=  payload => {
    return createRequest(EDIT_BUISNESS_UNIT_API, payload.certificate, payload.bu)
}

export const buisnessUnitByIdRequest = payload => {
    const api = {...BUISNESS_UNIT_BY_ID_API, url: `${BUISNESS_UNIT_BY_ID_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, null)
}

//TEAM

export const teamRequest = payload => {
    const api = {...GET_TEAM_API, url: `${GET_TEAM_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const addTeamRequest=  payload => {
    return createRequest(ADD_TEAM_API, payload.certificate, payload.tem)
}

export const editTeamRequest=  payload => {
    return createRequest(EDIT_TEAM_API, payload.certificate, payload.tem)
}

export const teamByIdRequest = payload => {
    const api = {...TEAM_BY_ID_API, url: `${TEAM_BY_ID_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, null)
}

//USER

export const userRequest = payload => {
    const api = {...GET_USER_API, url: `${GET_USER_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const addUserRequest=  payload => {
    return createRequest(ADD_USER_API, payload.certificate, payload.usr)
}

export const editUserRequest=  payload => {
    return createRequest(EDIT_USER_API, payload.certificate, payload.usr)
}

export const userByIdRequest = payload => {
    const api = {...USER_BY_ID_API, url: `${USER_BY_ID_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, null)
}

//VENDOR

export const vendorRequest = payload => {
    const api = {...GET_VENDOR_API, url: `${GET_VENDOR_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const addVendorRequest=  payload => {
    return createRequest(ADD_VENDOR_API, payload.certificate, payload.vnd)
}

export const editVendorRequest=  payload => {
    const api = {...EDIT_VENDOR_API, url: `${EDIT_VENDOR_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, payload.vnd)
}

export const vendorByIdRequest = payload => {
    const api = {...VENDOR_BY_ID_API, url: `${VENDOR_BY_ID_API.url}/${payload.id}`}
    return createRequest(api, payload.certificate, null)
}

export const costCenterRequest = payload => {
    const api = {...GET_COST_CENTER_API, url: `${GET_COST_CENTER_API.url}/${payload.status}`}
    return createRequest(api, payload.certificate, null)
}

export const editCostCenterRequest=  payload => {
  const api = {...EDIT_COST_CENTER_API, url: `${EDIT_COST_CENTER_API.url}/${payload.id}`}
  return createRequest(api, payload.certificate, payload.ccm)
}

export const costCenterByIdRequest = payload => {
  const api = {...COST_CENTER_BY_ID_API, url: `${COST_CENTER_BY_ID_API.url}/${payload.id}`}
  return createRequest(api, payload.certificate, null)
}

export const addCostCenterRequest=  payload => {
    return createRequest(ADD_COST_CENTER_API, payload.certificate, payload.ccm)
}

export const samplesRequest = payload => {
  const api = {...GET_SAMPLES_API, url: `${GET_SAMPLES_API.url}/${payload.status}`}
  return createRequest(api, payload.certificate, null)
}

export const editSamplesRequest=  payload => {
  const api = {...EDIT_SAMPLES_API, url: `${EDIT_SAMPLES_API.url}/${payload.id}`}
  return createRequest(api, payload.certificate, payload.smp)
}

export const samplesByIdRequest = payload => {
  const api = {...SAMPLES_BY_ID_API, url: `${SAMPLES_BY_ID_API.url}/${payload.id}`}
  return createRequest(api, payload.certificate, null)
}

export const addSamplesRequest=  payload => {
    return createRequest(ADD_SAMPLES_API, payload.certificate, payload.smp)
}
