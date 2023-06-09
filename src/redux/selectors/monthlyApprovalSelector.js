import { createSelector } from 'reselect'


//MONTHLY APPROVAL

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


//MONTHLY APPROVAL DETAILS

const monthlyApprovalDetailsList = (state) => state.monthlyApproval.monthlyApprovalDetailsList;
const monthlyApprovalDetailsLoading = (state) => state.monthlyApproval.monthlyApprovalDetailsLoading


export const selectMonthlyApprovalDetailsListData = createSelector(
    monthlyApprovalDetailsList,
    monthlyApprovalDetailsListDataSelection => monthlyApprovalDetailsListDataSelection
);

export const selectLoadingMonthlyApprovalDetailsData = createSelector(
    monthlyApprovalDetailsLoading,
    loadingSelection => loadingSelection
);


//RESET_PLAN

const resetPlanList = (state) => state.monthlyApproval.resetPlanList;
const resetPlanLoading = (state) => state.monthlyApproval.resetPlanLoading


export const selectResetPlanListData = createSelector(
    resetPlanList,
    resetPlanListDataSelection => resetPlanListDataSelection
);

export const selectLoadingResetPlanData = createSelector(
    resetPlanLoading,
    loadingSelection => loadingSelection
);


//UNLOCK_PLAN

const unlockPlanList = (state) => state.monthlyApproval.unlockPlanList;
const unlockPlanLoading = (state) => state.monthlyApproval.unlockPlanLoading


export const selectUnlockPlanListData = createSelector(
    unlockPlanList,
    unlockPlanListDataSelection => unlockPlanListDataSelection
);

export const selectLoadingUnlockPlanData = createSelector(
    unlockPlanLoading,
    loadingSelection => loadingSelection
);


//APPROVE_PLAN

const approvePlanList = (state) => state.monthlyApproval.approvePlanList;
const approvePlanLoading = (state) => state.monthlyApproval.approvePlanLoading


export const selectApprovePlanListData = createSelector(
    approvePlanList,
    approvePlanListDataSelection => approvePlanListDataSelection
);

export const selectLoadingApprovePlanData = createSelector(
    approvePlanLoading,
    loadingSelection => loadingSelection
);

//APPROVE_PLAN

const rejectPlanList = (state) => state.monthlyApproval.rejectPlanList;
const rejectPlanLoading = (state) => state.monthlyApproval.rejectPlanLoading


export const selectRejectPlanListData = createSelector(
    rejectPlanList,
    rejectPlanListDataSelection => rejectPlanListDataSelection
);

export const selectLoadingRejectPlanData = createSelector(
    rejectPlanLoading,
    loadingSelection => loadingSelection
);

//MONTHLY_TO_SPECIAL

const monthlyToSpecialList = (state) => state.monthlyApproval.monthlyToSpecialList;
const monthlyToSpecialLoading = (state) => state.monthlyApproval.monthlyToSpecialLoading


export const selectMonthlyToSpecialListData = createSelector(
    monthlyToSpecialList,
    monthlyToSpecialListDataSelection => monthlyToSpecialListDataSelection
);

export const selectLoadingMonthlyToSpecialData = createSelector(
    monthlyToSpecialLoading,
    loadingSelection => loadingSelection
);


