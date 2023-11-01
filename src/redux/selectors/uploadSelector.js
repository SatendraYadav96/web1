import {createSelector} from "reselect";


//TRANSPORT UPLOAD
const transportUploadList = (state) => state.upload.transportUpload;
const transportUploadLoading = (state) => state.upload.transportUploadLoading
const transportUploadSuccess = (state) => state.upload.transportUploadSuccess


export const selectTransportUploadListData = createSelector(
    transportUploadList,
    transportUploadListDataSelection => transportUploadListDataSelection
);

export const selectLoadingTransportUploadData = createSelector(
    transportUploadLoading,
    loadingSelection => loadingSelection
);

export const selectTransportUploadSuccess = createSelector(
    transportUploadSuccess,
    transportUploadSuccessSelection => transportUploadSuccessSelection
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
const grnUploadSuccess = (state) => state.upload.grnUploadSuccess

export const selectGrnUploadListData = createSelector(
    grnUploadList,
    grnUploadListDataSelection => grnUploadListDataSelection
);

export const selectLoadingGrnUploadData = createSelector(
    grnUploadLoading,
    loadingSelection => loadingSelection
);

export const selectGrnUploadSuccess = createSelector(grnUploadSuccess, (grnSelect) => grnSelect)


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
const invoiceUploadSuccess = (state) => state.upload.invoiceUploadSuccess


export const selectInvoiceUploadListData = createSelector(
    invoiceUploadList,
    invoiceUploadListDataSelection => invoiceUploadListDataSelection
);

export const selectLoadingInvoiceUploadData = createSelector(
    invoiceUploadLoading,
    loadingSelection => loadingSelection
);

export const selectInvoiceUploadSuccess = createSelector(
    invoiceUploadSuccess,
    dataSelect => dataSelect
)

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


const recipientUploadLogList = (state) => state.upload.recipientUploadLog;
const recipientUploadLogLoading = (state) => state.upload.recipientUploadLogLoading


export const selectRecipientUploadLogListData = createSelector(
    recipientUploadLogList,
    recipientUploadLogListDataSelection => recipientUploadLogListDataSelection
);

export const selectLoadingRecipientUploadLogData = createSelector(
    recipientUploadLogLoading,
    loadingSelection => loadingSelection
);


const nonComplianceUploadLogList = (state) => state.upload.nonComplianceUploadLog;
const nonComplianceUploadLogLoading = (state) => state.upload.nonComplianceUploadLogLoading


export const selectNonComplianceUploadLogListData = createSelector(
    nonComplianceUploadLogList,
    nonComplianceUploadLogListDataSelection => nonComplianceUploadLogListDataSelection
);

export const selectLoadingNonComplianceUploadLogData = createSelector(
    nonComplianceUploadLogLoading,
    loadingSelection => loadingSelection
);


const overSamplingUploadLogList = (state) => state.upload.overSamplingUploadLog;
const overSamplingUploadLogLoading = (state) => state.upload.overSamplingUploadLogLoading


export const selectOverSamplingUploadLogListData = createSelector(
    overSamplingUploadLogList,
    overSamplingUploadLogListDataSelection => overSamplingUploadLogListDataSelection
);

export const selectLoadingOverSamplingUploadLogData = createSelector(
    overSamplingUploadLogLoading,
    loadingSelection => loadingSelection
);

const overSamplingDetailsUploadLogList = (state) => state.upload.overSamplingDetailsUploadLog;
const overSamplingDetailsUploadLogLoading = (state) => state.upload.overSamplingDetailsUploadLogLoading


export const selectOverSamplingDetailsUploadLogListData = createSelector(
    overSamplingDetailsUploadLogList,
    overSamplingDetailsUploadLogListDataSelection => overSamplingDetailsUploadLogListDataSelection
);

export const selectLoadingOverSamplingDetailsUploadLogData = createSelector(
    overSamplingDetailsUploadLogLoading,
    loadingSelection => loadingSelection
);



const materialExpiryUploadLogList = (state) => state.upload.materialExpiryUploadLog;
const materialExpiryUploadLogLoading = (state) => state.upload.materialExpiryUploadLogLoading


export const selectMaterialExpiryUploadLogListData = createSelector(
    materialExpiryUploadLogList,
    materialExpiryUploadLogListDataSelection => materialExpiryUploadLogListDataSelection
);

export const selectLoadingMaterialExpiryUploadLogData = createSelector(
    materialExpiryUploadLogLoading,
    loadingSelection => loadingSelection
);


//NON_COMPLIANCE_EXCEL

const nonComplianceExcelList = (state) => state.upload.nonComplianceExcel;
const nonComplianceExcelLoading = (state) => state.upload.nonComplianceExcelLoading


export const selectNonComplianceExcelListData = createSelector(
    nonComplianceExcelList,
    nonComplianceExcelListDataSelection => nonComplianceExcelListDataSelection
);

export const selectLoadingNonComplianceExcelData = createSelector(
    nonComplianceExcelLoading,
    loadingSelection => loadingSelection
);



const overSamplingExcelList = (state) => state.upload.overSamplingExcel;
const overSamplingExcelLoading = (state) => state.upload.overSamplingExcelLoading


export const selectOverSamplingExcelListData = createSelector(
    overSamplingExcelList,
    overSamplingExcelListDataSelection => overSamplingExcelListDataSelection
);

export const selectLoadingOverSamplingExcelData = createSelector(
    overSamplingExcelLoading,
    loadingSelection => loadingSelection
);



const overSamplingDetailsExcelList = (state) => state.upload.overSamplingDetailsExcel;
const overSamplingDetailsExcelLoading = (state) => state.upload.overSamplingDetailsExcelLoading


export const selectOverSamplingDetailsExcelListData = createSelector(
    overSamplingDetailsExcelList,
    overSamplingDetailsExcelListDataSelection => overSamplingDetailsExcelListDataSelection
);

export const selectLoadingOverSamplingDetailsExcelData = createSelector(
    overSamplingDetailsExcelLoading,
    loadingSelection => loadingSelection
);




const materialExpiryExcelList = (state) => state.upload.materialExpiryExcel;
const materialExpiryExcelLoading = (state) => state.upload.materialExpiryExcelLoading


export const selectMaterialExpiryExcelListData = createSelector(
    materialExpiryExcelList,
    materialExpiryExcelListDataSelection => materialExpiryExcelListDataSelection
);

export const selectLoadingMaterialExpiryExcelData = createSelector(
    materialExpiryExcelLoading,
    loadingSelection => loadingSelection
);
