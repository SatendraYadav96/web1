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


const invoiceUploadCsvList = (state) => state.invoiceUpload.invoiceUploadCsvList;
const invoiceUploadCsvLoading = (state) => state.invoiceUpload.invoiceUploadCsvLoading


export const selectInvoiceUploadCsvListData = createSelector(
    invoiceUploadCsvList,
    invoiceUploadDataSelection => invoiceUploadDataSelection
);

export const selectLoadingInvoiceUploadCsvData = createSelector(
    invoiceUploadCsvLoading,
    loadingSelection => loadingSelection
);
