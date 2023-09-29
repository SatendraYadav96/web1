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
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    //const [data, setData] = useState([])
    const [dataM, setDataM] = useState([])

    const searchData = () => {
        setFlag(true)
        if (type === 1) {
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
        } else if (type === 2) {
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
                    title: 'Category',
                    key: 'category',
                    dataIndex: 'category',
                    width: '100px'
                },
                {
                    title: 'Total FF',
                    key: 'totalFF',
                    dataIndex: 'totalFF',
                    width: '100px'
                },
                {
                    title: 'Amount',
                    key: 'cost',
                    dataIndex: 'cost',
                    width: '100px'
                },
            ])
        } else if (type === 3) {
            setColumn([
                {
                    title:'Month',
                    key:'month',
                    dataIndex:'month',
                    width:'100px'
                },
                {
                    title:'Year',
                    key:'year',
                    dataIndex:'year',
                    width:'100px'
                },
                {
                    title: 'Team',
                    key: 'team',
                    dataIndex: 'team',
                    width: '100px'
                },
                {
                    title: 'Block',
                    key: 'bLOCK',
                    dataIndex: 'bLOCK',
                    width: '100px'
                },
                {
                    title: 'Unblock',
                    key: 'uNBLOCK',
                    dataIndex: 'uNBLOCK',
                    width: '100px'
                },
            ])
        } else if (type === 4) {
            setColumn([
                {
                    title:'Item Name',
                    key:'itemName',
                    dataIndex:'itemName',
                    width:'100px'
                },
                {
                    title:'Item Code',
                    key:'item_Code',
                    dataIndex:'item_Code',
                    width:'100px'
                },
                {
                    title: 'Quantity',
                    key: 'quantity',
                    dataIndex: 'quantity',
                    width: '100px'
                },
                {
                    title: 'Expiry Date',
                    key: 'expiryDate',
                    dataIndex: 'expiryDate',
                    width: '100px'
                },
                {
                    title: 'Amount',
                    key: 'cost',
                    dataIndex: 'cost',
                    width: '100px'
                },
            ])
        } else if (type === 5) {
            setColumn([
                {
                    title:'Name',
                    key:'name',
                    dataIndex:'name',
                    width:'100px'
                },
                {
                    title:'Item Name',
                    key:'itemName',
                    dataIndex:'itemName',
                    width:'100px'
                },
                {
                    title: 'Item Code',
                    key: 'itemCode',
                    dataIndex: 'itemCode',
                    width: '100px'
                },
                {
                    title: 'Quantity',
                    key: 'quantity',
                    dataIndex: 'quantity',
                    width: '100px'
                },
                {
                    title: 'Updated On',
                    key: 'created_on',
                    dataIndex: 'created_on',
                    width: '100px'
                },
                {
                    title: 'Amount',
                    key: 'cost',
                    dataIndex: 'cost',
                    width: '100px'
                },
            ])
        }

        setDataSource([])
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(dataM);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ManagementDashboard.xlsx")
    }

    useEffect(() => {
        if (managementDashboardList) {
            setDataM(managementDashboardList?.map(item => {
                if (type === 1) {
                    return {
                        "Business Unit": item.businessunit,
                        "Brand Manager": item.brand_Manager,
                        "Plan type": item.plantype,
                        "Submission Date": item.submitted_On,
                    }
                } else if (type === 2) {
                    return {
                        "Business Unit": item.businessunit,
                        "Brand Manager": item.brand_Manager,
                        "Category": item.category,
                        "Total FF": item.totalFF,
                        "Amount": item.cost,
                    }
                } else if (type === 3) {
                    return {
                        "Month": item.month,
                        "Year": item.year,
                        "Team": item.team,
                        "Block": item.bLOCK,
                        "Unblock": item.uNBLOCK,
                    }
                } else if (type === 4) {
                    return {
                        "Item Name": item.itemName,
                        "Item Code": item.item_Code,
                        "Quantity": item.quantity,
                        "Expiry Date": item.expiryDate,
                        "Amount": item.cost,
                    }
                } else if (type === 4) {
                    return {
                        "Name": item.name,
                        "Item Name": item.itemName,
                        "Item Code": item.item_Code,
                        "Quantity": item.quantity,
                        "Updated On": item.created_on,
                        "Amount": item.cost,
                    }
                }
            }))
        }
    },[managementDashboardList])

    useEffect(() => {

    })



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
                    <CSVLink
                        data={dataM}
                        filename={"ManagementDashboard.csv"}
                        onClick={() => {
                            console.log("clicked")
                        }}
                    >
                        <Button>CSV</Button>
                    </CSVLink>
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={12}></Col>
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/>
            <span>Total Rows: <b>{managementDashboardList?.length}</b></span>
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
