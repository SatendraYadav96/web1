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


//Monthly Dispatch
const generateInvoiceList = (state) => state.monthlyDispatch.generateInvoiceList;
const generateInvoiceLoading = (state) => state.monthlyDispatch.generateInvoiceLoading


export const selectGenerateInvoiceListData = createSelector(
    generateInvoiceList,
    generateInvoiceListDataSelection => generateInvoiceListDataSelection
);

export const selectLoadingGenerateInvoiceData = createSelector(
    generateInvoiceLoading,
    loadingSelection => loadingSelection
);

//Monthly Dispatch
const genInvoiceList = (state) => state.monthlyDispatch.genInvoiceList;
const genInvoiceLoading = (state) => state.monthlyDispatch.genInvoiceLoading


export const selectGenInvoiceListData = createSelector(
    genInvoiceList,
    genInvoiceListDataSelection => genInvoiceListDataSelection
);

export const selectLoadingGenInvoiceData = createSelector(
    genInvoiceLoading,
    loadingSelection => loadingSelection
);


//Monthly Dispatch Generate Label
const generateLabelList = (state) => state.monthlyDispatch.generateLabelList;
const generateLabelLoading = (state) => state.monthlyDispatch.generateLabelLoading


export const selectGenerateLabelListData = createSelector(
    generateLabelList,
    generateLabelListDataSelection => generateLabelListDataSelection
);

export const selectLoadingGenerateLabelData = createSelector(
    generateLabelLoading,
    loadingSelection => loadingSelection
);

