import { createSelector } from 'reselect'

//BUSINESS UNIT DROPDOWN
const buDropdown = (state) => state.dropDown.buDropdown
const buDropdownLoading = (state) => state.dropDown.buDropdownLoading


export const selectBuDropdown = createSelector(buDropdown, (buDropdownSelect) => buDropdownSelect)
export const selectBuDropdownLoading = createSelector(buDropdownLoading, (buDropdownLoadingSelect) => buDropdownLoadingSelect)

//BRAND DROPDOWN
const brandDropdown = (state) => state.dropDown.brandDropdown
const brandDropdownLoading = (state) => state.dropDown.brandDropdownLoading

export const selectBrandDropdown = createSelector(brandDropdown, (brandDropdownSelect) => brandDropdownSelect)
export const selectBrandDropdownLoading = createSelector(brandDropdownLoading, (brandDropdownLoadingSelect) => brandDropdownLoadingSelect)
