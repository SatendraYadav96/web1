
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
  ]
}
