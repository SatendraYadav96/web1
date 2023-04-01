import { createSelector } from 'reselect'


//ITEM CONSUMPTION REPORT SELECTOR

const consumptionList = (state) => state.consumptionReport.consumptionList;
const consumptionReportLoading = (state) => state.consumptionReport.consumptionReportLoading


export const selectConsumptionListData = createSelector(
consumptionList,
          consumptionListDataSelection => consumptionListDataSelection
);

export const selectLoadingConsumptionReportData = createSelector(
consumptionReportLoading,
              loadingSelection => loadingSelection
);
