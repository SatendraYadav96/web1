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


//EDIT COST CENTER

const editCostCenter = (state) => state.master.editCostCenter;
const editCostCenterLoading = (state) => state.master.editCostCenterLoading


export const selectEditCostCenterData = createSelector(
    editCostCenter,
    editCostCenterDataSelection => editCostCenterDataSelection
);

export const selectEditCostCenterLoadingData = createSelector(
    editCostCenterLoading,
    loadingSelection => loadingSelection
);

//COST CENTER BY ID

const costCenterById = (state) => state.master.costCenterById;
const costCenterByIdLoading = (state) => state.master.costCenterByIdLoading


export const selectCostCenterByIdData = createSelector(
    costCenterById,
    costCenterByIdDataSelection => costCenterByIdDataSelection
);

export const selectLoadingCostCenterByIdData = createSelector(
    costCenterByIdLoading,
    loadingSelection => loadingSelection
);

//SAMPLES

const samplesList = (state) => state.master.samplesList;
const samplesLoading = (state) => state.master.samplesLoading


export const selectSamplesListData = createSelector(
  samplesList,
  samplesListDataSelection => samplesListDataSelection
);

export const selectLoadingSamplesData = createSelector(
  samplesLoading,
  loadingSelection => loadingSelection
);

//EDIT SAMPLES

const editSamples = (state) => state.master.editSamples;
const editSamplesLoading = (state) => state.master.editSamplesLoading


export const selectEditSamplesData = createSelector(
  editSamples,
  editSamplesDataSelection => editSamplesDataSelection
);

export const selectEditSamplesLoadingData = createSelector(
  editSamplesLoading,
  loadingSelection => loadingSelection
);

//SAMPLES BY ID

const samplesById = (state) => state.master.samplesById;
const samplesByIdLoading = (state) => state.master.samplesByIdLoading


export const selectSamplesByIdData = createSelector(
  samplesById,
  samplesByIdDataSelection => samplesByIdDataSelection
);

export const selectLoadingSamplesByIdData = createSelector(
  samplesByIdLoading,
  loadingSelection => loadingSelection
);
