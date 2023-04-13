export const AUTH_CERTIFICATE = 'Authorization'
export const BASE_URL = 'http://localhost:8080'

export const LOGIN_API = { url: '/v1/user/login', method: 'POST', auth: false }
export const MENU_API = { url: '/v1/ui/menus', method: 'GET', auth: true }
export const USER_PROFILE_API = { url: '/v1/user/profile', method: 'GET', auth: true }

export const GET_LOV_API =  { url: '/v1/lov', method: 'GET', auth: true }

//Goods Receipt
export const GET_UNACKNOWLEDGE_LIST_API = { url: '/v1/grn/acknowledge', method: 'GET', auth: true }
export const REJECT_ACKNOWLEDGE_API = {url: '/v1/grn/rejectAcknowledge', method: 'PUT', auth: true}
export const APPROVE_ACKNOWLEDGE_API = {url: '/v1/grn/approveAcknowledge', method: 'PUT', auth: true}
export const GRN_UPLOAD_API = { url: '/v1/grn/getUploadLog', method: 'GET', auth: true }

//ALLOCATIONS
export const GET_ITEMS_TO_ALLOCATE_API = { url: '/v1/allocations/itemsToAllocate', method: 'GET', auth: true }
export const GET_ALLOCATIONS_FOR_PLAN = { url: '/v1/allocations/allocationForPlan', method: 'GET', auth: true }
export const MONTHLY_ALLOCATION_START_API = { url: '/v1/allocations/monthly/createview', method: 'POST', auth: true }
export const DISTRIBUTION_PLAN_INVENTORY_API = { url: '/v1/allocations/monthly/distribution', method: 'GET', auth: true }

//Recipients
export const GET_RECIPIENTS_API = { url: '/v1/recipient/forteam', method: 'GET', auth: true }

//DispatchInvoice
export const GET_PICKING_LIST_API = {url: '/v1/dispatchInvoicing/getPickingList',method:'GET',auth:true}
export const GET_MONTHLY_DISPATCH_API = {url: '/v1/dispatchInvoicing/getMonthlyDispatchSearch',method:'GET',auth:true}
export const GET_EMPLOYEE_INVOICE_DETAILS_API = {url: '/v1/dispatchInvoicing/getEmployeeInvoiceDetails',method:'GET',auth:true}
export const GET_SPECIAL_DISPATCH_API = {url: '/v1/dispatchInvoicing/getSpecialDispatchSearch',method:'GET',auth:true}
export const GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_API = {url: '/v1/dispatchInvoicing/getSpecialEmployeeInvoiceDetails',method:'GET',auth:true}

//Reports
export const GET_RECIPIENT_REPORT_API = {url: '/v1/report/getReportRecipient',method:'GET',auth:true}
export const GET_PURCHASE_REPORT_API = {url: '/v1/report/getReportPurchase',method:'GET',auth:true}
export const GET_DISPATCHES_REPORT_API = {url: '/v1/report/getReportDispatches',method:'GET',auth:true}
export const GET_DISPATCH_REGISTER_REPORT_API = {url: '/v1/report/getReportDispatchRegister',method:'GET',auth:true}
export const GET_DEVIATION_REPORT_API = {url: '/v1/report/getReportDeviation',method:'GET',auth:true}
export const GET_ITEM_CONSUMPTION_REPORT_API = {url: '/v1/report/getReportItemConsumption',method:'GET',auth:true}
export const GET_DESTRUCTION_REPORT_API = {url: '/v1/report/getReportDestruction',method:'GET',auth:true}


//  HSN & INVOICE

export const ADD_HSN_API = { url: '/v1/hsn/addHsn', method: 'POST', auth: true }
export const ADD_BOX_WEIGHT_API = { url: '/v1/hsn/editInvoiceHeader', method: 'PUT', auth: true }

//MASTER

//VENDOR
export const GET_VENDOR_API = {url: '/v1/master/getVendor',method:'GET',auth:true}
export const ADD_VENDOR_API = { url: '/v1/master/addVendor', method: 'POST', auth: true }
export const EDIT_VENDOR_API = { url: '/v1/master/editVendor', method: 'PUT', auth: true }
export const VENDOR_BY_ID_API = { url: '/v1/master/getVendorById', method: 'GET', auth: true }

// COST CENTER
export const GET_COST_CENTER_API = {url: '/v1/master/getCostCenter',method:'GET',auth:true}
export const EDIT_COST_CENTER_API = { url: '/v1/master/editCostCenter', method: 'PUT', auth: true }
export const COST_CENTER_BY_ID_API = { url: '/v1/master/getCostCenterById', method: 'GET', auth: true }
export const ADD_COST_CENTER_API = { url: '/v1/master/addCostCenter', method: 'POST', auth: true }

//DROPDOWN

export const GET_BUSINESS_UNIT_DROPDOWN_API = {url: '/v1/master/getBusinessUnitDropdown',method:'GET',auth:true}

export const GET_BRAND_DROPDOWN_API = {url: '/v1/master/getBrandDropdown',method:'GET',auth:true}

// SAMPLES
export const GET_SAMPLES_API = {url: '/v1/master/getSample',method:'GET',auth:true}
export const EDIT_SAMPLES_API = { url: '/v1/master/editSample', method: 'PUT', auth: true }
export const SAMPLES_BY_ID_API = { url: '/v1/master/getSampleById', method: 'GET', auth: true }

// INVENTORY
export const GET_INVENTORY_REPORT_API = {url: '/v1/inventory/searchInventory',method:'GET',auth:true}
export const GET_INVENTORY_REVERSAL_HISTORY_REPORT_API = {url: '/v1/inventory/getInventoryReversalHistory',method:'GET',auth:true}

