import { createSelector } from 'reselect'


//ITEM CODE REPORT SELECTOR

const itemRevalidationList = (state) => state.itemRevalidation.itemRevalidationList;
const itemRevalidationLoading = (state) => state.itemRevalidation.itemRevalidationLoading


export const selectItemRevalidationListData = createSelector(
    itemRevalidationList,
    itemRevalidationListDataSelection => itemRevalidationListDataSelection
);

export const selectLoadingItemRevalidationData = createSelector(
    itemRevalidationLoading,
    loadingSelection => loadingSelection
);
