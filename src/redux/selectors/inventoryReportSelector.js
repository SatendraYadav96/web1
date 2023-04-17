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

const inventoryReversalHistoryList = (state) => state.inventoryReport.inventoryReversalHistoryList;
const inventoryReversalHistoryLoading = (state) => state.inventoryReport.inventoryReversalHistoryLoading


export const selectInventoryReversalHistoryListData = createSelector(
    inventoryReversalHistoryList,
    inventoryReversalHistoryListDataSelection => inventoryReversalHistoryListDataSelection
);

export const selectLoadingReversalHistoryData = createSelector(
    inventoryReversalHistoryLoading,
    loadingSelection => loadingSelection
);

const editUnitAllocation = (state) => state.inventoryReport.editUnitAllocation;
const editUnitAllocationLoading = (state) => state.inventoryReport.editUnitAllocationLoading


export const selectEditUnitAllocationData = createSelector(
    editUnitAllocation,
    editUnitAllocationDataSelection => editUnitAllocationDataSelection
);

export const selectLoadingEditUnitAllocationData = createSelector(
    editUnitAllocationLoading,
    loadingSelection => loadingSelection
);

const editBlockItem = (state) => state.inventoryReport.editBlockItem;
const editBlockItemLoading = (state) => state.inventoryReport.editBlockItemLoading


export const selectEditBlockItemData = createSelector(
    editBlockItem,
    editBlockItemDataSelection => editBlockItemDataSelection
);

export const selectLoadingEditBlockItemData = createSelector(
    editBlockItemLoading,
    loadingSelection => loadingSelection
);
