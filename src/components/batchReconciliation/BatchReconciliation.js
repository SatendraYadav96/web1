import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table, customFormat, Space} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import { getPurchaseReportStartAction } from '../../redux/actions/reports/purchaseReportActions'
import {selectPurchaseListData,selectLoadingPurchaseReportData} from "../../redux/selectors/purchaseReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import {getBatchReconciliationStartAction, overSamplingMailStartAction} from "../../redux/actions/reports/batchReconciliationReportActions";
import {selectBatchReconciliationListData, selectOverSamplingMailData} from "../../redux/selectors/batchReconciliationReportSelector";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const BatchReconciliationComponent = ({authInfo,handleBatchReconciliation,batchReconciliationList, handleOverSamplingMailTrigger,overSamplingMail}) => {

    // let now = new Date()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
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
                    color: filtered ? '#1677ff' : undefined,
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


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Buisness Unit',
                key:'bu',
                dataIndex:'bu',
                width:'100px',
                ...getColumnSearchProps('bu')
            },
            {
                title:'Brand//CC',
                key:'brand',
                dataIndex:'brand',
                width:'150px',
                ...getColumnSearchProps('brand'),
            },
            {
                title: 'SKU Details',
                key: 'prodcutname',
                dataIndex: 'prodcutname',
                width: '100px',
                ...getColumnSearchProps('prodcutname'),
            },
            {
                title: 'Batch Number',
                key: 'batch_No',
                dataIndex: 'batch_No',
                width: '110px',
                ...getColumnSearchProps('batch_No'),
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
                ...getColumnSearchProps('expiryDate'),
                sorter: (a, b) => a.expiryDate - b.expiryDate,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Product Code',
                key: 'productCode',
                dataIndex: 'productCode',
                width: '100px',
                ...getColumnSearchProps('productCode'),
            },
            {
                title: 'Qty Rcvd at Hub',
                key: 'receivedatHub',
                dataIndex: 'receivedatHub',
                width: '100px'
            },
            {
                title: 'Dispatched at Hub',
                key: 'dispatched',
                dataIndex: 'dispatched',
                width: '100px'
            },
            {
                title: 'Balance With Hub',
                key: 'hub_Balance',
                dataIndex: 'hub_Balance',
                width: '100px'
            },
            {
                title: 'Destroyed at Hub',
                key: 'destroyed',
                dataIndex: 'destroyed',
                width: '100px'
            },
            {
                title: 'Validated by FF',
                key: 'validated',
                dataIndex: 'validated',
                width: '100px'
            },
            {
                title: 'Pending Validation by FF',
                key: 'pending_Validation',
                dataIndex: 'pending_Validation',
                width: '100px'
            },
            {
                title: 'Distributed by FF',
                key: 'distribute',
                dataIndex: 'distribute',
                width: '100px'
            },
            {
                title: 'FF Balance',
                key: 'balance',
                dataIndex: 'balance',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    useEffect(() => {
        handleBatchReconciliation({
            certificate: authInfo.token,
        })
    },[])


    const overSamplingMailTriggerClick = () => {

        handleOverSamplingMailTrigger ({

            certificate: authInfo.token
        });

    }


    const getPurchaseReportList = () => {
        // console.log(businessUnit);
        // console.log(division);
        // console.log(startDate);
        // console.log(endDate);
        // console.log(profileInfo.id);
        // console.log(profileInfo.userDesignation.id);
        //
        // console.log(purchaseList);

        // handlePurchaseReportList ({
        //     businessUnit:businessUnit,
        //     divison:division,
        //     userId: profileInfo.id,
        //     userDesgId: profileInfo.userDesignation.id,
        //     startDate:formatedStartDateString,
        //     endDate:formatedEndDateString,
        //     // startDate:startDate,
        //     // endDate:endDate,
        //
        //
        //
        //     certificate: authInfo.token
        // });
        searchData()
    }

    useEffect(() => {
        searchData()
    },[authInfo.token])

    useEffect(() => {
        setData(batchReconciliationList?.map(item => {
            return ({
                'Business Unit': item.bu,
                'Brand//CC': item.brand,
                'SKU Details': item.prodcutname,
                'Batch Number': item.batch_No,
                'Expiry Date': item.expiryDate,
                'Product Code': item.productCode,
                'Qty Rcvd at Hub': item.receivedatHub,
                'Dispatched at Hub': item.dispatched,
                'Balance With Hub': item.hub_Balance,
                'Destroyed at Hub': item.destroyed,
                'Validated by FF': item.validated,
                'Pending Validation by FF': item.pending_Validation,
                'Distributed by FF': item.distribute,
                'FF Balance': item.balance,
            })
        }))
    },[batchReconciliationList])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"BatchReconciliation.XLSX")
    }

    // useEffect(() => {
    //     setData(purchaseList.map(item => {
    //         return {
    //             team: item.businessUnit,
    //             subTeam: item.divison,
    //             grnDate: item.grnDate,
    //             vendorName: item.vendorName,
    //             vendorCode: item.vendorCode,
    //             poNo: item.poNo,
    //             inputName: item.productName,
    //             inputCode: item.productCode,
    //             costCenter: item.costCenter,
    //             quantity: item.quantity,
    //             rate: item.rate,
    //             value: item.value,
    //             batchNo: item.batchNo,
    //             medicalCode: item.medicalCode,
    //             noBoxes: item.noBoxes,
    //
    //         }
    //     }))
    //     console.log(purchaseList)
    // },[purchaseList])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    return(
        <>
            <TitleWidget title="Batch Reconciliation"/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={handleExcel}>Download</Button>
                </Col>

                {/*<Col span={3}>*/}
                {/*    <br/>*/}
                {/*    <Button type={"primary"} onClick={overSamplingMailTriggerClick}>OverSampling</Button>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <span>Total Rows: <b>{batchReconciliationList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={batchReconciliationList}/>
            }
        </>
    )
}

BatchReconciliationComponent.propTypes = {
    authInfo: PropTypes.any,
    // profileInfo: PropTypes.any,
    // purchaseList:PropTypes.array,
    // purchaseReportLoading:PropTypes.any,
    // handlePurchaseReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    // const profileInfo = selectProfileInfo(state)
    const batchReconciliationList = selectBatchReconciliationListData(state)
    const overSamplingMail = selectOverSamplingMailData(state)
    // const purchaseReportLoading = selectLoadingPurchaseReportData(state)
    return {authInfo,batchReconciliationList,overSamplingMail}
}

const actions = {
    handleBatchReconciliation : getBatchReconciliationStartAction,
    handleOverSamplingMailTrigger:overSamplingMailStartAction
}

export default connect(mapState, actions)(BatchReconciliationComponent)
