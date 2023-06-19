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
    MONTHLY_ALLOCATION_SUCCESS, RECIPIENTS_TO_ALLOCATE_LIST_FAIL, RECIPIENTS_TO_ALLOCATE_LIST_START,
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
    const allocatedItems = payload.allocations.allocations
    if (allocatedItems.length !== 0) {
        let items = allocatedItems.filter(item => itemList.indexOf(item.ID_ITM_INV) > -1)
        itemList = itemList.concat(items)
    }
    const allocations = []
    state.items.forEach(item => {if(itemList.indexOf(item.itemID) > -1) {allocations.push({item: item, teams: payload.allocations.teams})}})
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
    [ALLOCATE_TO_ALL_TEAMS]: allocateToAllTeamsReducer
})
