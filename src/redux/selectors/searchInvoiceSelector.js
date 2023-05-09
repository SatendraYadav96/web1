import {createSelector} from "reselect";

const searchList = (state) => state.searchInvoice.searchList;
const searchInvoiceLoading = (state) => state.searchInvoice.searchInvoiceLoading


export const selectSearchListData = createSelector(
    searchList,
    searchListDataSelection => searchListDataSelection
);

export const selectLoadingSearchInvoiceData = createSelector(
    searchInvoiceLoading,
    loadingSelection => loadingSelection
);
