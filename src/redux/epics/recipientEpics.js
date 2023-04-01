import { ofType } from 'redux-observable'
import { catchError, debounceTime, map, of, switchMap } from 'rxjs'
import {RECIPIENTS_TO_ALLOCATE_LIST_START} from '../actions/allocation/allocationActionConstants'
import {recipientsToAllocateListFailAction, recipientsToAllocateListSuccessAction} from '../actions/allocation/allocationActions'
import {recipientsForTeam} from '../../api/recipientRequests'

export const recipientToAllocateListStartEpic = (action$) =>
  action$.pipe(
    ofType(RECIPIENTS_TO_ALLOCATE_LIST_START),
    debounceTime(4000),
    switchMap((action) =>
        recipientsForTeam(action.payload).pipe(
        map((recipientsResponse) => recipientsToAllocateListSuccessAction({ recipients: recipientsResponse.response })),
        catchError((error) => of(recipientsToAllocateListFailAction({ error: error }))),
      ),
    ),
  )
