

//BUISNESS UNIT

import {createSelector} from "reselect";

const transportUploadList = (state) => state.upload.transportUpload;
const transportUploadLoading = (state) => state.upload.transportUploadLoading


export const selectTransportUploadListData = createSelector(
    transportUploadList,
    transportUploadListDataSelection => transportUploadListDataSelection
);

export const selectLoadingTransportUploadData = createSelector(
    transportUploadLoading,
    loadingSelection => loadingSelection
);
