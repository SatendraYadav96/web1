import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, DatePicker, Input, message, Row, Select, Space, Spin, Steps, Table, Typography, Upload} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {MonthlyAllocationInventoryColumns} from "./AllocationColumns";
import TeamAllocationComponent from "./TeamAllocationComponent";
import moment from "moment/moment";
import {toMm, toYyyy, toYyyyMm} from "../../utils/DateUtils";
import {
    selectAllocations,
    selectAllocationsLoading,
    selectCommonAllocationDone,
    selectDownloadAllocation,
    selectGetActiveUsers,
    selectItemsLoading,
    selectItemsToAllocate, selectMultipleAllocationDownload, selectMultipleAllocationExcelDownload, selectMultipleAllocationUpload, selectMultipleAllocationUploadSuccess,
    selectPlan,
    selectSpecialAllocation, selectSpecialAllocationForPlan, selectSpecialAllocationLoading, selectSpecialDifferentialAllocationSave, selectSpecialItemLoading, selectSpecialPlanSubmitted, selectSubmitSpecialAllocation, selectSubmitSpecialAllocationSuccess,
    selectVirtualAllocation,
    selectVirtualItemLoading
} from "../../redux/selectors/allocationSelectors";
import {
    getActiveUsersStartAction,
    getAllocationsForPlanStartAction,
    getDownloadAllocationStartAction, getMultipleAllocationDownloadStartAction,
    getSpecialAllocationsForPlanStartAction,
    monthlyAllocationStartAction, multipleAllocationUploadStartAction,
    specialAllocationStartAction,
    submitSpecialAllocationStartAction,
    submitVirtualAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {SearchOutlined, UploadOutlined} from "@ant-design/icons";
import SpecialTeamAllocationComponent from "./SpecialTeamAllocationComponent";
import {Excel} from "antd-table-saveas-excel";
import {AUTH_CERTIFICATE, BASE_URL, GET_MULTIPLE_ALLOCATION_ALL_DOWNLOAD_API} from "../../api/apiConstants";
import Highlighter from "react-highlight-words";
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

const SpecialAllocationComponent = ({authInfo, profileInfo,
                                        specialItemsLoading, specialAllocation,
                                        allocations,
                                        allocationsLoading,
                                        selectCommonAllocationDone,
                                        handleCreateViewPlan, specialPlanSubmitted,
                                        handleGoToAllocations, handleSubmitSpecialAllocation,
                                        downloadAllocation, handleGetDownloadAllocation,
                                        handleActiveUserDownload, activeUsersDownload,
                                        multipleAllocationDownload,  multipleAllocationExcel,
                                        handleMultipleAllocation, handleMultipleAllocationUpload, submitSpecialAllocation,
                                        submitSpecialAllocationSuccess, multipleAllocationUploadSuccess, multipleAllocationUpload}) => {

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
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
    const [count, setCount] = useState(1)
    const [file, setFile] = useState([])
    const [submitFlag, setSubmitFlag] = useState(false)

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

    useEffect(() => {
        if(multipleAllocationUploadSuccess){
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
        }
    },[multipleAllocationUploadSuccess])

    useEffect(() => {
        if(submitSpecialAllocationSuccess){
            if(submitSpecialAllocation!== undefined && Object.keys(submitSpecialAllocation).length !== 0 ){
                message.success(submitSpecialAllocation.message)
            }
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
        }
    }, [submitSpecialAllocationSuccess])

    useEffect(() => {
        if(specialPlanSubmitted == "true"){
            setSubmitFlag(true)
        }else{
            setSubmitFlag(false)
        }
    },[specialPlanSubmitted])

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
        setCurrentStep(currentStep - 1)
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

    const downloadInvoice = () => {
        let ccmId = []
        selectedItems.map(i => {
                const list = {
                    "ccmId": i.costCenterID,
                    "inventoryId": i.inventoryId
                }
                ccmId.push(list)
            }
        )
        console.log(ccmId)
        if(ccmId.length > 0) {
            const url = `${BASE_URL}${GET_MULTIPLE_ALLOCATION_ALL_DOWNLOAD_API.url}`;
            fetch(url, {
                method: "POST",
                body: JSON.stringify(ccmId),
                headers :new Headers({
                'Authorization': authInfo.token,
                'Content-Type': "application/json"
            }),

        })
        .then(response => {
                console.log(response);
                response.blob().then(blob => {
                    // let url = window.URL.createObjectURL(blob);
                    // let a = document.createElement('a');
                    // a.href = url;
                    // a.download = 'Multiple_Allocation.csv';
                    // a.click();
                    console.log(blob)
                });
                //window.location.href = response.url;
            });
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

    const downloadCSV = (csv, filename) => {
        const linkSource = `data:application/csv;base64,${csv}`;
        const downloadLink = document.createElement("a");
        const fileName = `${filename}.csv`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        console.log("printed")
    }


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

    const SubmitSpecialAllocation = () => {
        let data = {
            "month": Number(param.month),
            "year": Number(param.year),
            "name" : param.remark
        }
        handleSubmitSpecialAllocation({
            certificate: authInfo.token,
            data: data
        })
    }



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
                    color: filtered ? '#0099FFFF' : '#0099FFFF',
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
                //...getColumnSearchProps('quantityAllocated'),
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
        if(multipleAllocationUploadSuccess){

            console.log(multipleAllocationUpload)
            console.log(Object.keys(multipleAllocationUpload).length !== 0)
            if(multipleAllocationUpload!== undefined && Object.keys(multipleAllocationUpload).length !== 0  && multipleAllocationUpload.info == "error"){
                message.error(multipleAllocationUpload.message);
            }else{
                message.success(multipleAllocationUpload.message);
            }
        }
    }, [multipleAllocationUploadSuccess])


    const handleBacks = () => {
        return navigate("/home/allocations/special/create")
    }

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
                <Col span={1}>
                    Month: {param.month}
                </Col>
                <Col span={1}>
                    Year: {param.year}
                </Col>
                <Col span={3}>
                    Purpose: {param.remark}
                </Col>

                <Col span={2}>
                    <Button type={"primary"} onClick={createViewClicked}>Create/View</Button>


                </Col>

                <Col span={2}>
                    <Button type={"primary"} onClick={handleBacks}>Back</Button>
                </Col>
                <Col span={2} offset={13}>
                    <Button type={'primary'} onClick={() => SubmitSpecialAllocation()} disabled={submitFlag}>Submit</Button>
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
                    <Button type={'primary'} onClick={()=> DownloadMultipleAllocation()}>Multiple Allocation</Button>
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

            {/*<p>*/}
            {/*    <b>Allocation Status</b> : Submit*/}
            {/*    <br/>*/}
            {/*    <b>Allocation Invoice Status</b>: Not initiated*/}
            {/*</p>*/}


            <Steps current={currentStep} style={{marginBottom: 20}}>
                {allocationSteps.map((item) =>
                    <Step key={item.title} title={item.title} />
                )}
            </Steps>

            <span>Total Rows: <b>{specialAllocation?.length}</b></span>

            {currentStep === 0 &&
                <Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    scroll={{y: '100%'}}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    dataSource={specialAllocation}
                    columns={MonthlyAllocationInventoryColumn()}
                    size={'small'}
                    rowKey={'itemID'}
                    loading={specialItemsLoading}
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
                    <Button type='primary' onClick={goToAllocation} disabled={submitFlag}>
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

SpecialAllocationComponent.propTypes = {
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
    handleMultipleAllocationUpload: PropTypes.func,
    submitSpecialAllocationSuccess: PropTypes.any,
    multipleAllocationUploadSuccess: PropTypes.any,
    specialPlanSubmitted: PropTypes.any,
    submitSpecialAllocation: PropTypes.any,
    multipleAllocationUpload:PropTypes.any,

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
    const submitSpecialAllocationSuccess = selectSubmitSpecialAllocationSuccess(state)
    const multipleAllocationUploadSuccess = selectMultipleAllocationUploadSuccess(state)
    const specialPlanSubmitted = selectSpecialPlanSubmitted(state)
    const submitSpecialAllocation = selectSubmitSpecialAllocation(state)
    const multipleAllocationUpload = selectMultipleAllocationUpload(state)

    return { authInfo, profileInfo, specialItemsLoading, specialAllocation, allocationsLoading, allocations, commonAllocationDone, submitSpecialAllocation,
        downloadAllocation,activeUsersDownload, multipleAllocationDownload, specialPlanSubmitted, multipleAllocationExcel, submitSpecialAllocationSuccess, multipleAllocationUploadSuccess,
        multipleAllocationUpload}
}

const actions = {
    handleCreateViewPlan: specialAllocationStartAction,
    handleGoToAllocations: getSpecialAllocationsForPlanStartAction,
    handleGetDownloadAllocation: getDownloadAllocationStartAction,
    handleActiveUserDownload: getActiveUsersStartAction,
    handleSubmitSpecialAllocation: submitSpecialAllocationStartAction,
    handleMultipleAllocation: getMultipleAllocationDownloadStartAction,
    handleMultipleAllocationUpload: multipleAllocationUploadStartAction
}

export default connect(mapState, actions) (SpecialAllocationComponent)
