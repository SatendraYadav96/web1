import { createSelector } from 'reselect'

//BUSINESS UNIT DROPDOWN
const buDropdown = (state) => state.dropDown.buDropdown
const buDropdownLoading = (state) => state.dropDown.buDropdownLoading



export const selectBuDropdown = createSelector(buDropdown, (buDropdownSelect) => buDropdownSelect)
export const selectBuDropdownLoading = createSelector(buDropdownLoading, (buDropdownLoadingSelect) => buDropdownLoadingSelect)
