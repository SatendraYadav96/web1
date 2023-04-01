import { createSelector } from 'reselect'


//DEVIATION REPORT SELECTOR

const deviationList = (state) => state.deviationReport.deviationList;
const deviationReportLoading = (state) => state.deviationReport.deviationReportLoading


export const selectDeviationListData = createSelector(
deviationList,
          deviationListDataSelection => deviationListDataSelection
);

export const selectLoadingDeviationReportData = createSelector(
deviationReportLoading,
              loadingSelection => loadingSelection
);
