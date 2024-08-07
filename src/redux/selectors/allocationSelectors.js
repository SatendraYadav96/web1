import { createSelector } from 'reselect'

const items = state => state.allocations.items
const allocations = state => state.allocations.allocations
const plan = state => state.allocations.plan
const itemsLoading = state => state.allocations.itemsLoading
const planSubmitted = state => state.allocations.planSubmitted
const allocationsLoading = state => state.allocations.allocationsLoading
const commonAllocationDone = state => state.allocations.commonAllocationDone
const monthlyCommonTeamList = (state) => state.allocations.monthlyCommonTeam;
const monthlyCommonTeamKeysList = (state) => state.allocations.monthlyCommonTeamKeys
const monthlyCommonTeamLoading = (state) => state.allocations.monthlyCommonTeamLoading
const monthlyCommonAllocationSave = (state) => state.allocations.monthlyCommonAllocationSave
const monthlyCommonAllocationSaveSuccess = (state) => state.allocations.monthlyCommonAllocationSaveSuccess
const monthlyDifferentialAllocation = (state) => state.allocations.monthlyDifferentialTeam
const monthlyDifferentialAllocationSave = (state) => state.allocations.monthlyDifferentialAllocationSave
const monthlyDifferentialAllocationSaveSuccess = (state) => state.allocations.monthlyDifferentialAllocationSaveSuccess
const virtualCommonAllocationSave = (state) => state.allocations.virtualCommonAllocationSave
const virtualCommonAllocationSaveSuccess = (state) => state.allocations.virtualCommonAllocationSaveSuccess
const getDownloadAllocation = (state) => state.allocations.getDownloadAllocation
const getBlockedRecipient = (state) => state.allocations.getRecipientBlocked
const getActiveUsers = (state) => state.allocations.getActiveUsers
const virtualAllocation = state => state.allocations.virtualAllocation
const virtualPlanSubmitted = state => state.allocations.virtualPlanSubmitted
const virtualItemLoading = (state) => state.allocations.virtualItemsLoading
const searchSpecialPlan = (state) => state.allocations.searchSpecialPlan
const virtualCommonTeamList = (state) => state.allocations.virtualCommonTeam;
const virtualCommonTeamKeysList = (state) => state.allocations.virtualCommonTeamKeys
const virtualCommonTeamLoading = (state) => state.allocations.virtualCommonTeamLoading
const virtualAllocationForPlan = state => state.allocations.virtualAllocationForPlan
const virtualAllocationsLoading = state => state.allocations.virtualAllocationsLoading
const virtualDifferentialAllocation = (state) => state.allocations.virtualDifferentialTeam
const virtualDifferentialAllocationSave = (state) => state.allocations.virtualDifferentialAllocationSave
const virtualDifferentialAllocationSaveSuccess = (state) => state.allocations.virtualDifferentialAllocationSaveSuccess
const submitMonthlyAllocation = (state) => state.allocations.submitMonthlyAllocation
const submitMonthlyAllocationSuccess = (state) => state.allocations.submitMonthlyAllocationSuccess
const submitVirtualAllocation = (state) => state.allocations.submitVirtualAllocation
const submitVirtualAllocationSuccess = (state) => state.allocations.submitVirtualAllocationSuccess
const submitSpecialAllocation = (state) => state.allocations.submitSpecialAllocation
const submitSpecialAllocationSuccess = (state) => state.allocations.submitSpecialAllocationSuccess
const getAllocationStatusDropdown = (state) => state.allocations.getAllocationStatusDropdown
const getMultipleAllocationDownload = (state) => state.allocations.getMultipleAllocationDownload
const getMultipleAllocationExcelDownload = (state) => state.allocations.getMultipleAllocationExcelDownload
const editSpecialPlan = (state) => state.allocations.editSpecialPlan
const specialAllocation = state => state.allocations.specialAllocation
const specialPlanSubmitted = (state) => state.allocations.specialPlanSubmitted
const specialItemLoading = (state) => state.allocations.specialItemsLoading
const specialAllocationForPlan = state => state.allocations.specialAllocationForPlan
const specialAllocationsLoading = state => state.allocations.specialAllocationsLoading
const specialDifferentialAllocation = (state) => state.allocations.specialDifferentialTeam
const specialDifferentialAllocationSave = (state) => state.allocations.specialDifferentialAllocationSave
const specialDifferentialAllocationSaveSuccess = (state) => state.allocations.specialDifferentialAllocationSaveSuccess
const deleteSpecialAllocation = (state) => state.allocations.deleteSpecialAllocation
const multipleAllocationUpload = (state) => state.allocations.multipleAllocationUpload
const multipleAllocationUploadSuccess = (state) => state.allocations.multipleAllocationUploadSuccess

const multipleAllocationUploadSpecial = (state) => state.allocations.multipleAllocationUploadSpecial
const multipleAllocationUploadSpecialSuccess = (state) => state.allocations.multipleAllocationUploadSpecialSuccess

const multipleAllocationUploadMonthly = (state) => state.allocations.multipleAllocationUploadMonthly
const multipleAllocationUploadMonthlySuccess = (state) => state.allocations.multipleAllocationUploadMonthlySuccess

const multipleAllocationUploadVirtual = (state) => state.allocations.multipleAllocationUploadVirtual
const multipleAllocationUploadVirtualSuccess = (state) => state.allocations.multipleAllocationUploadVirtualSuccess

export const selectItemsToAllocate = createSelector(items, (itemsSelect) => itemsSelect)
export const selectPlanSubmitted = createSelector(planSubmitted, (dataSelect) => dataSelect)
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

export const selectMonthlyCommonAllocationSaveSuccess = createSelector(
    monthlyCommonAllocationSaveSuccess,
    dataSelect => dataSelect
)

export const selectMonthlyDifferentialAllocation = createSelector(
    monthlyDifferentialAllocation,
    dataSelect => dataSelect
)

export const selectMonthlyDifferentialAllocationSave = createSelector(
    monthlyDifferentialAllocationSave,
    dataSelect => dataSelect
)

export const selectMonthlyDifferentialAllocationSaveSuccess = createSelector(
    monthlyDifferentialAllocationSaveSuccess,
    dataSelect => dataSelect
)

export const selectVirtualCommonAllocationSave = createSelector(
    virtualCommonAllocationSave,
    dataSelect => dataSelect
)

export const selectVirtualCommonAllocationSaveSuccess = createSelector(
    virtualCommonAllocationSaveSuccess,
    dataSelect => dataSelect
)

export const selectDownloadAllocation = createSelector(
    getDownloadAllocation,
    dataSelect => dataSelect
)

export const selectGetBlockedRecipient = createSelector(
    getBlockedRecipient,
    dataSelect => dataSelect
)

export const selectGetActiveUsers = createSelector(
    getActiveUsers,
    dataSelect => dataSelect
)

export const selectVirtualAllocation = createSelector(
    virtualAllocation,
    dataSelect => dataSelect
)

export const selectVirtualPlanSubmitted = createSelector(
    virtualPlanSubmitted,
    dataSelect => dataSelect
)

export const selectVirtualItemLoading = createSelector(
    virtualItemLoading,
    dataSelect => dataSelect
)

export const selectSearchSpecialPlan = createSelector(
    searchSpecialPlan,
    dataSelect => dataSelect
)

export const selectVirtualCommonTeamListData = createSelector(
    virtualCommonTeamList,
    virtualCommonTeamListDataSelection => virtualCommonTeamListDataSelection
);

export const selectVirtualCommonTeamListKeys = createSelector(
    virtualCommonTeamKeysList,
    virtualCommonTeamListDataSelection => virtualCommonTeamListDataSelection
);


export const selectLoadingVirtualCommonTeamData = createSelector(
    virtualCommonTeamLoading,
    loadingSelection => loadingSelection
);

export const selectVirtualAllocationForPlan = createSelector(
    virtualAllocationForPlan,
    dataSelect => dataSelect
)

export const selectVirtualAllocationLoading = createSelector(
    virtualAllocationsLoading,
    dataSelect => dataSelect
)

export const selectVirtualDifferentialAllocation = createSelector(
    virtualDifferentialAllocation,
    dataSelect => dataSelect
)

export const selectVirtualDifferentialAllocationSave = createSelector(
    virtualDifferentialAllocationSave,
    dataSelect => dataSelect
)

export const selectVirtualDifferentialAllocationSaveSuccess = createSelector(
    virtualDifferentialAllocationSaveSuccess,
    dataSelect => dataSelect
)

export const selectSubmitMonthlyAllocation = createSelector(
    submitMonthlyAllocation,
    dataSelect => dataSelect
)

export const selectSubmitMonthlyAllocationSuccess = createSelector(
    submitMonthlyAllocationSuccess,
    dataSelect => dataSelect
)

export const selectSubmitVirtualAllocation = createSelector(
    submitVirtualAllocation,
    dataSelect => dataSelect
)

export const selectSubmitVirtualAllocationSuccess = createSelector(
    submitVirtualAllocationSuccess,
    dataSelect => dataSelect
)

export const selectSubmitSpecialAllocation = createSelector(
    submitSpecialAllocation,
    dataSelect => dataSelect
)

export const selectSubmitSpecialAllocationSuccess = createSelector(
    submitSpecialAllocationSuccess,
    dataSelect => dataSelect
)

export const selectGetAllocationStatusDropdown = createSelector(
    getAllocationStatusDropdown,
    dataSelect => dataSelect
)

export const selectMultipleAllocationDownload = createSelector(
    getMultipleAllocationDownload,
    dataSelect => dataSelect
)

export const selectMultipleAllocationExcelDownload = createSelector(
    getMultipleAllocationExcelDownload,
    dataSelect => dataSelect
)


export const selectSpecialPlan = createSelector(
    editSpecialPlan,
    dataSelect => dataSelect
)

export const selectSpecialAllocation = createSelector(
    specialAllocation,
    dataSelect => dataSelect
)

export const selectSpecialPlanSubmitted = createSelector(
    specialPlanSubmitted,
    dataSelect => dataSelect
)

export const selectSpecialItemLoading = createSelector(
    specialItemLoading,
    dataSelect => dataSelect
)

export const selectSpecialAllocationForPlan = createSelector(
    specialAllocationForPlan,
    dataSelect => dataSelect
)

export const selectSpecialAllocationLoading = createSelector(
    specialAllocationsLoading,
    dataSelect => dataSelect
)

export const selectSpecialDifferentialAllocation = createSelector(
    specialDifferentialAllocation,
    dataSelect => dataSelect
)

export const selectSpecialDifferentialAllocationSave = createSelector(
    specialDifferentialAllocationSave,
    dataSelect => dataSelect
)

export const selectSpecialDifferentialAllocationSaveSuccess = createSelector(
    specialDifferentialAllocationSaveSuccess,
    dataSelect => dataSelect
)

export const selectDeleteSpecialAllocation = createSelector(
    deleteSpecialAllocation,
    dataSelect => dataSelect
)

export const selectMultipleAllocationUpload = createSelector(
    multipleAllocationUpload,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadSuccess = createSelector(
    multipleAllocationUploadSuccess,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadSpecial = createSelector(
    multipleAllocationUploadSpecial,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadSpecialSuccess = createSelector(
    multipleAllocationUploadSpecialSuccess,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadMonthly = createSelector(
    multipleAllocationUploadMonthly,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadMonthlySuccess = createSelector(
    multipleAllocationUploadMonthlySuccess,
    dataSelect =>  dataSelect
)


export const selectMultipleAllocationUploadVirtual = createSelector(
    multipleAllocationUploadVirtual,
    dataSelect =>  dataSelect
)

export const selectMultipleAllocationUploadVirtualSuccess = createSelector(
    multipleAllocationUploadVirtualSuccess,
    dataSelect =>  dataSelect
)
