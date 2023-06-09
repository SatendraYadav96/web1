import {createSelector} from "reselect";


//TRANSPORT UPLOAD
const transportUploadList = (state) => state.upload.transportUpload;
const transportUploadLoading = (state) => state.upload.transportUploadLoading


export const selectTransportUploadListData = createSelector(
    transportUploadList,
    transportUploadListDataSelection => transportUploadListDataSelection
);

export const selectLoadingTransportUploadData = createSelector(
    transportUploadLoading,
    loadingSelection => loadingSelection
);


//TRANSPORT EXCEL UPLOAD
const transportExcelUploadList = (state) => state.upload.transportExcelUpload;
const transportExcelUploadLoading = (state) => state.upload.transportExcelUploadLoading


export const selectTransportExcelUploadListData = createSelector(
    transportExcelUploadList,
    transportExcelUploadListDataSelection => transportExcelUploadListDataSelection
);

export const selectLoadingTransportExcelUploadData = createSelector(
    transportExcelUploadLoading,
    loadingSelection => loadingSelection
);


const grnUploadList = (state) => state.upload.grnUpload;
const grnUploadLoading = (state) => state.upload.grnUploadLoading


export const selectGrnUploadListData = createSelector(
    grnUploadList,
    grnUploadListDataSelection => grnUploadListDataSelection
);

export const selectLoadingGrnUploadData = createSelector(
    grnUploadLoading,
    loadingSelection => loadingSelection
);


const grnExcelUploadList = (state) => state.upload.grnExcelUpload;
const grnExcelUploadLoading = (state) => state.upload.grnExcelUploadLoading


export const selectGrnExcelUploadListData = createSelector(
    grnExcelUploadList,
    grnExcelUploadListDataSelection => grnExcelUploadListDataSelection
);

export const selectLoadingGrnExcelUploadData = createSelector(
    grnExcelUploadLoading,
    loadingSelection => loadingSelection
);


const ffUploadList = (state) => state.upload.ffUpload;
const ffUploadLoading = (state) => state.upload.ffUploadLoading


export const selectFFUploadListData = createSelector(
    ffUploadList,
    ffUploadListDataSelection => ffUploadListDataSelection
);

export const selectLoadingFFUploadData = createSelector(
    ffUploadLoading,
    loadingSelection => loadingSelection
);


const virtualUploadList = (state) => state.upload.virtualUpload;
const virtualUploadLoading = (state) => state.upload.virtualUploadLoading


export const selectVirtualUploadListData = createSelector(
    virtualUploadList,
    virtualUploadListDataSelection => virtualUploadListDataSelection
);

export const selectLoadingVirtualUploadData = createSelector(
    virtualUploadLoading,
    loadingSelection => loadingSelection
);


const invoiceUploadList = (state) => state.upload.invoiceUpload;
const invoiceUploadLoading = (state) => state.upload.invoiceUploadLoading


export const selectInvoiceUploadListData = createSelector(
    invoiceUploadList,
    invoiceUploadListDataSelection => invoiceUploadListDataSelection
);

export const selectLoadingInvoiceUploadData = createSelector(
    invoiceUploadLoading,
    loadingSelection => loadingSelection
);


