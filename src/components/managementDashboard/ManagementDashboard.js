import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table,customFormat} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import { getPurchaseReportStartAction } from '../../redux/actions/reports/purchaseReportActions'
import {selectPurchaseListData,selectLoadingPurchaseReportData} from "../../redux/selectors/purchaseReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectTypeComponent from "../widgets/SelectTeamComponent";
import {selectManagementDashboard} from "../../redux/selectors/dashboardSelector";
import {managementDashboardStartAction} from "../../redux/actions/dashboard/dashboardActions";
import {Option} from "antd/es/mentions";


const ManagementDashboardComponent = ({authInfo,managementDashboardList,handleManagementDashboard}) => {

    // let now = new Date()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [type, setType] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [toMonth, setToMonth] = useState()
    const [toYear, setToYear] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Business Unit',
                key:'businessunit',
                dataIndex:'businessunit',
                width:'100px'
            },
            {
                title:'Brand Manager',
                key:'brand_Manager',
                dataIndex:'brand_Manager',
                width:'100px'
            },
            {
                title: 'Plantype',
                key: 'plantype',
                dataIndex: 'plantype',
                width: '100px'
            },
            {
                title: 'Submission Date',
                key: 'submitted_On',
                dataIndex: 'submitted_On',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"PurchaseReport.XLSX")
    }


    const getManagementDashboard = () => {
        handleManagementDashboard({
            certificate: authInfo.token,
            type: type,
            month: month,
            year: year,
            toMonth: toMonth,
            toYear: toYear,
        })
        searchData()
    }

    return(
        <>
            <TitleWidget title="Management Dashboard" />
            <Row gutter={[8,8]}>
                <Col span={5}>
                    Type<br/>
                    <Select placeholder="Select Type" style={{width: "100%"}} onChange={(value) => setType(value)}>
                        <Option value={1}>BU wise final monthly plan approvals</Option>
                        <Option value={2}>BU Wise Special Dispatches</Option>
                        <Option value={3}>BU wise block and unblock FF details</Option>
                        <Option value={4}>Sample / Input Expired</Option>
                        <Option value={5}>Value of Inputs to other than FF and RBM</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    From Month<br/>
                    <SelectMonthComponent onChange={(value) => setMonth(value)}/>
                </Col>
                <Col span={3}>
                    Year <br/>
                    <SelectYearComponent onChange={(value) => setYear(value)}/>
                </Col>
                <Col span={3}>
                    To Month<br/>
                    <SelectMonthComponent onChange={(value) => setToMonth(value)}/>
                </Col>
                <Col span={3}>
                    Year <br/>
                    <SelectYearComponent onChange={(value) => setToYear(value)}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getManagementDashboard()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {/*{data &&*/}
                    {/*    (<CSVLink*/}
                    {/*        data={data}*/}
                    {/*        filename={"purchasereport.csv"}*/}
                    {/*        onClick={() => {*/}
                    {/*            console.log("clicked")*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <Button>CSV</Button>*/}
                    {/*    </CSVLink>)}*/}
                    <Button>CSV</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={managementDashboardList}/>
            }
        </>
    )

}

ManagementDashboardComponent.propTypes = {
    authInfo: PropTypes.any,
    managementDashboardList:PropTypes.array,
    handleManagementDashboard:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const managementDashboardList = selectManagementDashboard(state)
    return {authInfo,managementDashboardList}
}

const actions = {
    handleManagementDashboard : managementDashboardStartAction
}

export default connect(mapState, actions)(ManagementDashboardComponent)
