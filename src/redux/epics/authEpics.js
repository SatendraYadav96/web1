import {
    LOAD_USER_PROFILE_START_ACTION,
    LOGIN_START_ACTION, LOGOUT_START_ACTION, SET_PASSWORD_START_ACTION,
} from '../actions/auth/authActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    loadUserProfileFailAction,
    loadUserProfileSuccessAction,
    loginFailAction,

    loginSuccessAction, logoutSuccessAction, setPasswordFailAction, setPasswordSuccessAction,
} from '../actions/auth/authActions'
import {authRequest, logoutRequest, setPasswordRequest, userProfileRequest} from '../../api/authRequests'
import {pendingDispatchFailAction, pendingDispatchSuccessAction} from "../actions/dashboard/dashboardActions";

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
        // map((profileResponse,profile) =>
        //   loadUserProfileSuccessAction({ profile: profileResponse.response }),
        //     console.log(profile)
        // ),
        // catchError((error) => of(loadUserProfileFailAction({ error: error }))),

          map((listResponse) => {
              console.log(listResponse.response)

              return loadUserProfileSuccessAction({profileInfo: listResponse.response})}),
          catchError((error) => of(loadUserProfileFailAction({error: error}))),
          // console.log(listResponse.response)
    ),
    ),
  )


export const logoutStartEpic = (action$) =>
    action$.pipe(
        ofType(LOGOUT_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            logoutRequest(action.payload).pipe(
                map((authResponse) => {
                    console.log(authResponse.response)
                    return logoutSuccessAction({ auth: null })}),
                catchError((error) => of(loginFailAction({ error: error }))),
            ),
        ),
    )






export const setPasswordStartEpic = (action$) =>
    action$.pipe(
        ofType(SET_PASSWORD_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            setPasswordRequest(action.payload).pipe(
                map((authResponse) => {
                    console.log(authResponse.response)
                    return setPasswordSuccessAction({ auth: authResponse.response })}),
                catchError((error) => of(setPasswordFailAction({ error: error }))),
            ),
        ),
    )
