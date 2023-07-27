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
import {getBatchReconciliationStartAction} from "../../redux/actions/reports/batchReconciliationReportActions";
import {selectBatchReconciliationListData} from "../../redux/selectors/batchReconciliationReportSelector";


const BatchReconciliationComponent = ({authInfo,handleBatchReconciliation,batchReconciliationList}) => {

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
                key:'bu',
                dataIndex:'bu',
                width:'100px'
            },
            {
                title:'Brand//CC',
                key:'brand',
                dataIndex:'brand',
                width:'150px'
            },
            {
                title: 'SKU Details',
                key: 'prodcutname',
                dataIndex: 'prodcutname',
                width: '100px'
            },
            {
                title: 'Batch Number',
                key: 'batch_No',
                dataIndex: 'batch_No',
                width: '110px'
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
                key: 'receivedatHub',
                dataIndex: 'receivedatHub',
                width: '100px'
            },
            {
                title: 'Dispatched at Hub',
                key: 'dispatched',
                dataIndex: 'dispatched',
                width: '100px'
            },
            {
                title: 'Balance With Hub',
                key: 'hub_Balance',
                dataIndex: 'hub_Balance',
                width: '100px'
            },
            {
                title: 'Destroyed at Hub',
                key: 'destroyed',
                dataIndex: 'destroyed',
                width: '100px'
            },
            {
                title: 'Validated by FF',
                key: 'validated',
                dataIndex: 'validated',
                width: '100px'
            },
            {
                title: 'Pending Validation by FF',
                key: 'pending_Validation',
                dataIndex: 'pending_Validation',
                width: '100px'
            },
            {
                title: 'Distributed by FF',
                key: 'distribute',
                dataIndex: 'distribute',
                width: '100px'
            },
            {
                title: 'FF Balance',
                key: 'balance',
                dataIndex: 'balance',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    useEffect(() => {
        handleBatchReconciliation({
            certificate: authInfo.token,
        })
    },[])


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

    useEffect(() => {
        setData(batchReconciliationList?.map(item => {
            return ({
                'Business Unit': item.bu,
                'Brand//CC': item.brand,
                'SKU Details': item.prodcutname,
                'Batch Number': item.batch_No,
                'Expiry Date': item.expiryDate,
                'Product Code': item.productCode,
                'Qty Rcvd at Hub': item.receivedatHub,
                'Dispatched at Hub': item.dispatched,
                'Balance With Hub': item.hub_Balance,
                'Destroyed at Hub': item.destroyed,
                'Validated by FF': item.validated,
                'Pending Validation by FF': item.pending_Validation,
                'Distributed by FF': item.distribute,
                'FF Balance': item.balance,
            })
        }))
    },[batchReconciliationList])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"BatchReconciliation.XLSX")
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
                    <Button type={"primary"} onClick={handleExcel}>Download</Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={batchReconciliationList}/>
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
    const batchReconciliationList = selectBatchReconciliationListData(state)
    // const purchaseReportLoading = selectLoadingPurchaseReportData(state)
    return {authInfo,batchReconciliationList}
}

const actions = {
    handleBatchReconciliation : getBatchReconciliationStartAction
}

export default connect(mapState, actions)(BatchReconciliationComponent)
