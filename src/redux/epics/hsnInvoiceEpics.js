import {
  ADD_HSN_START_ACTION,ADD_BOX_WEIGHT_START_ACTION
} from '../actions/hsnInvoice/hsnActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
 addHsnSuccessAction,
 addHsnFailAction,
 addBoxWeightSuccessAction,
 addBoxWeightFailAction
} from '../actions/hsnInvoice/hsnActions'
import { addHsnRequest , addBoxWeightRequest } from '../../api/hsnInvoiceRequests'


//Add HSN API

export const addHsnStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_HSN_START_ACTION),
        debounceTime(4000),
        switchMap((action) =>
            addHsnRequest(action.payload).pipe(
                map((listResponse) => addHsnSuccessAction({insertHsn: listResponse.response})),
                catchError((error) => of(addHsnFailAction({error: error}))),
            )
        )
    )




    // Edit Invoice Header API

    export const addBoxWeightStartEpic = (action$) =>
        action$.pipe(
            ofType(ADD_BOX_WEIGHT_START_ACTION),
            debounceTime(4000),
            switchMap((action) =>
                addBoxWeightRequest(action.payload).pipe(
                    map((listResponse) => addBoxWeightSuccessAction({boxWeight: listResponse.response})),
                    catchError((error) => of(addBoxWeightFailAction({error: error}))),
                )
            )
        )
