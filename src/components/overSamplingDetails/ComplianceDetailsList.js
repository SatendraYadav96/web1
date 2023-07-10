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
import {getComplianceDetailsStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import {selectComplianceDetailsListData} from "../../redux/selectors/nonComplianceSelector";
import MonthlyInputPlan from "../approvals/MonthlyInputPlan";


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
                key:'team',
                dataIndex:'team',
                width:'100px'
            },
            {
                title: 'DR Name',
                key: 'drName',
                dataIndex: 'drName',
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
                key: 'totalSamplesGiven',
                dataIndex: 'totalSamplesGiven',
                width: '100px'
            },
            {
                title: 'Details',
                key: 'details',
                dataIndex: 'details',
                width: '100px'
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


    const getPurchaseReportList = () => {
        // console.log(businessUnit);
        // console.log(division);
        // console.log(startDate);
        // console.log(endDate);
        // console.log(profileInfo.id);
        // console.log(profileInfo.userDesignation.id);
        //
        // console.log(purchaseList);

        // handlePurchaseReportList ({
        //     businessUnit:businessUnit,
        //     divison:division,
        //     userId: profileInfo.id,
        //     userDesgId: profileInfo.userDesignation.id,
        //     startDate:formatedStartDateString,
        //     endDate:formatedEndDateString,
        //     // startDate:startDate,
        //     // endDate:endDate,
        //
        //
        //
        //     certificate: authInfo.token
        // });
        searchData()

    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"PurchaseReport.XLSX")
    }

    // useEffect(() => {
    //     setData(purchaseList.map(item => {
    //         return {
    //             team: item.businessUnit,
    //             subTeam: item.divison,
    //             grnDate: item.grnDate,
    //             vendorName: item.vendorName,
    //             vendorCode: item.vendorCode,
    //             poNo: item.poNo,
    //             inputName: item.productName,
    //             inputCode: item.productCode,
    //             costCenter: item.costCenter,
    //             quantity: item.quantity,
    //             rate: item.rate,
    //             value: item.value,
    //             batchNo: item.batchNo,
    //             medicalCode: item.medicalCode,
    //             noBoxes: item.noBoxes,
    //         }
    //     }))
    //     console.log(purchaseList)
    // },[purchaseList])

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
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} style={{width: "100%"}}>Save</Button>
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
                    &nbsp;
                    <Button onClick={handleExcel}>Details</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )
}

ComplianceDetailsListComponent.propTypes = {
    authInfo: PropTypes.any,
    // profileInfo: PropTypes.any,
    // purchaseList:PropTypes.array,
    // purchaseReportLoading:PropTypes.any,
    // handlePurchaseReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    // const profileInfo = selectProfileInfo(state)
    // const purchaseList = selectPurchaseListData(state)
    const complianceDetailsList= selectComplianceDetailsListData(state)
    return {authInfo,complianceDetailsList}
}

const actions = {
    handleComplianceDetailsList : getComplianceDetailsStartAction
}

export default connect(mapState, actions)(ComplianceDetailsListComponent)
