import React, {useEffect, useState} from 'react'
import TitleWidget from '../../widgets/TitleWidget'
import {Button, Card, Col, Row, Table} from "antd";
import {Line,G2} from "@ant-design/plots/es/index"
import { each, findIndex } from '@antv/util';
import LineChartComponent from "./LineChartComponent";
import MultiLineChartComponent from "./BarChartComponent";
import PercentageColumnChartComponent from "./PercentageColumnChartComponent";
import {Pie} from "@ant-design/plots";
import PieChartComponent from "./PieChartComponent";
import GroupChartComponent from "./GroupChartComponent";
import {EditOutlined} from "@ant-design/icons";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectLoadingVendorData, selectVendorListData} from "../../redux/selectors/masterSelector";
import PropTypes from "prop-types";
import {getVendorStartAction} from "../../redux/actions/master/masterActions";
import {connect} from "react-redux";
import {
    selectHubGrnErrorLog,
    selectHubGrnErrorLogLoading,
    selectHubNearExpiry,
    selectHubNearExpiryLoading,
    selectHubPendingRevalidation,
    selectHubPendingRevalidationLoading,
    selectItemExpiredDetails, selectItemExpiredDetailsLoading,
    selectPendingDispatch,
    selectPendingDispatchLoading
} from "../../redux/selectors/dashboardSelector";
import {hubGrnErrorLogStartAction, hubNearExpiryStartAction, hubPendingRevalidationStartAction, itemExpiredDetailsStartAction, pendingDispatchStartAction} from "../../redux/actions/dashboard/dashboardActions";

const BMDashboardComponent = ({authInfo,pendingDispatchList,handlePendingDispatch,hubNearExpiryList,hubNearExpiryLoading,handleHubNearExpiry,hubPendingRevalidationList,hubPendingRevalidationLoading,handleHubPendingRevalidation,hubGrnErrorLogList,hubGrnErrorLogLoading,handleHubGrnErrorLog,itemExpiredDetailsList,itemExpiredDetailsLoading,handleItemExpiredDetails}) => {

    const [status, setStatus] = useState(1)
    const [columnPendingDispatch, setColumnPendingDispatch] = useState([])
    const [columnHubNearExpiry, setColumnHubNearExpiry] = useState([])
    const [columnHubPendingRevalidation, setColumnHubPendingRevalidation] = useState([])
    const [columnHubGrnErrorLog, setColumnHubGrnErrorLog] = useState([])
    const [columnItemExpiredDetails, setColumnItemExpiredDetails] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { InteractionAction, registerInteraction, registerAction } = G2;

    const searchData = () => {
        setFlag(true)
        setColumnPendingDispatch([
            {
                title: 'Period',
                key: 'period',
                dataIndex: 'period',
                width: '150px'
            },
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '150px'
            },
            {
                title: 'Status',
                key: 'currentStatus',
                dataIndex: 'currentStatus',
                width: '150px'
            },
        ]);
        setColumnHubNearExpiry([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px'
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px'
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Expires In',
                key: 'expiresIn',
                dataIndex: 'expiresIn',
                width: '100px'
            },

        ]);
        setColumnHubPendingRevalidation([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px'
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px'
            },
            {
                title: 'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px'
            },

        ]);
        setColumnHubGrnErrorLog([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px'
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px'
            },
            {
                title: 'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width: '100px'
            },
            {
                title: 'Quantity',
                key: 'quantity',
                dataIndex: 'quantity',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px'
            },

        ]);
        setColumnItemExpiredDetails([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px'
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px'
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Quantity',
                key: 'quantity',
                dataIndex: 'quantity',
                width: '100px'
            },
            {
                title: 'Cost',
                key: 'cost',
                dataIndex: 'cost',
                width: '100px'
            },
            {
                title: 'PoNo',
                key: 'pono',
                dataIndex: 'pono',
                width: '100px'
            },

        ]);
        setDataSource([
            {
                key: '',
                vendorName: '',
                vendorCode: '',
                address1:'',
                address2:'',
                city: '',
                state: '',
                zip: ''
            }
        ]);
    }

    useEffect(() => {
        // handlePendingDispatch ({
        //     certificate: authInfo.token
        // });
        // handleHubNearExpiry({
        //     certificate: authInfo.token
        // })
        // handleHubPendingRevalidation({
        //     certificate: authInfo.token
        // })
        // handleHubGrnErrorLog({
        //     certificate: authInfo.token
        // })
        // handleItemExpiredDetails({
        //     certificate: authInfo.token
        // })
        searchData()
    },[status])

    return (
        <div>
            <TitleWidget title={'Dashboards'}/>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Dispatch Plan Status" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>
                        {
                            flag && <Table columns={columnPendingDispatch} scroll={{y: '100%'}} dataSource={pendingDispatchList} style={{height: "350px"}}/>
                        }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Near To Expiry Item" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>
                        {
                            flag && <Table columns={columnHubNearExpiry} scroll={{y: '100%'}} dataSource={hubNearExpiryList} style={{height: "350px"}}/>
                        }
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Latest Inventory" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px", overflow: "hidden"}}>
                        {
                            flag && <Table columns={columnHubGrnErrorLog} scroll={{y: '100%'}} dataSource={hubGrnErrorLogList} style={{height: "350px"}}/>
                        }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Item Requisition status" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>
                        {
                            flag && <Table columns={columnHubPendingRevalidation} scroll={{y: '100%'}} dataSource={hubPendingRevalidationList} style={{height: "350px"}}/>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

BMDashboardComponent.propTypes = {
    authInfo: PropTypes.any,
    pendingDispatchList: PropTypes.array,
    pendingDispatchLoading: PropTypes.any,
    handlePendingDispatch: PropTypes.func,
    hubNearExpiryList: PropTypes.array,
    hubNearExpiryLoading: PropTypes.any,
    handleHubNearExpiry: PropTypes.func,
    hubPendingRevalidationList: PropTypes.array,
    hubPendingRevalidationLoading: PropTypes.any,
    handleHubPendingRevalidation: PropTypes.func,
    hubGrnErrorLogList: PropTypes.array,
    hubGrnErrorLogLoading: PropTypes.any,
    handleHubGrnErrorLog: PropTypes.func,
    itemExpiredDetailsList: PropTypes.array,
    itemExpiredDetailsLoading: PropTypes.any,
    handleItemExpiredDetails: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const pendingDispatchList = selectPendingDispatch(state)
    const pendingDispatchLoading = selectPendingDispatchLoading(state)
    const hubNearExpiryList = selectHubNearExpiry(state)
    const hubNearExpiryLoading = selectHubNearExpiryLoading(state)
    const hubPendingRevalidationList = selectHubPendingRevalidation(state)
    const hubPendingRevalidationLoading = selectHubPendingRevalidationLoading(state)
    const hubGrnErrorLogList = selectHubGrnErrorLog(state)
    const hubGrnErrorLogLoading = selectHubGrnErrorLogLoading(state)
    const itemExpiredDetailsList = selectItemExpiredDetails(state)
    const itemExpiredDetailsLoading = selectItemExpiredDetailsLoading(state)
    return {authInfo,pendingDispatchList,pendingDispatchLoading,hubNearExpiryList,hubNearExpiryLoading,hubPendingRevalidationList,hubPendingRevalidationLoading,hubGrnErrorLogList,hubGrnErrorLogLoading,itemExpiredDetailsList,itemExpiredDetailsLoading}
}

const actions = {
    handlePendingDispatch: pendingDispatchStartAction,
    handleHubNearExpiry: hubNearExpiryStartAction,
    handleHubPendingRevalidation: hubPendingRevalidationStartAction,
    handleHubGrnErrorLog: hubGrnErrorLogStartAction,
    handleItemExpiredDetails: itemExpiredDetailsStartAction,
}

export default connect(mapState, actions) (BMDashboardComponent)
