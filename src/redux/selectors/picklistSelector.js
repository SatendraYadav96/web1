import { createSelector } from 'reselect'

const picklist = (state) => state.pickingLoad.picklist;
const loadingPicking = (state) => state.pickingLoad.loading


export const selectPicklistData = createSelector(
picklist,
          picklistDataSelection => picklistDataSelection
);

export const selectLoadingData = createSelector(
loadingPicking,
              loadingSelection => loadingSelection
);


