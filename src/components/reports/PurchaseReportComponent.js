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
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";


const PurchaseReportComponent = ({authInfo,profileInfo,purchaseList,purchaseReportLoading,handlePurchaseReportList,buDropdown,divisionDropdown}) => {

    let now = new Date()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
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
                dataIndex:'businessUnit',
                width:'100px',
                ...getColumnSearchProps('businessUnit'),
            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'divison',
                width:'100px',
                ...getColumnSearchProps('divison'),
            },
            {
                title: 'GRN Date',
                key: 'grnDate',
                dataIndex: 'grnDate',
                width: '100px',
                ...getColumnSearchProps('grnDate'),
            },
            {
                title: 'Vendor Name',
                key: 'vendorName',
                dataIndex: 'vendorName',
                width: '150px',
                ...getColumnSearchProps('vendorName'),
            },
            {
                title: 'Vendor Code',
                key: 'vendorCode',
                dataIndex: 'vendorCode',
                width: '120px',
                ...getColumnSearchProps('vendorCode'),
            },
            {
                title: 'PO No.',
                key: 'poNo',
                dataIndex: 'poNo',
                width: '120px',
                ...getColumnSearchProps('poNo'),
            },
            {
                title: 'Input Name',
                key: 'productName',
                dataIndex: 'productName',
                width: '150px',
                ...getColumnSearchProps('productName'),
            },
            {
                title: 'Product Code',
                key: '',
                dataIndex: 'productCode',
                width: '100px',
                ...getColumnSearchProps('productCode'),
            },
            {
                title: 'Cost Center',
                key: 'costCenter',
                dataIndex: 'costCenter',
                width: '100px',
                ...getColumnSearchProps('costCenter'),
            },
            {
                title: 'Quantity',
                key: '',
                dataIndex: 'quantity',
                width: '100px',
                ...getColumnSearchProps('quantity'),
            },
            {
                title: 'Rate',
                key: '',
                dataIndex: 'rate',
                width: '100px',
                ...getColumnSearchProps('rate'),
            },
            {
                title: 'Value',
                key: 'value',
                dataIndex: 'value',
                width: '100px',
                ...getColumnSearchProps('value'),
            },
            {
                title: 'Batch No',
                key: 'batchNo',
                dataIndex: 'batchNo',
                width: '100px',
                ...getColumnSearchProps('batchNo'),
            },
            {
                title: 'Medical Code',
                key: 'batchNo',
                dataIndex: 'batchNo',
                width: '100px',
                ...getColumnSearchProps('batchNo'),
            },
            {
                title: 'No of Boxes',
                key: 'noBoxes',
                dataIndex: 'noBoxes',
                width: '100px',
                ...getColumnSearchProps('noBoxes'),
            }
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();


    const getPurchaseReportList = () => {
       console.log(businessUnit);
       console.log(division);
       console.log(startDate);
       console.log(endDate);
       console.log(profileInfo.id);
       console.log(profileInfo.userDesignation.id);

       console.log(purchaseList);

    handlePurchaseReportList ({
      pur: {
          businessUnit:bu,
          divison:d,
          userId: profileInfo.id,
          userDesgId: profileInfo.userDesignation.id,
          startDate:formatedStartDateString,
          endDate:formatedEndDateString,
      },
      certificate: authInfo.token
    });
    searchData()

    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"PurchaseReport.XLSX")
    }

    useEffect(() => {
        setData(purchaseList.map(item => {
            return {
                team: item.businessUnit,
                subTeam: item.divison,
                grnDate: item.grnDate,
                vendorName: item.vendorName,
                vendorCode: item.vendorCode,
                poNo: item.poNo,
                inputName: item.productName,
                inputCode: item.productCode,
                costCenter: item.costCenter,
                quantity: item.quantity,
                rate: item.rate,
                value: item.value,
                batchNo: item.batchNo,
                medicalCode: item.medicalCode,
                noBoxes: item.noBoxes,

            }
        }))
        console.log(purchaseList)
    },[purchaseList])

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
            <TitleWidget title="Purchase Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision} multiple={'multiple'}/>
                </Col>
                 <Col span={3}>
                     From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                 </Col>
                 <Col span={3}>
                     To Date <br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                 </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getPurchaseReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                        data={data}
                        filename={"purchasereport.csv"}
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
            <span>Total Rows: <b>{purchaseList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={purchaseList}/>
            }
        </>
    )

}

PurchaseReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    purchaseList:PropTypes.array,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    purchaseReportLoading:PropTypes.any,
    handlePurchaseReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const purchaseList = selectPurchaseListData(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const purchaseReportLoading = selectLoadingPurchaseReportData(state)
    return {authInfo,purchaseList,purchaseReportLoading,profileInfo,buDropdown,divisionDropdown}
}

const actions = {
    handlePurchaseReportList : getPurchaseReportStartAction
}

export default connect(mapState, actions)(PurchaseReportComponent)
