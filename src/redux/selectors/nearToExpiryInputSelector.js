import { createSelector } from 'reselect'


//ITEM WISE REPORT SELECTOR

const nearToExpiryInputList = (state) => state.nearToExpiryInputReport.nearToExpiryInputList;
const nearToExpiryInputReportLoading = (state) => state.nearToExpiryInputReport.nearToExpiryInputReportLoading


export const selectNearToExpiryInputListData = createSelector(
    nearToExpiryInputList,
    nearToExpiryInputListDataSelection => nearToExpiryInputListDataSelection
);

export const selectLoadingNearToExpiryInputReportData = createSelector(
    nearToExpiryInputReportLoading,
    loadingSelection => loadingSelection
);
