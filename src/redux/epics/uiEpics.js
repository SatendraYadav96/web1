import { ofType } from 'redux-observable'
import { catchError, debounceTime, map, of, switchMap } from 'rxjs'
import { UI_MENU_START_ACTION } from '../actions/ui/uiActionConstants'
import { menuRequest } from '../../api/uiRequests'
import { uiMenuFailAction, uiMenuSuccessAction } from '../actions/ui/uiActions'

export const loadMenuStartEpic = (action$) =>
  action$.pipe(
    ofType(UI_MENU_START_ACTION),
    debounceTime(4000),
    switchMap((action) =>
      menuRequest(action.payload).pipe(
        map((menuResponse) => uiMenuSuccessAction({ menus: menuResponse.response })),
        catchError((error) => of(uiMenuFailAction({ error: error }))),
      ),
    ),
  )
