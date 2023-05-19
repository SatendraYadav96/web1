import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import { getItemConsumptionReportStartAction } from '../../redux/actions/reports/itemConsumptionReportActions'
import {selectConsumptionListData,selectLoadingConsumptionReportData} from "../../redux/selectors/itemConsumptionReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const ItemConsumptionReportComponent = ({authInfo,profileInfo,consumptionList,consumptionReportLoading,handleConsumptionReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [data, setData] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [division, setDivision] = useState()

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
                title: 'Cost Center',
                key: '',
                dataIndex: 'costCenter',
                width: '100px'
            },
            {
                title: 'Item Name',
                key: '',
                dataIndex: 'itemName',
                width: '100px'
            },
            {
                title: 'Item Code',
                key: '',
                dataIndex: 'itemCode',
                width: '100px'
            },
            {
                title: 'Type',
                key: '',
                dataIndex: 'itemType',
                width: '100px'
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
        businessUnit:businessUnit,
        divison:division,
        userId: profileInfo.id,
        userDesgId: profileInfo.userDesignation.id,
        fromDate:formatedStartDateString,
        toDate:formatedEndDateString,
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

    return(
        <>
            <TitleWidget title="Item Consumption Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} style={{width: "100%"}} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} style={{width: "100%"}} onChange={(e) => setDivision(e)} />
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
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
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
            const consumptionList = selectConsumptionListData(state)
            const consumptionReportLoading = selectLoadingConsumptionReportData(state)
            return {authInfo,consumptionList,consumptionReportLoading,profileInfo}
}

const actions = {
handleConsumptionReportList : getItemConsumptionReportStartAction
}

export default connect(mapState, actions)(ItemConsumptionReportComponent)
