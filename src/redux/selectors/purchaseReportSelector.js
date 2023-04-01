import { createSelector } from 'reselect'


//PURCHASE REPORT SELECTOR

const purchaseList = (state) => state.purchaseReport.purchaseList;
const purchaseReportLoading = (state) => state.purchaseReport.purchaseReportLoading


export const selectPurchaseListData = createSelector(
purchaseList,
          purchaseListDataSelection => purchaseListDataSelection
);

export const selectLoadingPurchaseReportData = createSelector(
purchaseReportLoading,
              loadingSelection => loadingSelection
);
