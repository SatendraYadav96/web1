import { createSelector } from 'reselect'


//DISPATCH REGISTER REPORT SELECTOR

const batchReconciliationList = (state) => state.batchReconciliation.batchReconciliationList;
const batchReconciliationReportLoading = (state) => state.batchReconciliation.batchReconciliationLoading;

const overSamplingMail = (state) => state.batchReconciliation.overSamplingMail;
const overSamplingMailLoading = (state) => state.batchReconciliation.overSamplingMailLoading;
const virtualReconciliation = (state) => state.batchReconciliation.virtualReconciliation
const shipRocketReport = (state) => state.batchReconciliation.shipRocketReport



export const selectBatchReconciliationListData = createSelector(
    batchReconciliationList,
    batchReconciliationListDataSelection => batchReconciliationListDataSelection
);

export const selectLoadingBatchReconciliationReportData = createSelector(
    batchReconciliationReportLoading,
    loadingSelection => loadingSelection
);

export const selectVirtualReconciliationReport = createSelector(
    virtualReconciliation,
    dataSelect => dataSelect
)

export const selectShipRocketReport = createSelector(
    shipRocketReport,
    dataSelect => dataSelect
)


export const selectOverSamplingMailData = createSelector(
    overSamplingMail,
    overSamplingMailDataSelection => overSamplingMailDataSelection
);

export const selectLoadingOverSamplingMailData = createSelector(
    overSamplingMailLoading,
    loadingSelection => loadingSelection
);
