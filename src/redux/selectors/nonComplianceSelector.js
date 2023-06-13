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

