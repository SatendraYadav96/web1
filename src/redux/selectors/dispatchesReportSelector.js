import { createSelector } from 'reselect'


//DISPATCHES REPORT SELECTOR

const dispatchesList = (state) => state.physicalSampling.dispatchesList;
const dispatchesReportLoading = (state) => state.physicalSampling.dispatchesReportLoading


export const selectDispatchesListData = createSelector(
dispatchesList,
          dispatchesListDataSelection => dispatchesListDataSelection
);

export const selectLoadingDispatchesReportData = createSelector(
dispatchesReportLoading,
              loadingSelection => loadingSelection
);
