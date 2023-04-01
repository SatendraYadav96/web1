import { createSelector } from 'reselect'

const menus = (state) => state.ui.menus
const title = (state) => state.ui.pageTitle

export const selectMenus = createSelector(menus, (menusSelect) => menusSelect)
export const selectPageTitle = createSelector(title, (titleSelect) => titleSelect)
