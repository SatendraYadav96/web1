import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table, customFormat, Modal, Space} from "antd";
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
import {getComplianceDetailsStartAction, overSamplingDetailsDataStartAction, saveOverSamplingStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import {selectComplianceDetailsListData, selectOverSamplingDetailData, selectSaveOverSamplingSuccess} from "../../redux/selectors/nonComplianceSelector";
import MonthlyInputPlan from "../approvals/MonthlyInputPlan";
import {InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
import SelectReasonComponent from "../widgets/SelectReasonComponent";
import {Option} from "antd/es/mentions";
import Highlighter from "react-highlight-words";


const ComplianceDetailsListComponent = ({authInfo,complianceDetailsList,handleComplianceDetailsList, handleSaveOverSampling,
                                            saveOverSamplingSuccess, handleOverSamplingDetailData, overSamplingDetailData}) => {

    // let now = new Date()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataDetail, setDataDetail] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState(false)
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

    const setReason = (row, value) => {
        complianceDetailsList.forEach(i => {
            if(i.id == row.id){
                i.reason = value
            }
        })
        console.log(complianceDetailsList)
    }

    const detailColumn = [
        {
            title:'Month',
            key:'month',
            dataIndex:'month',
            width:'100px'
        },
        {
            title:'Territory Name',
            key:'territoryName',
            dataIndex:'territoryName',
            width:'100px'
        },
        {
            title:'Person ID',
            key:'personId',
            dataIndex:'personId',
            width:'100px'
        },
        {
            title:'Person Name',
            key:'personName',
            dataIndex:'personName',
            width:'100px'
        },
        {
            title:'Item Category',
            key:'itemCategory',
            dataIndex:'itemCategory',
            width:'100px'
        },
        {
            title:'Item Id',
            key:'itemId',
            dataIndex:'itemId',
            width:'100px'
        },
        {
            title:'Item Name',
            key:'itemName',
            dataIndex:'itemName',
            width:'100px'
        },
        {
            title:'Batch No',
            key:'batchNo',
            dataIndex:'batchNo',
            width:'100px'
        },
        {
            title:'Quantity Distributed',
            key:'quantity',
            dataIndex:'quantity',
            width:'100px'
        },
    ]

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'FF Code',
                key:'ffcode',
                dataIndex:'ffcode',
                width:'100px',
                ...getColumnSearchProps('ffcode'),
            },
            {
                title:'Team',
                key:'team_Name',
                dataIndex:'team_Name',
                width:'100px',
                ...getColumnSearchProps('team_Name'),
            },
            {
                title: 'DR Name',
                key: 'drname',
                dataIndex: 'drname',
                width: '100px',
                ...getColumnSearchProps('drname'),
            },
            {
                title: 'BU',
                key: 'bu',
                dataIndex: 'bu',
                width: '100px',
                ...getColumnSearchProps('bu'),
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'am',
                width: '100px',
                ...getColumnSearchProps('am'),
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'rbm',
                width: '100px',
                ...getColumnSearchProps('rbm'),
            },
            {
                title: 'Total Samples Given',
                key: 'totalsamplegiven',
                dataIndex: 'totalsamplegiven',
                width: '100px',
                ...getColumnSearchProps('totalsamplegiven'),
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width: '100px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
                },
            },
            {
                title: 'Reason',
                key: 'reason',
                dataIndex: 'reason',
                width: '250px',
                render: (_,row) => {
                    console.log(row.reason)
                    return (<Select placeholder={"Select Reason"} value={row.reason} onSelect={(e) => setReason(row, e)} style={{width: "100%"}}>
                        <Option value={"AC6813C2-EEAA-4E69-B70D-4B3A360481FD"}>Samples Given to doctor for Medical/Patient Camp</Option>
                        <Option value={"A539E53D-FDEC-41E3-A73C-90C8561933ED"}>Samples Given for Doctor Conference/CME</Option>
                        <Option value={"2BD908FA-C79A-4F85-9E3F-9E26CC985A39"}>Samples Given as starter packs to new Patients</Option>
                        <Option value={"A2FED5CE-4A72-479B-89C5-EC8CBE641DB7"}>Samples Given for OPD Camp</Option>
                        <Option value={"946ECBFE-07EB-4378-951C-D7E34F7A0DEE"}>Samples reporting error</Option>
                    </Select>)
                }
            },
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"complianceDetailsList.XLSX")
    }

    useEffect(() => {
        setData(complianceDetailsList?.map(item => {
            return {
                'FF Code': item.ffcode,
                'Team': item.team_Name,
                'DR Name': item.drname,
                'BU': item.bu,
                'AM': item.am,
                'RBM': item.rbm,
                'Total Sample Given': item.totalsamplegiven,
                'Reason': item.reason,
            }
        }))
        console.log(complianceDetailsList)
    },[complianceDetailsList])


    const handleDetailExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(dataDetail);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"overSamplingDetailData.XLSX")
    }

    useEffect(() => {
        setDataDetail(overSamplingDetailData?.map(item => {
            return {
                'month': item.month,
                'territoryName': item.territoryName,
                'personId': item.personId,
                'personName': item.personName,
                'itemCategory': item.itemCategory,
                'itemId': item.itemId,
                'itemName': item.itemName,
                'batchNo': item.batchNo,
                'quantity':item.quantity
            }
        }))
        console.log(overSamplingDetailData)
    },[overSamplingDetailData])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    const getComplianceDetails = () => {
        searchData()
        handleComplianceDetailsList({
            certificate: authInfo.token,
            month: month,
            year: year,
        })
    }

    const handleDetails = (row) => {
        handleOverSamplingDetailData({
            certificate: authInfo.token,
            month: month,
            year: year,
            ffTerritory: row.ffcode,
            personCode: row.dr_ID
        })
        setDetails(true)
    }

    const saveOverSampling = () => {
        let data = []
        complianceDetailsList.forEach(i=> {
            let d = {
                "id" :i.id,
                "reason" :i.reason,
                "remark" :i.remarks
            }
            data.push(d)
        })
        handleSaveOverSampling({
            certificate: authInfo.token,
            data: data
        })
    }

    useEffect(()=>{
        searchData()
        handleComplianceDetailsList({
            certificate: authInfo.token,
            month: month,
            year: year,
        })
    },[saveOverSamplingSuccess])


    return(
        <>
            <TitleWidget title="Compliance Details List" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent onChange={(value) => setMonth(value)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(value) => setYear(value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getComplianceDetails()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={16}>
                    <div align='right'>
                        <br/>
                        <Button type={"primary"} onClick={()=> saveOverSampling()}>Save</Button>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (
                            <>
                                <CSVLink
                                    data={data}
                                    filename={"complianceDetailsList.csv"}
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                >
                                    <Button>CSV</Button>
                                </CSVLink>
                                &nbsp;
                                <Button onClick={handleExcel}>EXCEL</Button>
                                &nbsp;
                                <Button onClick={handleDetailExcel} >Details</Button>
                            </>
                        )
                    }

                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={complianceDetailsList}/>
            }
            <Modal open={details} title="Compliance Details" footer={null} width={"80vw"} onCancel={() => {
                setDetails(false)
            }}>
                <Table columns={detailColumn} dataSource={overSamplingDetailData} />
            </Modal>
        </>
    )
}

ComplianceDetailsListComponent.propTypes = {
    authInfo: PropTypes.any,
    complianceDetailsList: PropTypes.any,
    handleComplianceDetailsList: PropTypes.func,
    handleSaveOverSampling: PropTypes.func,
    saveOverSamplingSuccess: PropTypes.any,
    handleOverSamplingDetailData: PropTypes.func,
    overSamplingDetailData: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const complianceDetailsList= selectComplianceDetailsListData(state)
    const saveOverSamplingSuccess = selectSaveOverSamplingSuccess(state)
    const overSamplingDetailData = selectOverSamplingDetailData(state)
    return {authInfo,complianceDetailsList, saveOverSamplingSuccess, overSamplingDetailData}
}

const actions = {
    handleComplianceDetailsList : getComplianceDetailsStartAction,
    handleSaveOverSampling :saveOverSamplingStartAction,
    handleOverSamplingDetailData: overSamplingDetailsDataStartAction
}

export default connect(mapState, actions)(ComplianceDetailsListComponent)
