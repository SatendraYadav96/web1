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
}
