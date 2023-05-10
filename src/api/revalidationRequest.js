import {createRequest} from './httpUtils';
import {GET_ITEM_CODE_API, GET_ITEM_REVALIDATION_API} from "./apiConstants";


//ITEM CODE
export const itemCodeRequest = payload => {
    const api = {...GET_ITEM_CODE_API, url: `${GET_ITEM_CODE_API.url}`}
    return createRequest(api, payload.certificate, null)
}

export const itemRevalidationRequest = payload => {
    const api = {...GET_ITEM_REVALIDATION_API, url: `${GET_ITEM_REVALIDATION_API.url}/${payload.itemId}/${payload.revldType}`}
    return createRequest(api, payload.certificate, null)
}


