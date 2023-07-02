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

const reverseInventory = (state) => state.inventoryReport.reverseInventory;
const reverseInventoryLoading = (state) => state.inventoryReport.reverseInventoryLoading


export const selectReverseInventoryData = createSelector(
    reverseInventory,
    reverseInventoryDataSelection => reverseInventoryDataSelection
);

export const selectLoadingReverseInventoryData = createSelector(
    reverseInventoryLoading,
    loadingSelection => loadingSelection
);

const switchInventory = (state) => state.inventoryReport.switchInventory;
const switchInventoryLoading = (state) => state.inventoryReport.switchInventoryLoading


export const selectSwitchInventoryData = createSelector(
    switchInventory,
    switchInventoryDataSelection => switchInventoryDataSelection
);

export const selectLoadingSwitchInventoryData = createSelector(
    switchInventoryLoading,
    loadingSelection => loadingSelection
);

const exportAllocation = (state) => state.inventoryReport.exportAllocation;
const exportAllocationLoading = (state) => state.inventoryReport.exportAllocationLoading


export const selectExportAllocationData = createSelector(
    exportAllocation,
    exportAllocationDataSelection => exportAllocationDataSelection
);

export const selectLoadingExportAllocationData = createSelector(
    exportAllocationLoading,
    loadingSelection => loadingSelection
);
