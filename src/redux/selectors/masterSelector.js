import { createSelector } from 'reselect'


//VENDOR

const vendorList = (state) => state.master.vendorList;
const vendorLoading = (state) => state.master.vendorLoading


export const selectVendorListData = createSelector(
vendorList,
          vendorListDataSelection => vendorListDataSelection
);

export const selectLoadingVendorData = createSelector(
vendorLoading,
              loadingSelection => loadingSelection
);


//ADD VENDOR


const insertVendor = (state) => state.master.insertVendor;
const insertVendorLoading = (state) => state.master.insertVendorLoading


export const selectInsertVendorData = createSelector(
insertVendor,
          insertVendorDataSelection => insertVendorDataSelection
);

export const selectInsertVendorLoadingData = createSelector(
insertVendorLoading,
              loadingSelection => loadingSelection
);


//EDIT VENDOR

const editVendor = (state) => state.master.editVendor;
const editVendorLoading = (state) => state.master.editVendorLoading


export const selectEditVendorData = createSelector(
editVendor,
          editVendorDataSelection => editVendorDataSelection
);

export const selectEditVendorLoadingData = createSelector(
editVendorLoading,
              loadingSelection => loadingSelection
);

//VENDOR BY ID

const vendorById = (state) => state.master.vendorById;
const vendorByIdLoading = (state) => state.master.vendorByIdLoading


export const selectVendorByIdData = createSelector(
    vendorById,
    vendorByIdDataSelection => vendorByIdDataSelection
);

export const selectLoadingVendorByIdData = createSelector(
    vendorByIdLoading,
    loadingSelection => loadingSelection
);


//COST CENTER

const costCenterList = (state) => state.master.costCenterList;
const costCenterLoading = (state) => state.master.costCenterLoading


export const selectCostCenterListData = createSelector(
    costCenterList,
    costCenterListDataSelection => costCenterListDataSelection
);

export const selectLoadingCostCenterData = createSelector(
    costCenterLoading,
    loadingSelection => loadingSelection
);


