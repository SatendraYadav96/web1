import { createSelector } from 'reselect'


//DESTRUCTION REPORT SELECTOR

const destructionList = (state) => state.destructionReport.destructionList;
const destructionReportLoading = (state) => state.destructionReport.destructionReportLoading


export const selectDestructionListData = createSelector(
destructionList,
          destructionListDataSelection => destructionListDataSelection
);

export const selectLoadingDestructionReportData = createSelector(
destructionReportLoading,
              loadingSelection => loadingSelection
);
