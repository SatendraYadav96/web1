import { createSelector } from 'reselect'


//DISPATCH REGISTER REPORT SELECTOR

const dispatchRegisterList = (state) => state.dispatchRegisterReport.dispatchRegisterList;
const dispatchRegisterReportLoading = (state) => state.dispatchRegisterReport.dispatchRegisterReportLoading


export const selectDispatchRegisterListData = createSelector(
dispatchRegisterList,
          dispatchRegisterListDataSelection => dispatchRegisterListDataSelection
);

export const selectLoadingDispatchRegisterReportData = createSelector(
dispatchRegisterReportLoading,
              loadingSelection => loadingSelection
);
