
//APPROVAL
import {GET_MONTHLY_APPROVAL_API} from "./apiConstants";
import {createRequest} from "./httpUtils";

export const monthlyApprovalRequest = payload => {
    const api = {...GET_MONTHLY_APPROVAL_API, url: `${GET_MONTHLY_APPROVAL_API.url}/${payload.month}/${payload.year}/${payload.userId}/${payload.userDesgId}`}
    return createRequest(api, payload.certificate, null)
}
