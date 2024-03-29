import { createReducer } from './reducerUtils'
import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_DIFFERENTIAL,
    ALLOCATE_TO_TEAM,
    ALLOCATION_PAGE_RESET,
    DELETE_SPECIAL_ALLOCATION_FAIL,
    DELETE_SPECIAL_ALLOCATION_SUCCESS,
    EDIT_SPECIAL_PLAN_FAIL,
    EDIT_SPECIAL_PLAN_SUCCESS,
    GET_ACTIVE_USERS_FAIL,
    GET_ACTIVE_USERS_SUCCESS,
    GET_ALLOCATION_STATUS_DROPDOWN_FAIL,
    GET_ALLOCATION_STATUS_DROPDOWN_SUCCESS,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    GET_BLOCKED_RECIPIENT_FAIL,
    GET_BLOCKED_RECIPIENT_SUCCESS,
    GET_DOWNLOAD_ALLOCATION_FAIL,
    GET_DOWNLOAD_ALLOCATION_SUCCESS,
    GET_MULTIPLE_ALLOCATION_DOWNLOAD_FAIL,
    GET_MULTIPLE_ALLOCATION_DOWNLOAD_SUCCESS,
    GET_SPECIAL_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_SPECIAL_ALLOCATIONS_FOR_PLAN_START,
    GET_SPECIAL_ALLOCATIONS_FOR_PLAN_SUCCESS,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START,
    GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_SUCCESS,
    MONTHLY_ALLOCATION_FAIL,
    MONTHLY_ALLOCATION_START,
    MONTHLY_ALLOCATION_SUCCESS,
    MONTHLY_COMMON_ALLOCATION_SAVE_FAIL,
    MONTHLY_COMMON_ALLOCATION_SAVE_START,
    MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_COMMON_TEAM_FAIL,
    MONTHLY_COMMON_TEAM_SUCCESS,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_DIFFERENTIAL_TEAM_FAIL,
    MONTHLY_DIFFERENTIAL_TEAM_SUCCESS,
    MULTIPLE_ALLOCATION_UPLOAD_FAIL, MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_FAIL,
    MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_START, MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_SUCCESS,
    MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_FAIL,
    MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_START,
    MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_SUCCESS,
    MULTIPLE_ALLOCATION_UPLOAD_START,
    MULTIPLE_ALLOCATION_UPLOAD_SUCCESS, MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_FAIL, MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_START, MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_SUCCESS,
    RECIPIENTS_TO_ALLOCATE_LIST_FAIL,
    RECIPIENTS_TO_ALLOCATE_LIST_START,
    SEARCH_SPECIAL_PLAN_FAIL,
    SEARCH_SPECIAL_PLAN_SUCCESS,
    SPECIAL_ALLOCATE_TO_DIFFERENTIAL,
    SPECIAL_ALLOCATION_FAIL,
    SPECIAL_ALLOCATION_START,
    SPECIAL_ALLOCATION_SUCCESS,
    SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START,
    SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    SPECIAL_DIFFERENTIAL_TEAM_FAIL,
    SPECIAL_DIFFERENTIAL_TEAM_SUCCESS,
    SUBMIT_MONTHLY_ALLOCATION_FAIL,
    SUBMIT_MONTHLY_ALLOCATION_START,
    SUBMIT_MONTHLY_ALLOCATION_SUCCESS,
    SUBMIT_SPECIAL_ALLOCATION_FAIL,
    SUBMIT_SPECIAL_ALLOCATION_START,
    SUBMIT_SPECIAL_ALLOCATION_SUCCESS,
    SUBMIT_VIRTUAL_ALLOCATION_FAIL,
    SUBMIT_VIRTUAL_ALLOCATION_START,
    SUBMIT_VIRTUAL_ALLOCATION_SUCCESS,
    VIRTUAL_ALLOCATE_TO_DIFFERENTIAL,
    VIRTUAL_ALLOCATE_TO_TEAM,
    VIRTUAL_ALLOCATION_FAIL,
    VIRTUAL_ALLOCATION_START,
    VIRTUAL_ALLOCATION_SUCCESS,
    VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL,
    VIRTUAL_COMMON_ALLOCATION_SAVE_START,
    VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS,
    VIRTUAL_COMMON_TEAM_FAIL,
    VIRTUAL_COMMON_TEAM_SUCCESS,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START,
    VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    VIRTUAL_DIFFERENTIAL_TEAM_FAIL,
    VIRTUAL_DIFFERENTIAL_TEAM_SUCCESS,
} from "../actions/allocation/allocationActionConstants";
const initialState = {
    planSubmitted: false,
    items: [],
    allocations: [],
    itemsLoading: false,
    recipientAllocations: [],
    recipientAllocationsLoading: false,
    allocationsLoading: false,
    commonAllocationDone: new Date(),
    plan: [],
    monthlyCommonTeam:{},
    monthlyCommonTeamKeys: [],
    monthlyCommonTeamLoading:false,
    monthlyCommonAllocationSave: [],
    monthlyCommonAllocationSaveSuccess: false,
    monthlyDifferentialTeam:[],
    monthlyDifferentialAllocationSave:[],
    monthlyDifferentialAllocationSaveSuccess:false,
    error: null,
    virtualCommonAllocationSave: [],
    virtualCommonAllocationSaveSuccess: false,
    getDownloadAllocation: [],
    getRecipientBlocked: [],
    getActiveUsers: [],
    virtualAllocation: [],
    virtualPlanSubmitted: false,
    virtualItemLoading: false,
    searchSpecialPlan: [],
    virtualCommonTeam:{},
    virtualCommonTeamKeys: [],
    virtualCommonTeamLoading:false,
    virtualAllocationForPlan:[],
    virtualAllocationLoading: false,
    virtualCommonAllocationDone: new Date(),
    virtualDifferentialTeam:[],
    virtualDifferentialAllocationSave:[],
    virtualDifferentialAllocationSaveSuccess:false,
    submitMonthlyAllocation: [],
    submitMonthlyAllocationSuccess: false,
    submitVirtualAllocation: [],
    submitVirtualAllocationSuccess: false,
    submitSpecialAllocation: [],
    submitSpecialAllocationSuccess: false,
    getAllocationStatusDropdown: [],
    // getMultipleAllocationDownload: null,
    getMultipleAllocationExcelDownload: [],
    editSpecialPlan: [],
    specialAllocation: [],
    specialPlanSubmitted: false,
    specialItemLoading: false,
    specialAllocationForPlan:[],
    specialAllocationLoading: false,
    specialDifferentialTeam:[],
    specialDifferentialAllocationSave:[],
    specialDifferentialAllocationSaveSuccess: false,
    deleteSpecialAllocation:[],
    multipleAllocationUpload: [],
    multipleAllocationUploadSuccess: false,
    multipleAllocationUploadLoading:false,
    multipleAllocationUploadSpecial: [],
    multipleAllocationUploadSpecialSuccess: false,
    multipleAllocationUploadSpecialLoading:false,
    multipleAllocationUploadMonthly: [],
    multipleAllocationUploadMonthlySuccess: false,
    multipleAllocationUploadMonthlyLoading:false,
    multipleAllocationUploadVirtual: [],
    multipleAllocationUploadVirtualSuccess: false,
    multipleAllocationUploadVirtualLoading:false,
}

const allocationForPlanStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        allocations: [],
        allocationsLoading: true,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}



const allocationForPlanSuccessReducer = (state = initialState, payload) => {
    let itemList = payload.selectedItems.map(item => item.itemID)
    let costCenterList = [];
    let inventoryList = [];
    payload.selectedItems.forEach(item => costCenterList[item.itemID] = item.costCenterID);
    payload.selectedItems.forEach(item => inventoryList[item.itemID] = item.inventoryId);
    console.log(costCenterList);
    const allocatedItems = payload.allocations.allocations
    if (allocatedItems.length !== 0) {
        let items = allocatedItems.filter(item => itemList.indexOf(item.itemID) > -1)
        itemList = itemList.concat(items)
    }
    const allocations = []
    console.log(payload.allocations, state)
    state.items.forEach(item => item["balance"] =  (item.qtyReceived- item.qtyDispatched - item.quantityAllocated))
    state.items.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.allocations.teams,costCenter: costCenterList[item.itemID], inventoryId:inventoryList[item.itemID] })}})
    console.log(allocations)
    console.log(state.items)
    console.log(payload.selectedItems)
    return {
        ...state,
        allocationsLoading: false,
        allocations: allocations,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}

const allocationForPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        allocationsLoading: false,
        error: payload.error,
    }
}


const allocationPageResetReducer = (state = initialState, payload) => {
    return initialState
}

const monthlyAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        items: [],
        plan: {},
        itemsLoading: true,
        planSubmitted: false,
        error: null,
    }
}

const monthlyAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        plan: payload.plan,
        items: payload.items,
        itemsLoading: false,
        planSubmitted: payload.planSubmitted,
        error: null,
    }
}

const monthlyAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
        planSubmitted: false,
        itemsLoading: false,
    }
}

const recipientAllocationsSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        recipientAllocations: payload.recipientAllocations,
        error: null,
    }
}

const recipientAllocationsFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
    }
}


const allocateToTeamReducer = (state = initialState, payload) => {
    // let allocations = state.allocations
    const item = payload.item
    const team = payload.team
    const quantity = Number(payload.qty)
    console.log(team)
    console.log(typeof quantity)
    console.log(state)
    let monthlyCommonTeam = state.monthlyCommonTeam
    let totalAllocation = 0
    monthlyCommonTeam[team.team].forEach( t => {
            if (t.designationId === team.designationId) {
                totalAllocation = totalAllocation + t.recipientCount * quantity
                t.quantity = quantity
            }
        }
    )
    // let allocations = state.allocations
    // let totalAllocation = 0
    // state.allocations.forEach(allocation => {
    //     const i = allocation.item
    //     if (i.itemID === item.itemID) {
    //         const mappedTeams = allocation.teams.map(t => {
    //                 if (t.division.id === team.teamId) {
    //                     totalAllocation = totalAllocation + t.recipient * quantity
    //                     t.quantity = quantity
    //                 } else {
    //                     totalAllocation = totalAllocation + t.recipient * t.quantity
    //                 }
    //                 return t
    //             }
    //         )
    //         allocation.totalAllocation = totalAllocation
    //         allocation.teams = mappedTeams
    //     }

    // })
    return {
        ...state,
        // allocations: allocations,
        monthlyCommonTeam: monthlyCommonTeam,
        commonAllocationDone: new Date(),
        error: null
    }
}

const virtualAllocateToTeamReducer = (state = initialState, payload) => {
    const item = payload.item
    const team = payload.team
    const quantity = Number(payload.qty)
    console.log(team)
    console.log(typeof quantity)
    console.log(state)
    let virtualCommonTeam = state.virtualCommonTeam
    let totalAllocation = 0
    virtualCommonTeam[team.team].forEach( t => {
            if (t.designationId === team.designationId) {
                totalAllocation = totalAllocation + t.recipientCount * quantity
                t.quantity = quantity
            }
        }
    )

    return {
        ...state,
        virtualCommonTeam: virtualCommonTeam,
        virtualCommonAllocationDone: new Date(),
        error: null
    }
}

const allocateToDifferentialReducer = (state = initialState, payload) => {
    const item = payload.recipientID
    const quantity = Number(payload.qty)
    console.log(state)
    let teamForDifferential = state.monthlyDifferentialTeam
    let totalAllocation = 0
    teamForDifferential.forEach( t => {
            if (t.recipientID === item) {
                totalAllocation = totalAllocation +  quantity
                t.quantity = quantity
            }
        }
    )

    return {
        ...state,
        monthlyDifferentialTeam: teamForDifferential,
        commonAllocationDone: new Date(),
        error: null
    }
}

const virtualAllocateToDifferentialReducer = (state = initialState, payload) => {
    const item = payload.recipientID
    const quantity = Number(payload.qty)
    console.log(state)
    let teamForDifferential = state.virtualDifferentialTeam
    let totalAllocation = 0
    teamForDifferential.forEach( t => {
            if (t.recipientID === item) {
                totalAllocation = totalAllocation +  quantity
                t.quantity = quantity
            }
        }
    )

    return {
        ...state,
        virtualDifferentialTeam: teamForDifferential,
        virtualCommonAllocationDone: new Date(),
        error: null
    }
}


const specialAllocateToDifferentialReducer = (state = initialState, payload) => {
    const item = payload.recipientID
    const quantity = Number(payload.qty)

    console.log(state)

    let teamForDifferential = state.specialDifferentialTeam
    let totalAllocation = 0
    teamForDifferential.forEach( t => {
            if (t.recipientId === item) {
                totalAllocation = totalAllocation +  quantity
                t.quantity = quantity
            }
        }
    )
    console.log(teamForDifferential)
    return {
        ...state,
        specialDifferentialTeam: teamForDifferential,
        error: null
    }
}


const allocateToAllTeamsReducer = (state = initialState, payload) => {
    const item = payload.item
    const quantity = payload.quantity
    let allocations = state.allocations
    let totalAllocation = 0
    state.allocations.forEach(allocation => {
        const i = allocation.item
        if (i.ID_ITM_INV === item) {
            const mappedTeams = allocation.teams.map(t => {
                    totalAllocation = totalAllocation + t.RECIPIENTS * quantity
                    t.quantity = quantity
                    return t
                }
            )
            allocation.teams = mappedTeams
            allocation.totalAllocation = totalAllocation
        }
    })
    console.log(allocations)
    return {
        ...state,
        allocations: allocations,
        commonAllocationDone: new Date(),
        error: null
    }
}


const monthlyCommonTeamSuccessReducer = (state = initialState, payload) => {
    console.log(payload.quantityAllocated);
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.quantityAllocated.forEach(item => quantityAllocated[item.designationId] = item.allocatedQuantity)
    payload.monthlyCommonTeam.forEach(item => item["allocatedQuantity"] = quantityAllocated[item.designationId])
    payload.monthlyCommonTeam.forEach(item => {
            if(data[item.team]){
                let arr = []
                arr = data[item.team]
                arr[(arr.length-1)+1] = item
                data[item.team] = arr
            }else{
                let arr = [];
                arr[0] = item
                keysArr.push(item.team);
                data[item.team]= arr
            }
        }
    )
    console.log(payload.monthlyCommonTeam);
    console.log(data)
    console.log(keysArr)
    return {
        ...state,
        monthlyCommonTeam: data,
        monthlyCommonTeamKeys: keysArr,
        monthlyCommonTeamLoading: false

    }
}

const monthlyCommonTeamFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonTeam:[],
        monthlyCommonTeamLoading: false,
        error: payload.error,

    }
}

const monthlyCommonAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonAllocationSave:[],
        monthlyCommonAllocationSaveSuccess:false
    }
}

const monthlyCommonAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonAllocationSave:payload.monthlyCommonAllocationSave,
        monthlyCommonAllocationSaveSuccess:true
    }
}

const monthlyCommonAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonAllocationSave:[],
        monthlyCommonAllocationSaveSuccess:false,
        error: payload.error,
    }
}


const monthlyDifferentialAllocationSuccessReducer = (state = initialState, payload) => {
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.monthlyDifferentialQuantityAllocated.forEach(item => quantityAllocated[item.recipientId] = item.allocatedQuantity)
    payload.monthlyDifferentialTeam.forEach(item => item["allocatedQuantity"] = quantityAllocated[item.recipientID])
    console.log(payload.monthlyDifferentialTeam)
    return {
        ...state,
        monthlyDifferentialTeam:payload.monthlyDifferentialTeam

    }
}

const monthlyDifferentialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialTeam:[],
        error: payload.error,

    }
}

const monthlyDifferentialAllocationSaveStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialAllocationSave:[],
        monthlyDifferentialAllocationSaveSuccess: false
    }
}

const monthlyDifferentialAllocationSaveSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialAllocationSave:payload.monthlyDifferentialAllocationSave,
        monthlyDifferentialAllocationSaveSuccess: true
    }
}

const monthlyDifferentialAllocationSaveFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialAllocationSave:[],
        monthlyDifferentialAllocationSaveSuccess: false,
        error: payload.error,

    }
}

const virtualCommonAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonAllocationSaveSuccess: false,
        virtualCommonAllocationSave:[]

    }
}

const virtualCommonAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonAllocationSave:payload.virtualCommonAllocationSave,
        virtualCommonAllocationSaveSuccess: true
    }
}

const virtualCommonAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonAllocationSave:[],
        virtualCommonAllocationSaveSuccess: false,
        error: payload.error,

    }
}

const getDownloadAllocationSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        getDownloadAllocation: payload.getDownloadAllocation
    }
}

const getDownloadAllocationFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        getDownloadAllocation: [],
        error: payload.error
    }
}

const getRecipientBlockedSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        getRecipientBlocked: payload.getRecipientBlocked
    }
}

const getRecipientBlockedFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        getRecipientBlocked: [],
        error: payload.error
    }
}

const getActiveUsersSuccessReducer = (state = initialState, payload) => {
    return{
        ...state,
        getActiveUsers: payload.getActiveUsers
    }
}

const getActiveUsersFailReducer = (state = initialState, payload) => {
    return{
        ...state,
        getActiveUsers: [],
        error: payload.error
    }
}

const virtualAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualAllocation: [],
        virtualItemsLoading: true,
        virtualPlanSubmitted: false,
        error: null,
    }
}

const virtualAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualAllocation: payload.virtualAllocation,
        virtualPlanSubmitted: payload.virtualPlanSubmitted,
        virtualItemsLoading: false,
        error: null,
    }
}

const virtualAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
        virtualPlanSubmitted: false,
        virtualItemsLoading: false,
    }
}

const searchSpecialPlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        searchSpecialPlan: payload.searchSpecialPlan,
        error: null
    }
}


const searchSpecialPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error
    }
}

const virtualCommonTeamSuccessReducer = (state = initialState, payload) => {
    console.log(payload.quantityAllocated);
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.virtualQuantityAllocated.forEach(item => quantityAllocated[item.designationId] = item.allocatedQuantity)
    payload.virtualCommonTeam.forEach(item => item["allocatedQuantity"] = quantityAllocated[item.designationId])
    payload.virtualCommonTeam.forEach(item => {
            if(data[item.team]){
                let arr = []
                arr = data[item.team]
                arr[(arr.length-1)+1] = item
                data[item.team] = arr
            }else{
                let arr = [];
                arr[0] = item
                keysArr.push(item.team);
                data[item.team]= arr
            }
        }
    )
    console.log(payload.virtualCommonTeam);
    console.log(data)
    console.log(keysArr)
    return {
        ...state,
        virtualCommonTeam: data,
        virtualCommonTeamKeys: keysArr,
        virtualCommonTeamLoading: false

    }
}

const virtualCommonTeamFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonTeam:[],
        virtualCommonTeamLoading: false,
        error: payload.error,

    }
}

const virtualAllocationForPlanStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualAllocationForPlan: [],
        virtualAllocationsLoading: true,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}



const virtualAllocationForPlanSuccessReducer = (state = initialState, payload) => {
    let itemList = payload.virtualSelectedItems.map(item => item.itemID)
    let costCenterList = [];
    let inventoryList = [];
    payload.virtualSelectedItems.forEach(item => costCenterList[item.itemID] = item.costCenterID);
    payload.virtualSelectedItems.forEach(item => inventoryList[item.itemID] = item.inventoryId);
    console.log(costCenterList);
    const allocatedItems = payload.virtualAllocations.allocations
    if (allocatedItems.length !== 0) {
        let items = allocatedItems.filter(item => itemList.indexOf(item.itemID) > -1)
        itemList = itemList.concat(items)
    }
    const allocations = []
    state.virtualAllocation.forEach(item => item["balance"] =  (item.qtyReceived- item.qtyDispatched - item.quantityAllocated))
    state.virtualAllocation.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.virtualAllocations.teams,costCenter: costCenterList[item.itemID], inventoryId:inventoryList[item.itemID] })}})
    console.log(allocations)
    console.log(state.virtualAllocation)
    console.log(payload.virtualSelectedItems)
    return {
        ...state,
        virtualAllocationsLoading: false,
        virtualAllocationForPlan: allocations,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}

const virtualAllocationForPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualAllocationsLoading: false,
        error: payload.error,
    }
}

const virtualDifferentialAllocationSuccessReducer = (state = initialState, payload) => {
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.virtualDifferentialQuantityAllocated.forEach(item => quantityAllocated[item.recipientId] = item.allocatedQuantity)
    payload.virtualDifferentialTeam.forEach(item => item["allocatedQuantity"] = quantityAllocated[item.recipientID])
    console.log(payload.virtualDifferentialTeam)
    return {
        ...state,
        virtualDifferentialTeam:payload.virtualDifferentialTeam

    }
}

const virtualDifferentialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualDifferentialTeam:[],
        error: payload.error,

    }
}

const virtualDifferentialAllocationSaveStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualDifferentialAllocationSave:[],
        virtualDifferentialAllocationSaveSuccess:false
    }
}


const virtualDifferentialAllocationSaveSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualDifferentialAllocationSave:payload.virtualDifferentialAllocationSave,
        virtualDifferentialAllocationSaveSuccess:true
    }
}

const virtualDifferentialAllocationSaveFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualDifferentialAllocationSave:[],
        virtualDifferentialAllocationSaveSuccess:false,
        error: payload.error,
    }
}

const submitMonthlyAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitMonthlyAllocation:[],
        submitMonthlyAllocationSuccess: false
    }
}

const submitMonthlyAllocationSuccessReducer = (state = initialState, payload) => {
    console.log(payload.submitMonthlyAllocation)
    return {
        ...state,
        submitMonthlyAllocation:payload.submitMonthlyAllocation,
        submitMonthlyAllocationSuccess: true
    }
}

const submitMonthlyAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitMonthlyAllocation:[],
        submitMonthlyAllocationSuccess: false,
        error: payload.error,

    }
}

const submitVirtualAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitVirtualAllocation:[],
        submitVirtualAllocationSuccess: false
    }
}


const submitVirtualAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitVirtualAllocation:payload.submitVirtualAllocation,
        submitVirtualAllocationSuccess: true
    }
}

const submitVirtualAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitVirtualAllocation:[],
        submitVirtualAllocationSuccess: false,
        error: payload.error,

    }
}

const submitSpecialAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitSpecialAllocation:payload.submitSpecialAllocation,
        submitSpecialAllocationSuccess: false
    }
}

const submitSpecialAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitSpecialAllocation:payload.submitSpecialAllocation,
        submitSpecialAllocationSuccess: true
    }
}

const submitSpecialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        submitSpecialAllocation:[],
        submitSpecialAllocationSuccess: false,
        error: payload.error,

    }
}


const getAllocationStatusDropdownSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        getAllocationStatusDropdown: payload.getAllocationStatusDropdown.map(row => {
            return {
                label: row.allocationStatusName,
                value: row.allocationStatusId
            }
        }),
    }
}

const getAllocationStatusDropdownFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,

    }
}

const getMultipleAllocationDownloadSuccessReducer = (state = initialState, payload) => {
    console.log(payload)
    return {
        ...state,
        getMultipleAllocationDownload: payload.getMultipleAllocationCostCenterDownload,
         getMultipleAllocationExcelDownload: payload.getMultipleAllocationExcelDownload
    }
}

const getMultipleAllocationDownloadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,

    }
}

const editSpecialPlanSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        editSpecialPlan: payload.editSpecialPlan
    }
}

const editSpecialPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,

    }
}

const specialAllocationStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialAllocation: [],
        specialItemsLoading: true,
        specialPlanSubmitted: false,
        error: null,
    }
}

const specialAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialAllocation: payload.specialAllocation,
        specialItemsLoading: false,
        specialPlanSubmitted: payload.specialPlanSubmitted,
        error: null,
    }
}

const specialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
        specialPlanSubmitted: false,
        specialItemsLoading: false,
    }
}

const specialAllocationForPlanStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialAllocationForPlan: [],
        specialAllocationsLoading: true,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}



const specialAllocationForPlanSuccessReducer = (state = initialState, payload) => {
    let itemList = payload.specialSelectedItems.map(item => item.itemID)
    let costCenterList = [];
    let inventoryList = [];
    payload.specialSelectedItems.forEach(item => costCenterList[item.itemID] = item.costCenterID);
    payload.specialSelectedItems.forEach(item => inventoryList[item.itemID] = item.inventoryId);
    console.log(costCenterList);
    const allocatedItems = payload.specialAllocations.allocations
    if (allocatedItems.length !== 0) {
        let items = allocatedItems.filter(item => itemList.indexOf(item.itemID) > -1)
        itemList = itemList.concat(items)
    }
    const allocations = []
    state.specialAllocation.forEach(item => item["balance"] =  (item.qtyReceived- item.qtyDispatched - item.quantityAllocated))
    state.specialAllocation.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.specialAllocations.teams,costCenter: costCenterList[item.itemID], inventoryId:inventoryList[item.itemID] })}})
    console.log(allocations)
    console.log(state.specialAllocation)
    console.log(payload.specialSelectedItems)
    return {
        ...state,
        specialAllocationsLoading: false,
        specialAllocationForPlan: allocations,
//        distribution: Object.assign({}, ...payload.distribution.map(s => ({[s.ID_TEM_RCT]: s.QUANTITY}))),
        error: null,
    }
}

const specialAllocationForPlanFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialAllocationsLoading: false,
        error: payload.error,
    }
}

const specialDifferentialAllocationSuccessReducer = (state = initialState, payload) => {
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.specialDifferentialQuantityAllocated.forEach(item => quantityAllocated[item.recipientId] = item.allocatedQuantity)
    payload.specialDifferentialTeam.forEach(item => item["allocatedQuantity"] = quantityAllocated[item.recipientId])
    console.log(payload.specialDifferentialTeam)
    return {
        ...state,
        specialDifferentialTeam:payload.specialDifferentialTeam

    }
}

const specialDifferentialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialDifferentialTeam:[],
        error: payload.error,

    }
}

const specialDifferentialAllocationSaveStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialDifferentialAllocationSave:[],
        specialDifferentialAllocationSaveSuccess: false
    }
}

const specialDifferentialAllocationSaveSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialDifferentialAllocationSave:payload.specialDifferentialAllocationSave,
        specialDifferentialAllocationSaveSuccess: true
    }
}

const specialDifferentialAllocationSaveFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        specialDifferentialAllocationSave:[],
        specialDifferentialAllocationSaveSuccess: false,
        error: payload.error,

    }
}

const deleteSpecialAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        deleteSpecialAllocation:payload.deleteSpecialAllocation

    }
}

const deleteSpecialAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        deleteSpecialAllocation:[],
        error: payload.error,

    }
}

const multipleAllocationUploadStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUpload: [],
        multipleAllocationUploadSuccess: false,
    }
}


const multipleAllocationUploadSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUpload: payload.multipleAllocationUpload,
        multipleAllocationUploadSuccess: true,
        multipleAllocationUploadLoading:false,
    }
}

const multipleAllocationUploadFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadSuccess: false,
        error: payload.error.response.message,
        multipleAllocationUploadLoading:false,
    }
}



const multipleAllocationUploadSpecialStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadSpecial: [],
        multipleAllocationUploadSpecialSuccess: false,
    }
}


const multipleAllocationUploadSpecialSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadSpecial: payload.multipleAllocationUploadSpecial,
        multipleAllocationUploadSpecialSuccess: true,
        multipleAllocationUploadSpecialLoading:false,
    }
}

const multipleAllocationUploadSpecialFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadSpecialSuccess: false,
        error: payload.error.response.message,
        multipleAllocationUploadSpecialLoading:false,
    }
}


const multipleAllocationUploadMonthlyStartReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadMonthly: [],
        multipleAllocationUploadMonthlySuccess: false
    }
}


const multipleAllocationUploadMonthlySuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadMonthly: payload.multipleAllocationUploadMonthly,
        multipleAllocationUploadMonthlySuccess: true,
        multipleAllocationUploadMonthlyLoading: false
    }
}

const multipleAllocationUploadMonthlyFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        multipleAllocationUploadMonthlySuccess: false,
        error: payload.error.response.message,
        multipleAllocationUploadMonthlyLoading:false,
    }
}



    const multipleAllocationUploadVirtualStartReducer = (state = initialState, payload) => {
        return {
            ...state,
            multipleAllocationUploadVirtual: [],
            multipleAllocationUploadVirtualSuccess: false
        }
    }


        const multipleAllocationUploadVirtualSuccessReducer = (state = initialState, payload) => {
            return {
                ...state,
                multipleAllocationUploadVirtual: payload.multipleAllocationUploadVirtual,
                multipleAllocationUploadVirtualSuccess: true,
                multipleAllocationUploadVirtualLoading: false
            }
        }

            const multipleAllocationUploadVirtualFailReducer = (state = initialState, payload) => {
                return {
                    ...state,
                    multipleAllocationUploadVirtualSuccess: false,
                    error: payload.error.response.message,
                    multipleAllocationUploadVirtualLoading:false,
                }
            }





export default createReducer(initialState, {
    [GET_ALLOCATIONS_FOR_PLAN_START]: allocationForPlanStartReducer,
    [GET_ALLOCATIONS_FOR_PLAN_SUCCESS]: allocationForPlanSuccessReducer,
    [GET_ALLOCATIONS_FOR_PLAN_FAIL]: allocationForPlanFailReducer,
    [ALLOCATION_PAGE_RESET]: allocationPageResetReducer,
    [MONTHLY_ALLOCATION_START]: monthlyAllocationStartReducer,
    [MONTHLY_ALLOCATION_SUCCESS]: monthlyAllocationSuccessReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_START]: recipientAllocationsSuccessReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_FAIL]: recipientAllocationsFailReducer,
    [ALLOCATE_TO_TEAM]: allocateToTeamReducer,
    [VIRTUAL_ALLOCATE_TO_TEAM]: virtualAllocateToTeamReducer,
    [ALLOCATE_TO_DIFFERENTIAL]: allocateToDifferentialReducer,
    [VIRTUAL_ALLOCATE_TO_DIFFERENTIAL]: virtualAllocateToDifferentialReducer,
    [SPECIAL_ALLOCATE_TO_DIFFERENTIAL]: specialAllocateToDifferentialReducer,
    [ALLOCATE_TO_ALL_TEAMS]: allocateToAllTeamsReducer,
    [MONTHLY_COMMON_TEAM_SUCCESS]:monthlyCommonTeamSuccessReducer,
    [MONTHLY_COMMON_TEAM_FAIL]:monthlyCommonTeamFailReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_START]: monthlyCommonAllocationStartReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS]: monthlyCommonAllocationSuccessReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_FAIL]: monthlyCommonAllocationFailReducer,
    [MONTHLY_DIFFERENTIAL_TEAM_SUCCESS]: monthlyDifferentialAllocationSuccessReducer,
    [MONTHLY_DIFFERENTIAL_TEAM_FAIL]: monthlyDifferentialAllocationFailReducer,
    [MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS]: monthlyDifferentialAllocationSaveSuccessReducer,
    [MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_START]: monthlyDifferentialAllocationSaveStartReducer,
    [MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL]: monthlyDifferentialAllocationSaveFailReducer,
    [VIRTUAL_COMMON_ALLOCATION_SAVE_START]: virtualCommonAllocationStartReducer,
    [VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS]: virtualCommonAllocationSuccessReducer,
    [VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL]: virtualCommonAllocationFailReducer,
    [GET_DOWNLOAD_ALLOCATION_SUCCESS]: getDownloadAllocationSuccessReducer,
    [GET_DOWNLOAD_ALLOCATION_FAIL]: getDownloadAllocationFailReducer,
    [GET_BLOCKED_RECIPIENT_SUCCESS]: getRecipientBlockedSuccessReducer,
    [GET_BLOCKED_RECIPIENT_FAIL]: getRecipientBlockedFailReducer,
    [GET_ACTIVE_USERS_SUCCESS]: getActiveUsersSuccessReducer,
    [GET_ACTIVE_USERS_FAIL]: getActiveUsersFailReducer,
    [VIRTUAL_ALLOCATION_START]: virtualAllocationStartReducer,
    [VIRTUAL_ALLOCATION_SUCCESS]: virtualAllocationSuccessReducer,
    [VIRTUAL_ALLOCATION_FAIL]: virtualAllocationFailReducer,
    [SEARCH_SPECIAL_PLAN_SUCCESS]: searchSpecialPlanSuccessReducer,
    [SEARCH_SPECIAL_PLAN_FAIL]: searchSpecialPlanFailReducer,
    [VIRTUAL_COMMON_TEAM_SUCCESS]:virtualCommonTeamSuccessReducer,
    [VIRTUAL_COMMON_TEAM_FAIL]:virtualCommonTeamFailReducer,
    [GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_START]: virtualAllocationForPlanStartReducer,
    [GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_SUCCESS]: virtualAllocationForPlanSuccessReducer,
    [GET_VIRTUAL_ALLOCATIONS_FOR_PLAN_FAIL]: virtualAllocationForPlanFailReducer,
    [VIRTUAL_DIFFERENTIAL_TEAM_SUCCESS]: virtualDifferentialAllocationSuccessReducer,
    [VIRTUAL_DIFFERENTIAL_TEAM_FAIL]: virtualDifferentialAllocationFailReducer,
    [VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_START]: virtualDifferentialAllocationSaveStartReducer,
    [VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS]: virtualDifferentialAllocationSaveSuccessReducer,
    [VIRTUAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL]: virtualDifferentialAllocationSaveFailReducer,
    [SUBMIT_MONTHLY_ALLOCATION_START]: submitMonthlyAllocationStartReducer,
    [SUBMIT_MONTHLY_ALLOCATION_SUCCESS]: submitMonthlyAllocationSuccessReducer,
    [SUBMIT_MONTHLY_ALLOCATION_FAIL]: submitMonthlyAllocationFailReducer,
    [SUBMIT_VIRTUAL_ALLOCATION_START]: submitVirtualAllocationStartReducer,
    [SUBMIT_VIRTUAL_ALLOCATION_SUCCESS]: submitVirtualAllocationSuccessReducer,
    [SUBMIT_VIRTUAL_ALLOCATION_FAIL]: submitVirtualAllocationFailReducer,
    [SUBMIT_SPECIAL_ALLOCATION_SUCCESS]: submitSpecialAllocationSuccessReducer,
    [SUBMIT_SPECIAL_ALLOCATION_START]: submitSpecialAllocationStartReducer,
    [SUBMIT_SPECIAL_ALLOCATION_FAIL]: submitSpecialAllocationFailReducer,
    [GET_ALLOCATION_STATUS_DROPDOWN_SUCCESS]: getAllocationStatusDropdownSuccessReducer,
    [GET_ALLOCATION_STATUS_DROPDOWN_FAIL]: getAllocationStatusDropdownFailReducer,
    [GET_MULTIPLE_ALLOCATION_DOWNLOAD_SUCCESS]: getMultipleAllocationDownloadSuccessReducer,
    [GET_MULTIPLE_ALLOCATION_DOWNLOAD_FAIL]: getMultipleAllocationDownloadFailReducer,
    [EDIT_SPECIAL_PLAN_SUCCESS]: editSpecialPlanSuccessReducer,
    [EDIT_SPECIAL_PLAN_FAIL]: editSpecialPlanFailReducer,
    [SPECIAL_ALLOCATION_START]: specialAllocationStartReducer,
    [SPECIAL_ALLOCATION_SUCCESS]: specialAllocationSuccessReducer,
    [SPECIAL_ALLOCATION_FAIL]: specialAllocationFailReducer,
    [GET_SPECIAL_ALLOCATIONS_FOR_PLAN_START]: specialAllocationForPlanStartReducer,
    [GET_SPECIAL_ALLOCATIONS_FOR_PLAN_SUCCESS]: specialAllocationForPlanSuccessReducer,
    [GET_SPECIAL_ALLOCATIONS_FOR_PLAN_FAIL]: specialAllocationForPlanFailReducer,
    [SPECIAL_DIFFERENTIAL_TEAM_SUCCESS]: specialDifferentialAllocationSuccessReducer,
    [SPECIAL_DIFFERENTIAL_TEAM_FAIL]: specialDifferentialAllocationFailReducer,
    [SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_START]: specialDifferentialAllocationSaveStartReducer,
    [SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS]: specialDifferentialAllocationSaveSuccessReducer,
    [SPECIAL_DIFFERENTIAL_ALLOCATION_SAVE_FAIL]: specialDifferentialAllocationSaveFailReducer,
    [DELETE_SPECIAL_ALLOCATION_SUCCESS]: deleteSpecialAllocationSuccessReducer,
    [DELETE_SPECIAL_ALLOCATION_FAIL]: deleteSpecialAllocationFailReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_START]: multipleAllocationUploadStartReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_SUCCESS]: multipleAllocationUploadSuccessReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_FAIL]: multipleAllocationUploadFailReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_START]: multipleAllocationUploadSpecialStartReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_SUCCESS]: multipleAllocationUploadSpecialSuccessReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_SPECIAL_FAIL]: multipleAllocationUploadSpecialFailReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_START]: multipleAllocationUploadMonthlyStartReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_SUCCESS]: multipleAllocationUploadMonthlySuccessReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_MONTHLY_FAIL]: multipleAllocationUploadMonthlyFailReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_START]: multipleAllocationUploadVirtualStartReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_SUCCESS]: multipleAllocationUploadVirtualSuccessReducer,
    [MULTIPLE_ALLOCATION_UPLOAD_VIRTUAL_FAIL]: multipleAllocationUploadVirtualFailReducer

} )
