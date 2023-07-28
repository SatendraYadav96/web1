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


const invoiceExcelUploadList = (state) => state.upload.invoiceExcelUpload;
const invoiceExcelUploadLoading = (state) => state.upload.invoiceExcelUploadLoading


export const selectInvoiceExcelUploadListData = createSelector(
    invoiceExcelUploadList,
    invoiceExcelUploadListDataSelection => invoiceExcelUploadListDataSelection
);

export const selectLoadingInvoiceExcelUploadData = createSelector(
    invoiceExcelUploadLoading,
    loadingSelection => loadingSelection
);


const virtualSampleList = (state) => state.upload.virtualSample;
const virtualSampleLoading = (state) => state.upload.virtualSampleLoading


export const selectVirtualSampleListData = createSelector(
    virtualSampleList,
    virtualSampleListDataSelection => virtualSampleListDataSelection
);

export const selectLoadingVirtualSampleData = createSelector(
    virtualSampleLoading,
    loadingSelection => loadingSelection
);


const virtualSampleLogList = (state) => state.upload.virtualSampleLog;
const virtualSampleLogLoading = (state) => state.upload.virtualSampleLogLoading


export const selectVirtualSampleLogListData = createSelector(
    virtualSampleLogList,
    virtualSampleLogListDataSelection => virtualSampleLogListDataSelection
);

export const selectLoadingVirtualSampleLogData = createSelector(
    virtualSampleLogLoading,
    loadingSelection => loadingSelection
);



const ffExcelUploadList = (state) => state.upload.ffExcelUpload;
const ffExcelUploadLoading = (state) => state.upload.ffExcelUploadLoading


export const selectffExcelUploadListData = createSelector(
    ffExcelUploadList,
    ffExcelUploadListDataSelection => ffExcelUploadListDataSelection
);

export const selectLoadingffExcelUploadData = createSelector(
    ffExcelUploadLoading,
    loadingSelection => loadingSelection
);


const ffUploadLogList = (state) => state.upload.ffUploadLog;
const ffUploadLogLoading = (state) => state.upload.ffUploadLogLoading


export const selectffUploadLogListData = createSelector(
    ffUploadLogList,
    ffUploadLogListDataSelection => ffUploadLogListDataSelection
);

export const selectLoadingffUploadLogData = createSelector(
    ffUploadLogLoading,
    loadingSelection => loadingSelection
);


