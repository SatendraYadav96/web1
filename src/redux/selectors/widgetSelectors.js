import { createSelector } from 'reselect'

const lovs = (state) => state.widget.lovs

export const selectLovs = createSelector(lovs, (lovsSelect) => lovsSelect)
