import {GET_VENDOR_START,ADD_VENDOR_START,EDIT_VENDOR_START,} from '../actions/master/masterActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
getVendorSuccessAction,getVendorFailAction,addVendorSuccessAction,addVendorFailAction,
editVendorSuccessAction,editVendorFailAction,} from '../actions/master/masterActions'
import { vendorRequest,addVendorRequest , editVendorRequest,} from '../../api/masterRequests'



//VENDOR

export const getVendorStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_VENDOR_START),
        debounceTime(4000),
        switchMap((action) =>
            vendorRequest(action.payload).pipe(
                map((listResponse) => getVendorSuccessAction({vendorList: listResponse.response})),
                catchError((error) => of(getVendorFailAction({error: error}))),
            )
        )
    )



// ADD VENDOR

export const addVendorStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_VENDOR_START),
        debounceTime(4000),
        switchMap((action) =>
            addVendorRequest(action.payload).pipe(
                map((listResponse) => addVendorSuccessAction({insertVendor: listResponse.response})),
                catchError((error) => of(addVendorFailAction({error: error}))),
            )
        )
    )


//EDIT VENDOR

export const editVendorStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_VENDOR_START),
        debounceTime(4000),
        switchMap((action) =>
            editVendorRequest(action.payload).pipe(
                map((listResponse) => editVendorSuccessAction({editVendor: listResponse.response})),
                catchError((error) => of(editVendorFailAction({error: error}))),
            )
        )
    )




