//INVENTORY REPORT SELECTOR

import {createSelector} from "reselect";

const inventoryList = (state) => state.inventoryReport.inventoryList;
const inventoryReportLoading = (state) => state.inventoryReport.inventoryReportLoading


export const selectInventoryReportListData = createSelector(
  inventoryList,
  inventoryReportListDataSelection => inventoryReportListDataSelection
);

export const selectLoadingInventoryReportData = createSelector(
  inventoryReportLoading,
  loadingSelection => loadingSelection
);

const inventoryReversalHistoryList = (state) => state.inventoryReversalHistory.inventoryList;
const inventoryReversalHistoryLoading = (state) => state.inventoryReversalHistory.inventoryReversalHistoryLoading


export const selectInventoryReversalHistoryListData = createSelector(
    inventoryReversalHistoryList,
    inventoryReversalHistoryListDataSelection => inventoryReversalHistoryListDataSelection
);

export const selectLoadingReversalHistoryData = createSelector(
    inventoryReversalHistoryLoading,
    loadingSelection => loadingSelection
);
