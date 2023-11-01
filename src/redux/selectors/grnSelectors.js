import { createSelector } from 'reselect'

const grn = (state) => state.grn
const unacknowledged = (state) => state.grn.unacknowledged
const rejectAcknowledge = (state) => state.grn.rejectAcknowledge
const approveAcknowledge = (state) => state.grn.approveAcknowledge
const grnUpload = (state) => state.grn.grnUpload
const refreshAcknowledge = (state) => state.grn.refreshAcknowledge

export const selectGRN = createSelector(grn, (grnSelect) => grnSelect)

export const selectRejectAcknowledge = createSelector(rejectAcknowledge, (grnSelect) => grnSelect)

export const selectUnacknowledged = createSelector(unacknowledged, (grnSelect) => grnSelect)

export const selectApproveAcknowledge = createSelector(approveAcknowledge, (grnSelect) => grnSelect)

export const selectGrnUpload = createSelector(grnUpload, (grnSelect) => grnSelect)

export const selectRefreshAcknowledge = createSelector(refreshAcknowledge, (grnSelect) => grnSelect)
