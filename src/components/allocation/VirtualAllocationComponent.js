import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from '../../widgets/TitleWidget'
import {
    allocateToAllTeamsAction,
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getDownloadAllocationStartAction, getMultipleAllocationDownloadStartAction,
    getVirtualAllocationsForPlanStartAction,
    monthlyAllocationStartAction, multipleAllocationUploadStartAction,
    submitMonthlyAllocationStartAction, submitVirtualAllocationStartAction,
    virtualAllocationStartAction
} from '../../redux/actions/allocation/allocationActions'
import {
    selectAllocations,
    selectAllocationsLoading,
    selectCommonAllocationDone,
    selectDownloadAllocation,
    selectGetActiveUsers,
    selectItemsLoading,
    selectItemsToAllocate, selectMultipleAllocationDownload, selectMultipleAllocationExcelDownload, selectMultipleAllocationUploadSuccess,
    selectPlan, selectSubmitVirtualAllocationSuccess,
    selectVirtualAllocation,
    selectVirtualAllocationForPlan, selectVirtualAllocationLoading,
    selectVirtualItemLoading
} from '../../redux/selectors/allocationSelectors'
import {Button, Col, Collapse, DatePicker, Divider, InputNumber, message, Modal, Row, Spin, Steps, Table, Typography, Upload} from 'antd'
import moment from 'moment'
import {toMm, toYyyy, toYyyyMm} from '../../utils/DateUtils'
import {MonthlyAllocationInventoryColumns} from './AllocationColumns'
import TeamAllocationComponent from './TeamAllocationComponent'
import VirtualTeamAllocationComponent from "./VirtualTeamAllocationComponent";
import {UploadOutlined} from "@ant-design/icons";
import {Excel} from "antd-table-saveas-excel";
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

const VirtualAllocationComponent = ({authInfo, profileInfo,
                                        virtualItemsLoading,
                                        virtualAllocation,
                                        items,
                                        plan,
                                        allocations,
                                        allocationsLoading,
                                        selectCommonAllocationDone,
                                        handleCreateViewPlan,
                                        handleGoToAllocations,
                                        downloadAllocation, handleGetDownloadAllocation,
                                        handleActiveUserDownload, activeUsersDownload,
                                        handleSubmitVirtualAllocation,multipleAllocationDownload,  multipleAllocationExcel,
                                        handleMultipleAllocation, handleMultipleAllocationUpload, submitVirtualAllocationSuccess, multipleAllocationUploadSuccess
                                    })=> {
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
    const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
    const [file, setFile] = useState([])

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
        // {'title': 'ProductName/ProductCode/Base Pack/Batch No','dataIndex':'', 'key': ''},
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
        console.log(selectedItems)
        handleGoToAllocations({
            certificate: authInfo.token,
            selectedItems: selectedItems,
            planId: selectedItems[0].planId
        })
        setCurrentStep(currentStep + 1)
    }

    useEffect(() => {
        if(multipleAllocationUploadSuccess){
            handleCreateViewPlan({
                certificate: authInfo.token,
                month: Number(toMm(yearMonth)),
                year: Number(toYyyy(yearMonth))
            })
        }
    },[multipleAllocationUploadSuccess])

    const SubmitVirtualAllocation = () => {
        let data = {
            "month": Number(toMm(yearMonth)),
            "year": Number(toYyyy(yearMonth))
        }
        handleSubmitVirtualAllocation({
            certificate: authInfo.token,
            data: data
        })
    }

    useEffect(() => {
        if(submitVirtualAllocationSuccess){
            handleCreateViewPlan({
                certificate: authInfo.token,
                month: Number(toMm(yearMonth)),
                year: Number(toYyyy(yearMonth))
            })
        }
    }, [submitVirtualAllocationSuccess])

    const prev = () => {
        handleCreateViewPlan({
            certificate: authInfo.token,
            month: Number(toMm(yearMonth)),
            year: Number(toYyyy(yearMonth))
        })
        setCurrentStep(currentStep - 1)
    }

    const DownloadAllocation = () => {
        if(virtualAllocation.length !== 0){
            handleGetDownloadAllocation({
                certificate: authInfo.token,
                planId: virtualAllocation[0].planId
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
        selectedItems.map(i => {
                const list = {
                    "ccmId": i.costCenterID,
                    "inventoryId": i.inventoryId
                }
                ccmId.push(list)
            }
        )
        if(ccmId.length > 0){
            handleMultipleAllocation({
                certificate: authInfo.token,
                mulAlloc: ccmId

            })
            setMultipleAllocationDownloadFlag(true)
        }
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

    useEffect(() => {
        if(multipleAllocationDownloadFlag){
            if(multipleAllocationDownload.length > 0){
                const extraColumn = []
                if(multipleAllocationExcel.length > 0) {
                    multipleAllocationExcel.map(i => {
                            const list = {
                                'title': (i.productName + "/" + i.productCode + "/" + i.basepack + "/" + i.poNo + "/" + i.batchNo) ,
                            }
                            multipleAllocationDownloadColumn.push(list)
                        }
                    )
                }
                const excel = new Excel();
                excel
                    .addSheet("Multiple Allocation")
                    .addColumns(multipleAllocationDownloadColumn)
                    .addDataSource(multipleAllocationDownload, {
                        str2Percent: true
                    })
                    .saveAs( 'MULTIPLE_ALLOCATION.xlsx');
            }
            setMultipleAllocationDownloadFlag(false)
        }
    },[multipleAllocationDownload])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        beforeUpload: (file) => {
            const isCSV = file.type === 'text/csv';
            if (!isCSV) {
                message?.error(`${file.name} is not a csv file`);
            }
            return isCSV || Upload.LIST_IGNORE;
        },
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        const bytecode = base64.split(",")[1];
        console.log(newFile)
        console.log(bytecode)
        handleMultipleAllocationUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
                planId: virtualAllocation[0].planId
            }
        })
    }

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info.file.name)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }

    const disabledDate = (current) => {
        const currentMonth = moment().month();
        const nextMonth = currentMonth + 1;
        const currentYear = moment().year();
        return current.month() < currentMonth && current.year() == currentYear || current.month() > nextMonth && current.year() == currentYear;
    };


    // const disabledSubmitButton = (current) => {
    //     const currentMonth = moment().month();
    //     const nextMonth = currentMonth + 1;
    //     return nextMonth > current.month()
    // }


    return(
        <>
            <TitleWidget title={'Virtual Plan'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                <Col span={3}>
                    <DatePicker onChange={(date) => setYearMonth(date)} picker='month'
                               // disabledDate={(current) => current.isBefore(moment().subtract(0,"month"))}
                    //disabledDate={(current) => current.isAfter(moment().add(1,"month"))}
                                disabledDate={disabledDate}
                    />
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={17}>
                    <Button type={'primary'} onClick={() => SubmitVirtualAllocation}   //disabledDate={disabledSubmitButton}
                    >Submit</Button>
                </Col>
            </Row>
            <Steps current={currentStep} style={{marginBottom: 20}}>
                {allocationSteps.map((item) =>
                    <Step key={item.title} title={item.title} />
                )}
            </Steps>
            <Row gutter={[16,16]} style={{marginBottom: 40}}>

                <Col span={4} >
                    <Button type={'primary'} onClick={() => DownloadAllocation()}>Download Allocation</Button>
                </Col>
                <Col span={3} >
                    <Button type={'primary'} onClick={() => DownloadActiveUsers()}>Active Users</Button>
                </Col>
                <Col span={4}></Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={()=> DownloadMultipleAllocation()}>Multiple Allocation</Button>
                </Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
            </Row>
            {currentStep === 0 &&
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={virtualAllocation}
                    columns={MonthlyAllocationInventoryColumns()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={virtualItemsLoading}
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
                                <VirtualTeamAllocationComponent
                                    total={allocation.totalAllocation}
                                    teams={allocation.teams}
                                    item={allocation.item}
                                    costCenterId={allocation.costCenter}
                                    year = {toYyyy(yearMonth)}
                                    month = {toMm(yearMonth)}
                                    inventoryId = {allocation.inventoryId}/>
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

VirtualAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    virtualItemsLoading: PropTypes.bool,
    items: PropTypes.array,
    plan: PropTypes.any,
    virtualAllocation: PropTypes.any,
    allocationsLoading: PropTypes.bool,
    allocations: PropTypes.any,
    selectCommonAllocationDone: PropTypes.any,
    handleCreateViewPlan: PropTypes.func,
    handleGoToAllocations: PropTypes.func,
    handleGetDownloadAllocation: PropTypes.func,
    downloadAllocation: PropTypes.any,
    activeUsersDownload: PropTypes.any,
    handleActiveUserDownload: PropTypes.func,
    handleSubmitVirtualAllocation: PropTypes.func,
    multipleAllocationExcel: PropTypes.any,
    multipleAllocationDownload: PropTypes.any,
    handleMultipleAllocation: PropTypes.func,
    handleMultipleAllocationUpload: PropTypes.func,
    submitVirtualAllocationSuccess: PropTypes.any,
    multipleAllocationUploadSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    // const items = selectItemsToAllocate(state)
    const virtualItemsLoading = selectVirtualItemLoading(state)
    const allocationsLoading = selectVirtualAllocationLoading(state)
    const allocations = selectVirtualAllocationForPlan(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    // const plan=selectPlan(state)
    const downloadAllocation = selectDownloadAllocation(state)
    const activeUsersDownload = selectGetActiveUsers(state)
    const virtualAllocation = selectVirtualAllocation(state)
    console.log(allocations)
    const multipleAllocationDownload = selectMultipleAllocationDownload(state)
    const multipleAllocationExcel = selectMultipleAllocationExcelDownload(state)
    const submitVirtualAllocationSuccess = selectSubmitVirtualAllocationSuccess(state)
    const multipleAllocationUploadSuccess = selectMultipleAllocationUploadSuccess
    return { authInfo, profileInfo, virtualItemsLoading, allocationsLoading, allocations, commonAllocationDone, downloadAllocation,activeUsersDownload, virtualAllocation,
        multipleAllocationDownload,  multipleAllocationExcel, submitVirtualAllocationSuccess, multipleAllocationUploadSuccess}
}

const actions = {
    handleCreateViewPlan: virtualAllocationStartAction,
    handleGoToAllocations: getVirtualAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleSubmitVirtualAllocation: submitVirtualAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleMultipleAllocationUpload: multipleAllocationUploadStartAction
}

export default connect(mapState, actions)(VirtualAllocationComponent)
