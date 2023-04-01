import { createSelector } from 'reselect'


//DISPATCHES REPORT SELECTOR

const dispatchesList = (state) => state.dispatchesReport.dispatchesList;
const dispatchesReportLoading = (state) => state.dispatchesReport.dispatchesReportLoading


export const selectDispatchesListData = createSelector(
dispatchesList,
          dispatchesListDataSelection => dispatchesListDataSelection
);

export const selectLoadingDispatchesReportData = createSelector(
dispatchesReportLoading,
              loadingSelection => loadingSelection
);
