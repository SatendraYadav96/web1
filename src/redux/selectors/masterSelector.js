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


//TEAM

const teamList = (state) => state.master.teamList;
const teamLoading = (state) => state.master.teamLoading
0

export const selectTeamListData = createSelector(
    teamList,
    teamListDataSelection => teamListDataSelection
);

export const selectLoadingTeamData = createSelector(
    teamLoading,
    loadingSelection => loadingSelection
);


//ADD TEAM
const insertTeam = (state) => state.master.insertTeam;
const insertTeamLoading = (state) => state.master.insertTeamLoading


export const selectInsertTeamData = createSelector(
    insertTeam,
    insertTeamDataSelection => insertTeamDataSelection
);

export const selectInsertTeamLoadingData = createSelector(
    insertTeamLoading,
    loadingSelection => loadingSelection
);


//EDIT TEAM
const editTeam = (state) => state.master.editTeam;
const editTeamLoading = (state) => state.master.editTeamLoading


export const selectEditTeamData = createSelector(
    editTeam,
    editTeamDataSelection => editTeamDataSelection
);

export const selectEditTeamLoadingData = createSelector(
    editTeamLoading,
    loadingSelection => loadingSelection
);


//TEAM BY ID

const teamById = (state) => state.master.teamById;
const teamByIdLoading = (state) => state.master.teamByIdLoading


export const selectTeamByIdData = createSelector(
    teamById,
    teamByIdDataSelection => teamByIdDataSelection
);

export const selectLoadingTeamByIdData = createSelector(
    teamByIdLoading,
    loadingSelection => loadingSelection
);


//USER
const userList = (state) => state.master.userList;
const userLoading = (state) => state.master.userLoading;


export const selectUserListData = createSelector(
    userList,
    userListDataSelection => userListDataSelection
);

export const selectLoadingUserData = createSelector(
    userLoading,
    loadingSelection => loadingSelection
);


//ADD USER
const insertUser = (state) => state.master.insertUser;
const insertUserLoading = (state) => state.master.insertUserLoading


export const selectInsertUserData = createSelector(
    insertUser,
    insertUserDataSelection => insertUserDataSelection
);

export const selectInsertUserLoadingData = createSelector(
    insertUserLoading,
    loadingSelection => loadingSelection
);


//EDIT USER
const editUser = (state) => state.master.editUser;
const editUserLoading = (state) => state.master.editUserLoading


export const selectEditUserData = createSelector(
    editUser,
    editUserDataSelection => editUserDataSelection
);

export const selectEditUserLoadingData = createSelector(
    editUserLoading,
    loadingSelection => loadingSelection
);


//USER BY ID
const userById = (state) => state.master.userById;
const userByIdLoading = (state) => state.master.userByIdLoading


export const selectUserByIdData = createSelector(
    userById,
    userByIdDataSelection => userByIdDataSelection
);

export const selectLoadingUserByIdData = createSelector(
    userByIdLoading,
    loadingSelection => loadingSelection
);


//BRAND
const brandList = (state) => state.master.brandList;
const brandLoading = (state) => state.master.brandLoading;


export const selectBrandListData = createSelector(
    brandList,
    brandListDataSelection => brandListDataSelection
);

export const selectLoadingBrandData = createSelector(
    brandLoading,
    loadingSelection => loadingSelection
);


//ADD BRAND
const insertBrand = (state) => state.master.insertBrand;
const insertBrandLoading = (state) => state.master.insertBrandLoading


export const selectInsertBrandData = createSelector(
    insertBrand,
    insertBrandDataSelection => insertBrandDataSelection
);

export const selectInsertBrandLoadingData = createSelector(
    insertBrandLoading,
    loadingSelection => loadingSelection
);


//EDIT BRAND
const editBrand = (state) => state.master.editBrand;
const editBrandLoading = (state) => state.master.editBrandLoading


export const selectEditBrandData = createSelector(
    editBrand,
    editBrandDataSelection => editBrandDataSelection
);

export const selectEditBrandLoadingData = createSelector(
    editBrandLoading,
    loadingSelection => loadingSelection
);


//BRAND BY ID
const brandById = (state) => state.master.brandById;
const brandByIdLoading = (state) => state.master.brandByIdLoading


export const selectBrandByIdData = createSelector(
    brandById,
    brandByIdDataSelection => brandByIdDataSelection
);

export const selectLoadingBrandByIdData = createSelector(
    brandByIdLoading,
    loadingSelection => loadingSelection
);


//BRAND
const ffList = (state) => state.master.ffList;
const ffLoading = (state) => state.master.ffLoading;


export const selectFFListData = createSelector(
    ffList,
    ffListDataSelection => ffListDataSelection
);

export const selectLoadingFFData = createSelector(
    ffLoading,
    loadingSelection => loadingSelection
);


//ADD FF
const insertFF = (state) => state.master.insertFF;
const insertFFLoading = (state) => state.master.insertFFLoading


export const selectInsertFFData = createSelector(
    insertFF,
    insertFFDataSelection => insertFFDataSelection
);

export const selectInsertFFLoadingData = createSelector(
    insertFFLoading,
    loadingSelection => loadingSelection
);


//EDIT FF
const editFF = (state) => state.master.editFF;
const editFFLoading = (state) => state.master.editFFLoading


export const selectEditFFData = createSelector(
    editFF,
    editBrandDataSelection => editBrandDataSelection
);

export const selectEditFFLoadingData = createSelector(
    editFFLoading,
    loadingSelection => loadingSelection
);


//FF BY ID
const ffById = (state) => state.master.ffById;
const ffByIdLoading = (state) => state.master.ffByIdLoading


export const selectFFByIdData = createSelector(
    ffById,
    ffByIdDataSelection => ffByIdDataSelection
);

export const selectLoadingFFByIdData = createSelector(
    ffByIdLoading,
    loadingSelection => loadingSelection
);

//FF HISTORY BY ID
const ffHistoryById = (state) => state.master.ffHistoryById;
const ffHistoryByIdLoading = (state) => state.master.ffHistoryByIdLoading


export const selectFFHistoryByIdData = createSelector(
    ffHistoryById,
    ffHistoryByIdDataSelection => ffHistoryByIdDataSelection
);

export const selectLoadingFFHistoryByIdData = createSelector(
    ffHistoryByIdLoading,
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

const masterBlockedList = (state) => state.master.masterBlockedList;
const masterBlockedLoading = (state) => state.master.masterBlockedListLoading


export const selectMasterBlockedListData = createSelector(
    masterBlockedList,
    masterBlockedListDataSelection => masterBlockedListDataSelection
);

export const selectLoadingMasterBlockedListData = createSelector(
    masterBlockedLoading,
    loadingSelection => loadingSelection
);
