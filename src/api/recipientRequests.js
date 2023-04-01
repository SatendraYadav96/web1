import {createRequest} from './httpUtils';
import {GET_RECIPIENTS_API} from "./apiConstants";

export const recipientsForTeam = payload => {
    const api = {...GET_RECIPIENTS_API, url: `${GET_RECIPIENTS_API.url}/${payload.teamId}`}
    return createRequest(api, payload.certificate, null)
}
