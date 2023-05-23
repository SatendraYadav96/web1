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


const BatchReconciliationComponent = ({authInfo}) => {

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
                title:'Buisness Unit',
                key:'buisnessUnit',
                dataIndex:'buisnessUnit',
                width:'100px'
            },
            {
                title:'Brand//CC',
                key:'brandCC',
                dataIndex:'brandCC',
                width:'100px'
            },
            {
                title: 'SKU Details',
                key: 'skuDetails',
                dataIndex: 'skuDetails',
                width: '100px'
            },
            {
                title: 'Batch Number',
                key: 'batchNumber',
                dataIndex: 'batchNumber',
                width: '100px'
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Product Code',
                key: 'productCode',
                dataIndex: 'productCode',
                width: '100px'
            },
            {
                title: 'Qty Rcvd at Hub',
                key: 'qtyRcvdAtHub',
                dataIndex: 'qtyRcvdAtHub',
                width: '100px'
            },
            {
                title: 'Dispatched at Hub',
                key: 'dispatchedAtHub',
                dataIndex: 'dispatchedAtHub',
                width: '100px'
            },
            {
                title: 'Balance With Hub',
                key: 'balanceWithHub',
                dataIndex: 'balanceWithHub',
                width: '100px'
            },
            {
                title: 'Destroyed at Hub',
                key: 'destroyedAtHub',
                dataIndex: 'destroyedAtHub',
                width: '100px'
            },
            {
                title: 'Validated by FF',
                key: 'validatedByFF',
                dataIndex: 'validatedByFF',
                width: '100px'
            },
            {
                title: 'Pending Validation by FF',
                key: 'pendingValidationByFF',
                dataIndex: 'pendingValidationByFF',
                width: '100px'
            },
            {
                title: 'Distributed by FF',
                key: 'distributedByFF',
                dataIndex: 'distributedByFF',
                width: '100px'
            },
            {
                title: 'FF Balance',
                key: 'ffBalance',
                dataIndex: 'ffBalance',
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

    useEffect(() => {
        searchData()
    },[authInfo.token])

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

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    return(
        <>
            <TitleWidget title="Batch Reconciliation"/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} >Download</Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )
}

BatchReconciliationComponent.propTypes = {
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

export default connect(mapState, actions)(BatchReconciliationComponent)
