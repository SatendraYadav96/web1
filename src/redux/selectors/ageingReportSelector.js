import { createSelector } from 'reselect'


//AGEING REPORT SELECTOR

const ageingList = (state) => state.ageingReport.ageingList;
const ageingReportLoading = (state) => state.ageingReport.ageingReportLoading


export const selectAgeingListData = createSelector(
    ageingList,
    ageingListDataSelection => ageingListDataSelection
);

export const selectLoadingAgeingReportData = createSelector(
    ageingReportLoading,
    loadingSelection => loadingSelection
);
