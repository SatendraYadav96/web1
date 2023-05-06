import { createSelector } from 'reselect'


//RECIPIENT REPORT SELECTOR

const simpleInventoryList = (state) => state.simpleInventoryReport.simpleInventoryList;
const simpleInventoryReportLoading = (state) => state.simpleInventoryReport.simpleInventoryReportLoading


export const selectSimpleInventoryListData = createSelector(
    simpleInventoryList,
    simpleInventoryListDataSelection => simpleInventoryListDataSelection
);

export const selectLoadingSimpleInventoryReportData = createSelector(
    simpleInventoryReportLoading,
    loadingSelection => loadingSelection
);
