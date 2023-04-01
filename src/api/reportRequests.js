import {createRequest} from './httpUtils';
import {GET_RECIPIENT_REPORT_API} from "./apiConstants";
import {GET_PURCHASE_REPORT_API} from "./apiConstants";
import {GET_DISPATCHES_REPORT_API} from "./apiConstants";
import {GET_DISPATCH_REGISTER_REPORT_API} from "./apiConstants";
import {GET_DEVIATION_REPORT_API} from "./apiConstants";
import {GET_ITEM_CONSUMPTION_REPORT_API} from "./apiConstants";
import {GET_DESTRUCTION_REPORT_API} from "./apiConstants";



//RECIPIENT REPORT

export const recipientReportRequest = payload => {
    const api = {...GET_RECIPIENT_REPORT_API, url: `${GET_RECIPIENT_REPORT_API.url}/${payload.businessUnit}/${payload.division}/${payload.team}/${payload.statusId}`}
    return createRequest(api, payload.certificate, null)
}

//PURCHASE REPORT

export const purchaseReportRequest = payload => {
    const api = {...GET_PURCHASE_REPORT_API, url: `${GET_PURCHASE_REPORT_API.url}/${payload.startDate}/${payload.endDate}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}

//DISPATCHES REPORT

export const dispatchesReportRequest = payload => {
    const api = {...GET_DISPATCHES_REPORT_API, url: `${GET_DISPATCHES_REPORT_API.url}/${payload.startDate}/${payload.endDate}/${payload.filter}/${payload.filterPlan}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}

//DISPATCH REGISTER REPORT

export const dispatchRegisterReportRequest = payload => {
    const api = {...GET_DISPATCH_REGISTER_REPORT_API, url: `${GET_DISPATCH_REGISTER_REPORT_API.url}/${payload.startDate}/${payload.endDate}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}/${payload.team}/${payload.filterPlan}/${payload.statusId}`}
    return createRequest(api, payload.certificate, null)
}

//DEVIATION REPORT

export const deviationReportRequest = payload => {
    const api = {...GET_DEVIATION_REPORT_API, url: `${GET_DEVIATION_REPORT_API.url}/${payload.quarterName}/${payload.fromDate}/${payload.toDate}/${payload.userId}/${payload.userDesgId}`}
    return createRequest(api, payload.certificate, null)
}


//ITEM CONSUMPTION REPORT

export const itemConsumptionReportRequest = payload => {
    const api = {...GET_ITEM_CONSUMPTION_REPORT_API, url: `${GET_ITEM_CONSUMPTION_REPORT_API.url}/${payload.fromDate}/${payload.toDate}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}


//DESTRUCTION REPORT

export const destructionReportRequest = payload => {
    const api = {...GET_DESTRUCTION_REPORT_API, url: `${GET_DESTRUCTION_REPORT_API.url}/${payload.fromDate}/${payload.toDate}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}/${payload.statusId}`}
    return createRequest(api, payload.certificate, null)
}





