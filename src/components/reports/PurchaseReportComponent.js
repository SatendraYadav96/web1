import React, {useState} from "react";
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


const PurchaseReportComponent = ({authInfo,profileInfo,purchaseList,purchaseReportLoading,handlePurchaseReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
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
                title: 'GRN Date',
                key: '',
                dataIndex: 'grnDate',
                width: '100px'
            },
            {
                title: 'Vendor Name',
                key: '',
                dataIndex: 'vendorName',
                width: '100px'
            },
            {
                title: 'Vendor Code',
                key: '',
                dataIndex: 'vendorCode',
                width: '100px'
            },
            {
                title: 'PO No.',
                key: '',
                dataIndex: 'poNo',
                width: '100px'
            },
            {
                title: 'Input Name',
                key: '',
                dataIndex: 'productName',
                width: '100px'
            },
            {
                title: 'Product Code',
                key: '',
                dataIndex: 'productCode',
                width: '100px'
            },
            {
                title: 'Cost Center',
                key: '',
                dataIndex: 'costCenter',
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
                title: 'Batch No',
                key: '',
                dataIndex: 'batchNo',
                width: '100px'
            },
            {
                title: 'Medical Code',
                key: '',
                dataIndex: 'medicalCode',
                width: '100px'
            },
            {
                title: 'No of Boxes',
                key: '',
                dataIndex: 'noBoxes',
                width: '100px'
            }
        ])

        setDataSource([])
    }

const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();


            const getPurchaseReportList = () => {
                 console.log(businessUnit);
                 console.log(division);
                 console.log(formatedStartDateString);
                 console.log(formatedEndDateString);
                 console.log(profileInfo.id);
                 console.log(profileInfo.userDesignation.id);

                 console.log(purchaseList);

                handlePurchaseReportList ({
                businessUnit:businessUnit,
                divison:division,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                startDate:formatedStartDateString,
                endDate:formatedEndDateString,



                certificate: authInfo.token
                });
                searchData()

            }



    return(
        <>
            <TitleWidget title="Purchase Report" />
            <Row gutter={[8,8]}>
                <Col span={4}>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={4}>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>

                 <Col span={4}>
                     Purchase Date <DatePicker dateFormat="yyyy-MM-dd"  value={startDate} onChange={(e) => setStartDate(e)} />
                 </Col>
                 <Col span={4}>
                     <DatePicker dateFormat="yyyy-MM-dd"    value={endDate}  onChange={(e) => setEndDate(e)} />
                 </Col>

                <Col span={4}>
                    <Button type={"primary"} onClick={()=>getPurchaseReportList()}>Search</Button>
                </Col>
                <Col span={4}></Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={purchaseList}/>
            }
        </>
    )

}

PurchaseReportComponent.propTypes = {
            authInfo: PropTypes.any,
            profileInfo: PropTypes.any,
            purchaseList:PropTypes.array,
            purchaseReportLoading:PropTypes.any,
            handlePurchaseReportList:PropTypes.func
}

const mapState = (state) => {
        const authInfo = selectAuthInfo(state)
        const profileInfo = selectProfileInfo(state)
        const purchaseList = selectPurchaseListData(state)
        const purchaseReportLoading = selectLoadingPurchaseReportData(state)
        return {authInfo,purchaseList,purchaseReportLoading,profileInfo}
}

const actions = {
handlePurchaseReportList : getPurchaseReportStartAction
}

export default connect(mapState, actions)(PurchaseReportComponent)
