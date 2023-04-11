//INVENTORY REPORT SELECTOR

import {createSelector} from "reselect";

const inventoryList = (state) => state.inventoryReport.inventoryList;
const inventoryReportLoading = (state) => state.inventoryReport.inventoryReportLoading


export const selectInventoryListData = createSelector(
  inventoryList,
  inventoryListDataSelection => inventoryListDataSelection
);

export const selectLoadingInventoryReportData = createSelector(
  inventoryReportLoading,
  loadingSelection => loadingSelection
);
