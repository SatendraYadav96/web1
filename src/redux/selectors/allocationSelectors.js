import { createSelector } from 'reselect'

const items = state => state.allocations.items
const allocations = state => state.allocations.allocations
const plan = state => state.allocations.plan
const itemsLoading = state => state.allocations.itemsLoading
const allocationsLoading = state => state.allocations.allocationsLoading
const commonAllocationDone = state => state.allocations.commonAllocationDone
const monthlyCommonTeamList = (state) => state.allocations.monthlyCommonTeam;
const monthlyCommonTeamKeysList = (state) => state.allocations.monthlyCommonTeamKeys
const monthlyCommonTeamLoading = (state) => state.allocations.monthlyCommonTeamLoading
const monthlyCommonAllocationSave = (state) => state.allocations.monthlyCommonAllocationSave

export const selectItemsToAllocate = createSelector(items, (itemsSelect) => itemsSelect)
export const selectAllocations = createSelector(allocations, (allocationsSelect) => allocationsSelect)
export const selectAllocationsLoading = createSelector(allocationsLoading, allocationsLoadingSelect => allocationsLoadingSelect)
export const selectPlan = createSelector(plan, (planSelect) => planSelect)
export const selectItemsLoading = createSelector(itemsLoading, (itemsLoadingSelect) => itemsLoadingSelect)
export const selectCommonAllocationDone = createSelector(commonAllocationDone, commonAllocationDoneSelect => commonAllocationDoneSelect)


export const selectMonthlyCommonTeamListData = createSelector(
    monthlyCommonTeamList,
    monthlyCommonTeamListDataSelection => monthlyCommonTeamListDataSelection
);

export const selectMonthlyCommonTeamListKeys = createSelector(
    monthlyCommonTeamKeysList,
    monthlyCommonTeamListDataSelection => monthlyCommonTeamListDataSelection
);


export const selectLoadingMonthlyCommonTeamData = createSelector(
    monthlyCommonTeamLoading,
    loadingSelection => loadingSelection
);

export const selectMonthlyCommonAllocationSave = createSelector(
    monthlyCommonAllocationSave,
    dataSelect => dataSelect
)
