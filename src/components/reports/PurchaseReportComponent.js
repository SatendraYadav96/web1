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


const PurchaseReportComponent = ({authInfo,profileInfo,purchaseList,purchaseReportLoading,handlePurchaseReportList}) => {

    let now = new Date()

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
                title:'Team',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'divison',
                width:'100px'
            },
            {
                title: 'GRN Date',
                key: 'grnDate',
                dataIndex: 'grnDate',
                width: '100px'
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
                width: '150px'
            },
            {
                title: 'Product Code',
                key: '',
                dataIndex: 'productCode',
                width: '100px'
            },
            {
                title: 'Cost Center',
                key: 'costCenter',
                dataIndex: 'costCenter',
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
                key: 'value',
                dataIndex: 'value',
                width: '100px'
            },
            {
                title: 'Batch No',
                key: 'batchNo',
                dataIndex: 'batchNo',
                width: '100px'
            },
            {
                title: 'Medical Code',
                key: 'batchNo',
                dataIndex: 'batchNo',
                width: '100px'
            },
            {
                title: 'No of Boxes',
                key: 'noBoxes',
                dataIndex: 'noBoxes',
                width: '100px'
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
      businessUnit:businessUnit,
      divison:division,
      userId: profileInfo.id,
      userDesgId: profileInfo.userDesignation.id,
      startDate:formatedStartDateString,
      endDate:formatedEndDateString,
      // startDate:startDate,
      // endDate:endDate,



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

    const handleBusinessUnit = (value) =>  {
      setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    return(
        <>
            <TitleWidget title="Purchase Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit} />
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision} />
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
            purchaseReportLoading:PropTypes.any,
            handlePurchaseReportList:PropTypes.func
}

const mapState = (state) => {
        const authInfo = selectAuthInfo(state)
        const profileInfo = selectProfileInfo(state)
        const purchaseList = selectPurchaseListData(state)
        const purchaseReportLoading = selectLoadingPurchaseReportData(state)
        return {authInfo,purchaseList,purchaseReportLoading,profileInfo}
}

const actions = {
handlePurchaseReportList : getPurchaseReportStartAction
}

export default connect(mapState, actions)(PurchaseReportComponent)
