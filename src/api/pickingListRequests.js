import {createRequest} from './httpUtils';
import {GET_PICKING_LIST_API, GET_PICKLIST_API, GET_PICKLIST_VIRTUAL_API} from "./apiConstants";

export const pickingListRequest = payload => {
    const api = {...GET_PICKING_LIST_API, url: `${GET_PICKING_LIST_API.url}/${payload.year}/${payload.month}/${payload.dispatchType}`}
    return createRequest(api, payload.certificate, null)
}

export const pickListRequest = payload => {
    const api = {...GET_PICKLIST_API, url: `${GET_PICKLIST_API.url}/${payload.teamId}/${payload.month}/${payload.year}/${payload.isSpecial}`}
    return createRequest(api, payload.certificate, null)
}

export const pickListVirtualRequest = payload => {
    const api = {...GET_PICKLIST_VIRTUAL_API, url: `${GET_PICKLIST_VIRTUAL_API.url}/${payload.teamId}/${payload.month}/${payload.year}/${payload.isSpecial}`}
    return createRequest(api, payload.certificate, null)
}
