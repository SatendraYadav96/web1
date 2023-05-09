import {createSelector} from "reselect";

const groupInvoiceList = (state) => state.groupInvoice.groupInvoiceList;
const groupInvoiceLoading = (state) => state.groupInvoice.groupInvoiceLoading


export const selectGroupInvoiceListData = createSelector(
    groupInvoiceList,
    groupInvoiceListDataSelection => groupInvoiceListDataSelection
);

export const selectLoadingGroupInvoiceData = createSelector(
    groupInvoiceLoading,
    loadingSelection => loadingSelection
);
