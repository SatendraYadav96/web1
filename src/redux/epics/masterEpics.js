import {GET_VENDOR_START, ADD_VENDOR_START, EDIT_VENDOR_START, VENDOR_BY_ID_START, GET_COST_CENTER_START} from '../actions/master/masterActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getVendorSuccessAction, getVendorFailAction, addVendorSuccessAction, addVendorFailAction,
    editVendorSuccessAction, editVendorFailAction, getVendorByIdFailAction, getVendorByIdSuccessAction, getCostCenterSuccessAction, getCostCenterFailAction
} from '../actions/master/masterActions'
import {vendorRequest, addVendorRequest, editVendorRequest, vendorByIdRequest, costCenterRequest} from '../../api/masterRequests'



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


export const getVendorByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(VENDOR_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            vendorByIdRequest(action.payload).pipe(
                map((listResponse) => getVendorByIdSuccessAction({vendorById: listResponse.response})),
                catchError((error) => of(getVendorByIdFailAction({error: error}))),
            )
        )
    )

export const getCostCenterStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_COST_CENTER_START),
        debounceTime(4000),
        switchMap((action) =>
            costCenterRequest(action.payload).pipe(
                map((listResponse) => getCostCenterSuccessAction({costCenterList: listResponse.response})),
                catchError((error) => of(getCostCenterFailAction({error: error}))),
            )
        )
    )



