import {
  LOAD_USER_PROFILE_START_ACTION,
  LOGIN_START_ACTION,
} from '../actions/auth/authActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
  loadUserProfileFailAction,
  loadUserProfileSuccessAction,
  loginFailAction,

  loginSuccessAction,
} from '../actions/auth/authActions'
import { authRequest, userProfileRequest } from '../../api/authRequests'

export const authStartEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_START_ACTION),
    debounceTime(4000),
    switchMap((action) =>
      authRequest(action.payload).pipe(
        map((authResponse) => {
            console.log(authResponse.response)
            return loginSuccessAction({ auth: authResponse.response })}),
        catchError((error) => of(loginFailAction({ error: error }))),
      ),
    ),
  )





export const userProfileStartEpic = (action$) =>
  action$.pipe(
    ofType(LOAD_USER_PROFILE_START_ACTION),
    debounceTime(4000),
    switchMap((action) =>
      userProfileRequest(action.payload).pipe(
        map((profileResponse) =>
          loadUserProfileSuccessAction({ profile: profileResponse.response }),
        ),
        catchError((error) => of(loadUserProfileFailAction({ error: error }))),
    ),
    ),
  )
