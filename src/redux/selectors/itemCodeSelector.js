import { createSelector } from 'reselect'


//ITEM CODE REPORT SELECTOR

const itemCodeList = (state) => state.itemCode.itemCodeList;
const itemCodeLoading = (state) => state.itemCode.itemCodeLoading


export const selectItemCodeListData = createSelector(
    itemCodeList,
    itemCodeListDataSelection => itemCodeListDataSelection
);

export const selectLoadingItemCodeData = createSelector(
    itemCodeLoading,
    loadingSelection => loadingSelection
);
