import { createSelector } from 'reselect'


//DISPATCH REGISTER REPORT SELECTOR

const batchReconciliationList = (state) => state.batchReconciliation.batchReconciliationList;
const batchReconciliationReportLoading = (state) => state.batchReconciliation.batchReconciliationLoading;

const overSamplingMail = (state) => state.batchReconciliation.overSamplingMail;
const overSamplingMailLoading = (state) => state.batchReconciliation.overSamplingMailLoading;
const virtualReconciliationList = (state) => state.batchReconciliation.virtualReconciliationList

const virtualReconciliationListLoading = (state) => state.batchReconciliation.virtualReconciliationListLoading;
const shipRocketReport = (state) => state.batchReconciliation.shipRocketReport
const shipRocketReportLoading = (state) => state.batchReconciliation.shipRocketReportLoading;



export const selectBatchReconciliationListData = createSelector(
    batchReconciliationList,
    batchReconciliationListDataSelection => batchReconciliationListDataSelection
);

export const selectLoadingBatchReconciliationReportData = createSelector(
    batchReconciliationReportLoading,
    loadingSelection => loadingSelection
);

export const selectVirtualReconciliationReport = createSelector(
    virtualReconciliationList,
    virtualReconciliationListDataSelection => virtualReconciliationListDataSelection
)


export const selectLoadingVirtualReconciliationListData = createSelector(
    virtualReconciliationListLoading,
    loadingSelection => loadingSelection
);

export const selectShipRocketReport = createSelector(
    shipRocketReport,
    shipRocketReportDataSelection => shipRocketReportDataSelection
)

export const selectShipRocketReportLoadingListData = createSelector(
    shipRocketReportLoading,
    loadingSelection => loadingSelection
);


export const selectOverSamplingMailData = createSelector(
    overSamplingMail,
    overSamplingMailDataSelection => overSamplingMailDataSelection
);

export const selectLoadingOverSamplingMailData = createSelector(
    overSamplingMailLoading,
    loadingSelection => loadingSelection
);
