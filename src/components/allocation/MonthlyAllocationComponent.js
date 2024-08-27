import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from '../../widgets/TitleWidget'
import {
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getDownloadAllocationStartAction,
    getMultipleAllocationDownloadStartAction,
    monthlyAllocationStartAction, multipleAllocationUploadMonthlyStartAction,
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
    selectMultipleAllocationExcelDownload,  selectMultipleAllocationUploadMonthly, selectMultipleAllocationUploadMonthlySuccess, selectMultipleAllocationUploadSuccess,
    selectPlan, selectPlanSubmitted, selectSubmitMonthlyAllocation, selectSubmitMonthlyAllocationSuccess
} from '../../redux/selectors/allocationSelectors'
import {Button, Col, Collapse, DatePicker, Divider, Input, InputNumber, message, Modal, Row, Space, Spin, Steps, Table, Typography, Upload} from 'antd'
import moment from 'moment'
import {toMm, toYyyy} from '../../utils/DateUtils'
import TeamAllocationComponent from './TeamAllocationComponent'
import {SearchOutlined, UploadOutlined} from "@ant-design/icons";
const { Step } = Steps
const { Panel } = Collapse
import {Excel} from "antd-table-saveas-excel";
import CSVDownload from "react-csv/src/components/Download";
import axios from "axios";
import {BASE_URL, GET_MULTIPLE_ALLOCATION_ALL_DOWNLOAD_API} from "../../api/apiConstants";
import Highlighter from "react-highlight-words";

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
                                        handleGoToAllocations, planSubmitted,
                                        downloadAllocation, handleGetDownloadAllocation, submitMonthlyAllocation,
                                        handleActiveUserDownload, activeUsersDownload, multipleAllocationExcel,
                                        handleSubmitMonthlyAllocation, multipleAllocationDownload, handleMultipleAllocation,
                                        handleMultipleAllocationUploadMonthly, submitMonthlyAllocationSuccess, multipleAllocationUploadMonthlySuccess,month,multipleAllocationUploadMonthly
                                    })=> {
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
    const [downloadData, setDownloadData] = useState([])
    const [file, setFile] = useState([])
    const [submitFlag, setSubmitFlag] = useState(false)
    const [startAllocationFlag, setStartAllocationFlag] = useState(false)

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

    const multipleAllocationDownloadColumn = [
        {'title': 'Team Name', 'dataIndex': 'teamName', 'key': 'teamName'},
        {'title': 'Recipient Name', 'dataIndex': 'recipientName', 'key': 'recipientName'},
        {'title': 'Recipient Code', 'dataIndex': 'recipientCode', 'key': 'recipientCode'},
        {'title': 'Designation', 'dataIndex': 'designationName', 'key': 'designationName'},
    ]

    const createViewClicked = () => {
        handleCreateViewPlan({
            certificate: authInfo.token,
            month: Number(toMm(yearMonth)),
            year: Number(toYyyy(yearMonth))
        })
    }

    useEffect(() => {
        if(planSubmitted == "true"){
            setSubmitFlag(true)
        }else{
            setSubmitFlag(false)
        }
    },[planSubmitted])

    useEffect(() => {
        if(profileInfo.userDesignation.id === "C71C2C60-33DB-481B-8AFF-5BAFA9654691"){
            setStartAllocationFlag(true)
        }else{
            setStartAllocationFlag(false)
        }
    },[profileInfo])

    useEffect(()=>{
        if(submitMonthlyAllocationSuccess){
            if(submitMonthlyAllocation!== undefined && Object.keys(submitMonthlyAllocation).length !== 0 ){
                message.success(submitMonthlyAllocation.message)
            }
            handleCreateViewPlan({
                certificate: authInfo.token,
                month: Number(toMm(yearMonth)),
                year: Number(toYyyy(yearMonth))
            })
        }
    }, [submitMonthlyAllocationSuccess])

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

    useEffect(() => {
        if(multipleAllocationUploadMonthlySuccess){

            console.log(multipleAllocationUploadMonthly)
           console.log(Object.keys(multipleAllocationUploadMonthly).length !== 0)
            if(multipleAllocationUploadMonthly!== undefined && Object.keys(multipleAllocationUploadMonthly).length !== 0  && multipleAllocationUploadMonthly.info == "error"){
                message.error(multipleAllocationUploadMonthly.message);
            }else{
                message.success(multipleAllocationUploadMonthly.message);
            }
            handleCreateViewPlan({
                certificate: authInfo.token,
                month: Number(toMm(yearMonth)),
                year: Number(toYyyy(yearMonth))
            })
        }
    }, [multipleAllocationUploadMonthlySuccess])

    const prev = () => {
        handleCreateViewPlan({
            certificate: authInfo.token,
            month: Number(toMm(yearMonth)),
            year: Number(toYyyy(yearMonth))
        })
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


        // Get the current date
        const currentDate = new Date();

        // Array of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];

        // Get the current month and year
        const currentMonth = monthNames[currentDate.getMonth()];
        const currentYear = currentDate.getFullYear();

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
                    .saveAs( `ALLOCATION-${currentMonth}-${currentYear}.xlsx`);
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
        handleMultipleAllocationUploadMonthly({
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




    const disabledDate = (current) => {
        const currentMonthYear = moment().format("YYYY-MM");
        const nextMonthYear = moment().add(1, "month").format("YYYY-MM");
        return !current.isSame(currentMonthYear, "month") && !current.isSame(nextMonthYear, "month");

    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ?   '#ff4d4f' :'#1677ff',
                    fontSize: '15px',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const MonthlyAllocationInventoryColumn = () => {
        const columns = [
            {
                title: 'Cost Center Name',
                dataIndex: 'costCenterName',

                key: 'itemName',
                ...getColumnSearchProps('costCenterName'),
            },
            {
                title: 'Item Name',
                dataIndex: 'itemName',
                key: 'itemName',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Available Stock',
                dataIndex: 'stock',
                key: 'itemName',
                ...getColumnSearchProps('stock'),
            },
            {
                title: 'PO NO',
                dataIndex: 'poNo',
                key: 'itemName',
                ...getColumnSearchProps('poNo'),
            },
            {
                title: 'Expiry Date',
                dataIndex: 'expiryDate',
                key: 'itemName',
                ...getColumnSearchProps('expiryDate'),
            },

            {
                title: 'Pack Size',
                dataIndex: 'packSize',
                key: 'packSize',
                ...getColumnSearchProps('packSize'),
            },
            {
                title: 'Allocated',
                dataIndex: 'quantityAllocated',
                key: 'quantityAllocated',
            },



        ]

        return columns
    }







    return(
        <>
            <TitleWidget title={'Monthly Plan'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                <Col span={3}>
                    <DatePicker onChange={(date) => setYearMonth(date)} picker='month' defaultValue={moment(yearMonth)}
                                disabledDate={disabledDate}
                    />

                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={17}>
                    <Button type={'primary'} onClick={() => SubmitMonthlyAllocation()}  disabled={submitFlag} >Submit</Button>
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
                {/*<Col span={3} >*/}
                {/*    <Button type={'primary'} onClick={() => DownloadActiveUsers()}>Active Users</Button>*/}
                {/*</Col>*/}
                <Col span={4}></Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={()=> DownloadMultipleAllocation()}  >Multiple Allocation</Button>
                </Col>
                <Col span={3}></Col>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}  >Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload} disabled={submitFlag} >Upload</Button>
                </Col>
            </Row>


                {/*<span>Total Rows: <b>{items?.length}</b></span>*/}


            <span>Total Rows: <b>{items?.length}</b></span>
            {currentStep === 0 &&



                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={items}
                    columns={MonthlyAllocationInventoryColumn()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={itemsLoading}

                />
            }
            {currentStep === 1 && allocations !== undefined &&
                <Spin spinning={allocationsLoading}>
                    <Collapse accordion={true}
                              destroyInactivePanel={true}
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
                    <Button type='primary' onClick={goToAllocation} disabled={submitFlag || startAllocationFlag}>
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
    handleMultipleAllocationUploadMonthly: PropTypes.func,
    submitMonthlyAllocationSuccess: PropTypes.any,
    multipleAllocationUploadMonthlySuccess: PropTypes.any,
    planSubmitted: PropTypes.any,
    submitMonthlyAllocation: PropTypes.any,
    multipleAllocationUploadMonthly:PropTypes.any
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
    const submitMonthlyAllocation = selectSubmitMonthlyAllocation(state)
    const submitMonthlyAllocationSuccess = selectSubmitMonthlyAllocationSuccess(state)
    const multipleAllocationUploadMonthlySuccess = selectMultipleAllocationUploadMonthlySuccess(state)
    const multipleAllocationUploadMonthly = selectMultipleAllocationUploadMonthly(state)
    const planSubmitted = selectPlanSubmitted(state)
    console.log("allocations - ", allocations )
    console.log(multipleAllocationDownload, multipleAllocationExcel)
    return { authInfo, profileInfo, itemsLoading, items, plan, allocationsLoading, allocations, commonAllocationDone, planSubmitted, submitMonthlyAllocation,
        downloadAllocation,activeUsersDownload, multipleAllocationDownload, multipleAllocationExcel, submitMonthlyAllocationSuccess, multipleAllocationUploadMonthlySuccess,multipleAllocationUploadMonthly }
}

const actions = {
    handleCreateViewPlan: monthlyAllocationStartAction,
    handleGoToAllocations: getAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleSubmitMonthlyAllocation: submitMonthlyAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleMultipleAllocationUploadMonthly: multipleAllocationUploadMonthlyStartAction
}

export default connect(mapState, actions)(MonthlyAllocationComponent)
