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
import inventoryReportReducer from "./inventoryReportReducer";
import purchaseReportReducer from "./purchaseReportReducer";
import dispatchesReportReducer from "./dispatchesReportReducer";
import dispatchRegisterReportReducer from "./dispatchRegisterReportReducer";
import deviationReportReducer from "./deviationReportReducer";
import itemConsumptionReportReducer from "./itemConsumptionReportReducer";
import destructionReportReducer from "./destructionReportReducer";
import hsnInvoiceReducer from './hsnInvoiceReducer';
import masterReducer from './masterReducer';
import dropDownReducer from './dropDownReducer'
import itemWiseReportReducer from "./itemWiseReportReducer";
import stockLedgerReportReducer from "./stockLedgerReportReducer";
import ageingReportReducer from "./ageingReportReducer";
import nearToExpiryInputReportReducer from "./nearToExpiryInputReportReducer";
import itemCodeReducer from "./itemCodeReducer";
import simpleInventoryReportReducer from "./simpleInventoryReportReducer";




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
    itemWiseReport:itemWiseReportReducer,
    stockLedgerReport:stockLedgerReportReducer,
    ageingReport:ageingReportReducer,
    nearToExpiryInputReport:nearToExpiryInputReportReducer,
    inventoryReport:inventoryReportReducer,
    purchaseReport:purchaseReportReducer,
    itemCode:itemCodeReducer,
    simpleInventoryReport:simpleInventoryReportReducer,
    dispatchesReport:dispatchesReportReducer,
    dispatchRegisterReport:dispatchRegisterReportReducer,
    deviationReport:deviationReportReducer,
    consumptionReport:itemConsumptionReportReducer,
    destructionReport:destructionReportReducer,
    addHsn:hsnInvoiceReducer,
    master:masterReducer,
    dropDown:dropDownReducer
})

export default rootReducer
