import { createSelector } from 'reselect'


//DISPATCH REGISTER REPORT SELECTOR

const batchReconciliationList = (state) => state.batchReconciliation.batchReconciliationList;
const batchReconciliationReportLoading = (state) => state.batchReconciliation.batchReconciliationLoading;


export const selectBatchReconciliationListData = createSelector(
    batchReconciliationList,
    batchReconciliationListDataSelection => batchReconciliationListDataSelection
);

export const selectLoadingBatchReconciliationReportData = createSelector(
    batchReconciliationReportLoading,
    loadingSelection => loadingSelection
);
