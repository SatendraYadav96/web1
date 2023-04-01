import { combineReducers } from 'redux'
import authReducer from './authReducer'
import uiReducer from './uiReducer'
import globalReducer from './globalReducer'
import widgetReducer from "./widgetReducer";
import grnReducer from "./grnReducer";
import allocationReducer from "./allocationReducer";
import recipientReducer from "./recipientReducer";
import picklistReducer from "./picklistReducer";
import monthlyDispatchReducer from "./monthlyDispatchReducer";
import specialDispatchReducer from "./specialDispatchReducer";
import recipientReportReducer from "./recipientReportReducer";
import purchaseReportReducer from "./purchaseReportReducer";
import dispatchesReportReducer from "./dispatchesReportReducer";
import dispatchRegisterReportReducer from "./dispatchRegisterReportReducer";
import deviationReportReducer from "./deviationReportReducer";
import itemConsumptionReportReducer from "./itemConsumptionReportReducer";
import destructionReportReducer from "./destructionReportReducer";
import hsnInvoiceReducer from './hsnInvoiceReducer';
import masterReducer from './masterReducer'




const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    global: globalReducer,
    widget: widgetReducer,
    grn: grnReducer,
    allocations: allocationReducer,
    recipients: recipientReducer,
    pickingLoad:picklistReducer,
    monthlyDispatch:monthlyDispatchReducer,
    specialDispatch:specialDispatchReducer,
    recipientReport:recipientReportReducer,
    purchaseReport:purchaseReportReducer,
    dispatchesReport:dispatchesReportReducer,
    dispatchRegisterReport:dispatchRegisterReportReducer,
    deviationReport:deviationReportReducer,
    consumptionReport:itemConsumptionReportReducer,
    destructionReport:destructionReportReducer,
    addHsn:hsnInvoiceReducer,
    master:masterReducer


})

export default rootReducer
