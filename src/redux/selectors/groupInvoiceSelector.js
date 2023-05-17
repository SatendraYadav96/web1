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


const groupInvoiceUploadList = (state) => state.groupInvoice.groupInvoiceUploadList;
const groupInvoiceUploadLoading = (state) => state.groupInvoice.groupInvoiceUploadLoading

export const selectGroupInvoiceUploadListData = createSelector(
    groupInvoiceUploadList,
    groupInvoiceUploadListDataSelection => groupInvoiceUploadListDataSelection
);

export const selectLoadingGroupInvoiceUploadData = createSelector(
    groupInvoiceUploadLoading,
    loadingSelection => loadingSelection
);
