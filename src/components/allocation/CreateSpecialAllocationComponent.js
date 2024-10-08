import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Collapse, Input, message, Row, Select, Space, Spin, Steps, Table, Typography, Upload} from "antd";
import moment from "moment";
import {toMm, toYyyy} from "../../utils/DateUtils";
import {Excel} from "antd-table-saveas-excel";
import {useNavigate, useParams} from "react-router-dom";


import {
    getActiveUsersStartAction,
    getAllocationStatusDropdownStartAction,
    getDownloadAllocationStartAction,
    getMultipleAllocationDownloadStartAction, getSpecialAllocationsForPlanStartAction,
     multipleAllocationUploadSpecialStartAction, specialAllocationStartAction,
    submitMonthlyAllocationStartAction, submitSpecialAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {
    selectCommonAllocationDone,
    selectDownloadAllocation,
    selectGetActiveUsers,
    selectMultipleAllocationDownload, selectMultipleAllocationExcelDownload, selectMultipleAllocationUploadSpecial, selectMultipleAllocationUploadSpecialSuccess, selectMultipleAllocationUploadSuccess,
    selectSpecialAllocation, selectSpecialAllocationForPlan, selectSpecialAllocationLoading, selectSpecialItemLoading, selectSpecialPlanSubmitted
} from "../../redux/selectors/allocationSelectors";

import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {SearchOutlined, UploadOutlined} from "@ant-design/icons";
import SpecialTeamAllocationComponent from "./SpecialTeamAllocationComponent";
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

const CreateSpecialAllocationComponent = ({authInfo, profileInfo,
                                              specialItemsLoading, specialAllocation,
                                              allocations,
                                              allocationsLoading,
                                              specialPlanSubmitted,
                                              selectCommonAllocationDone,
                                              handleCreateViewPlan,
                                              handleGoToAllocations,handleSubmitSpecialAllocation,
                                              downloadAllocation, handleGetDownloadAllocation,
                                              handleActiveUserDownload, activeUsersDownload, multipleAllocationDownload,  multipleAllocationExcel,
                                              handleMultipleAllocation, handleMultipleAllocationUploadSpecial,items,planSubmitted,
                                              multipleAllocationUploadSpecialSuccess,multipleAllocationUploadSpecial,multipleAllocationUploadSuccess,multipleAllocationUpload},
                                          ) => {


    const navigates = useNavigate()
    let param = useParams()

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
    //const [activeUserDownloadFlag, setActiveUserDownloadFlag] = useState(false)
    const [multipleAllocationDownloadFlag, setMultipleAllocationDownloadFlag] = useState(false)
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



    const MonthlyAllocationInventoryColumns = () => {
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
                ...getColumnSearchProps('quantityAllocated'),
            },


        ]

        return columns
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

    const createViewClicked = () => {
        let data ={
            "month": month,
            "year": year,
            "name": remark
        }
        handleCreateViewPlan({
            certificate: authInfo.token,
            alloc: data
        })
    }


    useEffect(() => {
        if(multipleAllocationUploadSpecialSuccess){

            console.log(multipleAllocationUploadSpecial)


            if (multipleAllocationUploadSpecial == undefined ) {
                // Object is truthy and has properties, proceed
                console.log("data is undefined")
            } else {
                // Object is empty or undefined, handle accordingly

                console.log(multipleAllocationUploadSpecial)

                console.log(Object.keys(multipleAllocationUploadSpecial).length !== 0)
                if(multipleAllocationUploadSpecial!== undefined && Object.keys(multipleAllocationUploadSpecial).length !== 0  && multipleAllocationUploadSpecial.info == "error"){
                    message.error(multipleAllocationUploadSpecial.message);
                }else{
                    message.success(multipleAllocationUploadSpecial.message);
                }
            }

        }
    }, [multipleAllocationUploadSpecialSuccess])



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


    const handleBacks = () => {
        return navigates("/home/allocations/special/create")
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
        let data ={
            "month": month,
            "year": year,
            "name" : remark
        }
        handleCreateViewPlan({
            certificate: authInfo.token,
            // yearMonth: toYyyyMm(yearMonth)
            alloc: data
        })
        setCurrentStep(currentStep - 1)
    }

    const SubmitSpecialAllocation = () => {
        let data = {
            "month": Number(month),
            "year": Number(year),
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
        handleMultipleAllocationUploadSpecial({
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
    }
    const navigate = useNavigate()
    const handleBack = () => {
        return navigate("/home/allocations/special/create")
    }


    useEffect(() => {
        if(multipleAllocationUploadSpecialSuccess){
            let data ={
                "month": month,
                "year": year,
                "name" : remark
            }
            handleCreateViewPlan({
                certificate: authInfo.token,
                // yearMonth: toYyyyMm(yearMonth)
                alloc: data
            })
        }
    },[multipleAllocationUploadSpecialSuccess])

    useEffect(() => {

        if(multipleAllocationUploadSpecialSuccess){

            console.log(multipleAllocationUploadSpecial)
            console.log(Object.keys(multipleAllocationUploadSpecial).length !== 0)
            if(multipleAllocationUploadSpecial!== undefined && Object.keys(multipleAllocationUploadSpecial).length !== 0  && multipleAllocationUploadSpecial.info == "error"){
                message.error(multipleAllocationUploadSpecial.message);
            }else{
                message.success(multipleAllocationUploadSpecial.message);
            }
        }




    }, [multipleAllocationUploadSpecialSuccess])

    useEffect(() => {
        if(specialPlanSubmitted == "true"){
            setSubmitFlag(true)
        }else{
            setSubmitFlag(false)
        }
    },[specialPlanSubmitted])


    return(
        <>
            <TitleWidget title={"Create Special Dispatches"} />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    Month<br/>
                    <SelectMonthComponent value = {month} onChange={(e) => setMonth(e)}   />

                </Col>
                <Col span={2}>
                    Year<br/>
                    <SelectYearComponent value = {year} onChange={(e) => setYear(e)}/>
                </Col>

                <Col span={5}>
                    Purpose <br/><Input value={remark} onChange={(e) => setRemark(e.target.value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={createViewClicked}>Create/View</Button>


                </Col>

                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={handleBacks} style={{marginLeft:"20px"}}>Back</Button>


                </Col>

                <Col span={2} offset={8}>
                    <br/>
                    <Button type={'primary'} onClick={() => SubmitSpecialAllocation()} disabled={submitFlag}>Submit</Button>
                </Col>

            </Row>
            <br/><br/>

            <Row gutter={[16,16]} style={{marginBottom: 40}}>

                <Col span={4} >
                    <Button type={'primary'} onClick={() => DownloadAllocation()}>Download Allocation</Button>
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
                    <Button type={'primary'} onClick={upload} disabled={submitFlag} >Upload</Button>
                </Col>
            </Row>
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
                    <Button type='primary' onClick={goToAllocation} disabled={submitFlag || startAllocationFlag} >
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
    handleMultipleAllocationUploadSpecial: PropTypes.func,
    multipleAllocationUploadSpecialSuccess: PropTypes.any,
    multipleAllocationUploadSpecial:PropTypes.any,
    multipleAllocationUploadSuccess: PropTypes.any,
    multipleAllocationUpload:PropTypes.any,
    specialPlanSubmitted:PropTypes.any,

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
    const multipleAllocationUploadSpecialSuccess = selectMultipleAllocationUploadSpecialSuccess(state)
    const multipleAllocationUploadSpecial = selectMultipleAllocationUploadSpecial(state)
    const multipleAllocationUploadSuccess = selectMultipleAllocationUploadSuccess(state)
    const specialPlanSubmitted = selectSpecialPlanSubmitted(state)
    console.log(multipleAllocationUploadSpecial)

    return { authInfo, profileInfo, specialItemsLoading, specialAllocation, allocationsLoading, allocations, commonAllocationDone, downloadAllocation,activeUsersDownload,
        multipleAllocationDownload,specialPlanSubmitted,  multipleAllocationExcel,multipleAllocationUploadSpecialSuccess,multipleAllocationUploadSpecial,multipleAllocationUploadSuccess}
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
    handleMultipleAllocationUploadSpecial: multipleAllocationUploadSpecialStartAction

}

export default connect(mapState, actions) (CreateSpecialAllocationComponent)
