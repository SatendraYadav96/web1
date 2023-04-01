import { createSelector } from 'reselect'


//RECIPIENT REPORT SELECTOR

const recipientList = (state) => state.recipientReport.recipientList;
const recipientReportLoading = (state) => state.recipientReport.recipientReportLoading


export const selectRecipientListData = createSelector(
recipientList,
          recipientListDataSelection => recipientListDataSelection
);

export const selectLoadingRecipientReportData = createSelector(
recipientReportLoading,
              loadingSelection => loadingSelection
);
