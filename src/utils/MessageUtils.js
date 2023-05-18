import {GET_RECIPIENT_REPORT_API} from "../api/apiConstants";

    export const messages = {
    LOGIN_START_ACTION: [{ action: 'showspinner' }],
    LOGIN_SUCCESS_ACTION: [
    {
      action: 'hidespinner'
    },
    {
      action: 'showsuccess',
      payload: { message: { text: 'Login success', type: 'success' } },
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
    UNACKNOWLEDGE_LIST_SUCCESS: [{ action: 'hidespinner' }],
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
    GRN_UPLOAD_SUCCESS: [{ action: 'hidespinner' }],
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
    DELIVERY_UPDATE_SUCCESS: [{ action: 'hidespinner' }],
    DELIVERY_UPDATE_FAIL: [
        { action: 'hidespinner' },
        {
            action: 'showerror',
            payload: { message: { text: 'action failed', type: 'error' } },
        },
    ],
}
