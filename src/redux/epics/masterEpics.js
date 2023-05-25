import {
    GET_VENDOR_START,
    ADD_VENDOR_START,
    EDIT_VENDOR_START,
    VENDOR_BY_ID_START,
    GET_COST_CENTER_START,
    EDIT_COST_CENTER_START,
    GET_COST_CENTER_BY_ID_START,
    GET_SAMPLES_START,
    EDIT_SAMPLES_START,
    GET_SAMPLES_BY_ID_START,
    ADD_COST_CENTER_START,
    ADD_SAMPLES_START, GET_BUISNESS_UNIT_START, ADD_BUISNESS_UNIT_START, EDIT_BUISNESS_UNIT_START, BUISNESS_UNIT_BY_ID_START
} from '../actions/master/masterActionConstants'
import { ofType } from 'redux-observable'
import { catchError, debounceTime, from, map, of, switchMap } from 'rxjs'
import {
    getVendorSuccessAction,
    getVendorFailAction,
    addVendorSuccessAction,
    addVendorFailAction,
    editVendorSuccessAction,
    editVendorFailAction,
    getVendorByIdFailAction,
    getVendorByIdSuccessAction,
    getCostCenterSuccessAction,
    getCostCenterFailAction,
    editCostCenterSuccessAction,
    editCostCenterFailAction,
    getCostCenterByIdSuccessAction,
    getCostCenterByIdFailAction,
    getSamplesSuccessAction,
    getSamplesFailAction,
    editSamplesSuccessAction,
    getSamplesByIdSuccessAction,
    getSamplesByIdFailAction,
    editSamplesFailAction,
    addCostCenterSuccessAction,
    addCostCenterFailAction,
    addSamplesSuccessAction,
    addSamplesFailAction,
    getBuisnessUnitSuccessAction,
    getBuisnessUnitFailAction,
    addBuisnessUnitSuccessAction, addBuisnessUnitFailAction, editBuisnessUnitSuccessAction, editBuisnessUnitFailAction, getBuisnessUnitByIdSuccessAction, getBuisnessUnitByIdFailAction
} from '../actions/master/masterActions'
import {
    vendorRequest,
    addVendorRequest,
    editVendorRequest,
    vendorByIdRequest,
    costCenterRequest,
    editCostCenterRequest,
    costCenterByIdRequest,
    samplesRequest,
    editSamplesRequest,
    samplesByIdRequest,
    addCostCenterRequest,
    addSamplesRequest,
    buisnessUnitRequest,
    addBuisnessUnitRequest, editBuisnessUnitRequest, buisnessUnitByIdRequest
} from '../../api/masterRequests'



//BUISNESS UNIT

export const getBuisnessUnitStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_BUISNESS_UNIT_START),
        debounceTime(4000),
        switchMap((action) =>
            buisnessUnitRequest(action.payload).pipe(
                map((listResponse) => getBuisnessUnitSuccessAction({buisnessUnitList: listResponse.response})),
                catchError((error) => of(getBuisnessUnitFailAction({error: error}))),
            )
        )
    )


// ADD BUISNESS UNIT

export const addBuisnessUnitStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_BUISNESS_UNIT_START),
        debounceTime(4000),
        switchMap((action) =>
            addBuisnessUnitRequest(action.payload).pipe(
                map((listResponse) => addBuisnessUnitSuccessAction({insertBuisnessUnit: listResponse.response})),
                catchError((error) => of(addBuisnessUnitFailAction({error: error}))),
            )
        )
    )


//EDIT BUISNESS UNIT

export const editBuisnessUnitStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_BUISNESS_UNIT_START),
        debounceTime(4000),
        switchMap((action) =>
            editBuisnessUnitRequest(action.payload).pipe(
                map((listResponse) => editBuisnessUnitSuccessAction({editBuisnessUnit: listResponse.response})),
                catchError((error) => of(editBuisnessUnitFailAction({error: error}))),
            )
        )
    )


export const getBuisnessUnitByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(BUISNESS_UNIT_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            buisnessUnitByIdRequest(action.payload).pipe(
                map((listResponse) => getBuisnessUnitByIdSuccessAction({buisnessUnitById: listResponse.response})),
                catchError((error) => of(getBuisnessUnitByIdFailAction({error: error}))),
            )
        )
    )



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

// GET COST CENTER
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

// EDIT COST CENTER
export const editCostCenterStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_COST_CENTER_START),
        debounceTime(4000),
        switchMap((action) =>
          editCostCenterRequest(action.payload).pipe(
                map((listResponse) => editCostCenterSuccessAction({editCostCenter: listResponse.response})),
                catchError((error) => of(editCostCenterFailAction({error: error}))),
            )
        )
    )


export const getCostCenterByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_COST_CENTER_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
          costCenterByIdRequest(action.payload).pipe(
                map((listResponse) => getCostCenterByIdSuccessAction({costCenterById: listResponse.response})),
                catchError((error) => of(getCostCenterByIdFailAction({error: error}))),
            )
        )
    )

// ADD COST CENTER
export const addCostCenterStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_COST_CENTER_START),
        debounceTime(4000),
        switchMap((action) =>
            addCostCenterRequest(action.payload).pipe(
                map((listResponse) => addCostCenterSuccessAction({insertCostCenter: listResponse.response})),
                catchError((error) => of(addCostCenterFailAction({error: error}))),
            )
        )
    )


// GET SAMPLES
export const getSamplesStartEpic = (action$) =>
  action$.pipe(
    ofType(GET_SAMPLES_START),
    debounceTime(4000),
    switchMap((action) =>
      samplesRequest(action.payload).pipe(
        map((listResponse) => getSamplesSuccessAction({samplesList: listResponse.response})),
        catchError((error) => of(getSamplesFailAction({error: error}))),
      )
    )
  )

// EDIT SAMPLES
export const editSamplesStartEpic = (action$) =>
  action$.pipe(
    ofType(EDIT_SAMPLES_START),
    debounceTime(4000),
    switchMap((action) =>
      editSamplesRequest(action.payload).pipe(
        map((listResponse) => editSamplesSuccessAction({editSamples: listResponse.response})),
        catchError((error) => of(editSamplesFailAction({error: error}))),
      )
    )
  )


export const getSamplesByIdStartEpic = (action$) =>
  action$.pipe(
    ofType(GET_SAMPLES_BY_ID_START),
    debounceTime(4000),
    switchMap((action) =>
      samplesByIdRequest(action.payload).pipe(
        map((listResponse) => getSamplesByIdSuccessAction({samplesById: listResponse.response})),
        catchError((error) => of(getSamplesByIdFailAction({error: error}))),
      )
    )
  )

// ADD SAMPLES
export const addSamplesStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_SAMPLES_START),
        debounceTime(4000),
        switchMap((action) =>
            addSamplesRequest(action.payload).pipe(
                map((listResponse) => addSamplesSuccessAction({insertSamples: listResponse.response})),
                catchError((error) => of(addSamplesFailAction({error: error}))),
            )
        )
    )
