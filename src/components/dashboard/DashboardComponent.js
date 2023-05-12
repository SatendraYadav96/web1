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

const DashboardComponent = ({authInfo,pendingDispatchList,handlePendingDispatch,hubNearExpiryList,hubNearExpiryLoading,handleHubNearExpiry,hubPendingRevalidationList,hubPendingRevalidationLoading,handleHubPendingRevalidation,hubGrnErrorLogList,hubGrnErrorLogLoading,handleHubGrnErrorLog,itemExpiredDetailsList,itemExpiredDetailsLoading,handleItemExpiredDetails}) => {

    const [status, setStatus] = useState(1)
    const [columnPendingDispatch, setColumnPendingDispatch] = useState([])
    const [columnHubNearExpiry, setColumnHubNearExpiry] = useState([])
    const [columnHubPendingRevalidation, setColumnHubPendingRevalidation] = useState([])
    const [columnHubGrnErrorLog, setColumnHubGrnErrorLog] = useState([])
    const [columnItemExpiredDetails, setColumnItemExpiredDetails] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { InteractionAction, registerInteraction, registerAction } = G2;
    const data = [
        {
            year: '1991',
            value: 3,
        },
        {
            year: '1992',
            value: 4,
        },
        {
            year: '1993',
            value: 3.5,
        },
        {
            year: '1994',
            value: 5,
        },
        {
            year: '1995',
            value: 4.9,
        },
        {
            year: '1996',
            value: 6,
        },
        {
            year: '1997',
            value: 7,
        },
        {
            year: '1998',
            value: 9,
        },
        {
            year: '1999',
            value: 13,
        },
    ];
    G2.registerShape('point', 'custom-point', {
        draw(cfg, container) {
            const point = {
                x: cfg.x,
                y: cfg.y,
            };
            const group = container.addGroup();
            group.addShape('circle', {
                name: 'outer-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 0.5,
                    r: 6,
                },
            });
            group.addShape('circle', {
                name: 'inner-point',
                attrs: {
                    x: point.x,
                    y: point.y,
                    fill: cfg.color || 'red',
                    opacity: 1,
                    r: 2,
                },
            });
            return group;
        },
    });

    class CustomMarkerAction extends InteractionAction {
        active() {
            const view = this.getView();
            const evt = this.context.event;

            if (evt.data) {
                // items: 数组对象，当前 tooltip 显示的每条内容
                const { items } = evt.data;
                const pointGeometries = view.geometries.filter((geom) => geom.type === 'point');
                each(pointGeometries, (pointGeometry) => {
                    each(pointGeometry.elements, (pointElement, idx) => {
                        const active = findIndex(items, (item) => item.data === pointElement.data) !== -1;
                        const [point0, point1] = pointElement.shape.getChildren();

                        if (active) {
                            // outer-circle
                            point0.animate(
                                {
                                    r: 10,
                                    opacity: 0.2,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            ); // inner-circle

                            point1.animate(
                                {
                                    r: 6,
                                    opacity: 0.4,
                                },
                                {
                                    duration: 800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                },
                            );
                        } else {
                            this.resetElementState(pointElement);
                        }
                    });
                });
            }
        }

        reset() {
            const view = this.getView();
            const points = view.geometries.filter((geom) => geom.type === 'point');
            each(points, (point) => {
                each(point.elements, (pointElement) => {
                    this.resetElementState(pointElement);
                });
            });
        }

        resetElementState(element) {
            const [point0, point1] = element.shape.getChildren();
            point0.stopAnimate();
            point1.stopAnimate();
            const { r, opacity } = point0.get('attrs');
            point0.attr({
                r,
                opacity,
            });
            const { r: r1, opacity: opacity1 } = point1.get('attrs');
            point1.attr({
                r: r1,
                opacity: opacity1,
            });
        }

        getView() {
            return this.context.view;
        }
    }

    registerAction('custom-marker-action', CustomMarkerAction);
    registerInteraction('custom-marker-interaction', {
        start: [
            {
                trigger: 'tooltip:show',
                action: 'custom-marker-action:active',
            },
        ],
        end: [
            {
                trigger: 'tooltip:hide',
                action: 'custom-marker-action:reset',
            },
        ],
    });
    const config = {
        data,
        xField: 'year',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'custom-point',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'custom-marker-interaction',
            },
        ],
    };

    const searchData = () => {
        setFlag(true)
        setColumnPendingDispatch([
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
                title: 'Type',
                key: 'type',
                dataIndex: 'allocationType',
                width: '100px'
            },
            {
                title: 'Submission Date',
                key: 'submissionDate',
                dataIndex: 'submissionDate',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'currentStatus',
                dataIndex: 'currentStatus',
                width: '100px'
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
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px'
            },
            {
                title: 'Remaining Quantity',
                key: 'remainingQuantity',
                dataIndex: 'remainingQuantity',
                width: '100px'
            },

        ]);
        setColumnHubGrnErrorLog([
            {
                title: 'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width: '200px'
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width: '100px'
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecords',
                width: '100px'
            },
            {
                title: 'Record Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordsUploaded',
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
                title: 'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width: '200px'
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width: '100px'
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecords',
                width: '100px'
            },
            {
                title: 'Record Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordsUploaded',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
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
        handlePendingDispatch ({
            certificate: authInfo.token
        });
        handleHubNearExpiry({
            certificate: authInfo.token
        })
        handleHubPendingRevalidation({
            certificate: authInfo.token
        })
        handleHubGrnErrorLog({
            certificate: authInfo.token
        })
        handleItemExpiredDetails({
            certificate: authInfo.token
        })
        searchData()
    },[status])

    return (
        <div>
            <TitleWidget title={'Dashboards'}/>
            <Row gutter={[8,8]}>
                <Col span={9} >
                    <LineChartComponent/>
                </Col>
                <Col span={11} offset={4}>
                    <MultiLineChartComponent/>
                </Col>
            </Row>
            <br/><br/><hr/><br/><br/>
            <Row gutter={[8,8]}>
                <Col span={8}>
                    <PercentageColumnChartComponent/>
                </Col>
                <Col span={13} offset={3}>
                    <PieChartComponent/>
                </Col>
            </Row>
            <br/><br/><hr/><br/><br/>
            {/*<Row gutter={16}>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Approved Plan Pending for Dispatch" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>*/}
            {/*        {*/}
            {/*            flag && <Table columns={columnPendingDispatch} scroll={{y: '100%'}} dataSource={pendingDispatchList} style={{height: "350px"}}/>*/}
            {/*        }*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Near To Expiry Item" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>*/}
            {/*            {*/}
            {/*                flag && <Table columns={columnHubNearExpiry} scroll={{y: '100%'}} dataSource={hubNearExpiryList} style={{height: "350px"}}/>*/}
            {/*            }*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<br/>*/}
            {/*<Row gutter={16}>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="GRN Error Log In Last Upload" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px", overflow: "hidden"}}>*/}
            {/*            {*/}
            {/*                flag && <Table columns={columnHubGrnErrorLog} scroll={{y: '100%'}} dataSource={hubGrnErrorLogList} style={{height: "350px"}}/>*/}
            {/*            }*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Pending Request for Revalidation" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>*/}
            {/*            {*/}
            {/*                flag && <Table columns={columnHubPendingRevalidation} scroll={{y: '100%'}} dataSource={hubPendingRevalidationList} style={{height: "350px"}}/>*/}
            {/*            }*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<br/>*/}
            {/*<Row gutter={16}>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Items Expired" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "450px"}}>*/}
            {/*            {*/}
            {/*                flag && <Table columns={columnItemExpiredDetails} scroll={{y: '100%'}} dataSource={itemExpiredDetailsList} style={{height: "350px"}}/>*/}
            {/*            }*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

DashboardComponent.propTypes = {
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

export default connect(mapState, actions) (DashboardComponent)
