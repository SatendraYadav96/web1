import { createSelector } from 'reselect'


//Monthly Dispatch
const monthList = (state) => state.monthlyDispatch.monthList;
const monthlyDispatchLoading = (state) => state.monthlyDispatch.monthlyDispatchLoading


export const selectMonthListData = createSelector(
monthList,
          monthListDataSelection => monthListDataSelection
);

export const selectLoadingMonthDispatchData = createSelector(
monthlyDispatchLoading,
              loadingSelection => loadingSelection
);


// Employee Invoice Details
const invoiceList = (state) => state.monthlyDispatch.invoiceList;
const invoiceDetailsLoading = (state) => state.monthlyDispatch.invoiceDetailsLoading;


export const selectInvoiceListData = createSelector(
invoiceList,
          invoiceListDataSelection => invoiceListDataSelection
);

export const selectLoadingInvoiceDetailsData = createSelector(
invoiceDetailsLoading,
              loadingSelection => loadingSelection
);



//Monthly Dispatch
const printList = (state) => state.monthlyDispatch.printList;
const printInvoiceLoading = (state) => state.monthlyDispatch.printInvoiceLoading


export const selectPrintListData = createSelector(
    printList,
    printListDataSelection => printListDataSelection
);

export const selectLoadingPrintInvoiceData = createSelector(
    printInvoiceLoading,
    loadingSelection => loadingSelection
);
