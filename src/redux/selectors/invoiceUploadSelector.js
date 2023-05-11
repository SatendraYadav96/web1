import {createSelector} from "reselect";

const invoiceUploadList = (state) => state.invoiceUpload.invoiceUploadList;
const invoiceUploadLoading = (state) => state.invoiceUpload.invoiceUploadLoading


export const selectInvoiceUploadListData = createSelector(
    invoiceUploadList,
    invoiceUploadDataSelection => invoiceUploadDataSelection
);

export const selectLoadingInvoiceUploadData = createSelector(
    invoiceUploadLoading,
    loadingSelection => loadingSelection
);
