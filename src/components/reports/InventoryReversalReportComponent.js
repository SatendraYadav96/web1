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
import { getDestructionReportStartAction } from '../../redux/actions/reports/destructionReportActions'
import {selectDestructionListData,selectLoadingDestructionReportData} from "../../redux/selectors/destructionReportSelector"
import moment from 'moment'
import dayjs from "dayjs";

const InventoryReversalReportComponent = ({authInfo,profileInfo,destructionList,destructionReportLoading,handleDestructionReportList}) => {

    let now = dayjs()
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
                key:'',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'Division',
                key:'',
                dataIndex:'division',
                width:'100px'
            },
            {
                title:'Cost Center',
                key:'',
                dataIndex:'costCenter',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'',
                dataIndex:'itemName',
                width:'100px'
            },
            {
                title:'Item Code',
                key:'',
                dataIndex:'itemCode',
                width:'100px'
            },
            {
                title:'Type',
                key:'',
                dataIndex:'itemType',
                width:'100px'
            },
            {
                title:'Expiry Date',
                key:'',
                dataIndex:'expiryDate',
                width:'100px'
            },
            {
                title:'Reversal Date',
                key:'',
                dataIndex:'reversalDate',
                width:'100px'
            },
            {
                title:'Quantity Reversed',
                key:'',
                dataIndex:'quantityReversed',
                width:'100px'
            },
            {
                title:'Rate',
                key:'',
                dataIndex:'rate',
                width:'100px'
            },
            {
                title:'Value',
                key:'',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'Remarks',
                key:'',
                dataIndex:'remarks',
                width:'100px'
            }
        ])

        setDataSource([])
    }


        const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
        const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();


                    const getDestructionReportList = () => {
                         console.log(businessUnit);
                         console.log(division);
                         console.log(formatedStartDateString);
                         console.log(formatedEndDateString);
                         console.log(profileInfo.id);
                         console.log(profileInfo.userDesignation.id);

                         console.log(destructionList);

                        handleDestructionReportList ({
                        businessUnit:businessUnit,
                        divison:division,
                        userId: profileInfo.id,
                        userDesgId: profileInfo.userDesignation.id,
                        fromDate:formatedStartDateString,
                        toDate:formatedEndDateString,
                        statusId:"EDC4D827-6C08-46CA-BF60-B41FFFC4EABE",




                        certificate: authInfo.token
                        });
                        searchData()

                    }



    return(
        <>
            <TitleWidget title="Inventory Reversal Report" />
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
                    Reversal From Date <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To Date <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={now}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDestructionReportList()}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={destructionList}/>
            }
        </>
    )

}

InventoryReversalReportComponent.propTypes = {
                    authInfo: PropTypes.any,
                    profileInfo: PropTypes.any,
                    destructionList:PropTypes.array,
                    destructionReportLoading:PropTypes.any,
                    handleDestructionReportList:PropTypes.func
}

const mapState = (state) => {
                const authInfo = selectAuthInfo(state)
                const profileInfo = selectProfileInfo(state)
                const destructionList = selectDestructionListData(state)
                const destructionReportLoading = selectLoadingDestructionReportData(state)
                return {authInfo,destructionList,destructionReportLoading,profileInfo}
}

const actions = {
handleDestructionReportList : getDestructionReportStartAction
}

export default connect(mapState, actions)(InventoryReversalReportComponent)
