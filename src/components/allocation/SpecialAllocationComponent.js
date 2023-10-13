import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, DatePicker, Input, message, Row, Select, Spin, Steps, Table, Typography, Upload} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {MonthlyAllocationInventoryColumns} from "./AllocationColumns";
import TeamAllocationComponent from "./TeamAllocationComponent";
import moment from "moment/moment";
import {toYyyyMm} from "../../utils/DateUtils";
import {selectAllocations, selectAllocationsLoading, selectCommonAllocationDone, selectDownloadAllocation, selectGetActiveUsers, selectItemsLoading, selectItemsToAllocate, selectPlan} from "../../redux/selectors/allocationSelectors";
import {getActiveUsersStartAction, getAllocationsForPlanStartAction, getDownloadAllocationStartAction, monthlyAllocationStartAction, specialAllocationStartAction} from "../../redux/actions/allocation/allocationActions";
import {UploadOutlined} from "@ant-design/icons";
const { Step } = Steps
const { Panel } = Collapse
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

const SpecialAllocationComponent = ({authInfo,itemsLoading, profileInfo,
                                        items,
                                        plan,
                                        allocations,
                                        allocationsLoading,
                                        selectCommonAllocationDone,
                                        handleCreateViewPlan,
                                        handleGoToAllocations,
                                        downloadAllocation, handleGetDownloadAllocation,
                                        handleActiveUserDownload, activeUsersDownload,}) => {

    const navigate = useNavigate()
    let param = useParams()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
    const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)

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

    useEffect(() => {
       let data ={
           "month": param.month,
           "year": param.year,
           "name" : param.remark
       }
        handleCreateViewPlan({
            certificate: authInfo.token,
            // yearMonth: toYyyyMm(yearMonth)
            alloc: data
        })
    },[])

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



    // const searchData = () => {
    //     setFlag(true)
    //     setColumn([
    //         {
    //             title: 'Purpose',
    //             key: 'purpose',
    //             dataIndex: 'purpose',
    //             width: '250px'
    //         },
    //         {
    //             title: 'Requested On',
    //             key: 'requestedOn',
    //             dataIndex: 'requestedOn',
    //             width: '250px'
    //         },
    //         {
    //             title: '',
    //             key: '',
    //             dataIndex: '',
    //             width: '50px',
    //             render: () => {
    //                 return <Button type={"link"}>Edit</Button>
    //             }
    //         }
    //     ])
    //
    //     setDataSource([
    //         {
    //             key:'1',
    //             purpose: '',
    //             requestedOn: ''
    //         }
    //     ])
    // }

    const newAllocation = () => {
        return navigate('/home/allocations/special/createNew')
    }

    return(
        <>
            <TitleWidget title={'Special Allocation'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                {/*<Col span={3}>*/}
                {/*    <DatePicker onChange={(date) => setYearMonth(date)} picker='month' />*/}
                {/*</Col>*/}
                {/*<Col span={2}>*/}
                {/*    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>*/}
                {/*</Col>*/}
                <Col span={3}>
                    Month: {param.month}
                </Col>
                <Col span={3}>
                    Year: {param.year}
                </Col>
                <Col span={3}>
                    Purpose: {param.remark}
                </Col>
                <Col span={2} offset={13}>
                    <Button type={'secondary'}>Submit</Button>
                </Col>
            </Row>
            <Row gutter={[16,16]} style={{marginBottom: 40}}>

                <Col span={4} >
                    <Button type={'primary'} onClick={() => DownloadAllocation()}>Download Allocation</Button>
                </Col>
                <Col span={3} >
                    <Button type={'primary'} onClick={() => DownloadActiveUsers()}>Active Users</Button>
                </Col>
                <Col span={4}></Col>
                <Col span={3}>
                    <Button type={'primary'}>Multiple Allocation</Button>
                </Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} >Upload</Button>
                </Col>
            </Row>
            <Steps current={currentStep} style={{marginBottom: 20}}>
                {allocationSteps.map((item) =>
                    <Step key={item.title} title={item.title} />
                )}
            </Steps>
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
                                    item={allocation.item}/>
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
                {currentStep === allocationSteps.length - 1 && (
                    <Button type='primary' onClick={() => message.success('Processing complete!')}>
                        Save
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

SpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    itemsLoading: PropTypes.bool,
    profileInfo: PropTypes.any,
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
    return { authInfo, profileInfo, itemsLoading, items, plan, allocationsLoading, allocations, commonAllocationDone, downloadAllocation,activeUsersDownload }
}

const actions = {
    handleCreateViewPlan: specialAllocationStartAction,
    handleGoToAllocations: getAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
}

export default connect(mapState, actions) (SpecialAllocationComponent)
