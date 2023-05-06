import {createRequest} from './httpUtils';
import {GET_ITEM_CODE_API} from "./apiConstants";


//ITEM CODE
export const itemCodeRequest = payload => {
    const api = {...GET_ITEM_CODE_API, url: `${GET_ITEM_CODE_API.url}`}
    return createRequest(api, payload.certificate, null)
}




