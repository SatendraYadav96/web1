import { ofType } from 'redux-observable'
import { catchError, debounceTime, map, of, switchMap } from 'rxjs'
import {lovRequest} from '../../api/uiRequests'
import {GET_LOV_START} from "../actions/widget/widgetActionConstants";
import {getLOVFailAction, getLOVSuccessAction} from "../actions/widget/widgetActions";

export const getLOVStartEpic = (action$) =>
  action$.pipe(
    ofType(GET_LOV_START),
    debounceTime(4000),
    switchMap((action) =>
        lovRequest(action.payload).pipe(
        map((lovResponse) =>
            getLOVSuccessAction({ type: action.payload.type, lovs: lovResponse.response })),
        catchError((error) => of(getLOVFailAction({ error: error }))),
      ),
    ),
  )
