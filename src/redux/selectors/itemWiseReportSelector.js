import { createSelector } from 'reselect'


//ITEM WISE REPORT SELECTOR

const itemWiseList = (state) => state.itemWiseReport.itemWiseList;
const itemWiseReportLoading = (state) => state.itemWiseReport.itemWiseReportLoading


export const selectItemWiseListData = createSelector(
    itemWiseList,
    itemWiseListDataSelection => itemWiseListDataSelection
);

export const selectLoadingItemWiseReportData = createSelector(
    itemWiseReportLoading,
    loadingSelection => loadingSelection
);
