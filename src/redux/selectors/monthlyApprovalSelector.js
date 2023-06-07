import { createSelector } from 'reselect'


//ITEM CODE REPORT SELECTOR

const monthlyApprovalList = (state) => state.monthlyApproval.monthlyApprovalList;
const monthlyApprovalLoading = (state) => state.monthlyApproval.monthlyApprovalLoading


export const selectMonthlyApprovalListData = createSelector(
    monthlyApprovalList,
    monthlyApprovalListDataSelection => monthlyApprovalListDataSelection
);

export const selectLoadingMonthlyApprovalData = createSelector(
    monthlyApprovalLoading,
    loadingSelection => loadingSelection
);
