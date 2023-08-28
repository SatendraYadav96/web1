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
import { getDestructionReportStartAction } from '../../redux/actions/reports/destructionReportActions'
import {selectDestructionListData,selectLoadingDestructionReportData} from "../../redux/selectors/destructionReportSelector"
import moment from 'moment'
import dayjs from "dayjs";
import {CSVLink} from "react-csv";
import {selectBuDropdown, selectDivisionDropdown} from "../../redux/selectors/dropDownSelector";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";


const InventoryReversalReportComponent = ({authInfo,profileInfo,destructionList,destructionReportLoading,handleDestructionReportList,buDropdown,divisionDropdown}) => {

    let now = dayjs()
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [data, setData] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const searchInput = useRef(null);

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
                key:'',
                dataIndex:'businessUnit',
                width:'100px',
                ...getColumnSearchProps('businessUnit'),
            },
            {
                title:'SubTeam',
                key:'',
                dataIndex:'division',
                width:'100px',
                ...getColumnSearchProps('division'),
            },
            {
                title:'Cost Center',
                key:'',
                dataIndex:'costCenter',
                width:'100px',
                ...getColumnSearchProps('costCenter'),
            },
            {
                title:'Item Name',
                key:'',
                dataIndex:'itemName',
                width:'100px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title:'Item Code',
                key:'',
                dataIndex:'itemCode',
                width:'100px',
                ...getColumnSearchProps('itemCode'),
            },
            {
                title:'Type',
                key:'',
                dataIndex:'itemType',
                width:'100px',
                ...getColumnSearchProps('itemType'),
            },
            {
                title:'Expiry Date',
                key:'',
                dataIndex:'expiryDate',
                width:'100px',
                ...getColumnSearchProps('expiryDate'),
            },
            {
                title:'Reversal Date',
                key:'',
                dataIndex:'reversalDate',
                width:'100px',
                ...getColumnSearchProps('reversalDate'),
            },
            {
                title:'Quantity Reversed',
                key:'',
                dataIndex:'quantityReversed',
                width:'100px',
                ...getColumnSearchProps('quantityReversed'),
            },
            {
                title:'Rate',
                key:'',
                dataIndex:'rate',
                width:'100px',
                ...getColumnSearchProps('rate'),
            },
            {
                title:'Value',
                key:'',
                dataIndex:'value',
                width:'100px',
                ...getColumnSearchProps('value'),
            },
            {
                title:'Remarks',
                key:'',
                dataIndex:'remarks',
                width:'100px',
                ...getColumnSearchProps('remarks'),
            }
        ])
        setDataSource([])
    }


    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();


    const getDestructionReportList = () => {
         console.log(businessUnit);
         console.log(division);
         console.log(formatedStartDateString);
         console.log(formatedEndDateString);
         console.log(profileInfo.id);
         console.log(profileInfo.userDesignation.id);
         console.log(destructionList);

        handleDestructionReportList ({
            dest: {
                businessUnit:bu,
                divison:d,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                fromDate:formatedStartDateString,
                toDate:formatedEndDateString,
                statusId:"EDC4D827-6C08-46CA-BF60-B41FFFC4EABE",
            },
            certificate: authInfo.token
        });
        searchData()
    }

    useEffect(() => {
        setData(destructionList.map(item => {
            return {
                team: item.businessUnit,
                SubTeam: item.divison,
                costCenter: item.costCenter,
                itemName: item.itemName,
                itemCode: item.itemCode,
                itemType: item.itemType,
                expiryDate: item.expiryDate,
                reversalDate: item.reversalDate,
                quantityReversed: item.quantityReversed,
                rate: item.rate,
                value: item.value,
                remarks: item.remarks,
            }
        }))
        console.log(destructionList)
    },[destructionList])

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

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    return(
        <>
            <TitleWidget title="Inventory Reversal Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Reversal From Date <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDestructionReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"inventoryreversalreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;<Button>Excel</Button>
                </Col>
                {/*<Col span={18}>*/}
                {/*    <div align="right">*/}
                {/*        <Input.Search style={{ width: 300 }}/>*/}
                {/*    </div>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <span>Total Rows: <b>{destructionList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={destructionList}/>
            }
        </>
    )
}

InventoryReversalReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    destructionList:PropTypes.array,
    buDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    destructionReportLoading:PropTypes.any,
    handleDestructionReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const destructionList = selectDestructionListData(state)
    const destructionReportLoading = selectLoadingDestructionReportData(state)
    return {authInfo,destructionList,destructionReportLoading,profileInfo,buDropdown,divisionDropdown}
}

const actions = {
    handleDestructionReportList : getDestructionReportStartAction
}

export default connect(mapState, actions)(InventoryReversalReportComponent)
