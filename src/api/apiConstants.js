export const AUTH_CERTIFICATE = 'Authorization'
//export const BASE_URL = 'http://promobee-uat:8080'

//export const BASE_URL = 'http://localhost:8080'


export const BASE_URL = 'https://promobee-chc.squer.co.in:8443'


export const LOGIN_API = { url: '/v1/user/login', method: 'POST', auth: false }
export const LOGOUT_API = { url: '/v1/user/logout', method: 'POST', auth: true }
export const SET_PASSWORD_API = { url: '/v1/user/setpassword', method: 'PUT', auth: true }
export const MENU_API = { url: '/v1/ui/menus', method: 'GET', auth: true }
export const USER_PROFILE_API = { url: '/v1/user/profile', method: 'GET', auth: true }

export const GET_LOV_API =  { url: '/v1/lov', method: 'GET', auth: true }

//Goods Receipt
export const GET_UNACKNOWLEDGE_LIST_API = { url: '/v1/grn/acknowledge', method: 'GET', auth: true }
export const REJECT_ACKNOWLEDGE_API = {url: '/v1/grn/rejectAcknowledge', method: 'PUT', auth: true}
export const APPROVE_ACKNOWLEDGE_API = {url: '/v1/grn/approveAcknowledge', method: 'PUT', auth: true}
export const GRN_API = { url: '/v1/upload/getGrnUploadLog', method: 'GET', auth: true }

//ALLOCATIONS
export const GET_ITEMS_TO_ALLOCATE_API = { url: '/v1/allocations/itemsToAllocate', method: 'GET', auth: true }
export const GET_ALLOCATIONS_FOR_PLAN = { url: '/v1/allocations/allocationForPlan', method: 'GET', auth: true }
export const MONTHLY_ALLOCATION_START_API = { url: '/v1/allocations/monthly/createview', method: 'GET', auth: true }
export const DISTRIBUTION_PLAN_INVENTORY_API = { url: '/v1/allocations/monthly/distribution', method: 'GET', auth: true }
export const VIRTUAL_ALLOCATION_START_API = { url: '/v1/allocation/virtual/create', method: 'GET', auth: true }
//Recipients
export const GET_RECIPIENTS_API = { url: '/v1/recipient/forteam', method: 'GET', auth: true }

//DispatchInvoice
export const GET_PICKING_LIST_API = {url: '/v1/dispatchInvoicing/getPickingList',method:'GET',auth:true}
export const GET_PICKLIST_API = {url: '/v1/inventory/getPickList',method:'GET',auth:true}
export const GET_PICKLIST_VIRTUAL_API = {url: '/v1/inventory/getPickListVirtual',method:'GET',auth:true}
export const GET_PICKLIST_STATUS_API = {url: '/v1/inventory/getPickListStatusByBM',method:'GET',auth:true}
export const GET_MONTHLY_DISPATCH_API = {url: '/v1/dispatchInvoicing/getMonthlyDispatchSearch',method:'GET',auth:true}
export const GET_EMPLOYEE_INVOICE_DETAILS_API = {url: '/v1/dispatchInvoicing/getEmployeeInvoiceDetails',method:'GET',auth:true}
export const GET_SPECIAL_DISPATCH_API = {url: '/v1/dispatchInvoicing/getSpecialDispatchSearch',method:'GET',auth:true}
export const GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_API = {url: '/v1/inventory/getSpecialDispatchListForInvoicing',method:'GET',auth:true}
export const GET_EMPLOYEE_POPUP_DETAILS_API = {url: '/v1/inventory/getEmployeeInvoicePopupDetails',method:'GET',auth:true}
export const GET_DELIVERY_UPDATE_API = {url: '/v1/upload/getTransporterUploadLog',method:'GET',auth:true}
export const GET_INVOICE_UPLOAD_API = {url: '/v1/upload/getInvoiceUploadLog',method:'GET',auth:true}
export const GET_INVOICE_FOR_UPLOAD_API = {url: '/v1/invoice/getInvoicesForGrouping',method:'POST',auth:true}
export const GET_VIRTUAL_DISPATCH_API = {url: '/v1/dispatchInvoicing/getVirtualDispatchSearch',method:'GET',auth:true}
export const GET_VIRTUAL_DISPATCH_DETAILS_API = {url: '/v1/inventory/getVirtualDispatchListForInvoicing',method:'GET',auth:true}
export const EXPORT_ALLOCATION_API = {url: '/v1/inventory/exportAllocation',method:'GET',auth:true}


//Reports
export const GET_RECIPIENT_REPORT_API = {url: '/v1/report/getReportRecipient',method:'POST',auth:true}
export const GET_PURCHASE_REPORT_API = {url: '/v1/report/getReportPurchase',method:'POST',auth:true}
export const GET_DISPATCHES_REPORT_API = {url: '/v1/report/getReportDispatches',method:'POST',auth:true}
export const GET_DISPATCH_REGISTER_REPORT_API = {url: '/v1/report/getReportDispatchRegister',method:'POST',auth:true}
export const GET_DEVIATION_REPORT_API = {url: '/v1/report/getReportDeviation',method:'GET',auth:true}
export const GET_ITEM_CONSUMPTION_REPORT_API = {url: '/v1/report/getReportItemConsumption',method:'POST',auth:true}
export const GET_DESTRUCTION_REPORT_API = {url: '/v1/report/getReportDestruction',method:'POST',auth:true}
export const GET_BATCH_RECONCILIATION_REPORT_API = {url: '/v1/report/getBatchReconciliation',method:'GET',auth:true}
export const GET_VIRTUAL_RECONCILIATION_REPORT_API = {url: '/v1/report/getVirtualReconciliationReport', method:'GET', auth: true}
export const GET_SHIP_ROCKET_REPORT_API = {url: '/v1/report/getShiprocketReport', method: 'GET', auth: true}
export const GET_PHYSICAL_SAMPLING_REPORT_API = {url: '/v1/report/getPhysicalSamplingReport',method:'POST',auth:true}


//  HSN & INVOICE
export const ADD_HSN_API = { url: '/v1/hsn/addHsn', method: 'POST', auth: true }
export const ADD_BOX_WEIGHT_API = { url: '/v1/hsn/editInvoiceHeader', method: 'PUT', auth: true }

//APPROVAL
export const GET_MONTHLY_APPROVAL_API = {url: '/v1/approval/getMonthlyApprovalForBex',method:'GET',auth:true}
export const GET_MONTHLY_APPROVAL_DETAILS_API = {url: '/v1/approval/getMonthlyApprovalDetails',method:'GET',auth:true}
export const RESET_PLAN_API = { url: '/v1/approval/resetDraftPlan', method: 'GET', auth: true }
export const UNLOCK_PLAN_API = { url: '/v1/approval/unlockPlanForUserByMonthAndYear', method: 'PUT', auth: true }
export const APPROVE_PLAN_API = { url: '/v1/approval/approvePlan', method: 'PUT', auth: true }
export const REJECT_PLAN_API = { url: '/v1/approval/rejectPlan', method: 'PUT', auth: true }
export const MONTHLY_TO_SPECIAL_API = { url: '/v1/approval/saveMonthlyToSpecial', method: 'PUT', auth: true }
export const GET_SPECIAL_PLAN_APPROVAL_API = {url: '/v1/approval/getSpecialPlanForApproval',method:'GET',auth:true}
export const GET_SPECIAL_PLAN_DETAILS_APPROVAL_DETAILS_API = {url: '/v1/approval/getSpecialPlanApprovalDetails',method:'GET',auth:true}
export const GET_VIRTUAL_PLAN_APPROVAL_API = {url: '/v1/approval/getVirtualPlanForApproval',method:'GET',auth:true}
export const GET_VIRTUAL_PLAN_DETAILS_APPROVAL_DETAILS_API = {url: '/v1/approval/getVirtualPlanApprovalDetails',method:'GET',auth:true}
export const GET_VIRTUAL_APPROVAL_DOWNLOAD_API = {url: '/v1/approval/virtualAllocationDownload', method: 'POST', auth: true}

//COMPLIANCE GRN
export const GET_NON_COMPLIANCE_API = {url: '/v1/compliance/recipientUnblockingPartial',method:'GET',auth:true}
export const SAVE_NON_COMPLIANCE_ADMIN_REMARK_API = {url: '/v1/compliance/saveNonComplianceAdminRemark', method: 'POST', auth: true}
export const SAVE_OVER_SAMPLING_API = {url: '/v1/compliance/saveOverSampling', method: 'POST', auth: true}
export const OVER_SAMPLING_DETAILS_DATA_API = {url: '/v1/compliance/overSamplingDetailsData', method: 'GET', auth: true}
export const SAVE_MASTER_BLOCKED_RECIPIENT = {url:'/v1/compliance/SaveMasterBlockedRecipient', method: 'POST', auth: true}

//OVER SAMPLING
export const GET_COMPLIANCE_DETAILS_API = {url: '/v1/compliance/overSamplingDetails',method:'GET',auth:true}

//MAIL LOG
export const GET_MAIL_LOG_API = {url: '/v1/compliance/optimaMailLogs',method:'GET',auth:true}

//MANAGEMENT DASHBOARD
export const GET_MANAGEMENT_DASHBOARD_API = {url: '/v1/dashboard/bexManagementDashboard',method:'GET',auth:true}

//BUISNESS UNIT
export const GET_BUISNESS_UNIT_API = {url: '/v1/master/getBusinessUnit',method:'GET',auth:true}
export const ADD_BUISNESS_UNIT_API = { url: '/v1/master/addBusinessUnits', method: 'POST', auth: true }
export const EDIT_BUISNESS_UNIT_API = { url: '/v1/master/editBusinessUnits', method: 'PUT', auth: true }
export const BUISNESS_UNIT_BY_ID_API = { url: '/v1/master/getBusinessUnitById', method: 'GET', auth: true }

//TEAM
export const GET_TEAM_API = {url: '/v1/master/getTeam',method:'GET',auth:true}
export const ADD_TEAM_API = { url: '/v1/master/addTeams', method: 'POST', auth: true }
export const EDIT_TEAM_API = { url: '/v1/master/editTeams', method: 'PUT', auth: true }
export const TEAM_BY_ID_API = { url: '/v1/master/getTeamById', method: 'GET', auth: true }

//USER
export const GET_USER_API = {url: '/v1/master/getUser',method:'GET',auth:true}
export const ADD_USER_API = { url: '/v1/master/addUsers', method: 'POST', auth: true }
export const EDIT_USER_API = { url: '/v1/master/editUsers', method: 'PUT', auth: true }
export const USER_BY_ID_API = { url: '/v1/master/getUserById', method: 'GET', auth: true }

//BRAND
export const GET_BRAND_API = {url: '/v1/master/getBrand',method:'GET',auth:true}
export const ADD_BRAND_API = { url: '/v1/master/addBrands', method: 'POST', auth: true }
export const EDIT_BRAND_API = { url: '/v1/master/editBrands', method: 'PUT', auth: true }
export const BRAND_BY_ID_API = { url: '/v1/master/getBrandById', method: 'GET', auth: true }

//FF
export const GET_FF_API = {url: '/v1/master/getFieldForce',method:'POST',auth:true}
export const ADD_FF_API = { url: '/v1/master/addFieldForces', method: 'POST', auth: true }
export const EDIT_FF_API = { url: '/v1/master/editFieldForces', method: 'PUT', auth: true }
export const FF_BY_ID_API = { url: '/v1/master/getFieldForceById', method: 'GET', auth: true }
export const FF_HISTORY_BY_ID_API = { url: '/v1/master/getFieldForceHistory', method: 'GET', auth: true }

//VENDOR
export const GET_VENDOR_API = {url: '/v1/master/getVendor',method:'GET',auth:true}
export const ADD_VENDOR_API = { url: '/v1/master/addVendors', method: 'POST', auth: true }
export const EDIT_VENDOR_API = { url: '/v1/master/editVendors', method: 'PUT', auth: true }
export const VENDOR_BY_ID_API = { url: '/v1/master/getVendorById', method: 'GET', auth: true }

// COST CENTER
export const GET_COST_CENTER_API = {url: '/v1/master/getCostCenter',method:'GET',auth:true}
export const EDIT_COST_CENTER_API = { url: '/v1/master/editCostCenters', method: 'PUT', auth: true }
export const COST_CENTER_BY_ID_API = { url: '/v1/master/getCostCenterById', method: 'GET', auth: true }
export const ADD_COST_CENTER_API = { url: '/v1/master/addCostCenters', method: 'POST', auth: true }

export const GET_MASTER_BLOCKED_LIST_API = {url: '/v1/compliance/masterBlockedList',method:'GET',auth:true}

//DROPDOWN
export const GET_BUSINESS_UNIT_DROPDOWN_API = {url: '/v1/master/getBusinessUnitDropdown',method:'GET',auth:true}
export const GET_BRAND_DROPDOWN_API = {url: '/v1/master/getBrandDropdown',method:'GET',auth:true}
export const GET_DIVISION_DROPDOWN_API = {url: '/v1/master/getDivisionDropdown',method:'GET',auth:true}
export const GET_TEAM_DROPDOWN_API = {url: '/v1/master/getTeamDropdown',method:'GET',auth:true}
export const GET_COST_CENTER_DROPDOWN_API = {url: '/v1/master/getCostCenterDropdown',method:'GET',auth:true}
export const GET_RECIPIENT_DROPDOWN_API = {url: '/v1/master/getRecipientDropdown',method:'GET',auth:true}
export const GET_INVOICE_DROPDOWN_API = {url: '/v1/master/getInvoiceDropdown',method:'GET',auth:true}
export const GET_TRANSPORT_DROPDOWN_API = {url: '/v1/master/getTransporter',method:'GET',auth:true}
export const GET_LEGAL_ENTITY_DROPDOWN_API = {url: '/v1/master/getLegalEntityDropdown',method:'GET',auth:true}
export const GET_USER_DESIGNATION_DROPDOWN_API = {url: '/v1/master/getUserDesignationDropdown',method:'GET',auth:true}
export const GET_RECIPIENT_DESIGNATION_DROPDOWN_API = {url: '/v1/master/getRecipientDesignationDropdown',method:'GET',auth:true}
export const GET_USER_DROPDOWN_API = {url: '/v1/master/getUserDropdown',method:'GET',auth:true}

export const GET_APPROVER_DROPDOWN_API = {url: '/v1/master/getApproverDropdown',method:'GET',auth:true}

// SAMPLES
export const GET_SAMPLES_API = {url: '/v1/master/getSample',method:'GET',auth:true}
export const EDIT_SAMPLES_API = { url: '/v1/master/editSamples', method: 'PUT', auth: true }
export const SAMPLES_BY_ID_API = { url: '/v1/master/getSampleById', method: 'GET', auth: true }
export const ADD_SAMPLES_API = { url: '/v1/master/addSamples', method: 'POST', auth: true }

// INVENTORY
export const GET_INVENTORY_REPORT_API = {url: '/v1/inventory/searchInventory',method:'GET',auth:true}
export const GET_INVENTORY_REVERSAL_HISTORY_REPORT_API = {url: '/v1/inventory/getInventoryReversalHistory',method:'GET',auth:true}
export const EDIT_UNIT_ALLOCATION_REPORT_API = {url: '/v1/inventory/editUnitAllocation',method:'PUT',auth:true}
export const EDIT_BLOCK_ITEM_REPORT_API = {url: '/v1/inventory/blockItem',method:'PUT',auth:true}
export const REVERSE_INVENTORY_API = { url: '/v1/inventory/reverseInventory', method: 'POST', auth: true }
export const SWITCH_INVENTORY_API = { url: '/v1/inventory/switchInventory', method: 'POST', auth: true }
export const GET_ITEM_WISE_REPORT_API = {url: '/v1/report/getItemWiseReport',method:'POST',auth:true}
export const GET_STOCK_LEDGER_REPORT_API = {url: '/v1/report/getStockLedgerReport',method:'GET',auth:true}
export const GET_AGEING_REPORT_API = {url: '/v1/report/getAgeingReport',method:'POST',auth:true}
export const GET_NEAR_TO_EXPIRY_INPUT_REPORT_API = {url: '/v1/report/getReportNearToExpiryInput',method:'POST',auth:true}
export const GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_API = {url: '/v1/report/getReportNearToExpirySample',method:'GET',auth:true}
export const GET_SIMPLE_INVENTORY_REPORT_API = {url: '/v1/report/getReportSimpleInventory',method:'POST',auth:true}

// INVOICE
export const GET_PRINT_INVOICE_API = {url: '/v1/invoice/printInvoice',method:'POST',auth:true}
export const SEARCH_INVOICE_API = {url: '/v1/invoice/searchInvoice',method:'POST',auth:true}
export const GET_GROUP_INVOICE_API = {url: '/v1/invoice/getGroupInvoiceListHub',method:'POST',auth:true}
export const GET_GENERATE_INVOICE_API = {url: '/v1/invoice/printInvoice',method:'POST',auth:true}
export const GET_GEN_INVOICE_API = {url: '/v1/invoice/generateInvoice',method:'POST',auth:true}
export const GET_GEN_VIRTUAL_INVOICE_API = {url: '/v1/invoice/generateInvoiceVirtual',method:'POST',auth:true}
export const GET_GENERATE_LABEL_API = {url: '/v1/invoice/printLabel',method:'POST',auth:true}

//  REVALIDATION
export const GET_ITEM_REVALIDATION_API = {url: '/v1/revalidation/getItemRevalidationHub',method:'GET',auth:true}
export const GET_ITEM_CODE_API = {url: '/v1/master/getItemCodeDropdown',method:'GET',auth:true}

// DASHBOARD API
export const GET_PENDING_DISPATCH_API = {url: '/v1/dashboard/getPendingDispatch',method:'GET',auth:true}
export const GET_HUB_NEAR_EXPIRY_API = {url: '/v1/dashboard/getHubNearExpiry',method:'GET',auth:true}
export const GET_HUB_PENDING_REVALIDATION_API = {url: '/v1/dashboard/getHubPendingRevalidation',method:'GET',auth:true}
export const GET_HUB_GRN_ERROR_LOG_API = {url: '/v1/dashboard/getHubGrnErrorLog',method:'GET',auth:true}
export const GET_ITEM_EXPIRED_DETAILS_API = {url: '/v1/dashboard/getItemExpiredDetails',method:'GET',auth:true}

export const GET_DISPATCHES_MONTH_WISE_API = {url: '/v1/dashboard/dispatchesMonthWise',method:'GET',auth:true}

export const GET_SPECIAL_COURIER_COST_MONTH_WISE_API = {url: '/v1/dashboard/specialCourierCostMonthWise',method:'GET',auth:true}
//UPLOAD
export const TRANSPORT_UPLOAD_API = {url: '/v1/upload/transporterUpload',method:'POST',auth:true}
export const TRANSPORT_EXCEL_UPLOAD_API = {url: '/v1/upload/transportExcelData',method:'GET',auth:true}
export const GRN_UPLOAD_API = {url: '/v1/upload/grnUpload',method:'POST',auth:true}
export const GRN_EXCEL_UPLOAD_API = {url: '/v1/upload/grnExcelData',method:'GET',auth:true}
export const FF_UPLOAD_API = {url: '/v1/upload/recipientUpload',method:'POST',auth:true}
export const MULTIPLE_ALLOCATION_UPLOAD_API = {url: '/v1/upload/multipleAllocationUpload',method:'POST',auth:true}
export const VIRTUAL_UPLOAD_API = {url: '/v1/upload/virtualUpload',method:'POST',auth:true}
export const INVOICE_UPLOAD_API = {url: '/v1/upload/invoiceUpload',method:'POST',auth:true}
export const INVOICE_EXCEL_UPLOAD_API = {url: '/v1/upload/invoiceExcelData',method:'GET',auth:true}
// export const INVOICE_EXCEL_UPLOAD_API = {url: '/v1/upload/invoiceExcelData',method:'GET',auth:true}
export const VIRTUAL_SAMPLE_UPLOAD_API = {url: '/v1/upload/virtualSampleExcelData',method:'GET',auth:true}
export const VIRTUAL_SAMPLE_UPLOAD_LOG_API = {url: '/v1/upload/getVirtualSampleUploadLog',method:'GET',auth:true}
export const FF_EXCEL_UPLOAD_API = {url: '/v1/upload/recipientExcelData',method:'GET',auth:true}
export const FF_UPLOAD_LOG_API = {url: '/v1/upload/getRecipientUploadLog',method:'GET',auth:true}
export const RECIPIENT_UPLOAD_LOG_API = {url: '/v1/upload/getRecipientUploadLog',method:'GET',auth:true}
export const NON_COMPLIANCE_UPLOAD_LOG_API = {url: '/v1/upload/getNonComplianceUploadLog',method:'GET',auth:true}
export const OVER_SAMPLING_UPLOAD_LOG_API = {url: '/v1/upload/getOverSamplingUploadLog',method:'GET',auth:true}

export const OVER_SAMPLING_DETAILS_UPLOAD_LOG_API = {url: '/v1/upload/getOverSamplingDetailsUploadLog',method:'GET',auth:true}

export const MATERIAL_EXPIRY_UPLOAD_LOG_API = {url: '/v1/upload/getMaterialExpiryUploadLog',method:'GET',auth:true}

export const NON_COMPLIANCE_EXCEL_API = {url: '/v1/upload/nonComplianceExcelData',method:'GET',auth:true}

export const OVER_SAMPLING_EXCEL_API = {url: '/v1/upload/overSamplingExcelData',method:'GET',auth:true}

export const OVER_SAMPLING_DETAILS_EXCEL_API = {url: '/v1/upload/overSamplingDetailsExcelData',method:'GET',auth:true}

export const MATERIAL_EXPIRY_EXCEL_API = {url: '/v1/upload/materialExpiryExcelData',method:'GET',auth:true}
export const NON_COMPLIANCE_UPLOAD_API = {url: '/v1/upload/nonComplianceUpload', method: 'POST', auth: true}
export const OVER_SAMPLING_UPLOAD_API = {url: '/v1/upload/overSamplingUpload', method: 'POST', auth: true}
export const OVER_SAMPLING_DETAILS_UPLOAD_API = {url: '/v1/upload/overSamplingDetailsUpload', method: 'POST', auth: true}
export const MATERIAL_EXPIRY_UPLOAD_API = {url: '/v1/upload/materialExpiryUpload', method: 'POST', auth: true}
//ALLOCATIONS


export const MONTHLY_COMMON_TEAM_API = {url: '/v1/allocation/getTeamForCommonAllocation',method:'GET',auth:true}

export const MONTHLY_DIFFERENTIAL_TEAM_API = {url: '/v1/allocation/getTeamForDifferentialAllocation',method:'GET',auth:true}

export const MONTHLY_QUANTITY_ALLOCATED_DIFFERENTIAL_RECIPIENT_API = {url: '/v1/allocation/getQuantityAllocatedDifferentialRecipient', method: 'GET', auth: true}

export const MONTHLY_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API = {url: '/v1/allocation/getQuantityAllocatedOfUserToItem', method: 'GET', auth: true}

export const GET_TSE_DROPDOWN_API = {url: '/v1/master/getTseDropdown',method:'GET',auth:true}

export const ASSIGN_TSE_API = {url: '/v1/allocation/assignTse',method:'POST',auth:true}

export const GET_TSE_LIST_API = {url: '/v1/allocation/getTseList',method:'GET',auth:true}

export const UNASSIGN_TSE_API = {url: '/v1/allocation/unAssignTse',method:'POST',auth:true}

export const BM_FOR_TSE_API = {url: '/v1/allocation/getBrandManagerForTse',method:'GET',auth:true}

export const LOGIN_AS_BM_API = {url: '/v1/allocation/loginAsBM',method:'GET',auth:true}
export const MONTHLY_COMMON_ALLOCATION_SAVE_API = { url:'/v1/allocation/saveCommonAllocation', method: 'POST', auth: true}

export const MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_API = { url:'/v1/allocation/saveDifferentialAllocation', method: 'POST', auth: true}

export const VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_API = { url:'/v1/allocation/saveVirtualDifferentialAllocation', method: 'POST', auth: true}

export const VIRTUAL_COMMON_ALLOCATION_SAVE_API = {url: '/v1/allocation/saveVirtualCommonAllocation', method: 'POST', auth: true}

export const GET_DOWNLOAD_ALLOCATION_API = {url: '/v1/allocation/getDownloadAllocation', method: 'GET', auth: true}

export const GET_BLOCKED_RECIPIENTS_API = {url: '/v1/allocation/getBlockedRecipients', method: 'GET', auth: true}

export const GET_ACTIVE_USERS_API = {url: '/v1/allocation/getActiveUsers', method: 'GET', auth: true}

export const SEARCH_SPECIAL_PLAN_API = {url: '/v1/allocation/searchSpecialPlan', method: 'GET', auth: true}

export const VIRTUAL_COMMON_TEAM_API = {url: '/v1/allocation/getVirtualTeamForCommonAllocation',method:'GET',auth:true}

export const VIRTUAL_QUANTITY_ALLOCATED_OF_USER_TO_ITEM_API = {url: '/v1/allocation/getVirtualQuantityAllocatedToUser', method: 'GET', auth: true}

export const VIRTUAL_DIFFERENTIAL_TEAM_API = {url: '/v1/allocation/getVirtualTeamForDifferentialAllocation',method:'GET',auth:true}

export const VIRTUAL_QUANTITY_ALLOCATED_DIFFERENTIAL_RECIPIENT_API = {url: '/v1/allocation/getVirtualTeamForDifferentialAllocation', method: 'GET', auth: true}

export const SUBMIT_MONTHLY_ALLOCATION_API = {url: '/v1/allocation/submitMonthlyAllocation', method: 'POST', auth: true}

export const SUBMIT_VIRTUAL_ALLOCATION_API = {url: '/v1/allocation/submitVirtualAllocation', method: 'POST', auth: true}

export const SUBMIT_SPECIAL_ALLOCATION_API = {url: '/v1/allocation/submitSpecialAllocation', method: 'POST', auth: true}

export const GET_ALLOCATION_STATUS_DROPDOWN_API = {url: '/v1/allocation/getAllocationStatusDropdown', method: 'GET', auth: true}

export const GET_MULTIPLE_ALLOCATION_COST_CENTER_API = {url: '/v1/allocation/getMultipleAllocationCostCenter', method: 'POST', auth: true}

export const GET_MULTIPLE_ALLOCATION_EXCEL_DOWNLOAD_API = {url: '/v1/allocation/getMultipleAllocationExcel', method: 'POST', auth: true}

export const GET_MULTIPLE_ALLOCATION_ALL_DOWNLOAD_API = {url:'/v1/allocation/getMultipleAllocationAll', method: 'GET', auth: true}

export const EDIT_SPECIAL_PLAN_API = {url: '/v1/allocation/special/edit', method: 'GET', auth: true}

export const SPECIAL_ALLOCATION_START_API = { url: '/v1/allocation/special/create', method: 'POST', auth: true }

export const SPECIAL_DIFFERENTIAL_TEAM_API = { url: '/v1/allocation/getRecipientForSpecialAllocation', method: 'GET', auth: true}

export const SPECIAL_QUANTITY_ALLOCATED_DIFFERENTIAL_RECIPIENT_API = { url: '/v1/allocation/getSpecialQuantityAllocatedDifferentialRecipient', method: 'GET', auth: true}

export const SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_API = { url:'/v1/allocation/saveSpecialAllocation', method: 'POST', auth: true}

export const DELETE_SPECIAL_ALLOCATION_API = { url:'/v1/allocation/deleteSpecialAllocation', method: 'POST', auth: true}

export const SEND_OVERSAMPLING_MAIL_API = { url: '/v1/email/Send_Mail_oversampling', method: 'GET', auth: true}


