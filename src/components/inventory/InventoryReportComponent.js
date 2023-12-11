import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import {selectSimpleInventoryListData, selectLoadingSimpleInventoryReportData} from "../../redux/selectors/simpleInventoryReportSelector";
import {getSimpleInventoryReportStartAction} from "../../redux/actions/reports/simpleInventoryReportActions";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";
import {divisionDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const InventoryReportComponent = ({authInfo, profileInfo,simpleInventoryList,simpleInventoryReportLoading,handleSimpleInventoryReportList,buDropdown,divisionDropdown,handleDivisionDropDown}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
    const [data, setData] = useState()
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
                title:'Cost Center',
                key:'costCenter',
                dataIndex:'costCenter',
                width:'100px',
                ...getColumnSearchProps('costCenter'),
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px',
                ...getColumnSearchProps('category'),
            },
            {
                title:'Product Code',
                key:'productCode',
                dataIndex:'productCode',
                width:'100px',
                ...getColumnSearchProps('productCode'),
            },
            {
                title:'Product Name',
                key:'inputName',
                dataIndex:'productName',
                width:'200px',
                ...getColumnSearchProps('productName'),

            },
            {
                title:'GRN Date',
                key:'grnData',
                dataIndex:'grnDate',
                width:'100px',
                ...getColumnSearchProps('grnDate'),
            },
            {
                title:'Medical Code',
                key:'medicalCode',
                dataIndex:'medicalCode',
                width:'100px',
                ...getColumnSearchProps('medicalCode'),
            },
            {
                title:'PO No',
                key:'poNo',
                dataIndex:'poNo',
                width:'100px',
                ...getColumnSearchProps('poNo'),
            },
            {
                title:'Batch No',
                key:'batchNo',
                dataIndex:'batchNo',
                width:'100px',
                ...getColumnSearchProps('batchNo'),
            },
            {
                title:'Expiry date',
                key:'expiryDate',
                dataIndex:'expiryDate',
                width:'100px',
                ...getColumnSearchProps('expiryDate'),
                // sorter: (a, b) => a.expiryDate - b.expiryDate,
                // sortDirections: ['descend', 'ascend'],
            },
            {
                title:'Base Pack',
                key:'basePack',
                dataIndex:'basePack',
                width:'100px',
                ...getColumnSearchProps('basePack'),
            },
            {
                title:'Rate',
                key:'rate',
                dataIndex:'rate',
                width:'100px',
                ...getColumnSearchProps('rate'),
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px',
                ...getColumnSearchProps('receivedQuantity'),
            },
            {
                title:'Allocated Quantity',
                key:'allocatedQuantity',
                dataIndex:'allocatedQuantity',
                width:'100px',
                ...getColumnSearchProps('allocatedQuantity'),
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px',
                ...getColumnSearchProps('dispatchedQuantity'),
            },

            {
                title:'Allocation Balance',
                key:'allocationBalance',
                dataIndex:'allocationBalance',
                width:'100px',
                ...getColumnSearchProps('allocationBalance'),
            },
            {
                title:'Physical Balance',
                key:'physicalBalance',
                dataIndex:'physicalBalance',
                width:'100px',
                ...getColumnSearchProps('physicalBalance'),
            },
            {
                title:'HSN Code',
                key:'hsn_Code',
                dataIndex:'hsn_Code',
                width:'100px',
                ...getColumnSearchProps('hsn_Code'),
            },
            {
                title:'GST Rate',
                key:'gst_Rate',
                dataIndex:'gst_Rate',
                width:'100px',
                ...getColumnSearchProps('gst_Rate'),
            }
        ])

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"SimpleInventoryReport.xlsx")
    }

    useEffect(() => {
        setData(simpleInventoryList.map(item => {
            return {
                team: item.businessUnit,
                subTeam: item.division,
                costCenterName: item.costCenter,
                category: item.category,
                productCode: item.productCode,
                productName: item.productName,
                grnDate: item.grnDate,
                medicalCode: item.medicalCode,
                poNo: item.poNo,
                batchNo: item.batchNo,
                expiryDate: item.expiryDate,
                basePack: item.basePack,
                rate: item.rate,
                receivedQuantity: item.receivedQuantity,
                allocatedQuantity: item.allocatedQuantity,
                dispatchedQuantity: item.dispatchedQuantity,
                allocationBalance: item.allocationBalance,
                physicalBalance: item.physicalBalance,
                hsnCode: item.hsn_Code,
                gstRate: item.gst_Rate,
            }
        }))
        // console.log(simpleInventoryList)
    },[simpleInventoryList])

    const getInventoryReport = () => {
        handleSimpleInventoryReportList({
            simInv: {
                businessUnit:bu,
                divison: d,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
            },
            certificate: authInfo.token
        })
        searchData()
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
            <TitleWidget title="Inventory Report " />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit} multiple={'multiple'} />
                </Col>
                <Col span={3}>
                    Sub Team <br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getInventoryReport()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"SimpleInventoryReport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                {/*<Col span={18}>*/}
                {/*    <div align="right">*/}
                {/*        <Input.Search style={{width: 300}}/>*/}
                {/*    </div>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <span>Total Rows: <b>{simpleInventoryList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={simpleInventoryList}/>
            }
        </>
    )
}

InventoryReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    simpleInventoryList:PropTypes.array,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    simpleInventoryReportLoading:PropTypes.any,
    handleSimpleInventoryReportList:PropTypes.func,
    handleDivisionDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const simpleInventoryList = selectSimpleInventoryListData(state)
    const simpleInventoryReportLoading = selectLoadingSimpleInventoryReportData(state)
    return {authInfo,simpleInventoryList,simpleInventoryReportLoading,divisionDropdown,profileInfo,buDropdown}
}

const actions = {
    handleSimpleInventoryReportList : getSimpleInventoryReportStartAction,
}

export default connect(mapState, actions)(InventoryReportComponent)
