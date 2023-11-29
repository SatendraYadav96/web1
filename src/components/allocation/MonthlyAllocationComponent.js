import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from '../../widgets/TitleWidget'
import {
    allocateToAllTeamsAction,
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getDownloadAllocationStartAction,
    getMultipleAllocationDownloadStartAction,
    monthlyAllocationStartAction,
    multipleAllocationUploadStartAction,
    submitMonthlyAllocationStartAction
} from '../../redux/actions/allocation/allocationActions'
import {
    selectAllocations,
    selectAllocationsLoading,
    selectCommonAllocationDone,
    selectDownloadAllocation,
    selectGetActiveUsers,
    selectItemsLoading,
    selectItemsToAllocate,
    selectMultipleAllocationDownload,
    selectMultipleAllocationExcelDownload,
    selectPlan
} from '../../redux/selectors/allocationSelectors'
import {Button, Col, Collapse, DatePicker, Divider, InputNumber, message, Modal, Row, Spin, Steps, Table, Typography, Upload} from 'antd'
import moment from 'moment'
import {toMm, toYyyy, toYyyyMm} from '../../utils/DateUtils'
import {MonthlyAllocationInventoryColumns} from './AllocationColumns'
import TeamAllocationComponent from './TeamAllocationComponent'
import {UploadOutlined} from "@ant-design/icons";
const { Step } = Steps
const { Panel } = Collapse
import {Excel} from "antd-table-saveas-excel";
import CSVDownload from "react-csv/src/components/Download";
import axios from "axios";
import {BASE_URL, GET_MULTIPLE_ALLOCATION_ALL_DOWNLOAD_API} from "../../api/apiConstants";

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

const MonthlyAllocationComponent = ({authInfo, profileInfo,
                                        itemsLoading,
                                        items,
                                        plan,
                                        allocations,
                                        allocationsLoading,
                                        selectCommonAllocationDone,
                                        handleCreateViewPlan,
                                        handleGoToAllocations,
                                        downloadAllocation, handleGetDownloadAllocation,
                                        handleActiveUserDownload, activeUsersDownload, multipleAllocationExcel,
                                        handleSubmitMonthlyAllocation, multipleAllocationDownload, handleMultipleAllocation, handleMultipleAllocationUpload
                                    })=> {
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
    const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
    const [downloadData, setDownloadData] = useState([])
    const [file, setFile] = useState([])
    // const [selectedMonth, setSelectedMonth] = useState(null);
    // const currentMonth = new Date().getMonth();
    // const currentYear = new Date().getFullYear();
    //
    // const [selectedMonth, setSelectedMonth] = useState(null);
    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth();

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
                planId: plan.id
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

    const convertToCSV = (data) =>{
        const csvRows = [];

        // Headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Values
        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    }

    // Function to trigger CSV download
    // const downloadCSV = (data) => {
    //     const csvContent = this.convertToCSV(data);
    //     const blob = new Blob([csvContent], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob);
    //
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'data.csv');
    //     document.body.appendChild(link);
    //     link.click();
    //
    //     // Cleanup
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    // }

    // const downloadCsv = async () => {
    //     try {
    //         // Replace 'http://your-backend-url/api/csv/download' with your actual backend URL
    //         const response = await axios.post('http://104.237.6.220:8080/v1/allocation/getMultipleAllocationAll', {
    //             // responseType: 'arraybuffer',
    //         },{
    //             headers: {
    //                 'Content-Type': 'text/csv',
    //                 'Authorization': authInfo.token
    //             }
    //         });
    //
    //         const csvByteArray = new Uint8Array(response.data);
    //         const csvString = new TextDecoder('utf-8').decode(csvByteArray);
    //
    //         // Trigger download
    //         const blob = new Blob([csvString], { type: 'text/csv' });
    //         const link = document.createElement('a');
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = 'data.csv';
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error('Error downloading CSV:', error);
    //     }
    // };


    const disabledDate = (current) => {
        const currentMonth = moment().month();
        const nextMonth = currentMonth + 1;
        const currentYear = moment().year();
        return current.month() < currentMonth && current.year() == currentYear || current.month() > nextMonth && current.year() == currentYear;
    };

    // const disabledSubmitButton = (current) => {
    //     const selectedMonth = setYearMonth(date)
    //     return current.month() > selectedMonth
    // }




    return(
        <>
            <TitleWidget title={'Monthly Plan'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                <Col span={3}>
                    <DatePicker onChange={(date) => setYearMonth(date)} picker='month'
                    //             disabledDate={(current) => current.isBefore(moment().subtract(0,"month"))

                                //disabledDate={(current) => current.isAfter(moment().add(1,"month"))}
                                disabledDate={disabledDate}
                    />

                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={17}>
                    <Button type={'primary'} onClick={() => SubmitMonthlyAllocation()}   >Submit</Button>
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


                {/*<span>Total Rows: <b>{items?.length}</b></span>*/}



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
            {downloadData.length > 0 && <CSVDownload
                data={downloadData}/>
                // target="_blank"></CSVDownload>
            }
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

MonthlyAllocationComponent.propTypes = {
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
    multipleAllocationExcel: PropTypes.any,
    handleMultipleAllocationUpload: PropTypes.func
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
    const multipleAllocationExcel = selectMultipleAllocationExcelDownload(state)
    console.log(allocations)
    console.log(multipleAllocationDownload, multipleAllocationExcel)
    return { authInfo, profileInfo, itemsLoading, items, plan, allocationsLoading, allocations, commonAllocationDone,
        downloadAllocation,activeUsersDownload, multipleAllocationDownload, multipleAllocationExcel }
}

const actions = {
    handleCreateViewPlan: monthlyAllocationStartAction,
    handleGoToAllocations: getAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleSubmitMonthlyAllocation: submitMonthlyAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleMultipleAllocationUpload: multipleAllocationUploadStartAction
}

export default connect(mapState, actions)(MonthlyAllocationComponent)
