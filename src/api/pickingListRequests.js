import {createRequest} from './httpUtils';
import {GET_PICKING_LIST_API} from "./apiConstants";

export const pickingListRequest = payload => {
    const api = {...GET_PICKING_LIST_API, url: `${GET_PICKING_LIST_API.url}/${payload.year}/${payload.month}/${payload.dispatchType}`}
    return createRequest(api, payload.certificate, null)
}

