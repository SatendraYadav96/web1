import {createSelector} from "reselect";

const deliveryUpdateList = (state) => state.deliveryUpdate.deliveryUpdateList;
const deliveryUpdateLoading = (state) => state.deliveryUpdate.deliveryUpdateLoading


export const selectDeliveryUpdateListData = createSelector(
    deliveryUpdateList,
    deliveryUpdateDataSelection => deliveryUpdateDataSelection
);

export const selectLoadingDeliveryUpdateData = createSelector(
    deliveryUpdateLoading,
    loadingSelection => loadingSelection
);
