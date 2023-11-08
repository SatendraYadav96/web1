import {createSelector} from "reselect";

//NON COMPLIANCE

const nonComplianceList = (state) => state.compliance.nonComplianceList;
const nonComplianceLoading = (state) => state.compliance.nonComplianceLoading


export const selectNonComplianceListData = createSelector(
    nonComplianceList,
    nonComplianceListDataSelection => nonComplianceListDataSelection
);

export const selectLoadingNonComplianceData = createSelector(
    nonComplianceLoading,
    loadingSelection => loadingSelection
);


//COMPLIANCE DETAILS

const complianceDetailsList = (state) => state.compliance.complianceDetailsList;
const complianceDetailsLoading = (state) => state.compliance.complianceDetailsLoading


export const selectComplianceDetailsListData = createSelector(
    complianceDetailsList,
    complianceDetailsListDataSelection => complianceDetailsListDataSelection
);

export const selectLoadingComplianceDetailsData = createSelector(
    complianceDetailsLoading,
    loadingSelection => loadingSelection
);


//MAIL LOG

const mailLogList = (state) => state.compliance.mailLogList;
const mailLogLoading = (state) => state.compliance.mailLogLoading


export const selectMailLogListData = createSelector(
    mailLogList,
    mailLogListDataSelection => mailLogListDataSelection
);

export const selectLoadingMailLogData = createSelector(
    mailLogLoading,
    loadingSelection => loadingSelection
);


//SAVE ADMIN REMARK

const saveNonComplianceAdminRemark = (state) => state.compliance.saveNonComplianceAdminRemark
const saveNonComplianceAdminRemarkSuccess = (state) => state.compliance.saveNonComplianceAdminRemarkSuccess

export const selectSaveNonComplianceAdminRemark = createSelector(
    saveNonComplianceAdminRemark,
    dataSelect => dataSelect
)

export const selectSaveNonComplianceAdminRemarkSuccess = createSelector(
    saveNonComplianceAdminRemarkSuccess,
    dataSelect => dataSelect
)

//SAVE OVER SAMPLING

const saveOverSampling = (state) => state.compliance.saveOverSampling
const saveOverSamplingSuccess = (state) => state.compliance.saveOverSamplingSuccess

export const selectSaveOverSampling = createSelector(
    saveOverSampling,
    dataSelect => dataSelect
)

export const selectSaveOverSamplingSuccess = createSelector(
    saveOverSamplingSuccess,
    dataSelect => dataSelect
)

//OVER SAMPLING DETAIL

const overSamplingDetailData = (state) => state.compliance.overSamplingDetailData

export const selectOverSamplingDetailData = createSelector(
    overSamplingDetailData,
    dataSelect => dataSelect
)

//MASTER BLOCKED RECIPIENT

const saveMasterBlockedRecipient = (state) => state.compliance.saveMasterBlockedRecipient
const saveMasterBlockedRecipientSuccess = (state) => state.compliance.saveMasterBlockedRecipientSuccess

export const selectSaveMasterBlockedRecipient = createSelector(
    saveMasterBlockedRecipient,
    dataSelect => dataSelect
)

export const selectSaveMasterBlockedRecipientSuccess = createSelector(
    saveMasterBlockedRecipientSuccess,
    dataSelect => dataSelect
)
