import { createSelector } from 'reselect'

const recipientsList = state => state.recipients.recipients
const loadingList = state => state.recipients.loading

export const selectRecipientList = createSelector(recipientsList, (recipientsListSelect) => recipientsListSelect)
export const selectLoading = createSelector(loadingList, (loadingSelect)=> loadingSelect)
