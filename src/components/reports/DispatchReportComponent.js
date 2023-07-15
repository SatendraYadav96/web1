import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectFilterComponent from "../widgets/SelectFilterComponent";
import SelectFilterPlanComponent from "../widgets/SelectFilterPlanComponent";
import { getDispatchesReportStartAction } from '../../redux/actions/reports/dispatchesReportActions'
import {selectDispatchesListData,selectLoadingDispatchesReportData} from "../../redux/selectors/dispatchesReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv";
import XLSX from "xlsx"
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";


const DispatchReportComponent = ({authInfo,profileInfo,dispatchesList,dispatchesReportLoading,handleDispatchesReportList,buDropdown,divisionDropdown}) => {

    const [filter, setFilter] = useState()
    const [filterPlan, setFilterPlan] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [data, setData] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
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
                width:'100px'
            },
            {
                title: 'Recipient Name',
                key: 'recipientName',
                dataIndex: 'recipientName',
                width: '100px',
                ...getColumnSearchProps('recipientName'),
            },
            {
                title: 'Recipient Code',
                key: 'recipientCode',
                dataIndex: 'recipientCode',
                width: '100px',
                ...getColumnSearchProps('recipientCode'),
                sorter: (a, b) => a.recipientCode - b.recipientCode,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Team Name',
                key: '',
                dataIndex: 'teamName',
                width: '100px'
            },
            {
                title: 'Job Role',
                key: '',
                dataIndex: 'desigation',
                width: '110px'
            },
            {
                title: 'Product Code',
                key: '',
                dataIndex: 'productCode',
                width: '100px',
                ...getColumnSearchProps('productCode'),
            },
            {
                title: 'Input Name',
                key: '',
                dataIndex: 'productName',
                width: '100px'
            },
            {
                title: 'Quantity',
                key: '',
                dataIndex: 'quantity',
                width: '100px'
            },
            {
                title: 'Amount',
                key: '',
                dataIndex: 'amount',
                width: '100px'
            },
            {
                title: 'Invoice No.',
                key: 'invoiceNo',
                dataIndex: 'invoiceNo',
                width: '100px',
                ...getColumnSearchProps('invoiceNo'),
            },
            {
                title: 'Invoice Date',
                key: '',
                dataIndex: 'invoiceDate',
                width: '100px'
            }
        ])

        setDataSource([])
    }


    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const getDispatchesReportList = () => {
         console.log(businessUnit);
         console.log(division);
         console.log(formatedStartDateString);
         console.log(formatedEndDateString);
         console.log(profileInfo.id);
         console.log(profileInfo.userDesignation.id);
         console.log(filter);
         console.log(filterPlan);
         console.log(dispatchesList);

        handleDispatchesReportList ({
            disp: {
                businessUnit:bu,
                division:d,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                startDate:formatedStartDateString,
                endDate:formatedEndDateString,
                filter:filter,
                filterPlan:filterPlan,
            },
            certificate: authInfo.token
        });
        searchData()

    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"DispatchesReport.XLSX")
    }

    useEffect(() => {
        setData(dispatchesList.map(item => {
            return {
                team: item.businessUnit,
                recipientName: item.recipientName,
                recipientCode: item.recipientCode,
                teamName: item.teamName,
                designation: item.desigation,
                productCode: item.productCode,
                productName: item.productName,
                quantity: item.quantity,
                amount: item.amount,
                invoiceNo: item.invoiceNo,
                invoiceDate: item.invoiceDate,
            }
        }))
        console.log(dispatchesList)
    },[dispatchesList])

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

    return(
        <>
            <TitleWidget title="Dispatches Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} style={{width: '100%'}} onChange={(e) => setDivision(e)} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date<br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Type<br/>
                    <SelectFilterComponent value={filter} onChange={(e) => setFilter(e)} />
                </Col>
                <Col span={3}>
                    Plan Type<br/>
                    <SelectFilterPlanComponent value={filterPlan} style={{width: '100%'}} onChange={(e) => setFilterPlan(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDispatchesReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"dispatchreport.csv"}
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
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dispatchesList}/>
            }
        </>
    )

}

DispatchReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    dispatchesList:PropTypes.array,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    dispatchesReportLoading:PropTypes.any,
    handleDispatchesReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const dispatchesList = selectDispatchesListData(state)
    const dispatchesReportLoading = selectLoadingDispatchesReportData(state)
    return {authInfo,dispatchesList,dispatchesReportLoading,profileInfo}
}

const actions = {
    handleDispatchesReportList : getDispatchesReportStartAction
}

export default connect(mapState, actions)(DispatchReportComponent)
