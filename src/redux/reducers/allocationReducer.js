import { createReducer } from './reducerUtils'
import {
    ALLOCATE_TO_ALL_TEAMS,
    ALLOCATE_TO_TEAM,
    ALLOCATION_PAGE_RESET,
    GET_ALLOCATIONS_FOR_PLAN_FAIL,
    GET_ALLOCATIONS_FOR_PLAN_START,
    GET_ALLOCATIONS_FOR_PLAN_SUCCESS,
    MONTHLY_ALLOCATION_FAIL,
    MONTHLY_ALLOCATION_START,
    MONTHLY_ALLOCATION_SUCCESS, MONTHLY_COMMON_ALLOCATION_SAVE_FAIL, MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS, MONTHLY_COMMON_TEAM_FAIL, MONTHLY_COMMON_TEAM_SUCCESS, RECIPIENTS_TO_ALLOCATE_LIST_FAIL, RECIPIENTS_TO_ALLOCATE_LIST_START,
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
    error: null,
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
        let items = allocatedItems.filter(item => itemList.indexOf(item.ID_ITM_INV) > -1)
        itemList = itemList.concat(items)
    }
    const allocations = []
    state.items.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.allocations.teams,costCenter: costCenterList[item.itemID], inventoryId:inventoryList[item.itemID] })}})
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
    const quantity = payload.quantity
    let allocations = state.allocations
    let totalAllocation = 0
    state.allocations.forEach(allocation => {
        const i = allocation.item
        if (i.ID_ITM_INV === item.ID_ITM_INV) {
            const mappedTeams = allocation.teams.map(t => {
                    if (t.ID_TEM === team.ID_TEM) {
                        totalAllocation = totalAllocation + t.RECIPIENTS * quantity
                        t.quantity = quantity
                    } else {
                        totalAllocation = totalAllocation + t.RECIPIENTS * t.quantity
                    }
                    return t
                }
            )
            allocation.totalAllocation = totalAllocation
            allocation.teams = mappedTeams
        }
    })
    return {
        ...state,
        allocations: allocations,
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
    [ALLOCATE_TO_ALL_TEAMS]: allocateToAllTeamsReducer,
    [MONTHLY_COMMON_TEAM_SUCCESS]:monthlyCommonTeamSuccessReducer,
    [MONTHLY_COMMON_TEAM_FAIL]:monthlyCommonTeamFailReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_SUCCESS]: monthlyCommonAllocationSuccessReducer,
    [MONTHLY_COMMON_ALLOCATION_SAVE_FAIL]: monthlyCommonAllocationFailReducer
})
