import { createSelector } from 'reselect'


//Virtual Dispatch
const virtualData = (state) => state.virtualDispatch.virtualData;
const virtualDispatchLoading = (state) => state.virtualDispatch.virtualDispatchLoading

export const selectVirtualData = createSelector(
    virtualData,
    virtualDataSelection => virtualDataSelection
);
export const selectLoadingVirtualDispatchData = createSelector(
    virtualDispatchLoading,
    loadingSelection => loadingSelection
);

//virtual invoice details
const virtualDispatchDetails = (state) => state.virtualDispatch.virtualDispatchDetails;
const virtualDispatchDetailsLoading = (state) => state.virtualDispatch.virtualDispatchDetailsLoading;

export const selectVirtualDispatchListData = createSelector(
    virtualDispatchDetails,
    invoiceListDataSelection => invoiceListDataSelection
);
export const selectVirtualLoadingDispatchDetailsData = createSelector(
    virtualDispatchDetailsLoading,
    loadingSelection => loadingSelection
);

//Virtual Dispatch
const genVirtualInvoiceList = (state) => state.virtualDispatch.genVirtualInvoiceList;
const genVirtualInvoiceLoading = (state) => state.virtualDispatch.genVirtualInvoiceLoading


export const selectGenVirtualInvoiceListData = createSelector(
    genVirtualInvoiceList,
    genVirtualInvoiceListDataSelection => genVirtualInvoiceListDataSelection
);

export const selectLoadingGenVirtualInvoiceData = createSelector(
    genVirtualInvoiceLoading,
    loadingSelection => loadingSelection
);
