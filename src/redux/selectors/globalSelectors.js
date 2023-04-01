import { createSelector } from 'reselect'

const global = (state) => state.global
const showSpinner = (state) => state.global.showSpinner
const showMessage = (state) => state.global.showMessage
const message = (state) => state.global.message

export const selectShowLoader = createSelector(
  showSpinner,
  (showSpinnerSelect) => showSpinnerSelect,
)

export const selectShowMessage = createSelector(
  showMessage,
  (showMessageSelect) => showMessageSelect,
)

export const selectMessage = createSelector(message, (messageSelect) => messageSelect)
