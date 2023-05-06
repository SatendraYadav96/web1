import {GET_ITEM_CODE_START} from '../actions/revalidation/itemCodeActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {getItemCodeSuccessAction,getItemCodeFailAction} from '../actions/revalidation/itemCodeActions'
import { itemCodeRequest } from '../../api/revalidationRequest'



//ITEM CODE REPORT EPICS

export const getItemCodeStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_ITEM_CODE_START),
        debounceTime(4000),
        switchMap((action) =>
            itemCodeRequest(action.payload).pipe(
                map((listResponse) => getItemCodeSuccessAction({itemCodeList: listResponse.response})),
                catchError((error) => of(getItemCodeFailAction({error: error}))),
            )
        )
    )
