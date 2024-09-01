import { createSelector } from 'reselect'


//PHYSICAL SAMPLING REPORT SELECTOR

const physicalSamplingList = (state) => state.physicalSampling.physicalSamplingList;
const physicalSamplingListLoading = (state) => state.physicalSampling.physicalSamplingListLoading


export const selectPhysicalSamplingListData = createSelector(
    physicalSamplingList,
    physicalSamplingListDataSelection => physicalSamplingListDataSelection
);

export const selectPhysicalSamplingListLoadingData = createSelector(
    physicalSamplingListLoading,
    loadingSelection => loadingSelection
);
