import { createSelector } from 'reselect'

//add HSN API
const insertHsn = (state) => state.addHsn.insertHsn
const hsnLoading = (state) => state.addHsn.hsnLoading



export const selectHsn = createSelector(insertHsn, (hsnSelect) => hsnSelect)
export const selectHsnLoading = createSelector(hsnLoading, (hsnLoadingSelect) => hsnLoadingSelect)



//Edit Invoice Header API
const boxWeight = (state) => state.addHsn.boxWeight
const boxWeightLoading = (state) => state.addHsn.boxWeightLoading


export const selectBoxWeight = createSelector(boxWeight, (boxWeightSelect) => boxWeightSelect)
export const selectBoxWeightLoading = createSelector(boxWeightLoading, (boxWeightLoadingSelect) => boxWeightLoadingSelect)




