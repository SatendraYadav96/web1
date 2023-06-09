import {createRequest} from './httpUtils';
import {GET_AGEING_REPORT_API, GET_ITEM_WISE_REPORT_API, GET_NEAR_TO_EXPIRY_INPUT_REPORT_API, GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_API, GET_RECIPIENT_REPORT_API, GET_SIMPLE_INVENTORY_REPORT_API, GET_STOCK_LEDGER_REPORT_API} from "./apiConstants";
import {GET_PURCHASE_REPORT_API} from "./apiConstants";
import {GET_DISPATCHES_REPORT_API} from "./apiConstants";
import {GET_DISPATCH_REGISTER_REPORT_API} from "./apiConstants";
import {GET_DEVIATION_REPORT_API} from "./apiConstants";
import {GET_ITEM_CONSUMPTION_REPORT_API} from "./apiConstants";
import {GET_DESTRUCTION_REPORT_API} from "./apiConstants";



//RECIPIENT REPORT

export const recipientReportRequest = payload => {
    const api = {...GET_RECIPIENT_REPORT_API, url: `${GET_RECIPIENT_REPORT_API.url}`}
    return createRequest(api, payload.certificate, payload.ff)
}

//PURCHASE REPORT

export const purchaseReportRequest = payload => {
    const api = {...GET_PURCHASE_REPORT_API, url: `${GET_PURCHASE_REPORT_API.url}`}
    return createRequest(api, payload.certificate, payload.pur)
}

//DISPATCHES REPORT

export const dispatchesReportRequest = payload => {
    const api = {...GET_DISPATCHES_REPORT_API, url: `${GET_DISPATCHES_REPORT_API.url}`}
    return createRequest(api, payload.certificate, payload.disp)
}

//DISPATCH REGISTER REPORT

export const dispatchRegisterReportRequest = payload => {
    const api = {...GET_DISPATCH_REGISTER_REPORT_API, url: `${GET_DISPATCH_REGISTER_REPORT_API.url}/${payload.startDate}/${payload.endDate}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.division}/${payload.team}/{${payload.statusId}/${payload.filterPlan}`}
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

//ITEM WISE REPORT
export const itemWiseReportRequest = payload => {
    const api = {...GET_ITEM_WISE_REPORT_API, url: `${GET_ITEM_WISE_REPORT_API.url}/${payload.fromDate}/${payload.toDate}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}

export const stockLedgerReportRequest = payload => {
    const api = {...GET_STOCK_LEDGER_REPORT_API, url: `${GET_STOCK_LEDGER_REPORT_API.url}/${payload.fromDate}/${payload.toDate}/${payload.itemId}`}
    return createRequest(api, payload.certificate, null)
}

export const ageingReportRequest = payload => {
    const api = {...GET_AGEING_REPORT_API, url: `${GET_AGEING_REPORT_API.url}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}

export const nearToExpiryInputReportRequest = payload => {
    const api = {...GET_NEAR_TO_EXPIRY_INPUT_REPORT_API, url: `${GET_NEAR_TO_EXPIRY_INPUT_REPORT_API.url}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}/${payload.type}`}
    return createRequest(api, payload.certificate, null)
}

export const nearToExpirySampleReportRequest = payload => {
    const api = {...GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_API, url: `${GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_API.url}/${payload.userId}/${payload.userDesgId}/${payload.businessUnit}/${payload.divison}`}
    return createRequest(api, payload.certificate, null)
}

// SIMPLE INVENTORY
export const simpleInventoryReportRequest = payload => {
    const api = {...GET_SIMPLE_INVENTORY_REPORT_API, url: `${GET_SIMPLE_INVENTORY_REPORT_API.url}`}
    return createRequest(api, payload.certificate, payload.simInv)
}

