import { createSelector } from 'reselect'

const pendingDispatch = (state) => state.dashboard.pendingDispatch
const pendingDispatchLoading = (state) => state.dashboard.pendingDispatchLoading
export const selectPendingDispatch = createSelector(pendingDispatch, (pendingDispatchSelect) => pendingDispatchSelect)
export const selectPendingDispatchLoading = createSelector(pendingDispatchLoading, (pendingDispatchLoadingSelect) => pendingDispatchLoadingSelect)


const hubNearExpiry = (state) => state.dashboard.hubNearExpiry
const hubNearExpiryLoading = (state) => state.dashboard.hubNearExpiryLoading
export const selectHubNearExpiry = createSelector(hubNearExpiry, (hubNearExpirySelect) => hubNearExpirySelect)
export const selectHubNearExpiryLoading = createSelector(hubNearExpiryLoading, (hubNearExpiryLoadingSelect) => hubNearExpiryLoadingSelect)


const hubPendingRevalidation = (state) => state.dashboard.hubPendingRevalidation
const hubPendingRevalidationLoading = (state) => state.dashboard.hubPendingRevalidationLoading
export const selectHubPendingRevalidation = createSelector(hubPendingRevalidation, (hubPendingRevalidationSelect) => hubPendingRevalidationSelect)
export const selectHubPendingRevalidationLoading = createSelector(hubPendingRevalidationLoading, (hubPendingRevalidationLoadingSelect) => hubPendingRevalidationLoadingSelect)


const hubGrnErrorLog = (state) => state.dashboard.hubGrnErrorLog
const hubGrnErrorLogLoading = (state) => state.dashboard.hubGrnErrorLogLoading
export const selectHubGrnErrorLog = createSelector(hubGrnErrorLog, (hubGrnErrorLogSelect) => hubGrnErrorLogSelect)
export const selectHubGrnErrorLogLoading = createSelector(hubGrnErrorLogLoading, (hubGrnErrorLogLoadingSelect) => hubGrnErrorLogLoadingSelect)


const itemExpiredDetails = (state) => state.dashboard.itemExpiredDetails
const itemExpiredDetailsLoading = (state) => state.dashboard.itemExpiredDetailsLoading
export const selectItemExpiredDetails = createSelector(itemExpiredDetails, (itemExpiredDetailsSelect) => itemExpiredDetailsSelect)
export const selectItemExpiredDetailsLoading = createSelector(itemExpiredDetailsLoading, (itemExpiredDetailsLoadingSelect) => itemExpiredDetailsLoadingSelect)


const managementDashboard = (state) => state.dashboard.managementDashboard
const managementDashboardLoading = (state) => state.dashboard.managementDashboardLoading
export const selectManagementDashboard = createSelector(managementDashboard, (managementDashboardSelect) => managementDashboardSelect)
export const selectManagementDashboardLoading = createSelector(managementDashboardLoading, (managementDashboardLoadingSelect) => managementDashboardLoadingSelect)

