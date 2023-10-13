import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, Input, Row, Select, Spin, Table, Typography} from "antd";
import moment from "moment";
import {toMm, toYyyy} from "../../utils/DateUtils";
import {Excel} from "antd-table-saveas-excel";
import {
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getAllocationStatusDropdownStartAction,
    getDownloadAllocationStartAction,
    getMultipleAllocationDownloadStartAction,
    monthlyAllocationStartAction,
    submitMonthlyAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {
    selectAllocations,
    selectAllocationsLoading,
    selectCommonAllocationDone,
    selectDownloadAllocation,
    selectGetActiveUsers,
    selectGetAllocationStatusDropdown,
    selectItemsLoading,
    selectItemsToAllocate,
    selectMultipleAllocationDownload,
    selectPlan
} from "../../redux/selectors/allocationSelectors";
import {MonthlyAllocationInventoryColumns} from "./AllocationColumns";
import TeamAllocationComponent from "./TeamAllocationComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";

const allocationSteps = [
    {
        title: 'Select Items',
        content: 'First-content',
    },
    {
        title: 'Allocate Items',
        content: 'Second-content',
    }
]

const { Title } = Typography

const CreateSpecialAllocationComponent = ({authInfo, profileInfo, handleStatusDropdown, statusDropdown,
                                              itemsLoading,
                                              items,
                                              plan,
                                              allocations,
                                              allocationsLoading,
                                              selectCommonAllocationDone,
                                              handleCreateViewPlan,
                                              handleGoToAllocations,
                                              downloadAllocation, handleGetDownloadAllocation,
                                              handleActiveUserDownload, activeUsersDownload,
                                              handleSubmitMonthlyAllocation, multipleAllocationDownload, handleMultipleAllocation}) => {

    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [statusDD, setStatusDD] = useState()
    const [remark, setRemark] = useState()
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
    const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)

    const downloadAllocationColumn = [
        {'title': 'Team Name', 'dataIndex': 'teamName', 'key': 'teamName'},
        {'title': 'Recipient Name', 'dataIndex': 'recipentName', 'key': 'recipentName'},
        {'title': 'Recipient Code', 'dataIndex': 'recipentCode', 'key': 'recipentCode'},
        {'title': 'Designation', 'dataIndex': 'designation', 'key': 'designation'},
        {'title': 'Quantity Allocated', 'dataIndex': 'quantityAlocated', 'key': 'quantityAlocated'},
        {'title': 'Po No.', 'dataIndex': 'po_NO', 'key': 'po_NO'},
        {'title': 'Item Name', 'dataIndex': 'item_name', 'key': 'item_name'},
        {'title': 'Item Code', 'dataIndex': 'item_Code', 'key': 'item_Code'},
        {'title': 'Batch Number', 'dataIndex': 'batch_Number', 'key': 'batch_Number'}
    ]

    const activeUserDownloadColumn = [
        {'title': 'Team Name', 'dataIndex': 'teamName', 'key': 'teamName'},
        {'title': 'Role Name', 'dataIndex': 'roleName', 'key': 'roleName'},
        {'title': 'Total Employee', 'dataIndex': 'totalEmployee', 'key': 'totalEmployee'},
    ]

    const multipleAllocationDownloadColumn = [
        {'title': 'Team Name', 'dataIndex': 'teamName', 'key': 'teamName'},
        {'title': 'Recipient Name', 'dataIndex': 'recipientName', 'key': 'recipientName'},
        {'title': 'Recipient Code', 'dataIndex': 'recipientCode', 'key': 'recipientCode'},
        {'title': 'Designation', 'dataIndex': 'designationName', 'key': 'designationName'},
        {'title': 'ProductName/ProductCode','dataIndex':'', 'key': ''},
    ]

    const createViewClicked = () => {
        handleCreateViewPlan({
            certificate: authInfo.token,
            month: Number(toMm(yearMonth)),
            year: Number(toYyyy(yearMonth))
        })
    }



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedItems(selectedRows)
        },
        getCheckboxProps: (row) => ({
            disabled: (row.stock) == 0
        }),
    }

    const goToAllocation = () => {
        handleGoToAllocations({
            certificate: authInfo.token,
            selectedItems: selectedItems,
            planId: plan.id
        })
        setCurrentStep(currentStep + 1)
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }

    const SubmitMonthlyAllocation = () => {
        let data = {
            "month": Number(toMm(yearMonth)),
            "year": Number(toYyyy(yearMonth))
        }
        handleSubmitMonthlyAllocation({
            certificate: authInfo.token,
            data: data
        })
    }

    const DownloadAllocation = () => {
        if(plan.length !== 0){
            handleGetDownloadAllocation({
                certificate: authInfo.token,
                planId: plan.id
            })
            setDownloadAllocationFlag(true)
        }
    }

    const DownloadActiveUsers = () => {
        handleActiveUserDownload({
            certificate: authInfo.token,
            userId: profileInfo.id
        })
        setActiveUserDownloadFlag(true)
    }

    const DownloadMultipleAllocation = () => {
        let ccmId = []
        items.map(i =>
            ccmId.push(i.costCenterID)
        )
        handleMultipleAllocation({
            certificate: authInfo.token,
            ccmId: ccmId

        })
        setMultipleAllocationDownloadFlag(true)
    }

    useEffect(() => {
        if(downloadAllocationFlag){
            if(downloadAllocation.length > 0){
                const excel = new Excel();
                excel
                    .addSheet("Allocation")
                    .addColumns(downloadAllocationColumn)
                    .addDataSource(downloadAllocation, {
                        str2Percent: true
                    })
                    .saveAs( 'ALLOCATION.xlsx');
            }
            setDownloadAllocationFlag(false)
        }
    },[downloadAllocation])

    useEffect(() => {
        if(multipleAllocationDownloadFlag){
            if(multipleAllocationDownload.length > 0){
                const excel = new Excel();
                excel
                    .addSheet("Multiple Allocation")
                    .addColumns(multipleAllocationDownloadColumn)
                    .addDataSource(multipleAllocationDownload, {
                        str2Percent: true
                    })
                    .saveAs( 'MULTIPLE_ALLOCATION.xlsx');
            }
            setDownloadAllocationFlag(false)
        }
    },[downloadAllocation])


    useEffect(() => {
        if(activeUserDownloadFlag){
            if(activeUsersDownload.length > 0){
                const excel = new Excel();
                excel
                    .addSheet("Active User")
                    .addColumns(activeUserDownloadColumn)
                    .addDataSource(activeUsersDownload, {
                        str2Percent: true
                    })
                    .saveAs( 'ACTIVE_USER.xlsx');
            }
            setDownloadAllocationFlag(false)
        }
    },[activeUsersDownload])


    //
        // const column = [
        //     {
        //         title: 'Cost Center',
        //         key: 'costCenter',
        //         dataIndex: 'costCenter',
        //         width: '150px'
        //     },
        //     {
        //         title: 'Item',
        //         key: 'item',
        //         dataIndex: 'item',
        //         width: '150px'
        //     },
        //     {
        //         title: 'Stock',
        //         key: 'stock',
        //         dataIndex: 'stock',
        //         width: '150px'
        //     },
        //     {
        //         title: 'Expiry Date',
        //         key: 'expiryDate',
        //         dataIndex: 'expiryDate',
        //         width: '150px'
        //     },
        //     {
        //         title: 'PO No.',
        //         key: 'PO No.',
        //         dataIndex: 'PO No.',
        //         width: '150px'
        //     },
        //     {
        //         title: 'Base Pack',
        //         key: 'basePack',
        //         dataIndex: 'basePack',
        //         width: '150px'
        //     },
        //     {
        //         title: 'Quantity Allocated',
        //         key: 'quantityAllocated',
        //         dataIndex: 'quantityAllocated',
        //         width: '150px'
        //     },
        //     {
        //         title: '',
        //         key: '',
        //         dataIndex: '',
        //         width: '50px',
        //         render: () => {
        //             return <Button type={"link"}>Allocate Item</Button>
        //         }
        //     },
        //     {
        //         title: '',
        //         key: '',
        //         dataIndex: '',
        //         width: '150px',
        //         render: () => {
        //             return(<><Button>Download</Button>&nbsp;&nbsp;<Button>Upload CSV</Button></>)
        //         }
        //     }
        // ]
        //
        // const dataSource =[
        //     {
        //         key:'1',
        //
        //     }
        // ]


    return(
        <>
            <TitleWidget title={"Create Special Dispatches"} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={4}>
                    Status <br/><Select style={{ width: 140 }} onChange={(e) => setStatusDD(e)} placeholder={"Select Status"} options={statusDropdown} value={statusDD} />
                </Col>
                <Col span={6}>
                    Purpose <br/><Input value={remark} onChange={(e) => setRemark(e.target.value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={createViewClicked}>Create/View</Button>
                </Col>
                {/*<Col span={2}>*/}
                {/*    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>*/}
                {/*</Col>*/}
                {/*<Col span={2} offset={1}>*/}
                {/*    <Button type={'primary'} onClick={() => SubmitMonthlyAllocation()}>Submit</Button>*/}
                {/*</Col>*/}
            </Row>
            <br/><br/>
            <p>
                <b>Allocation Status</b> : Draft
                <br/>
                <b>Allocation Invoice Status</b>: Not initiated
            </p>
            <Row>
                <Col span={5} offset={19}><Input.Search/></Col>
            </Row>
            {currentStep === 0 &&
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={items}
                    columns={MonthlyAllocationInventoryColumns()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={itemsLoading}
                />
            }
            {currentStep === 1 && allocations !== undefined &&
                <Spin spinning={allocationsLoading}>
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={(f)=> console.log(f)}
                        expandIconPosition={'end'}
                    >
                        {allocations.map(allocation =>
                            <Panel
                                header={<AllocationHeaderComponent item={allocation.item}/>}
                                key={`${allocation.item.itemID}`}
                            >
                                <TeamAllocationComponent
                                    total={allocation.totalAllocation}
                                    teams={allocation.teams}
                                    item={allocation.item}
                                    costCenterId={allocation.costCenter}
                                    year = {toYyyy(yearMonth)}
                                    month = {toMm(yearMonth)}
                                    inventoryId = {allocation.inventoryId}
                                />
                            </Panel>)
                        }
                    </Collapse>
                </Spin>
            }
            <div style={{marginTop: 20}}>
                {currentStep < allocationSteps.length - 1 && (
                    <Button type='primary' onClick={goToAllocation}>
                        Start Allocation
                    </Button>
                )}
                {currentStep > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Select Items
                    </Button>
                )}
            </div>
        </>
    )
}

const AllocationHeaderComponent = ({item}) => {
    return (
        <Row gutter={[16,16]}>
            <Col span={24}>
                <Title level={5}>{item.itemName}</Title>
            </Col>
        </Row>
    )
}

CreateSpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    itemsLoading: PropTypes.bool,
    items: PropTypes.array,
    plan: PropTypes.any,
    allocationsLoading: PropTypes.bool,
    allocations: PropTypes.any,
    selectCommonAllocationDone: PropTypes.any,
    handleCreateViewPlan: PropTypes.func,
    handleGoToAllocations: PropTypes.func,
    handleGetDownloadAllocation: PropTypes.func,
    downloadAllocation: PropTypes.any,
    activeUsersDownload: PropTypes.any,
    handleActiveUserDownload: PropTypes.func,
    handleSubmitMonthlyAllocation: PropTypes.func,
    multipleAllocationDownload: PropTypes.any,
    handleMultipleAllocation: PropTypes.func,
    statusDropdown: PropTypes.any,
    handleStatusDropdown: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const items = selectItemsToAllocate(state)
    const itemsLoading = selectItemsLoading(state)
    const allocationsLoading = selectAllocationsLoading(state)
    const allocations = selectAllocations(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const plan=selectPlan(state)
    const downloadAllocation = selectDownloadAllocation(state)
    const activeUsersDownload = selectGetActiveUsers(state)
    const multipleAllocationDownload = selectMultipleAllocationDownload(state)
    console.log(allocations)
    const statusDropdown = selectGetAllocationStatusDropdown(state)
    return { authInfo, profileInfo, itemsLoading, items, plan, allocationsLoading, allocations, commonAllocationDone,
        downloadAllocation,activeUsersDownload, multipleAllocationDownload, statusDropdown }
}

const actions = {
    handleCreateViewPlan: monthlyAllocationStartAction,
    handleGoToAllocations: getAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleStatusDropdown: getAllocationStatusDropdownStartAction,
    handleSubmitMonthlyAllocation: submitMonthlyAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction

}

export default connect(mapState, actions) (CreateSpecialAllocationComponent)
