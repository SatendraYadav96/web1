import React, {useState, useEffect, useRef} from 'react'
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
    monthlyAllocationStartAction, multipleAllocationUploadStartAction, multipleAllocationUploadVirtualStartAction,
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
    selectItemsToAllocate, selectMultipleAllocationDownload, selectMultipleAllocationExcelDownload, selectMultipleAllocationUpload, selectMultipleAllocationUploadSuccess, selectMultipleAllocationUploadVirtual, selectMultipleAllocationUploadVirtualSuccess,
    selectPlan, selectSubmitVirtualAllocation, selectSubmitVirtualAllocationSuccess,
    selectVirtualAllocation,
    selectVirtualAllocationForPlan, selectVirtualAllocationLoading,
    selectVirtualItemLoading, selectVirtualPlanSubmitted
} from '../../redux/selectors/allocationSelectors'
import {Button, Col, Collapse, DatePicker, Divider, Input, InputNumber, message, Modal, Row, Space, Spin, Steps, Table, Typography, Upload} from 'antd'
import moment from 'moment'
import {toMm, toYyyy, toYyyyMm} from '../../utils/DateUtils'
import {MonthlyAllocationInventoryColumns} from './AllocationColumns'
import TeamAllocationComponent from './TeamAllocationComponent'
import VirtualTeamAllocationComponent from "./VirtualTeamAllocationComponent";
import {SearchOutlined, UploadOutlined} from "@ant-design/icons";
import {Excel} from "antd-table-saveas-excel";
import Highlighter from "react-highlight-words";
import CSVDownload from "react-csv/src/components/Download";
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
                                        downloadAllocation, handleGetDownloadAllocation, submitVirtualAllocation,
                                        handleActiveUserDownload, activeUsersDownload, virtualPlanSubmitted,
                                        handleSubmitVirtualAllocation,multipleAllocationDownload,  multipleAllocationExcel,
                                        handleMultipleAllocation, handleMultipleAllocationUploadVirtual, submitVirtualAllocationSuccess, multipleAllocationUploadVirtualSuccess,
                                        multipleAllocationUploadVirtual
                                    })=> {
    const [yearMonth, setYearMonth] = useState(moment(Date()))
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [downloadAllocationFlag, setDownloadAllocationFlag] = useState(false)
   // const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
    const [file, setFile] = useState([])
    const [submitFlag, setSubmitFlag] = useState(false)
    const [downloadData, setDownloadData] = useState([])
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

    // const activeUserDownloadColumn = [
    //     {'title': 'Team Name', 'dataIndex': 'teamName', 'key': 'teamName'},
    //     {'title': 'Role Name', 'dataIndex': 'roleName', 'key': 'roleName'},
    //     {'title': 'Total Employee', 'dataIndex': 'totalEmployee', 'key': 'totalEmployee'},
    // ]

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
        if(multipleAllocationUploadVirtualSuccess){
            handleCreateViewPlan({
                certificate: authInfo.token,
                month: Number(toMm(yearMonth)),
                year: Number(toYyyy(yearMonth))
            })
        }
    },[multipleAllocationUploadVirtualSuccess])

    useEffect(() => {
        if(virtualPlanSubmitted == "true"){
            setSubmitFlag(true)
        }else{
            setSubmitFlag(false)
        }
    },[virtualPlanSubmitted])

    useEffect(() => {
        if(profileInfo.userDesignation.id === "C71C2C60-33DB-481B-8AFF-5BAFA9654691"){
            setStartAllocationFlag(true)
        }else{
            setStartAllocationFlag(false)
        }
    },[profileInfo])

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
            if(submitVirtualAllocation!== undefined && Object.keys(submitVirtualAllocation).length !== 0 ){
                message.success(submitVirtualAllocation.message)
            }
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

    // const DownloadActiveUsers = () => {
    //     handleActiveUserDownload({
    //         certificate: authInfo.token,
    //         userId: profileInfo.id
    //     })
    //     setActiveUserDownloadFlag(true)
    // }

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

    // useEffect(() => {
    //     if(activeUserDownloadFlag){
    //         if(activeUsersDownload.length > 0){
    //             const excel = new Excel();
    //             excel
    //                 .addSheet("Active User")
    //                 .addColumns(activeUserDownloadColumn)
    //                 .addDataSource(activeUsersDownload, {
    //                     str2Percent: true
    //                 })
    //                 .saveAs( 'ACTIVE_USER.xlsx');
    //         }
    //         setDownloadAllocationFlag(false)
    //     }
    // },[activeUsersDownload])

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
        handleMultipleAllocationUploadVirtual({
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
        // const currentMonth = moment().month();
        // const nextMonth = currentMonth + 1;
        // const currentYear = moment().year();
        // return current.month() < currentMonth && current.year() == currentYear || current.month() > nextMonth && current.year() == currentYear;

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
                // align: 'right',
                ...getColumnSearchProps('packSize'),
            },
            {
                title: 'Allocated',
                dataIndex: 'quantityAllocated',
                key: 'quantityAllocated',
                //align: 'right',
               // ...getColumnSearchProps('quantityAllocated'),
            },
            // {
            //     title: 'Balance',
            //     dataIndex: 'stock',
            //     key: 'stock',
            //    // align: 'right',
            //    // ...getColumnSearchProps('stock'),
            //
            // },





        ]

        return columns
    }


    useEffect(() => {
        if(multipleAllocationUploadVirtualSuccess){

            console.log(multipleAllocationUploadVirtual)
            console.log(Object.keys(multipleAllocationUploadVirtual).length !== 0)
            if(multipleAllocationUploadVirtual!== undefined && Object.keys(multipleAllocationUploadVirtual).length !== 0  && multipleAllocationUploadVirtual.info == "error"){
                message.error(multipleAllocationUploadVirtual.message);
            }else{
                message.success(multipleAllocationUploadVirtual.message);
            }
        }
    }, [multipleAllocationUploadVirtualSuccess])



    return(
        <>
            <TitleWidget title={'Virtual Plan'} subTitle={'Create'}/>
            <Row style={{marginBottom: 40}}>
                <Col span={3}>
                    <DatePicker onChange={(date) => setYearMonth(date)} picker='month' defaultValue={moment(yearMonth)}
                               // disabledDate={(current) => current.isBefore(moment().subtract(0,"month"))}
                    //disabledDate={(current) => current.isAfter(moment().add(1,"month"))}
                                disabledDate={disabledDate}
                    />
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={createViewClicked}>Create/View</Button>
                </Col>
                <Col span={2} offset={17}>
                    <Button type={'primary'} onClick={() => SubmitVirtualAllocation()} disabled={submitFlag}>Submit</Button>
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
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload} disabled={submitFlag}>Upload</Button>
                </Col>
            </Row>
            <span>Total Rows: <b>{virtualAllocation?.length}</b></span>
            {currentStep === 0 &&
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={virtualAllocation}
                    columns={MonthlyAllocationInventoryColumn()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={virtualItemsLoading}
                />
            }
            {currentStep === 1 && allocations !== undefined &&
                <Spin spinning={allocationsLoading}>
                    <Collapse
                        accordion={true}
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
    handleMultipleAllocationUploadVirtual: PropTypes.func,
    submitVirtualAllocationSuccess: PropTypes.any,
    multipleAllocationUploadVirtualSuccess: PropTypes.any,
    virtualPlanSubmitted: PropTypes.any,
    submitVirtualAllocation: PropTypes.any,
    multipleAllocationUploadVirtual:PropTypes.any
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
    const multipleAllocationUploadVirtualSuccess = selectMultipleAllocationUploadVirtualSuccess(state)
    const virtualPlanSubmitted = selectVirtualPlanSubmitted(state)
    const submitVirtualAllocation = selectSubmitVirtualAllocation(state)
    const multipleAllocationUploadVirtual = selectMultipleAllocationUploadVirtual(state)
    console.log(virtualPlanSubmitted)
    return { authInfo, profileInfo, virtualItemsLoading, allocationsLoading, allocations, commonAllocationDone, downloadAllocation,activeUsersDownload, virtualAllocation,
        multipleAllocationDownload,  multipleAllocationExcel, submitVirtualAllocationSuccess, multipleAllocationUploadVirtualSuccess, virtualPlanSubmitted, submitVirtualAllocation,
        multipleAllocationUploadVirtual}
}

const actions = {
    handleCreateViewPlan: virtualAllocationStartAction,
    handleGoToAllocations: getVirtualAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleSubmitVirtualAllocation: submitVirtualAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleMultipleAllocationUploadVirtual: multipleAllocationUploadVirtualStartAction
}

export default connect(mapState, actions)(VirtualAllocationComponent)
