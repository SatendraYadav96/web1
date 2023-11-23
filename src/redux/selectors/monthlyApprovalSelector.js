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
const rejectPlanSuccess = (state) => state.monthlyApproval.rejectPlanSuccess

export const selectRejectPlanListData = createSelector(
    rejectPlanList,
    rejectPlanListDataSelection => rejectPlanListDataSelection
);

export const selectLoadingRejectPlanData = createSelector(
    rejectPlanLoading,
    loadingSelection => loadingSelection
);

export const selectRejectPlanSuccess = createSelector(
    rejectPlanSuccess,
    rejectPlanListDataSelection => rejectPlanListDataSelection
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


//SPECIAL PLAN APPROVAL

const specialPlanApprovalList = (state) => state.monthlyApproval.specialPlanApprovalList;
const specialPlanApprovalLoading = (state) => state.monthlyApproval.specialPlanApprovalLoading


export const selectSpecialPlanApprovalListData = createSelector(
    specialPlanApprovalList,
    specialPlanApprovalListDataSelection => specialPlanApprovalListDataSelection
);

export const selectLoadingSpecialPlanApprovalData = createSelector(
    specialPlanApprovalLoading,
    loadingSelection => loadingSelection
);

//SPECIAL PLAN DETAILS APPROVAL

const specialPlanApprovalDetailsList = (state) => state.monthlyApproval.specialPlanApprovalDetailsList;
const specialPlanApprovalDetailsLoading = (state) => state.monthlyApproval.specialPlanApprovalDetailsLoading


export const selectSpecialPlanApprovalDetailsListData = createSelector(
    specialPlanApprovalDetailsList,
    specialPlanApprovalDetailsListDataSelection => specialPlanApprovalDetailsListDataSelection
);

export const selectLoadingSpecialPlanApprovalDetailsData = createSelector(
    specialPlanApprovalDetailsLoading,
    loadingSelection => loadingSelection
);


//VIRTUAL PLAN APPROVAL

const virtualPlanApprovalList = (state) => state.monthlyApproval.virtualPlanApprovalList;
const virtualPlanApprovalLoading = (state) => state.monthlyApproval.virtualPlanApprovalLoading


export const selectVirtualPlanApprovalListData = createSelector(
    virtualPlanApprovalList,
    virtualPlanApprovalListDataSelection => virtualPlanApprovalListDataSelection
);

export const selectLoadingVirtualPlanApprovalData = createSelector(
    virtualPlanApprovalLoading,
    loadingSelection => loadingSelection
);

//SPECIAL PLAN DETAILS APPROVAL

const virtualPlanApprovalDetailsList = (state) => state.monthlyApproval.virtualPlanApprovalDetailsList;
const virtualPlanApprovalDetailsLoading = (state) => state.monthlyApproval.virtualPlanApprovalDetailsLoading


export const selectVirtualPlanApprovalDetailsListData = createSelector(
    virtualPlanApprovalDetailsList,
    virtualPlanApprovalDetailsListDataSelection => virtualPlanApprovalDetailsListDataSelection
);

export const virtualLoadingVirtualPlanApprovalDetailsData = createSelector(
    virtualPlanApprovalDetailsLoading,
    loadingSelection => loadingSelection
);

//VIRTUAL APPROVAL DOWNLOAD
const virtualApprovalDownload = (state) => state.monthlyApproval.virtualApprovalDownload

export const selectVirtualApprovalDownload = createSelector(
    virtualApprovalDownload,
    dataSelect => dataSelect
)
