import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import { getItemConsumptionReportStartAction } from '../../redux/actions/reports/itemConsumptionReportActions'
import {selectConsumptionListData,selectLoadingConsumptionReportData} from "../../redux/selectors/itemConsumptionReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv";
import XLSX from "xlsx";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";

const ItemConsumptionReportComponent = ({authInfo,profileInfo,consumptionList,consumptionReportLoading,handleConsumptionReportList,buDropdown,divisionDropdown}) => {

    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [data, setData] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
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
                title:'Team',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px',
                ...getColumnSearchProps('businessUnit'),
            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'division',
                width:'100px',
                ...getColumnSearchProps('division'),
            },
            {
                title: 'Cost Center',
                key: 'costCenter',
                dataIndex: 'costCenter',
                width: '100px',
                ...getColumnSearchProps('costCenter'),
            },
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '100px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Item Code',
                key: 'itemCode',
                dataIndex: 'itemCode',
                width: '100px',
                ...getColumnSearchProps('itemCode'),
            },
            {
                title: 'Type',
                key: 'itemType',
                dataIndex: 'itemType',
                width: '100px',
                ...getColumnSearchProps('itemType'),
            },
            {
                title: 'Expiry Date',
                key: '',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Quantity',
                key: '',
                dataIndex: 'quantity',
                width: '100px'
            },
            {
                title: 'Rate',
                key: '',
                dataIndex: 'rate',
                width: '100px'
            },
            {
                title: 'Value',
                key: '',
                dataIndex: 'value',
                width: '100px'
            },
            {
                title: 'Type of Transaction',
                key: '',
                dataIndex: 'typeOfTransaction',
                width: '100px'
            }
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();
    const getConsumptionReportList = () => {
         console.log(businessUnit);
         console.log(division);
         console.log(formatedStartDateString);
         console.log(formatedEndDateString);
         console.log(profileInfo.id);
         console.log(profileInfo.userDesignation.id);
         console.log(consumptionList);

        handleConsumptionReportList ({
            item: {
                businessUnit:bu,
                divison:d,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                fromDate:formatedStartDateString,
                toDate:formatedEndDateString,
            },
            certificate: authInfo.token
        });

        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ItemConsumptionReport.xlsx")
    }

    useEffect(() => {
        setData(consumptionList.map(item => {
            return {
                team: item.businessUnit,
                subTeam: item.division,
                costCenter: item.costCenter,
                itemName: item.itemName,
                itemCode: item.itemCode,
                itemType: item.itemType,
                expiryDate: item.expiryDate,
                quantity: item.quantity,
                rate: item.rate,
                value: item.value,
                typeOfTransaction: item.typeOfTransaction,
            }
        }))
        console.log(consumptionList)
    },[consumptionList])

    useEffect(() => {
        console.log(buDropdown)
        let array = [buDropdown?.map(item => item.id)]
        setBU(array[0])
    },[buDropdown])

    useEffect(() => {
        setBU(businessUnit)
    },[businessUnit])

    useEffect(() => {
        console.log(divisionDropdown)
        let array = [divisionDropdown?.map(item => item.id)]
        setD(array[0])
    },[divisionDropdown])

    useEffect(() => {
        setD(division)
    },[division])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    useEffect(() => {
        if (bu?.length === 0) {
            let array = [buDropdown?.map(item => item.id)]
            setBU(array[0])
        }
        console.log(bu)
    },[bu])

    useEffect(() => {
        if (d?.length === 0) {
            let array = [divisionDropdown?.map(item => item.id)]
            setD(array[0])
        }
        console.log(d)
    },[d])

    return(
        <>
            <TitleWidget title="Item Consumption Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} style={{width: "100%"}} onChange={handleBusinessUnit} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} style={{width: "100%"}} onChange={handleDivision} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Transaction From Date <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getConsumptionReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"consumptionreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{consumptionList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={consumptionList}/>
            }
        </>
    )
}

ItemConsumptionReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    consumptionList:PropTypes.array,
    consumptionReportLoading:PropTypes.any,
    handleConsumptionReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const consumptionList = selectConsumptionListData(state)
    const consumptionReportLoading = selectLoadingConsumptionReportData(state)
    return {authInfo,consumptionList,consumptionReportLoading,profileInfo,buDropdown,divisionDropdown}
}

const actions = {
    handleConsumptionReportList : getItemConsumptionReportStartAction
}

export default connect(mapState, actions)(ItemConsumptionReportComponent)
