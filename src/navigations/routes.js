import React from 'react'
import Login from "../components/auth/Login";
import UploadLogs from "../components/upload/NonComplianceUploadLogs";

const Dashboard = React.lazy(() => import('../components/dashboard/DashboardComponent'))
const BexDashboardComponent = React.lazy(() => import('../components/dashboard/BexDashboardComponent'))
const GRNAcknowledgementComponent = React.lazy(() => import('../components/grn/GRNAcknowledgementComponent'))
const GRNUploadComponent = React.lazy(() => import('../components/grn/GRNUploadComponent'))
const MonthlyAllocationComponent = React.lazy(() => import('../components/allocation/MonthlyAllocationComponent'))
const PickingSlipComponent = React.lazy(() => import('../components/dispatchInvoice/PickingSlipComponent'))
const MonthlyDispatchComponent = React.lazy(() => import('../components/dispatchInvoice/MonthlyDispatchComponent'))
const MonthlyDispatchDetailComponent = React.lazy(() => import('../components/dispatchInvoice/MonthlyDispatchDetailComponent'))
const SpecialDispatchComponent = React.lazy(() => import('../components/dispatchInvoice/SpecialDispatchComponent'))
const SpecialDispatchDetailComponent = React.lazy(() => import('../components/dispatchInvoice/SpecialDispatchDetailComponent'))
const VirtualDispatchComponent = React.lazy(() => import('../components/dispatchInvoice/VirtualDispatchComponent'))
const VirtualDispatchDetailComponent = React.lazy(() => import('../components/dispatchInvoice/VirtualDispatchDetailComponent'))
const GroupInvoiceComponent = React.lazy(() => import('../components/dispatchInvoice/GroupInvoiceComponent'))
const InvoiceUploadDetailComponent = React.lazy(() => import('../components/dispatchInvoice/InvoiceUploadDetailComponent'))
const GroupInvoiceCreateComponent = React.lazy(() => import('../components/dispatchInvoice/GroupInvoiceCreateComponent'))
const SearchInvoiceComponent = React.lazy(() => import('../components/dispatchInvoice/SearchInvoiceComponent'))
const DeliveryUpdateComponent = React.lazy(() => import('../components/dispatchInvoice/DeliveryUpdateComponent'))
const SearchInventoryComponent = React.lazy(() => import('../components/inventory/SearchInventoryComponent'))
const ItemWiseReportComponent = React.lazy(() => import('../components/inventory/ItemWiseReportComponent'))
const StockLedgerReportComponent = React.lazy(() => import('../components/inventory/StockLedgerReportComponent'))
const NearToExpiryReportComponent = React.lazy(() => import('../components/inventory/NearToExpiryReportComponent'))
const AgeingReportComponent = React.lazy(() => import('../components/inventory/AgeingReportComponent'))
const InventoryReportComponent = React.lazy(() => import('../components/inventory/InventoryReportComponent'))
const AddHsnComponent = React.lazy(() => import('../components/hsnInvoice/AddHsnComponent'))
const AddInvoiceComponent = React.lazy(() => import('../components/hsnInvoice/AddInvoiceComponent'))
const RecipientReportComponent = React.lazy(() => import('../components/reports/RecipientReportComponent'))
const PurchaseReportComponent = React.lazy(() => import('../components/reports/PurchaseReportComponent'))
const DispatchReportComponent = React.lazy(() => import('../components/reports/DispatchReportComponent'))
const DispatchRegisterReportComponent = React.lazy(() => import('../components/reports/DispatchRegisterReportComponent'))
const ItemConsumptionReportComponent = React.lazy(() => import('../components/reports/ItemConsumptionReportComponent'))
const DeviationReportComponent = React.lazy(() => import('../components/reports/DeviationReportComponent'))
const VirtualReconciliationComponent = React.lazy(() => import('../components/reports/VirtualReconciliationComponent'))
const InventoryReversalReportComponent = React.lazy(() => import('../components/reports/InventoryReversalReportComponent'))
const ShipRocketReportComponent = React.lazy(() => import('../components/reports/ShipRocketReportComponent'))
const ItemRevalidationComponent = React.lazy(() => import('../components/revalidation/ItemRevalidationComponent'))
const MonthlyInputPlan = React.lazy(() => import('../components/approvals/MonthlyInputPlan'))
const SpecialDispatches = React.lazy(() => import('../components/approvals/SpecialDispatches'))
const VirtualDispatches = React.lazy(() => import('../components/approvals/VirtualDispatches'))
const RecipientsBlockedListComponent = React.lazy(() => import('../components/masters/recipientsBlockedList/recipientBlockedListComponent'))
const VendorComponent = React.lazy(() => import('../components/masters/vendor/VendorComponent'))
const CreateVendorComponent = React.lazy(() => import('../components/masters/vendor/CreateVendorComponent'))
const EditVendorComponent = React.lazy(() => import('../components/masters/vendor/EditVendorComponent'))
const BusinessUnitComponent = React.lazy(() => import('../components/masters/businessUnit/BusinessUnitComponent'))
const CreateBusinessUnitComponent = React.lazy(() => import('../components/masters/businessUnit/CreateBusinessUnitComponent'))
const EditBusinessUnitComponent = React.lazy(() => import('../components/masters/businessUnit/EditBusinessUnitComponent'))
const TeamComponent = React.lazy(() => import('../components/masters/team/TeamComponent'))
const CreateTeamComponent = React.lazy(() => import('../components/masters/team/CreateTeamComponent'))
const EditTeamComponent = React.lazy(() => import('../components/masters/team/EditTeamComponent'))
const UserComponent = React.lazy(() => import('../components/masters/user/UserComponent'))
const CreateUserComponent = React.lazy(() => import('../components/masters/user/CreateUserComponent'))
const EditUserComponent = React.lazy(() => import('../components/masters/user/EditUserComponent'))
const BrandComponent = React.lazy(() => import('../components/masters/brand/BrandComponent'))
const CreateBrandComponent = React.lazy(() => import('../components/masters/brand/CreateBrandComponent'))
const EditBrandComponent = React.lazy(() => import('../components/masters/brand/EditBrandComponent'))
const OptimaMailLogsComponent = React.lazy(() => import('../components/mailLogs/OptimaMailLogs'))
const MaterialExpiryUploadComponent = React.lazy(() => import('../components/upload/MaterialExpiryUpload'))
const ComplianceDetailsUploadComponent = React.lazy(() => import('../components/upload/ComplianceDetailsUploadLogs'))
const OverSamplingUploadComponent = React.lazy(() => import('../components/upload/OverSamplingUpload'))
const UploadLogsComponent = React.lazy(() => import('../components/upload/NonComplianceUploadLogs'))
const FFMasterUploadComponent = React.lazy(() => import('../components/upload/FFMasterUpload'))
const VirtualSampleUploadComponent = React.lazy(() => import('../components/upload/virtualSampleUpload'))
const NonComplianceUnBlockingomponent = React.lazy(() => import('../components/complianceProcess/NonComplianceUnBlocking'))
const MailLogsComponent = React.lazy(() => import('../components/mailLogs/MailLogs'))
const ManagementDashboardComponent = React.lazy(() => import('../components/managementDashboard/ManagementDashboard'))
const FFComponent = React.lazy(() => import('../components/masters/ffMaster/ffMasterComponent'))
const CreateFFComponent = React.lazy(() => import('../components/masters/ffMaster/CreateFFComponent'))
const EditFFComponent = React.lazy(() => import('../components/masters/ffMaster/EditFFComponent'))
const ComplianceDetailsList = React.lazy(() => import('../components/overSamplingDetails/ComplianceDetailsList'))
const BatchReconciliation = React.lazy(() => import('../components/batchReconciliation/BatchReconciliation'))
const VirtualAllocationComponent = React.lazy(() => import('../components/allocation/VirtualAllocationComponent'))
const SpecialAllocationComponent = React.lazy(() => import('../components/allocation/SpecialAllocationComponent'))
const SpecialAllocationMainComponent = React.lazy(() => import('../components/allocation/SpecialAllocationMainComponent'))
const CreateSpecialAllocationComponent = React.lazy(() => import('../components/allocation/CreateSpecialAllocationComponent'))
const MassRevalidationComponent = React.lazy(() => import('../components/revalidation/MassRevalidationComponent'))
const AllocationReportComponent = React.lazy(() => import('../components/reports/AllocationReportComponent'))
const CostCenterComponent = React.lazy(() => import ('../components/masters/costCenter/CostCenterComponent'))
const CreateCostCenterComponent = React.lazy(() => import ('../components/masters/costCenter/CreateCostCenter'))
const EditCostCenterComponent = React.lazy(() => import ('../components/masters/costCenter/EditCostCenter'))
const SamplesComponent = React.lazy(() => import ('../components/masters/samples/SamplesComponent'))
const CreateSamplesComponent = React.lazy(() => import ('../components/masters/samples/CreateSamples'))
const EditSamplesComponent = React.lazy(() => import ('../components/masters/samples/EditSamples'))
const ChangeAllocationComponent = React.lazy(() => import('../components/allocation/ChangeAllocationComponent'))

const routes = [
    { path: '/home/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/home/bexdashboard', name: 'BexDashboardComponent', element: BexDashboardComponent },
    { path: '/home/grn/acknowledge', name: 'GRNAcknowledgementComponent', element: GRNAcknowledgementComponent },
    { path: '/home/grn/logs', name: 'GRNUploadComponent', element: GRNUploadComponent },
    { path: '/home/allocations/monthly/create', name: 'MonthlyAllocationComponent', element: MonthlyAllocationComponent },
    { path: '/home/allocations/virtual/create', name: 'VirtualAllocationComponent', element: VirtualAllocationComponent},
    { path: '/home/allocations/special', name: 'SpecialAllocationMainComponent', element: SpecialAllocationMainComponent},
    { path: '/home/allocations/special/create', name: 'SpecialAllocationComponent', element: SpecialAllocationMainComponent},
    { path: '/home/allocations/special/createNew', name: 'CreateSpecialAllocationComponent', element: CreateSpecialAllocationComponent},
    { path: '/login', name: 'Login', element: Login },
    { path: '/home/dispatchInvoicing/pickingSlip', name: 'PickingSlip', element: PickingSlipComponent},
    { path: '/home/dispatchInvoicing/monthlyDispatch', name: 'MonthlyDispatch', element: MonthlyDispatchComponent },
    { path: '/home/dispatchInvoicing/monthlyDispatch/details', name: 'MonthlyDispatch', element: MonthlyDispatchDetailComponent},
    { path: '/home/dispatchInvoicing/invoiceupload', name: 'InvoiceUpload', element: InvoiceUploadDetailComponent},
    { path: '/home/dispatchInvoicing/specialDispatch', name: 'SpecialDispatch', element: SpecialDispatchComponent },
    { path: '/home/dispatchInvoicing/specialDispatch/details', name: 'SpecialDispatch', element: SpecialDispatchDetailComponent},
    { path: '/home/compliance/optimaMailSendLogs', name: 'optima_mail_logs', element: OptimaMailLogsComponent },
    { path: '/home/optimaMaterial/upload', name: 'material_expiry_upload', element: MaterialExpiryUploadComponent },
    { path: '/home/optimaMi/upload', name: 'non_compliance_upload', element: UploadLogsComponent },
    { path: '/home/compliance/upload', name: 'over_sampling_upload', element: OverSamplingUploadComponent },
    { path: '/home/complianceDetails/upload', name: 'over_sampling_details_upload', element: ComplianceDetailsUploadComponent },
    { path: '/home/master/ffBlockList', name: 'ffBlockList', element: RecipientsBlockedListComponent },
    { path: '/home/dispatchInvoicing/virtualDispatch', name: 'VirtualDispatch', element: VirtualDispatchComponent },
    { path: '/home/dispatchInvoicing/virtualDispatch/details', name: 'VirtualDispatch', element: VirtualDispatchDetailComponent},
    { path: '/home/dispatchInvoicing/groupInvoice', name: 'GroupInvoice', element: GroupInvoiceComponent},
    { path: '/home/dispatchInvoicing/groupInvoice/create', name: 'GroupInvoiceCreate', element: GroupInvoiceCreateComponent},
    { path: '/home/dispatchInvoicing/searchInvoice', name: 'SearchInvoice', element: SearchInvoiceComponent},
    { path: '/home/dispatchInvoicing/deliveryUpdate', name: 'DeliveryUpdate', element: DeliveryUpdateComponent},
    { path: '/home/inventory/search', name: 'Search', element: SearchInventoryComponent},
    { path: '/home/inventory/itemWiseReport', name: 'ItemWiseReport', element: ItemWiseReportComponent},
    { path: '/home/inventory/stockLedgerReport', name: 'StockLedgerReport', element: StockLedgerReportComponent},
    { path: '/home/inventory/nearToExpiryReport', name: 'NearToExpiryReport', element: NearToExpiryReportComponent},
    { path: '/home/inventory/ageingReport', name: 'AgeingReport', element: AgeingReportComponent },
    { path: '/home/inventory/inventoryReport', name: 'InventoryReport', element: InventoryReportComponent},
    { path: '/home/hsnInvoice/addHsn', name: 'AddHsn', element: AddHsnComponent},
    { path: '/home/hsnInvoice/addInvoice', name: 'AddInvoice', element: AddInvoiceComponent },
    { path: '/home/report/recipientReport', name: 'RecipientReport', element: RecipientReportComponent},
    { path: '/home/report/purchaseReport', name: 'PurchaseReport', element: PurchaseReportComponent},
    { path: '/home/report/dispatchReport', name: 'DispatchReport', element: DispatchReportComponent},
    { path: '/home/report/dispatchRegisterReport', name: 'DispatchRegisterReport', element: DispatchRegisterReportComponent},
    { path: '/home/report/itemConsumptionReport', name: 'ItemConsumptionReport', element: ItemConsumptionReportComponent},
    { path: '/home/report/deviationReport', name: 'DeviationReport', element: DeviationReportComponent},
    { path: '/home/report/virtualReconciliation', name: 'VirtualReconciliation', element: VirtualReconciliationComponent},
    { path: '/home/report/inventoryReversalReport', name: 'InventoryReversal', element: InventoryReversalReportComponent},
    { path: '/home/report/shipRocketReport', name: 'ShipRocketReport', element: ShipRocketReportComponent},
    { path: '/home/itemRevalidation', name: 'Item Revalidation', element: ItemRevalidationComponent},
    { path: '/home/approvals/monthlyInputPlan', name: 'MonthlyInputPlan', element: MonthlyInputPlan},
    { path: '/home/approvals/specialDispatches', name: 'SpecialDispatches', element: SpecialDispatches},
    { path: '/home/approvals/virtualDispatches', name: 'VirtualDispatches', element: VirtualDispatches},
    { path: '/home/upload/ffMasterUplaod', name: 'FF Master Upload', element: FFMasterUploadComponent},
    { path: '/home/upload/virtualSampleUpload', name: 'Virtual Sample Upload', element: VirtualSampleUploadComponent},
    { path: '/home/compliance/complianceDetailsList', name: 'Compliance Details List', element: ComplianceDetailsList},
    { path: '/home/compliance/optimaMailSendLogs', name: 'Mail Logs', element: MailLogsComponent},
    { path: '/home/managementDashboard/reconciliation', name: 'Batch Reconciliation', element: BatchReconciliation},
    { path: '/home/managementDashboard', name: 'Management Dashboard', element: ManagementDashboardComponent},
    { path: '/home/master/ffUnBlockList', name: 'Non Compliance UnBlocking', element: NonComplianceUnBlockingomponent},
    { path: '/home/optimaMi/recommendedListOfBlocking', name: 'Non Compliance UnBlocking', element: NonComplianceUnBlockingomponent},
    { path: '/home/masters/vendor', name: 'Vendor', element: VendorComponent},
    { path: '/home/masters/vendor/create', name: 'CreateVendor', element: CreateVendorComponent},
    { path: '/home/masters/vendor/edit/:id', name: 'EditVendor', element: EditVendorComponent},
    { path: '/home/masters/businessUnit', name: 'BusinessUnit', element: BusinessUnitComponent},
    { path: '/home/masters/businessUnit/create', name: 'CreateBusinessUnit', element: CreateBusinessUnitComponent},
    { path: '/home/masters/businessUnit/edit/:id', name: 'EditBusinessUnit', element: EditBusinessUnitComponent},
    { path: '/home/masters/team', name: 'Team', element: TeamComponent},
    { path: '/home/masters/team/create', name: 'CreateTeam', element: CreateTeamComponent},
    { path: '/home/masters/team/edit/:id', name: 'EditTeam', element: EditTeamComponent},
    { path: '/home/masters/user', name: 'User', element: UserComponent},
    { path: '/home/masters/user/create', name: 'CreateUser', element: CreateUserComponent},
    { path: '/home/masters/user/edit/:id', name: 'EditUser', element: EditUserComponent},
    { path: '/home/masters/brand', name: 'Brand', element: BrandComponent},
    { path: '/home/masters/brand/create', name: 'CreateBrand', element: CreateBrandComponent},
    { path: '/home/masters/brand/edit/:id', name: 'EditBrand', element: EditBrandComponent},
    { path: '/home/masters/ffMaster', name: 'FF', element: FFComponent},
    { path: '/home/masters/ffMaster/create', name: 'CreateFF', element: CreateFFComponent},
    { path: '/home/masters/ffMaster/edit/:id', name: 'EditFF', element: EditFFComponent},
    { path: '/home/masters/costCenter', name: 'CostCenter', element: CostCenterComponent},
    { path: '/home/masters/costCenter/create', name: 'CreateCostCenter', element: CreateCostCenterComponent},
    { path: '/home/masters/costCenter/edit/:id', name: 'EditCostCenter', element: EditCostCenterComponent},
    { path: '/home/masters/samples', name: 'Sample', element: SamplesComponent},
    { path: '/home/masters/samples/create', name: 'CreateSample', element: CreateSamplesComponent},
    { path: '/home/masters/samples/edit/:id', name: 'EditSample', element: EditSamplesComponent},
    { path: '/home/massRevalidation', name: 'Mass Revalidation', element: MassRevalidationComponent},
    { path: '/home/report/allocationReport', name: 'Allocation Report', element: AllocationReportComponent},
    { path: '/home/pickingSlip/monthlyDispatch/details/invoiceUpload', name: 'Invoice Upload', element: InvoiceUploadDetailComponent},
    { path: '/home/changeAllocation', name: 'Change Allocation', element: ChangeAllocationComponent}
]

export default routes
