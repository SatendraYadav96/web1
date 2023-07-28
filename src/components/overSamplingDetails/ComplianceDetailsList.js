import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table, customFormat, Modal} from "antd";
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
import {getComplianceDetailsStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import {selectComplianceDetailsListData} from "../../redux/selectors/nonComplianceSelector";
import MonthlyInputPlan from "../approvals/MonthlyInputPlan";
import {InfoCircleOutlined} from "@ant-design/icons";


const ComplianceDetailsListComponent = ({authInfo,complianceDetailsList,handleComplianceDetailsList}) => {

    // let now = new Date()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'FF Code',
                key:'ffCode',
                dataIndex:'ffCode',
                width:'100px'
            },
            {
                title:'Team',
                key:'teamName',
                dataIndex:'teamName',
                width:'100px'
            },
            {
                title: 'DR Name',
                key: 'doctorName',
                dataIndex: 'doctorName',
                width: '100px'
            },
            {
                title: 'BU',
                key: 'bu',
                dataIndex: 'bu',
                width: '100px'
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'am',
                width: '100px'
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'rbm',
                width: '100px'
            },
            {
                title: 'Total Samples Given',
                key: 'totalSampleGiven',
                dataIndex: 'totalSampleGiven',
                width: '100px'
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width: '100px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
                },
            },
            {
                title: 'Reason',
                key: 'reason',
                dataIndex: 'reason',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"complianceDetailsList.XLSX")
    }

    useEffect(() => {
        setData(complianceDetailsList?.map(item => {
            return {
                'FF Code': item.ffCode,
                'Team': item.teamName,
                'DR Name': item.doctorName,
                'BU': item.bu,
                'AM': item.am,
                'RBM': item.rbm,
                'Total Sample Given': item.totalSampleGiven,
                'Reason': item.reason,
            }
        }))
        console.log(complianceDetailsList)
    },[complianceDetailsList])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    const getComplianceDetails = () => {
        searchData()
        handleComplianceDetailsList({
            certificate: authInfo.token,
            month: month,
            year: year,
        })
    }

    const handleDetails = (row) => {
        // handleSpecialPlanDetails({
        //     certificate: authInfo.token,
        //     planId: row.dispatchPlanID,
        // })
        // setDetails(true)
    }

    return(
        <>
            <TitleWidget title="Compliance Details List" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent onChange={(value) => setMonth(value)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(value) => setYear(value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getComplianceDetails()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={16}>
                    <div align='right'>
                        <br/>
                        <Button type={"primary"} >Save</Button>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (
                            <>
                                <CSVLink
                                    data={data}
                                    filename={"complianceDetailsList.csv"}
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                >
                                    <Button>CSV</Button>
                                </CSVLink>
                                &nbsp;
                                <Button onClick={handleExcel}>EXCEL</Button>
                                &nbsp;
                                <Button onClick={handleExcel} disabled>Details</Button>
                            </>
                        )
                    }

                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={complianceDetailsList}/>
            }
            <Modal open={details} title="Compliance Details" footer={null} width={"80vw"} onCancel={() => {
                setDetails(false)
            }}>
            </Modal>
        </>
    )
}

ComplianceDetailsListComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const complianceDetailsList= selectComplianceDetailsListData(state)
    return {authInfo,complianceDetailsList}
}

const actions = {
    handleComplianceDetailsList : getComplianceDetailsStartAction
}

export default connect(mapState, actions)(ComplianceDetailsListComponent)
