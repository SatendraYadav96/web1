import { createSelector } from 'reselect'

const pickinglist = (state) => state.pickingLoad.pickinglist;
const loadingPicking = (state) => state.pickingLoad.loading


export const selectPickinglistData = createSelector(
pickinglist,
          pickinglistDataSelection => pickinglistDataSelection
);

export const selectLoadingData = createSelector(
loadingPicking,
              loadingSelection => loadingSelection
);


const picklist = (state) => state.pickingLoad.picklist;
const loadingPick = (state) => state.pickingLoad.picklistLoading


export const selectPicklistData = createSelector(
    picklist,
    picklistDataSelection => picklistDataSelection
);

export const selectPickLoadingData = createSelector(
    loadingPick,
    loadingSelection => loadingSelection
);

const picklistVirtual = (state) => state.pickingLoad.picklistVirtual;
const loadingPickVirtual = (state) => state.pickingLoad.picklistLoadingVirtual


export const selectPicklistVirtualData = createSelector(
    picklistVirtual,
    picklistVirtualDataSelection => picklistVirtualDataSelection
);

export const selectPickVirtualLoadingData = createSelector(
    loadingPickVirtual,
    loadingSelection => loadingSelection
);

