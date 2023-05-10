import {GET_ITEM_REVALIDATION_START} from '../actions/revalidation/itemRevalidationActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {getItemRevalidationSuccessAction,getItemRevalidationFailAction} from '../actions/revalidation/itemRevalidationActions'
import { itemRevalidationRequest } from '../../api/revalidationRequest'



//ITEM REVALIDATION REPORT EPICS

export const getItemRevalidationStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ITEM_REVALIDATION_START),
        debounceTime(4000),
        switchMap((action) =>
            itemRevalidationRequest(action.payload).pipe(
                map((listResponse) => getItemRevalidationSuccessAction({itemRevalidationList: listResponse.response})),
                catchError((error) => of(getItemRevalidationFailAction({error: error}))),
            )
        )
    )
