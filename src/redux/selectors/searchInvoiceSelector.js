import {createSelector} from "reselect";

const searchInvoiceList = (state) => state.searchInvoice.searchInvoiceList;
const searchInvoiceLoading = (state) => state.searchInvoice.searchInvoiceLoading


export const selectSearchListData = createSelector(
    searchInvoiceList,
    searchListDataSelection => searchListDataSelection
);

export const selectLoadingSearchInvoiceData = createSelector(
    searchInvoiceLoading,
    loadingSelection => loadingSelection
);
