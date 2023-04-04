import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectFilterComponent from "../widgets/SelectFilterComponent";
import SelectFilterPlanComponent from "../widgets/SelectFilterPlanComponent";
import { getDispatchesReportStartAction } from '../../redux/actions/reports/dispatchesReportActions'
import {selectDispatchesListData,selectLoadingDispatchesReportData} from "../../redux/selectors/dispatchesReportSelector"
import moment from 'moment'

const DispatchReportComponent = ({authInfo,profileInfo,dispatchesList,dispatchesReportLoading,handleDispatchesReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [filter, setFilter] = useState()
    const [filterPlan, setFilterPlan] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
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
                dataIndex:'divison',
                width:'100px'
            },
            {
                title: 'Recipient Name',
                key: 'recipientName',
                dataIndex: 'recipientName',
                width: '100px'
            },
            {
                title: 'Recipient Code',
                key: '',
                dataIndex: 'recipientCode',
                width: '100px'
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
                width: '100px'
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
                key: '',
                dataIndex: 'invoiceNo',
                width: '100px'
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
                    businessUnit:businessUnit,
                    divison:division,
                    userId: profileInfo.id,
                    userDesgId: profileInfo.userDesignation.id,
                    startDate:formatedStartDateString,
                    endDate:formatedEndDateString,
                    filter:filter,
                    filterPlan:filterPlan,





                    certificate: authInfo.token
                    });
                    searchData()

                }



    return(
        <>
            <TitleWidget title="Dispatches Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    BU<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    Division<br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} />
                </Col>
                <Col span={3}>
                    To Date<br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} />
                </Col>
                <Col span={3}>
                    Type<br/>
                    <SelectFilterComponent value={filter} onChange={(e) => setFilter(e)} />
                </Col>
                <Col span={3}>
                    Plan Type<br/>
                    <SelectFilterPlanComponent value={filterPlan} onChange={(e) => setFilterPlan(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDispatchesReportList()}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={dispatchesList}/>
            }
        </>
    )

}

DispatchReportComponent.propTypes = {
                authInfo: PropTypes.any,
                profileInfo: PropTypes.any,
                dispatchesList:PropTypes.array,
                dispatchesReportLoading:PropTypes.any,
                handleDispatchesReportList:PropTypes.func
}

const mapState = (state) => {
            const authInfo = selectAuthInfo(state)
            const profileInfo = selectProfileInfo(state)
            const dispatchesList = selectDispatchesListData(state)
            const dispatchesReportLoading = selectLoadingDispatchesReportData(state)
            return {authInfo,dispatchesList,dispatchesReportLoading,profileInfo}
}

const actions = {
handleDispatchesReportList : getDispatchesReportStartAction
}

export default connect(mapState, actions)(DispatchReportComponent)
