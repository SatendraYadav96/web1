import {createRequest} from "./httpUtils";
import {GET_LOV_API, MENU_API} from "./apiConstants";

export const menuRequest = (payload) => {
    return createRequest(MENU_API, payload.certificate, null)
}

export const lovRequest = (payload) => {
    const api = {
        ...GET_LOV_API,
        url: `${GET_LOV_API.url}/${payload.type}`,
    }
    return createRequest(api, payload.certificate, null)
}


