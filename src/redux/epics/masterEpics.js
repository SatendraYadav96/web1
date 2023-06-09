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
    ADD_SAMPLES_START,
    GET_BUISNESS_UNIT_START,
    ADD_BUISNESS_UNIT_START,
    EDIT_BUISNESS_UNIT_START,
    BUISNESS_UNIT_BY_ID_START,
    GET_TEAM_START,
    TEAM_BY_ID_START,
    EDIT_TEAM_START,
    ADD_TEAM_START,
    GET_USER_START,
    EDIT_USER_START,
    USER_BY_ID_START,
    ADD_USER_START,
    EDIT_BRAND_START,
    BRAND_BY_ID_START,
    ADD_BRAND_START, GET_BRAND_START, GET_FF_START, EDIT_FF_START, FF_BY_ID_START, ADD_FF_START, FF_HISTORY_BY_ID_START
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
    addBuisnessUnitSuccessAction,
    addBuisnessUnitFailAction,
    editBuisnessUnitSuccessAction,
    editBuisnessUnitFailAction,
    getBuisnessUnitByIdSuccessAction,
    getBuisnessUnitByIdFailAction,
    getTeamSuccessAction,
    getTeamFailAction,
    getTeamByIdSuccessAction,
    getTeamByIdFailAction,
    editTeamSuccessAction,
    editTeamFailAction,
    addTeamSuccessAction,
    addTeamFailAction,
    getUserSuccessAction,
    getUserFailAction,
    editUserSuccessAction,
    editUserFailAction,
    getUserByIdSuccessAction,
    getUserByIdFailAction,
    addUserSuccessAction,
    addUserFailAction,
    addBrandSuccessAction,
    addBrandFailAction,
    editBrandSuccessAction,
    editBrandFailAction,
    getBrandByIdSuccessAction,
    getBrandByIdFailAction,
    getBrandSuccessAction,
    getBrandFailAction,
    getFFSuccessAction,
    getFFFailAction,
    editFFSuccessAction,
    editFFFailAction,
    getFFByIdSuccessAction,
    getFFByIdFailAction,
    addFFSuccessAction,
    addFFFailAction,
    getFFHistoryByIdSuccessAction, getFFHistoryByIdFailAction
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
    addBuisnessUnitRequest,
    editBuisnessUnitRequest,
    buisnessUnitByIdRequest,
    teamRequest,
    teamByIdRequest,
    editTeamRequest,
    addTeamRequest,
    userRequest,
    editUserRequest,
    userByIdRequest,
    addUserRequest,
    addBrandRequest,
    editBrandRequest,
    brandByIdRequest,
    brandRequest,
    ffRequest,
    editFFRequest,
    ffByIdRequest, addFFRequest, ffHistoryByIdRequest
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


//TEAM
export const getTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            teamRequest(action.payload).pipe(
                map((listResponse) => getTeamSuccessAction({teamList: listResponse.response})),
                catchError((error) => of(getTeamFailAction({error: error}))),
            )
        )
    )


// ADD TEAM

export const addTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            addTeamRequest(action.payload).pipe(
                map((listResponse) => addTeamSuccessAction({insertTeam: listResponse.response})),
                catchError((error) => of(addTeamFailAction({error: error}))),
            )
        )
    )


//EDIT TEAMS
export const editTeamStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_TEAM_START),
        debounceTime(4000),
        switchMap((action) =>
            editTeamRequest(action.payload).pipe(
                map((listResponse) => editTeamSuccessAction({editTeam: listResponse.response})),
                catchError((error) => of(editTeamFailAction({error: error}))),
            )
        )
    )


export const getTeamByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(TEAM_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            teamByIdRequest(action.payload).pipe(
                map((listResponse) => getTeamByIdSuccessAction({teamById: listResponse.response})),
                catchError((error) => of(getTeamByIdFailAction({error: error}))),
            )
        )
    )


//USER
export const getUserStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_USER_START),
        debounceTime(4000),
        switchMap((action) =>
            userRequest(action.payload).pipe(
                map((listResponse) => getUserSuccessAction({userList: listResponse.response})),
                catchError((error) => of(getUserFailAction({error: error}))),
            )
        )
    )


// ADD USER

export const addUserStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_USER_START),
        debounceTime(4000),
        switchMap((action) =>
            addUserRequest(action.payload).pipe(
                map((listResponse) => addUserSuccessAction({insertUser: listResponse.response})),
                catchError((error) => of(addUserFailAction({error: error}))),
            )
        )
    )


//EDIT USER
export const editUserStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_USER_START),
        debounceTime(4000),
        switchMap((action) =>
            editUserRequest(action.payload).pipe(
                map((listResponse) => editUserSuccessAction({editUser: listResponse.response})),
                catchError((error) => of(editUserFailAction({error: error}))),
            )
        )
    )

export const getUserByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(USER_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            userByIdRequest(action.payload).pipe(
                map((listResponse) => getUserByIdSuccessAction({userById: listResponse.response})),
                catchError((error) => of(getUserByIdFailAction({error: error}))),
            )
        )
    )


//BRAND
export const getBrandStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_BRAND_START),
        debounceTime(4000),
        switchMap((action) =>
            brandRequest(action.payload).pipe(
                map((listResponse) => getBrandSuccessAction({brandList: listResponse.response})),
                catchError((error) => of(getBrandFailAction({error: error}))),
            )
        )
    )


// ADD USER

export const addBrandStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_BRAND_START),
        debounceTime(4000),
        switchMap((action) =>
            addBrandRequest(action.payload).pipe(
                map((listResponse) => addBrandSuccessAction({insertBrand: listResponse.response})),
                catchError((error) => of(addBrandFailAction({error: error}))),
            )
        )
    )


//EDIT USER
export const editBrandStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_BRAND_START),
        debounceTime(4000),
        switchMap((action) =>
            editBrandRequest(action.payload).pipe(
                map((listResponse) => editBrandSuccessAction({editBrand: listResponse.response})),
                catchError((error) => of(editBrandFailAction({error: error}))),
            )
        )
    )

export const getBrandByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(BRAND_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            brandByIdRequest(action.payload).pipe(
                map((listResponse) => getBrandByIdSuccessAction({brandById: listResponse.response})),
                catchError((error) => of(getBrandByIdFailAction({error: error}))),
            )
        )
    )


//BRAND
export const getFFStartEpic = (action$) =>
    action$.pipe(
        ofType(GET_FF_START),
        debounceTime(4000),
        switchMap((action) =>
            ffRequest(action.payload).pipe(
                map((listResponse) => getFFSuccessAction({ffList: listResponse.response})),
                catchError((error) => of(getFFFailAction({error: error}))),
            )
        )
    )


// ADDFF
export const addFFStartEpic = (action$) =>
    action$.pipe(
        ofType(ADD_FF_START),
        debounceTime(4000),
        switchMap((action) =>
            addFFRequest(action.payload).pipe(
                map((listResponse) => addFFSuccessAction({insertFF: listResponse.response})),
                catchError((error) => of(addFFFailAction({error: error}))),
            )
        )
    )


//EDITFF
export const editFFStartEpic = (action$) =>
    action$.pipe(
        ofType(EDIT_FF_START),
        debounceTime(4000),
        switchMap((action) =>
            editFFRequest(action.payload).pipe(
                map((listResponse) => editFFSuccessAction({editFF: listResponse.response})),
                catchError((error) => of(editFFFailAction({error: error}))),
            )
        )
    )

//FF BY ID
export const getFFByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(FF_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            ffByIdRequest(action.payload).pipe(
                map((listResponse) => getFFByIdSuccessAction({ffById: listResponse.response})),
                catchError((error) => of(getFFByIdFailAction({error: error}))),
            )
        )
    )


//FF_HISTORY BY ID
export const getFFHistoryByIdStartEpic = (action$) =>
    action$.pipe(
        ofType(FF_HISTORY_BY_ID_START),
        debounceTime(4000),
        switchMap((action) =>
            ffHistoryByIdRequest(action.payload).pipe(
                map((listResponse) => getFFHistoryByIdSuccessAction({ffHistoryById: listResponse.response})),
                catchError((error) => of(getFFHistoryByIdFailAction({error: error}))),
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
