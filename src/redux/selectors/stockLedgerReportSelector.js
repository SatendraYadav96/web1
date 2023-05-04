import { createSelector } from 'reselect'


//ITEM WISE REPORT SELECTOR

const stockLedgerList = (state) => state.stockLedgerReport.stockLedgerList;
const stockLedgerReportLoading = (state) => state.stockLedgerReport.stockLedgerReportLoading


export const selectStockLedgerListData = createSelector(
    stockLedgerList,
    stockLedgerListDataSelection => stockLedgerListDataSelection
);

export const selectLoadingStockLedgerReportData = createSelector(
    stockLedgerReportLoading,
    loadingSelection => loadingSelection
);
