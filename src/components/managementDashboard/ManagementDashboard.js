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


const ManagementDashboardComponent = ({authInfo}) => {

    // let now = new Date()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Employee Code',
                key:'employeeCode',
                dataIndex:'employeeCode',
                width:'100px'
            },
            {
                title:'Employee Name',
                key:'employeeCode',
                dataIndex:'employeeCode',
                width:'100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'Headquater',
                key: 'headquater',
                dataIndex: 'headquater',
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
                title: 'Month',
                key: 'month',
                dataIndex: 'month',
                width: '100px'
            },
            {
                title: 'Year',
                key: 'year',
                dataIndex: 'year',
                width: '100px'
            },
            {
                title: 'Is Blocked',
                key: 'isBlocked',
                dataIndex: 'isBlocked',
                width: '100px'
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px'
            },
            {
                title: 'Admin Remark',
                key: 'adminRemark',
                dataIndex: 'adminRemark',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    // const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    // const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();


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
    //
    //         }
    //     }))
    //     console.log(purchaseList)
    // },[purchaseList])

    // const handleBusinessUnit = (value) =>  {
    //     setBusinessUnit(value)
    // }
    //
    // const handleDivision = (value) => {
    //     setDivision(value)
    // }

    return(
        <>
            <TitleWidget title="Management Dashboard" />
            <Row gutter={[8,8]}>
                <Col span={5}>
                    Type<br/>
                    <SelectTypeComponent/>
                </Col>
                <Col span={3}>
                    From<br/>
                    <DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Month <br/>
                    <DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getPurchaseReportList()}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )

}

ManagementDashboardComponent.propTypes = {
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
    // const purchaseReportLoading = selectLoadingPurchaseReportData(state)
    return {authInfo}
}

const actions = {
    // handlePurchaseReportList : getPurchaseReportStartAction
}

export default connect(mapState, actions)(ManagementDashboardComponent)
