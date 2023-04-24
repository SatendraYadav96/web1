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

//DIVISION DROPDOWN
const divisionDropdown = (state) => state.dropDown.divisionDropdown
const divisionDropdownLoading = (state) => state.dropDown.divisionDropdownLoading

export const selectDivisionDropdown = createSelector(divisionDropdown, (divisionDropdownSelect) => divisionDropdownSelect)
export const selectDivisionDropdownLoading = createSelector(divisionDropdownLoading, (divisionDropdownLoadingSelect) => divisionDropdownLoadingSelect)

//TEAM DROPDOWN
const teamDropdown = (state) => state.dropDown.teamDropdown
const teamDropdownLoading = (state) => state.dropDown.teamDropdownLoading

export const selectTeamDropdown = createSelector(teamDropdown, (teamDropdownSelect) => teamDropdownSelect)
export const selectTeamDropdownLoading = createSelector(teamDropdownLoading, (teamDropdownLoadingSelect) => teamDropdownLoadingSelect)

//COST CENTER DROPDOWN
const costCenterDropdown = (state) => state.dropDown.costCenterDropdown
const costCenterDropdownLoading = (state) => state.dropDown.costCenterDropdownLoading

export const selectCostCenterDropdown = createSelector(costCenterDropdown, (costCenterDropdownSelect) => costCenterDropdownSelect)
export const selectCostCenterDropdownLoading = createSelector(costCenterDropdownLoading, (costCenterDropdownLoadingSelect) => costCenterDropdownLoadingSelect)
