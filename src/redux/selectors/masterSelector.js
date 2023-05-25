import { createSelector } from 'reselect'


//BUISNESS UNIT

const buisnessUnitList = (state) => state.master.buisnessUnitList;
const buisnessUnitLoading = (state) => state.master.buisnessUnitLoading


export const selectBuisnessUnitListData = createSelector(
    buisnessUnitList,
    buisnessUnitListDataSelection => buisnessUnitListDataSelection
);

export const selectLoadingBuisnessUnitData = createSelector(
    buisnessUnitLoading,
    loadingSelection => loadingSelection
);


//ADD BUISNESS UNIT
const insertBuisnessUnit = (state) => state.master.insertBuisnessUnit;
const insertBuisnessUnitLoading = (state) => state.master.insertBuisnessUnitLoading


export const selectInsertBuisnessUnitData = createSelector(
    insertBuisnessUnit,
    insertBuisnessUnitDataSelection => insertBuisnessUnitDataSelection
);

export const selectInsertBuisnessUnitLoadingData = createSelector(
    insertBuisnessUnitLoading,
    loadingSelection => loadingSelection
);


//EDIT BUSINESS UNIT

const editBuisnessUnit = (state) => state.master.editBuisnessUnit;
const editBuisnessUnitLoading = (state) => state.master.editBuisnessUnitLoading


export const selectEditBuisnessUnitData = createSelector(
    editBuisnessUnit,
    editBuisnessUnitDataSelection => editBuisnessUnitDataSelection
);

export const selectEditBuisnessUnitLoadingData = createSelector(
    editBuisnessUnitLoading,
    loadingSelection => loadingSelection
);


//BUSINESS UNIT BY ID

const businessUnitById = (state) => state.master.buisnessUnitById;
const businessUnitByIdLoading = (state) => state.master.buisnessUnitByIdLoading


export const selectBusinessUnitByIdData = createSelector(
    businessUnitById,
    businessUnitByIdDataSelection => businessUnitByIdDataSelection
);

export const selectLoadingBusinessUnitByIdData = createSelector(
    businessUnitByIdLoading,
    loadingSelection => loadingSelection
);



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

//ADD COST CENTER
const insertCostCenter = (state) => state.master.insertCostCenter;
const insertCostCenterLoading = (state) => state.master.insertCostCenterLoading


export const selectInsertCostCenterData = createSelector(
    insertCostCenter,
    insertCostCenterDataSelection => insertCostCenterDataSelection
);

export const selectInsertCostCenterLoadingData = createSelector(
    insertCostCenterLoading,
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

//ADD SAMPLES
const insertSamples = (state) => state.master.insertSamples;
const insertSamplesLoading = (state) => state.master.insertSamplesLoading


export const selectInsertSamplesData = createSelector(
    insertSamples,
    insertSamplesDataSelection => insertSamplesDataSelection
);

export const selectInsertSamplesLoadingData = createSelector(
    insertSamplesLoading,
    loadingSelection => loadingSelection
);
