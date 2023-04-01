import { createSelector } from 'reselect'


//Special Dispatch

const specialData = (state) => state.specialDispatch.specialData;
const specialDispatchLoading = (state) => state.specialDispatch.specialDispatchLoading


export const selectSpecialData = createSelector(
specialData,
          specialDataSelection => specialDataSelection
);

export const selectLoadingSpecialDispatchData = createSelector(
specialDispatchLoading,
              loadingSelection => loadingSelection
);




//special invoice details

const specialInvoiceDetails = (state) => state.specialDispatch.specialInvoiceDetails;
const specialInvoiceDetailsLoading = (state) => state.specialDispatch.specialInvoiceDetailsLoading;


export const selectSpecialInvoiceListData = createSelector(
specialInvoiceDetails,
          invoiceListDataSelection => invoiceListDataSelection
);

export const selectSpecialLoadingInvoiceDetailsData = createSelector(
specialInvoiceDetailsLoading,
              loadingSelection => loadingSelection
);
