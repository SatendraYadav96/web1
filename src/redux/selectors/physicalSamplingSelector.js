import { createSelector } from 'reselect'


//PHYSICAL SAMPLING REPORT SELECTOR

const physicalSamplingList = (state) => state.dispatchesReport.physicalSamplingList;
const physicalSamplingListLoading = (state) => state.dispatchesReport.physicalSamplingListLoading


export const selectPhysicalSamplingListData = createSelector(
    physicalSamplingList,
    physicalSamplingListDataSelection => physicalSamplingListDataSelection
);

export const selectPhysicalSamplingListLoadingData = createSelector(
    physicalSamplingListLoading,
    loadingSelection => loadingSelection
);
