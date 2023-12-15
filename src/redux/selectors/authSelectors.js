import { createSelector } from 'reselect'

const auth = (state) => state.auth
const authInfo = (state) => state.auth.authInfo
const loggedInfo = (state) => state.auth.loggedIn
const profileInfo = (state) => state.auth.profileInfo


const profileInfoLoading = (state) => state.auth.profileLoading


export const selectAuthInfo = createSelector(authInfo, (authInfoSelect) => authInfoSelect)
export const selectLoggedIn = createSelector(loggedInfo, (loggedInfoSelect) => loggedInfoSelect)



export const selectProfileInfo = createSelector(

  profileInfo,
  (profileInfoSelect) => profileInfoSelect,
)


export const selectProfileInfoLoading = createSelector(

    profileInfoLoading,
    (loadingSelection) => loadingSelection,
)
