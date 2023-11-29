import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, Input, message, Row, Select, Spin, Steps, Table, Typography, Upload} from "antd";
import moment from "moment";
import {toMm, toYyyy} from "../../utils/DateUtils";
import {Excel} from "antd-table-saveas-excel";
import {
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getAllocationStatusDropdownStartAction,
    getDownloadAllocationStartAction,
    getMultipleAllocationDownloadStartAction, getSpecialAllocationsForPlanStartAction,
    monthlyAllocationStartAction, multipleAllocationUploadStartAction, specialAllocationStartAction,
    submitMonthlyAllocationStartAction, submitSpecialAllocationStartAction
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
    selectMultipleAllocationDownload, selectMultipleAllocationExcelDownload,
    selectPlan, selectSpecialAllocation, selectSpecialAllocationForPlan, selectSpecialAllocationLoading, selectSpecialItemLoading
} from "../../redux/selectors/allocationSelectors";
import {MonthlyAllocationInventoryColumns} from "./AllocationColumns";
import TeamAllocationComponent from "./TeamAllocationComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {UploadOutlined} from "@ant-design/icons";
import SpecialTeamAllocationComponent from "./SpecialTeamAllocationComponent";
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

const CreateSpecialAllocationComponent = ({authInfo, profileInfo,
                                              specialItemsLoading, specialAllocation,
                                              allocations,
                                              allocationsLoading,
                                              selectCommonAllocationDone,
                                              handleCreateViewPlan,
                                              handleGoToAllocations,handleSubmitSpecialAllocation,
                                              downloadAllocation, handleGetDownloadAllocation,
                                              handleActiveUserDownload, activeUsersDownload, multipleAllocationDownload,  multipleAllocationExcel,
                                              handleMultipleAllocation, handleMultipleAllocationUpload}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;

    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [statusDD, setStatusDD] = useState()
    const [remark, setRemark] = useState()
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
        // {'title': 'ProductName/ProductCode','dataIndex':'', 'key': ''},
    ]

    const createViewClicked = () => {
        let data ={
            "month": month,
            "year": year,
            "name": remark
        }
        handleCreateViewPlan({
            certificate: authInfo.token,
            // yearMonth: toYyyyMm(yearMonth)
            alloc: data
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
            planId: selectedItems[0].planId
        })
        setCurrentStep(currentStep + 1)
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }

    const SubmitSpecialAllocation = () => {
        let data = {
            "month": month,
            "year": year,
            "name" : remark
        }
        handleSubmitSpecialAllocation({
            certificate: authInfo.token,
            data: data
        })
    }

    const SubmitMonthlyAllocation = () => {
        let data = {
            "month": Number(toMm(yearMonth)),
            "year": Number(toYyyy(yearMonth))
        }
        handleSubmitSpecialAllocation({
            certificate: authInfo.token,
            data: data
        })
    }

    const DownloadAllocation = () => {
        if(specialAllocation.length !== 0){
            handleGetDownloadAllocation({
                certificate: authInfo.token,
                planId: specialAllocation[0].planId
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
        if(multipleAllocationDownloadFlag){
            if(multipleAllocationDownload.length > 0){
                const extraColumn = []
                if(multipleAllocationExcel.length > 0) {
                    multipleAllocationExcel.map(i => {
                            const list = {
                                'title': (i.productName + "-" + i.productCode + "-" + i.basepack + "-" + i.poNo + "-" + i.batchNo) ,
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
                planId: specialAllocation[0].planId
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




    return(
        <>
            <TitleWidget title={"Create Special Dispatches"} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent value = {month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent value = {year} onChange={(e) => setYear(e)}/>
                </Col>
                {/*<Col span={4}>*/}
                {/*    Status <br/><Select style={{ width: 140 }} onChange={(e) => setStatusDD(e)} placeholder={"Select Status"} options={statusDropdown} value={statusDD} />*/}
                {/*</Col>*/}
                <Col span={6}>
                    Purpose <br/><Input value={remark} onChange={(e) => setRemark(e.target.value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={8}>
                    <Button type={'primary'} onClick={() => SubmitSpecialAllocation()}>Submit</Button>
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
                    dataSource={specialAllocation}
                    columns={MonthlyAllocationInventoryColumns()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={specialItemsLoading}
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
                                <SpecialTeamAllocationComponent
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

CreateSpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    specialItemsLoading: PropTypes.bool,
    profileInfo: PropTypes.any,
    specialAllocation: PropTypes.array,
    allocationsLoading: PropTypes.bool,
    allocations: PropTypes.any,
    selectCommonAllocationDone: PropTypes.any,
    handleCreateViewPlan: PropTypes.func,
    handleGoToAllocations: PropTypes.func,
    handleGetDownloadAllocation: PropTypes.func,
    downloadAllocation: PropTypes.any,
    activeUsersDownload: PropTypes.any,
    handleActiveUserDownload: PropTypes.func,
    handleSubmitSpecialAllocation: PropTypes.func,
    multipleAllocationExcel: PropTypes.any,
    multipleAllocationDownload: PropTypes.any,
    handleMultipleAllocation: PropTypes.func,
    handleMultipleAllocationUpload: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const allocationsLoading = selectSpecialAllocationLoading(state)
    const allocations = selectSpecialAllocationForPlan(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const downloadAllocation = selectDownloadAllocation(state)
    const activeUsersDownload = selectGetActiveUsers(state)
    const specialAllocation = selectSpecialAllocation(state)
    const specialItemsLoading = selectSpecialItemLoading(state)
    const multipleAllocationDownload = selectMultipleAllocationDownload(state)
    const multipleAllocationExcel = selectMultipleAllocationExcelDownload(state)
    return { authInfo, profileInfo, specialItemsLoading, specialAllocation, allocationsLoading, allocations, commonAllocationDone, downloadAllocation,activeUsersDownload,
        multipleAllocationDownload,  multipleAllocationExcel}
}

const actions = {
    handleGoToAllocations: getSpecialAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleCreateViewPlan: specialAllocationStartAction,
    handleStatusDropdown: getAllocationStatusDropdownStartAction,
    handleSubmitMonthlyAllocation: submitMonthlyAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleSubmitSpecialAllocation: submitSpecialAllocationStartAction,
    handleMultipleAllocationUpload: multipleAllocationUploadStartAction

}

export default connect(mapState, actions) (CreateSpecialAllocationComponent)
