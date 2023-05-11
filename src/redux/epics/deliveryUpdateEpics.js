import {ofType} from "redux-observable";
import {DELIVERY_UPDATE_START} from "../actions/dispatchInvoice/deliveryUpdateActionConstants";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {deliveryUpdateRequest} from "../../api/invoiceRequests";
import {deliveryUpdateFailAction, deliveryUpdateSuccessAction} from "../actions/dispatchInvoice/deliveryUpdateAction";

export const deliveryUpdateStartEpic = (action$) =>
    action$.pipe(
        ofType(DELIVERY_UPDATE_START),
        debounceTime(4000),
        switchMap((action) =>
            deliveryUpdateRequest(action.payload).pipe(
                map((listResponse) => deliveryUpdateSuccessAction({deliveryUpdateList: listResponse.response})),
                catchError((error) => of(deliveryUpdateFailAction({error: error}))),
            )
        )
    )
