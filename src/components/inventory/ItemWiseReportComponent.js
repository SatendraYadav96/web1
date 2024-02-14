import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import moment from "moment";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import {selectItemWiseListData, selectLoadingItemWiseReportData} from "../../redux/selectors/itemWiseReportSelector";
import {getItemWiseReportStartAction} from "../../redux/actions/reports/itemWiseReportActions";
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const ItemWiseReportComponent = ({authInfo,profileInfo,itemWiseList,itemWiseReportLoading,handleItemWiseReportList,buDropdown,divisionDropdown}) => {

    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()
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

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'busineesUnit',
                width:'100px',
            },
            {
                title:'Sub Team',
                key:'division',
                dataIndex:'division',
                width:'100px',
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'itemName',
                width:'100px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px',
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex:'itemCode',
                width:'100px',
                ...getColumnSearchProps('itemCode'),
            },
            {
                title:'Opening Quantity',
                key:'openingQuantity',
                dataIndex:'openingQuantity',
                width:'100px',
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px',
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px',
            },
            {
                title:'Closing Quantity',
                key:'closingQuantity',
                dataIndex:'closingQuantity',
                width:'100px',
            }
        ])

        setDataSource([])
    }

    const formatedToDateString = moment(toDate).format('yyyy-MM-DD').toString();
    const formatedFromDateString = moment(fromDate).format('yyyy-MM-DD').toString();

    const getItemWiseReport = () => {
        console.log(fromDate);
        console.log(toDate);
        console.log(businessUnit);
        console.log(division);

        handleItemWiseReportList ({
            item: {
                fromDate: formatedToDateString,
                toDate: formatedFromDateString,
                divison: d,
                businessUnit:bu,
            },
            certificate: authInfo.token
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ItemWiseReport.xlsx")
    }

    useEffect(() => {
        setData(itemWiseList.map(item => {
            return {
                businessUnit: item.busineesUnit,
                division: item.division,
                itemName: item.itemName,
                category: item.category,
                itemCode: item.itemCode,
                openingQuantity: item.openingQuantity,
                receivedQuantity: item.receivedQuantity,
                dispatchedQuantity: item.dispatchedQuantity,
                closingQuantity: item.closingQuantity,
            }
        }))
        console.log(itemWiseList)
    },[itemWiseList])

    useEffect(() => {
        console.log(itemWiseList)
    },[itemWiseList])

    useEffect(() => {
        console.log(toDate)
    },[toDate])

    const handleToDate = (date,dateString) => {
        setToDate(dateString)
        console.log(dateString)
    }

    const handleFromDate = (date,dateString) => {
        setFromDate(dateString)
        console.log(dateString)
    }

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
            <TitleWidget title="Item Wise Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit}  multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    SubTeam <br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision} multiple={'multiple'}/>
                </Col>

                <Col span={3}>
                    Date From: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Date To: <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getItemWiseReport()}>Search</Button>
                </Col>

            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"ItemWiseReport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{width: 300}}/>
                    </div>
                </Col>
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/>
            <span>Total Rows: <b>{itemWiseList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={itemWiseList}/>
            }
        </>
    )

}

ItemWiseReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    itemWiseList:PropTypes.array,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    itemWiseReportLoading:PropTypes.any,
    handleItemWiseReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const itemWiseList = selectItemWiseListData(state)
    const itemWiseReportLoading = selectLoadingItemWiseReportData(state)
    return {authInfo,profileInfo,itemWiseList,itemWiseReportLoading,buDropdown,divisionDropdown}
}

const actions = {
    handleItemWiseReportList : getItemWiseReportStartAction
}

export default connect(mapState, actions)(ItemWiseReportComponent)
