import React, {useState} from "react";
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

const ItemConsumptionReportComponent = ({authInfo,profileInfo,consumptionList,consumptionReportLoading,handleConsumptionReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Business Unit',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'Division',
                key:'division',
                dataIndex:'division',
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
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To Date <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getConsumptionReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
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
