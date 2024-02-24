import {GET_RECIPIENT_REPORT_API, GRN_UPLOAD_API} from "../api/apiConstants";
import {ADD_BOX_WEIGHT_START_ACTION, ADD_HSN_FAIL_ACTION, ADD_HSN_START_ACTION, ADD_HSN_SUCCESS_ACTION} from "../redux/actions/hsnInvoice/hsnActionConstants";
import {UNACKNOWLEDGE_LIST_START} from "../redux/actions/grn/grnActionConstants";
import {BUSINESS_UNIT_DROPDOWN_START_ACTION, DIVISION_DROPDOWN_START_ACTION} from "../redux/actions/dropDown/dropDownActionConstants";
import {
    APPROVE_PLAN_FAIL,
    APPROVE_PLAN_START,
    APPROVE_PLAN_SUCCESS,
    GET_MONTHLY_APPROVAL_FAIL,
    GET_MONTHLY_APPROVAL_SUCCESS, GET_SPECIAL_PLAN_APPROVAL_DETAILS_FAIL, GET_SPECIAL_PLAN_APPROVAL_DETAILS_START, GET_SPECIAL_PLAN_APPROVAL_DETAILS_SUCCESS, GET_VIRTUAL_APPROVAL_DOWNLOAD_START, GET_VIRTUAL_PLAN_APPROVAL_DETAILS_FAIL,
    GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START, GET_VIRTUAL_PLAN_APPROVAL_DETAILS_SUCCESS,
    GET_VIRTUAL_PLAN_APPROVAL_FAIL,
    GET_VIRTUAL_PLAN_APPROVAL_START,
    GET_VIRTUAL_PLAN_APPROVAL_SUCCESS
} from "../redux/actions/approval/monthlyApprovalActionConstants";
import {
    GRN_EXCEL_UPLOAD_START, INVOICE_EXCEL_UPLOAD_START,
    MATERIAL_EXPIRY_EXCEL_FAIL,
    MATERIAL_EXPIRY_EXCEL_START, MATERIAL_EXPIRY_EXCEL_SUCCESS,
    MATERIAL_EXPIRY_UPLOAD_LOG_START, NON_COMPLIANCE_EXCEL_FAIL,
    NON_COMPLIANCE_EXCEL_START,
    NON_COMPLIANCE_EXCEL_SUCCESS,
    NON_COMPLIANCE_UPLOAD_LOG_FAIL,
    NON_COMPLIANCE_UPLOAD_LOG_START,
    NON_COMPLIANCE_UPLOAD_LOG_SUCCESS, OVER_SAMPLING_DETAILS_EXCEL_FAIL, OVER_SAMPLING_DETAILS_EXCEL_START, OVER_SAMPLING_DETAILS_EXCEL_SUCCESS,
    OVER_SAMPLING_DETAILS_UPLOAD_LOG_START, OVER_SAMPLING_EXCEL_FAIL, OVER_SAMPLING_EXCEL_START, OVER_SAMPLING_EXCEL_SUCCESS,
    OVER_SAMPLING_UPLOAD_LOG_START, TRANSPORT_EXCEL_UPLOAD_START, TRANSPORT_UPLOAD_START
} from "../redux/actions/upload/uploadActionConstants";
import {
    DELETE_SPECIAL_ALLOCATION_START,
    GET_ACTIVE_USERS_START,
    GET_DOWNLOAD_ALLOCATION_START,
    MONTHLY_COMMON_ALLOCATION_SAVE_START,
    MONTHLY_COMMON_TEAM_START,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
    SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START, VIRTUAL_COMMON_ALLOCATION_SAVE_START, VIRTUAL_COMMON_TEAM_START
} from "../redux/actions/allocation/allocationActionConstants";
import {REVERSE_INVENTORY_START} from "../redux/actions/inventory/inventoryReportActionConstants";
import {GET_SHIP_ROCKET_REPORT_START, GET_VIRTUAL_RECONCILIATION_REPORT_START, OVER_SAMPLING_MAIL_FAIL, OVER_SAMPLING_MAIL_START, OVER_SAMPLING_MAIL_SUCCESS} from "../redux/actions/reports/batchReconciliationReportActionConstants";
import {SAVE_NON_COMPLIANCE_ADMIN_REMARK_START, SAVE_OVER_SAMPLING_START} from "../redux/actions/compliance/nonComplianceActionConstants";
import {GET_MASTER_BLOCKED_LIST_START} from "../redux/actions/master/masterActionConstants";
import {GET_INVOICE_UPLOAD_CSV_FAIL, GET_INVOICE_UPLOAD_CSV_START, GET_INVOICE_UPLOAD_CSV_SUCCESS} from "../redux/actions/dispatchInvoice/invoiceUploadActionConstants";

    export const messages = {
    LOGIN_START_ACTION: [{ action: 'showspinner' }],

    LOGIN_SUCCESS_ACTION: [
    {
      action: 'hidespinner'
    },
    {
      action: 'showsuccess',

      payload: { message: { text: 'Login success', type: 'success' } }

    },
    ],

    LOGIN_FAIL_ACTION: [
    { action: 'hidespinner' },
    {
      action: 'showerror',
      payload: { message: { text: 'Authentication failed', type: 'error' } },
    },
    ],
    DOCTOR_REGISTRATION_RESTORE_FAIL: [
    {
      action: 'showerror',
      payload: { message: { text: 'Failed to load doctor details. Please try again', type: 'error' } },
    },
    ],
    GET_VENDOR_START: [{ action: 'showspinner' }],
    GET_VENDOR_SUCCESS: [{ action: 'hidespinner' }],
    GET_VENDOR_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_COST_CENTER_START: [{ action: 'showspinner' }],
    GET_COST_CENTER_SUCCESS: [{ action: 'hidespinner' }],
    GET_COST_CENTER_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_SAMPLES_START: [{ action: 'showspinner' }],
    GET_SAMPLES_SUCCESS: [{ action: 'hidespinner' }],
    GET_SAMPLES_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_SAMPLES_BY_ID_START: [{ action: 'showspinner' }],
    GET_SAMPLES_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    GET_SAMPLES_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_MONTHLYDISPATCH_START: [{ action: 'showspinner' }],
    GET_MONTHLYDISPATCH_SUCCESS: [{ action: 'hidespinner' }],
    GET_MONTHLYDISPATCH_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_EMPLOYEEINVOICEDETAILS_START: [{ action: 'showspinner' }],
    GET_EMPLOYEEINVOICEDETAILS_SUCCESS: [{ action: 'hidespinner' }],
    GET_EMPLOYEEINVOICEDETAILS_FAIL: [
      { action: 'hidespinner' },
      {
          action: 'showerror',
          payload: { message: { text: 'action failed', type: 'error' } },
      },
    ],
    GET_RECIPIENT_REPORT_START: [{ action: 'showspinner' }],
    GET_RECIPIENT_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_RECIPIENT_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_PURCHASE_REPORT_START: [{ action: 'showspinner' }],
    GET_PURCHASE_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_PURCHASE_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_DISPATCHES_REPORT_START: [{ action: 'showspinner' }],
    GET_DISPATCHES_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_DISPATCHES_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_INVENTORY_REPORT_START: [{ action: 'showspinner' }],
    GET_INVENTORY_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_INVENTORY_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_INVENTORY_REVERSAL_HISTORY_START: [{ action: 'showspinner' }],
    GET_INVENTORY_REVERSAL_HISTORY_SUCCESS: [{ action: 'hidespinner' }],
    GET_INVENTORY_REVERSAL_HISTORY_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_UNIT_ALLOCATION_REPORT_START: [{ action: 'showspinner' }],
    EDIT_UNIT_ALLOCATION_REPORT_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'action completed', type: 'success' } },
        },
    ],
    EDIT_UNIT_ALLOCATION_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_ITEM_WISE_REPORT_START: [{ action: 'showspinner' }],
    GET_ITEM_WISE_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_ITEM_WISE_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_STOCK_LEDGER_REPORT_START: [{ action: 'showspinner' }],
    GET_STOCK_LEDGER_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_STOCK_LEDGER_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_AGEING_REPORT_START: [{ action: 'showspinner' }],
    GET_AGEING_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_AGEING_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_NEAR_TO_EXPIRY_INPUT_REPORT_START: [{ action: 'showspinner' }],
    GET_NEAR_TO_EXPIRY_INPUT_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_NEAR_TO_EXPIRY_INPUT_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_START: [{ action: 'showspinner' }],
    GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_NEAR_TO_EXPIRY_SAMPLE_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_SIMPLE_INVENTORY_REPORT_START: [{ action: 'showspinner' }],
    GET_SIMPLE_INVENTORY_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_SIMPLE_INVENTORY_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_PICKING_LIST_START: [{ action: 'showspinner' }],
    GET_PICKING_LIST_SUCCESS: [{ action: 'hidespinner' }],
    GET_PICKING_LIST_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_PICKLIST_START: [{ action: 'showspinner' }],
    GET_PICKLIST_SUCCESS: [{ action: 'hidespinner' }],
    GET_PICKLIST_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_PICKLIST_VIRTUAL_START: [{ action: 'showspinner' }],
    GET_PICKLIST_VIRTUAL_SUCCESS: [{ action: 'hidespinner' }],
    GET_PICKLIST_VIRTUAL_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_PICKLIST_STATUS_START: [{ action: 'showspinner' }],
    GET_PICKLIST_STATUS_SUCCESS: [{ action: 'hidespinner' }],
    GET_PICKLIST_STATUS_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_EMPLOYEE_POPUP_DETAILS_START: [{ action: 'showspinner' }],
    GET_EMPLOYEE_POPUP_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
    GET_EMPLOYEE_POPUP_DETAILS_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GROUP_INVOICE_START: [{ action: 'showspinner' }],
    GROUP_INVOICE_SUCCESS: [{ action: 'hidespinner' }],
    GROUP_INVOICE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],


        GET_GENERATE_INVOICE_START: [{ action: 'showspinner' }],
        GET_GENERATE_INVOICE_SUCCESS: [{ action: 'hidespinner' }],
        GET_GENERATE_INVOICE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        TRANSPORT_DROPDOWN_START_ACTION: [{ action: 'showspinner' }],
        TRANSPORT_DROPDOWN_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        TRANSPORT_DROPDOWN_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_GENERATE_LABEL_START: [{ action: 'showspinner' }],
        GET_GENERATE_LABEL_SUCCESS: [{ action: 'hidespinner' }],
        GET_GENERATE_LABEL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


    GROUP_INVOICE_UPLOAD_START: [{ action: 'showspinner' }],
    GROUP_INVOICE_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
    GROUP_INVOICE_UPLOAD_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    UNACKNOWLEDGE_LIST_START: [{ action: 'showspinner' }],
    UNACKNOWLEDGE_LIST_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'GRN loaded successfully', type: 'success' } },
        },
    ],
    UNACKNOWLEDGE_LIST_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    REJECT_ACKNOWLEDGE_START: [{ action: 'showspinner' }],
    REJECT_ACKNOWLEDGE_SUCCESS: [{ action: 'hidespinner' }],
    REJECT_ACKNOWLEDGE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    APPROVE_ACKNOWLEDGE_START: [{ action: 'showspinner' }],
    APPROVE_ACKNOWLEDGE_SUCCESS: [{ action: 'hidespinner' }],
    APPROVE_ACKNOWLEDGE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GRN_UPLOAD_START: [{ action: 'showspinner' }],
    GRN_UPLOAD_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Upload Successful', type: 'success' } },
        },
    ],
    GRN_UPLOAD_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_START: [{ action: 'showspinner' }],
    GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
    GET_SPECIAL_EMPLOYEE_INVOICE_DETAILS_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    SEARCH_INVOICE_START: [{ action: 'showspinner' }],
    SEARCH_INVOICE_SUCCESS: [{ action: 'hidespinner' }],
    SEARCH_INVOICE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    INVOICE_UPLOAD_START: [{ action: 'showspinner' }],
    INVOICE_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
    INVOICE_UPLOAD_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    DELIVERY_UPDATE_START: [{ action: 'showspinner' }],
    DELIVERY_UPDATE_SUCCESS: [{ action: 'hidespinner' },],
    DELIVERY_UPDATE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    ADD_VENDOR_START: [{ action: 'showspinner' }],
    ADD_VENDOR_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Vendor added successfully', type: 'success' } },
        },
    ],
    ADD_VENDOR_FAIL: [
        { action: 'hidespinner' },

    ],
    EDIT_VENDOR_START: [{ action: 'showspinner' }],
    EDIT_VENDOR_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Vendor edited successfully', type: 'success' } },
        },
    ],
    EDIT_VENDOR_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],

    ADD_COST_CENTER_START: [{ action: 'showspinner' }],
    ADD_COST_CENTER_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Cost Center edited successfully', type: 'success' } },
        },
    ],
    ADD_COST_CENTER_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_SAMPLES_START: [{ action: 'showspinner' }],
    ADD_SAMPLES_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Samples added successfully', type: 'success' } },
        },
    ],
    ADD_SAMPLES_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    EDIT_SAMPLES_START: [{ action: 'showspinner' }],
    EDIT_SAMPLES_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Samples edited successfully', type: 'success' } },
        },
    ],
    EDIT_SAMPLES_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],

        // hsn add message


    ADD_HSN_START_ACTION: [{ action: 'showspinner' }],
    ADD_HSN_SUCCESS_ACTION: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'HSN created successfully !', type: 'success' } },
        },
    ],
    ADD_HSN_FAIL_ACTION: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'HSN creation failed !', type: 'error' } },
        },
    ],
    ADD_BOX_WEIGHT_START: [{ action: 'showspinner' }],
    ADD_BOX_WEIGHT_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'action completed', type: 'success' } },
        },
    ],
    ADD_BOX_WEIGHT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_BUISNESS_UNIT_START: [{ action: 'showspinner' }],
    GET_BUISNESS_UNIT_SUCCESS: [{ action: 'hidespinner' }],
    GET_BUISNESS_UNIT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    BUISNESS_UNIT_BY_ID_START: [{ action: 'showspinner' }],
    BUISNESS_UNIT_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    BUISNESS_UNIT_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_BUISNESS_UNIT_START: [{ action: 'showspinner' }],
    EDIT_BUISNESS_UNIT_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Business Unit edited successfully', type: 'success' } },
        },
    ],
    EDIT_BUISNESS_UNIT_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_BUISNESS_UNIT_START: [{ action: 'showspinner' }],
    ADD_BUISNESS_UNIT_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Business Unit added successfully', type: 'success' } },
        },
    ],
    ADD_BUISNESS_UNIT_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    GET_TEAM_START: [{ action: 'showspinner' }],
    GET_TEAM_SUCCESS: [{ action: 'hidespinner' }],
    GET_TEAM_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    TEAM_BY_ID_START: [{ action: 'showspinner' }],
    TEAM_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    TEAM_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_TEAM_START: [{ action: 'showspinner' }],
    EDIT_TEAM_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Team edited successfully', type: 'success' } },
        },
    ],
    EDIT_TEAM_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_TEAM_START: [{ action: 'showspinner' }],
    ADD_TEAM_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'team added successfully', type: 'success' } },
        },
    ],
    ADD_TEAM_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    GET_USER_START: [{ action: 'showspinner' }],
    GET_USER_SUCCESS: [{ action: 'hidespinner' }],
    GET_USER_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    USER_BY_ID_START: [{ action: 'showspinner' }],
    USER_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    USER_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_USER_START: [{ action: 'showspinner' }],
    EDIT_USER_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'user edited successfully', type: 'success' } },
        },
    ],
    EDIT_USER_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_USER_START: [{ action: 'showspinner' }],
    ADD_USER_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'user added successfully', type: 'success' } },
        },
    ],
    ADD_USER_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    GET_BRAND_START: [{ action: 'showspinner' }],
    GET_BRAND_SUCCESS: [{ action: 'hidespinner' }],
    GET_BRAND_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    BRAND_BY_ID_START: [{ action: 'showspinner' }],
    BRAND_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    BRAND_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_BRAND_START: [{ action: 'showspinner' }],
    EDIT_BRAND_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'brand edited successfully', type: 'success' } },
        },
    ],
    EDIT_BRAND_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_BRAND_START: [{ action: 'showspinner' }],
    ADD_BRAND_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'brand added successfully', type: 'success' } },
        },
    ],
    ADD_BRAND_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    GET_FF_START: [{ action: 'showspinner' }],
    GET_FF_SUCCESS: [{ action: 'hidespinner' }],
    GET_FF_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    FF_BY_ID_START: [{ action: 'showspinner' }],
    FF_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    FF_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    FF_HISTORY_BY_ID_START: [{ action: 'showspinner' }],
    FF_HISTORY_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
    FF_HISTORY_BY_ID_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    EDIT_FF_START: [{ action: 'showspinner' }],
    EDIT_FF_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'ff edited successfully', type: 'success' } },
        },
    ],
    EDIT_FF_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    ADD_FF_START: [{ action: 'showspinner' }],
    ADD_FF_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'ff added successfully', type: 'success' } },
        },
    ],
    ADD_FF_FAIL: [
        { action: 'hidespinner' },
        // {
        //     action: 'showerror',
        //     payload: { message: { text: 'action failed', type: 'error' } },
        // },
    ],
    GET_SPECIALDISPATCH_START: [{ action: 'showspinner' }],
    GET_SPECIALDISPATCH_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'action completed', type: 'success' } },
        },
    ],
    GET_SPECIALDISPATCH_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GRN_START: [{ action: 'showspinner' }],
    GRN_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'action completed', type: 'success' } },
        },
    ],
    GRN_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    ADD_BOX_WEIGHT_START_ACTION: [{ action: 'showspinner' }],
    ADD_BOX_WEIGHT_SUCCESS_ACTION: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'Box & Weight updated successfully !', type: 'success' } },
        },
    ],
    ADD_BOX_WEIGHTN_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'Box & Weight updation failed !', type: 'error' } },
        },
    ],
    GET_DEVIATION_REPORT_START: [{ action: 'showspinner' }],
    GET_DEVIATION_REPORT_SUCCESS: [{ action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: { message: { text: 'action completed', type: 'success' } },
        },
    ],
    GET_DEVIATION_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_INVOICE_UPLOAD_START: [{ action: 'showspinner' }],
    GET_INVOICE_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
    GET_INVOICE_UPLOAD_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_GEN_INVOICE_START: [{ action: 'showspinner' }],
    GET_GEN_INVOICE_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: {
                message: { text: 'Done!', type: 'success' }
            },
        },
    ],
    GET_GEN_INVOICE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    BUSINESS_UNIT_DROPDOWN_START_ACTION: [{ action: 'showspinner' }],
    BUSINESS_UNIT_DROPDOWN_SUCCESS_ACTION: [{ action: 'hidespinner' }],
    BUSINESS_UNIT_DROPDOWN_FAIL_ACTION: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    DIVISION_DROPDOWN_START_ACTION: [{ action: 'showspinner' }],
    DIVISION_DROPDOWN_SUCCESS_ACTION: [{ action: 'hidespinner' }],
    DIVISION_DROPDOWN_FAIL_ACTION: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_VIRTUAL_DISPATCH_START: [{ action: 'showspinner' }],
    GET_VIRTUAL_DISPATCH_SUCCESS: [{ action: 'hidespinner' }],
    GET_VIRTUAL_DISPATCH_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_VIRTUAL_DISPATCH_DETAILS_START: [{ action: 'showspinner' }],
    GET_VIRTUAL_DISPATCH_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
    GET_VIRTUAL_DISPATCH_DETAILS_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_DISPATCH_REGISTER_REPORT_START: [{ action: 'showspinner' }],
    GET_DISPATCH_REGISTER_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_DISPATCH_REGISTER_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_ITEM_CONSUMPTION_REPORT_START: [{ action: 'showspinner' }],
    GET_ITEM_CONSUMPTION_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_ITEM_CONSUMPTION_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_DESTRUCTION_REPORT_START: [{ action: 'showspinner' }],
    GET_DESTRUCTION_REPORT_SUCCESS: [{ action: 'hidespinner' }],
    GET_DESTRUCTION_REPORT_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    GET_SPECIAL_PLAN_APPROVAL_START: [{ action: 'showspinner' }],
    GET_SPECIAL_PLAN_APPROVAL_SUCCESS: [{ action: 'hidespinner' }],
    GET_SPECIAL_PLAN_APPROVAL_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
    REJECT_PLAN_START: [ { action: 'showspinner' }],
    REJECT_PLAN_SUCCESS: [
        { action: 'hidespinner' },
        {
            action: 'showsuccess',
            payload: {
                message: { text: 'Rejected!', type: 'success' }
            },
        },
    ],
    REJECT_PLAN_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],

        APPROVE_PLAN_START: [ { action: 'showspinner' }],
        APPROVE_PLAN_SUCCESS: [
            { action: 'hidespinner' },
            {
                action: 'showsuccess',
                payload: {
                    message: { text: 'Plan Approved !', type: 'success' }
                },
            },
        ],
        APPROVE_PLAN_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        REVERSE_INVENTORY_START: [{ action: 'showspinner' }],
        REVERSE_INVENTORY_SUCCESS: [{ action: 'hidespinner' }],
        REVERSE_INVENTORY_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_MONTHLY_APPROVAL_START: [{ action: 'showspinner' }],
        GET_MONTHLY_APPROVAL_SUCCESS: [{ action: 'hidespinner' }],
        GET_MONTHLY_APPROVAL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_VIRTUAL_PLAN_APPROVAL_START: [{ action: 'showspinner' }],
        GET_VIRTUAL_PLAN_APPROVAL_SUCCESS: [{ action: 'hidespinner' }],
        GET_VIRTUAL_PLAN_APPROVAL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_VIRTUAL_PLAN_APPROVAL_DETAILS_START: [{ action: 'showspinner' }],
        GET_VIRTUAL_PLAN_APPROVAL_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
        GET_VIRTUAL_PLAN_APPROVAL_DETAILS_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_SPECIAL_PLAN_APPROVAL_DETAILS_START: [{ action: 'showspinner' }],
        GET_SPECIAL_PLAN_APPROVAL_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
        GET_SPECIAL_PLAN_APPROVAL_DETAILS_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],



        MANAGEMENT_DASHBOARD_START_ACTION: [{ action: 'showspinner' }],
        MANAGEMENT_DASHBOARD_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        MANAGEMENT_DASHBOARD_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_BATCH_RECONCILIATION_START: [{ action: 'showspinner' }],
        GET_BATCH_RECONCILIATION_SUCCESS: [{ action: 'hidespinner' }],
        GET_BATCH_RECONCILIATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_COMPLIANCE_DETAILS_START: [{ action: 'showspinner' }],
        GET_COMPLIANCE_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
        GET_COMPLIANCE_DETAILS_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_MAIL_LOG_START: [{ action: 'showspinner' }],
        GET_MAIL_LOG_SUCCESS: [{ action: 'hidespinner' }],
        GET_MAIL_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_NON_COMPLIANCE_START: [{ action: 'showspinner' }],
        GET_NON_COMPLIANCE_SUCCESS: [{ action: 'hidespinner' }],
        GET_NON_COMPLIANCE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        FF_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        FF_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        FF_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        VIRTUAL_SAMPLE_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        VIRTUAL_SAMPLE_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        VIRTUAL_SAMPLE_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_MONTHLY_APPROVAL_DETAILS_START: [{ action: 'showspinner' }],
        GET_MONTHLY_APPROVAL_DETAILS_SUCCESS: [{ action: 'hidespinner' }],
        GET_MONTHLY_APPROVAL_DETAILS_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        NON_COMPLIANCE_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        NON_COMPLIANCE_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        NON_COMPLIANCE_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],



        OVER_SAMPLING_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        OVER_SAMPLING_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        OVER_SAMPLING_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        OVER_SAMPLING_DETAILS_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        OVER_SAMPLING_DETAILS_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        OVER_SAMPLING_DETAILS_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        MATERIAL_EXPIRY_UPLOAD_LOG_START: [{ action: 'showspinner' }],
        MATERIAL_EXPIRY_UPLOAD_LOG_SUCCESS: [{ action: 'hidespinner' }],
        MATERIAL_EXPIRY_UPLOAD_LOG_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        NON_COMPLIANCE_EXCEL_START: [{ action: 'showspinner' }],
        NON_COMPLIANCE_EXCEL_SUCCESS: [{ action: 'hidespinner' }],
        NON_COMPLIANCE_EXCEL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        OVER_SAMPLING_EXCEL_START: [{ action: 'showspinner' }],
        OVER_SAMPLING_EXCEL_SUCCESS: [{ action: 'hidespinner' }],
        OVER_SAMPLING_EXCEL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        OVER_SAMPLING_DETAILS_EXCEL_START: [{ action: 'showspinner' }],
        OVER_SAMPLING_DETAILS_EXCEL_SUCCESS: [{ action: 'hidespinner' }],
        OVER_SAMPLING_DETAILS_EXCEL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        MATERIAL_EXPIRY_EXCEL_START: [{ action: 'showspinner' }],
        MATERIAL_EXPIRY_EXCEL_SUCCESS: [{ action: 'hidespinner' }],
        MATERIAL_EXPIRY_EXCEL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        MONTHLY_COMMON_ALLOCATION_SAVE_START: [{ action: 'showspinner' }],
        MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS: [{ action: 'hidespinner' }],
        MONTHLY_COMMON_ALLOCATION_SAVE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        TSE_DROPDOWN_START_ACTION: [{ action: 'showspinner' }],
        TSE_DROPDOWN_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        TSE_DROPDOWN_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],



        ASSIGN_TSE_START_ACTION: [{ action: 'showspinner' }],
        ASSIGN_TSE_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        ASSIGN_TSE_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],



        GET_TSE_LIST_START_ACTION: [{ action: 'showspinner' }],
        GET_TSE_LIST_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        GET_TSE_LIST_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        UNASSIGN_TSE_START_ACTION: [{ action: 'showspinner' }],
        UNASSIGN_TSE_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        UNASSIGN_TSE_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        GET_DOWNLOAD_ALLOCATION_START: [{ action: 'showspinner' }],
        GET_DOWNLOAD_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        GET_DOWNLOAD_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_ACTIVE_USERS_START: [{ action: 'showspinner' }],
        GET_ACTIVE_USERS_SUCCESS: [{ action: 'hidespinner' }],
        GET_ACTIVE_USERS_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

            SEARCH_SPECIAL_PLAN_START: [{ action: 'showspinner' }],
            SEARCH_SPECIAL_PLAN_SUCCESS: [{ action: 'hidespinner' }],
            SEARCH_SPECIAL_PLAN_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SPECIAL_ALLOCATION_START:[{ action: 'showspinner' }],
        SPECIAL_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        SPECIAL_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START:[{ action: 'showspinner' }],
        SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS: [{ action: 'hidespinner' }],
        SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SUBMIT_MONTHLY_ALLOCATION_START:[{ action: 'showspinner' }],
        SUBMIT_MONTHLY_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        SUBMIT_MONTHLY_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SUBMIT_VIRTUAL_ALLOCATION_START:[{ action: 'showspinner' }],
        SUBMIT_VIRTUAL_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        SUBMIT_VIRTUAL_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SUBMIT_SPECIAL_ALLOCATION_START:[{ action: 'showspinner' }],
        SUBMIT_SPECIAL_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        SUBMIT_SPECIAL_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_MULTIPLE_ALLOCATION_DOWNLOAD_START:[{ action: 'showspinner' }],
        GET_MULTIPLE_ALLOCATION_DOWNLOAD_SUCCESS: [{ action: 'hidespinner' }],
        GET_MULTIPLE_ALLOCATION_DOWNLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        DELETE_SPECIAL_ALLOCATION_START:[{ action: 'showspinner' }],
        DELETE_SPECIAL_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        DELETE_SPECIAL_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        MULTIPLE_ALLOCATION_UPLOAD_START:[{ action: 'showspinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_START:[{ action: 'showspinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_SUCCESS: [{ action: 'hidespinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_START:[{ action: 'showspinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_SUCCESS: [{ action: 'hidespinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_START:[{ action: 'showspinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_SUCCESS: [{ action: 'hidespinner' }],
        MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        EXPORT_ALLOCATION_START:[{ action: 'showspinner' }],
        EXPORT_ALLOCATION_SUCCESS: [{ action: 'hidespinner' }],
        EXPORT_ALLOCATION_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        FF_EXCEL_UPLOAD_START:[{ action: 'showspinner' }],
        FF_EXCEL_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        FF_EXCEL_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        TRANSPORT_UPLOAD_START:[{ action: 'showspinner' }],
        TRANSPORT_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        TRANSPORT_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        GRN_EXCEL_UPLOAD_START:[{ action: 'showspinner' }],
        GRN_EXCEL_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        GRN_EXCEL_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        TRANSPORT_EXCEL_UPLOAD_START:[{ action: 'showspinner' }],
        TRANSPORT_EXCEL_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        TRANSPORT_EXCEL_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        INVOICE_EXCEL_UPLOAD_START:[{ action: 'showspinner' }],
        INVOICE_EXCEL_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
        INVOICE_EXCEL_UPLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        GET_VIRTUAL_RECONCILIATION_REPORT_START:[{ action: 'showspinner' }],
        GET_VIRTUAL_RECONCILIATION_REPORT_SUCCESS: [{ action: 'hidespinner' }],
        GET_VIRTUAL_RECONCILIATION_REPORT_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        GET_SHIP_ROCKET_REPORT_START: [{ action: 'showspinner' }],
        GET_SHIP_ROCKET_REPORT_SUCCESS: [{ action: 'hidespinner' }],
        GET_SHIP_ROCKET_REPORT_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SAVE_NON_COMPLIANCE_ADMIN_REMARK_START:[{ action: 'showspinner' }],
        SAVE_NON_COMPLIANCE_ADMIN_REMARK_SUCCESS: [{ action: 'hidespinner' }],
        SAVE_NON_COMPLIANCE_ADMIN_REMARK_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        SAVE_OVER_SAMPLING_START:[{ action: 'showspinner' }],
        SAVE_OVER_SAMPLING_SUCCESS: [{ action: 'hidespinner' }],
        SAVE_OVER_SAMPLING_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        GET_MASTER_BLOCKED_LIST_START:[{ action: 'showspinner' }],
        GET_MASTER_BLOCKED_LIST_SUCCESS: [{ action: 'hidespinner' }],
        GET_MASTER_BLOCKED_LIST_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        MONTHLY_COMMON_TEAM_START: [{ action: 'showspinner' }],
        MONTHLY_COMMON_TEAM_SUCCESS: [{ action: 'hidespinner' }],
        MONTHLY_COMMON_TEAM_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START:[{ action: 'showspinner' }],
        MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS: [{ action: 'hidespinner' }],
        MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        GET_VIRTUAL_APPROVAL_DOWNLOAD_START:[{ action: 'showspinner' }],
        GET_VIRTUAL_APPROVAL_DOWNLOAD_SUCCESS: [{ action: 'hidespinner' }],
        GET_VIRTUAL_APPROVAL_DOWNLOAD_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        VIRTUAL_COMMON_ALLOCATION_SAVE_START:[{ action: 'showspinner' }],
        VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS: [{ action: 'hidespinner' }],
        VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],
        VIRTUAL_COMMON_TEAM_START:[{ action: 'showspinner' }],
        VIRTUAL_COMMON_TEAM_SUCCESS: [{ action: 'hidespinner' }],
        VIRTUAL_COMMON_TEAM_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        OVER_SAMPLING_MAIL_START:[{ action: 'showspinner' }],
        OVER_SAMPLING_MAIL_SUCCESS: [{ action: 'hidespinner' }],
        OVER_SAMPLING_MAIL_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        SPECIAL_DIFFERENTIAL_TEAM_START:[{ action: 'showspinner' }],
        SPECIAL_DIFFERENTIAL_TEAM_SUCCESS: [{ action: 'hidespinner' }],
        SPECIAL_DIFFERENTIAL_TEAM_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_ALLOCATION_STATUS_DROPDOWN_START:[{ action: 'showspinner' }],
        GET_ALLOCATION_STATUS_DROPDOWN_SUCCESS: [{ action: 'hidespinner' }],
        GET_ALLOCATION_STATUS_DROPDOWN_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],


        VENDOR_BY_ID_START:[{ action: 'showspinner' }],
        VENDOR_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
        VENDOR_BY_ID_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        EDIT_COST_CENTER_START: [{ action: 'showspinner' }],
        EDIT_COST_CENTER_SUCCESS: [{ action: 'hidespinner' },
            {
                action: 'showsuccess',
                payload: { message: { text: 'Cost Center edited successfully', type: 'success' } },
            },
        ],
        EDIT_COST_CENTER_FAIL: [
            { action: 'hidespinner' },
            // {
            //     action: 'showerror',
            //     payload: { message: { text: 'action failed', type: 'error' } },
            // },
        ],

        GET_COST_CENTER_BY_ID_START:[{ action: 'showspinner' }],
        GET_COST_CENTER_BY_ID_SUCCESS: [{ action: 'hidespinner' }],
        GET_COST_CENTER_BY_ID_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        BRAND_DROPDOWN_START_ACTION:[{ action: 'showspinner' }],
        BRAND_DROPDOWN_SUCCESS_ACTION: [{ action: 'hidespinner' }],
        BRAND_DROPDOWN_FAIL_ACTION: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

        GET_INVOICE_UPLOAD_CSV_START:[{ action: 'showspinner' }],
        GET_INVOICE_UPLOAD_CSV_SUCCESS: [{ action: 'hidespinner' }],
        GET_INVOICE_UPLOAD_CSV_FAIL: [
            { action: 'hidespinner' },
            {
                action: 'showerror',
                payload: { message: { text: 'action failed', type: 'error' } },
            },
        ],

}
