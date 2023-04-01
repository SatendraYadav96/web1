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
