import { createReducer } from './reducerUtils'
import {
    ALLOCATE_TO_ALL_TEAMS, ALLOCATE_TO_DIFFERENTIAL,
    ALLOCATE_TO_TEAM,
    ALLOCATION_PAGE_RESET, GET_ACTIVE_USERS_FAIL, GET_ACTIVE_USERS_SUCCESS,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS, GET_BLOCKED_RECIPIENT_FAIL, GET_BLOCKED_RECIPIENT_SUCCESS, GET_DOWNLOAD_ALLOCATION_FAIL, GET_DOWNLOAD_ALLOCATION_SUCCESS,
    MONTHLY_ALLOCATION_FAIL,
    MONTHLY_ALLOCATION_START,
    MONTHLY_ALLOCATION_SUCCESS,
    MONTHLY_COMMON_ALLOCATION_SAVE_FAIL,
    MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_COMMON_TEAM_FAIL,
    MONTHLY_COMMON_TEAM_SUCCESS, MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL,
    MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS,
    MONTHLY_DIFFERENTIAL_TEAM_FAIL,
    MONTHLY_DIFFERENTIAL_TEAM_SUCCESS,
    RECIPIENTS_TO_ALLOCATE_LIST_FAIL,
    RECIPIENTS_TO_ALLOCATE_LIST_START, SEARCH_SPECIAL_PLAN_FAIL, SEARCH_SPECIAL_PLAN_SUCCESS, VIRTUAL_ALLOCATION_FAIL, VIRTUAL_ALLOCATION_START, VIRTUAL_ALLOCATION_SUCCESS, VIRTUAL_COMMON_ALLOCATION_SAVE_FAIL, VIRTUAL_COMMON_ALLOCATION_SAVE_SUCCESS,
} from "../actions/allocation/allocationActionConstants";
const initialState = {
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
    monthlyDifferentialTeam:[],
    monthlyDifferentialAllocationSave:[],
    error: null,
    virtualCommonAllocationSave: [],
    getDownloadAllocation: [],
    getRecipientBlocked: [],
    getActiveUsers: [],
    virtualAllocation: [],
    virtualItemLoading: false,
    searchSpecialPlan: []
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
    state.items.forEach(item => item["balance"] =  (item.qtyReceived- item.qtyDispatched - item.quantityAllocated))
    state.items.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.allocations.teams,costCenter: costCenterList[item.itemID], inventoryId:inventoryList[item.itemID] })}})
    console.log(allocations)
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
        error: null,
    }
}

const monthlyAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        plan: payload.plan,
        items: payload.items,
        itemsLoading: false,
        error: null,
    }
}

const monthlyAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
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
        monthlyCommonTeam: monthlyCommonTeam,
        commonAllocationDone: new Date(),
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

const monthlyCommonAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonAllocationSave:payload.monthlyCommonAllocationSave

    }
}

const monthlyCommonAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyCommonAllocationSave:[],
        error: payload.error,

    }
}


const monthlyDifferentialAllocationSuccessReducer = (state = initialState, payload) => {
    let quantityAllocated = [];
    let data = new Map();
    let keysArr = [];
    payload.monthlyDifferentialQuantityAllocated.forEach(item => quantityAllocated[item.recipientId] = item.allocatedQuantity)
    payload.monthlyDifferentialTeam.forEach(item => item["quantity"] = quantityAllocated[item.recipientID])
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

const monthlyDifferentialAllocationSaveSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialAllocationSave:payload.monthlyDifferentialAllocationSave

    }
}

const monthlyDifferentialAllocationSaveFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        monthlyDifferentialAllocationSave:[],
        error: payload.error,

    }
}

const virtualCommonAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonAllocationSave:payload.virtualCommonAllocationSave

    }
}

const virtualCommonAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualCommonAllocationSave:[],
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
        error: null,
    }
}

const virtualAllocationSuccessReducer = (state = initialState, payload) => {
    return {
        ...state,
        virtualAllocation: payload.virtualAllocation,
        virtualItemsLoading: false,
        error: null,
    }
}

const virtualAllocationFailReducer = (state = initialState, payload) => {
    return {
        ...state,
        error: payload.error,
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


export default createReducer(initialState, {
    [GET_ALLOCATIONS_FOR_PLAN_START]: allocationForPlanStartReducer,
    [GET_ALLOCATIONS_FOR_PLAN_SUCCESS]: allocationForPlanSuccessReducer,
    [GET_ALLOCATIONS_FOR_PLAN_FAIL]: allocationForPlanFailReducer,
    [ALLOCATION_PAGE_RESET]: allocationPageResetReducer,
    [MONTHLY_ALLOCATION_START]: monthlyAllocationStartReducer,
    [MONTHLY_ALLOCATION_SUCCESS]: monthlyAllocationSuccessReducer,
    [MONTHLY_ALLOCATION_START]: monthlyAllocationStartReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_START]: recipientAllocationsSuccessReducer,
    [RECIPIENTS_TO_ALLOCATE_LIST_FAIL]: recipientAllocationsFailReducer,
    [ALLOCATE_TO_TEAM]: allocateToTeamReducer,
    [ALLOCATE_TO_DIFFERENTIAL]: allocateToDifferentialReducer,
    [ALLOCATE_TO_ALL_TEAMS]: allocateToAllTeamsReducer,
    [MONTHLY_COMMON_TEAM_SUCCESS]:monthlyCommonTeamSuccessReducer,
    [MONTHLY_COMMON_TEAM_FAIL]:monthlyCommonTeamFailReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS]: monthlyCommonAllocationSuccessReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_FAIL]: monthlyCommonAllocationFailReducer,
    [MONTHLY_DIFFERENTIAL_TEAM_SUCCESS]: monthlyDifferentialAllocationSuccessReducer,
    [MONTHLY_DIFFERENTIAL_TEAM_FAIL]: monthlyDifferentialAllocationFailReducer,
    [MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_SUCCESS]: monthlyDifferentialAllocationSaveSuccessReducer,
    [MONTHLY_DIFFERENTIAL_ALLOCATION_SAVE_FAIL]: monthlyDifferentialAllocationSaveFailReducer,
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
    [SEARCH_SPECIAL_PLAN_FAIL]: searchSpecialPlanFailReducer
})
