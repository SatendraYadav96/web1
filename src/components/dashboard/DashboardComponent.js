import React, {useEffect, useRef, useState} from 'react'
import TitleWidget from '../../widgets/TitleWidget'
import {Button, Card, Col, Form, Input, Modal, Row, Space, Table} from "antd";
import {Line,G2} from "@ant-design/plots/es/index"
import { Column } from '@ant-design/plots';
import LineChartComponent from "./LineChartComponent";
import MultiLineChartComponent from "./BarChartComponent";
import PercentageColumnChartComponent from "./PercentageColumnChartComponent";
import PieChartComponent from "./PieChartComponent";
import GroupChartComponent from "./GroupChartComponent";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectLoadingVendorData, selectVendorListData} from "../../redux/selectors/masterSelector";
import PropTypes from "prop-types";
import {getVendorStartAction} from "../../redux/actions/master/masterActions";
import {connect} from "react-redux";
import {
    selectDispatchesMonthWiseList,
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
import {dispatchesMonthWiseStartAction, hubGrnErrorLogStartAction, hubNearExpiryStartAction, hubPendingRevalidationStartAction, itemExpiredDetailsStartAction, pendingDispatchStartAction} from "../../redux/actions/dashboard/dashboardActions";
import Highlighter from "react-highlight-words";
import BarChartComponent from "./BarChartComponent";
import ColumnChartComponent from "./ColumnChartComponent";
import HorizontalBarComponent from "./HorizontalBarComponent";
import warehouse from "../../assets/warehouse.png";
import user from "../../assets/user.png";
import dispatchregister from "../../assets/dispatchregister.png";
import monthlyallocation from "../../assets/monthlyallocation.png";
import specialallocation from "../../assets/specialallocation.png";
import virtualallocation from "../../assets/virtualallocation.png";
import passwordChange from "../../assets/passwordChange.png";
import {useNavigate} from "react-router-dom";
import {setPasswordStartAction} from "../../redux/actions/auth/authActions";

const DashboardComponent = ({authInfo,pendingDispatchList,handlePendingDispatch,hubNearExpiryList,hubNearExpiryLoading,handleHubNearExpiry,hubPendingRevalidationList,hubPendingRevalidationLoading,
                                handleHubPendingRevalidation,hubGrnErrorLogList,hubGrnErrorLogLoading,handleHubGrnErrorLog,itemExpiredDetailsList,itemExpiredDetailsLoading,handleItemExpiredDetails
,dispatchesMonthWiseList,handleDispatchesMonthWiseList,handleSetPassword}) => {

    const [status, setStatus] = useState(1)
    const [columnPendingDispatch, setColumnPendingDispatch] = useState([])
    const [columnHubNearExpiry, setColumnHubNearExpiry] = useState([])
    const dispatchesMonthWiseData = dispatchesMonthWiseList
    const [columnHubPendingRevalidation, setColumnHubPendingRevalidation] = useState([])
    const [columnHubGrnErrorLog, setColumnHubGrnErrorLog] = useState([])
    const [columnItemExpiredDetails, setColumnItemExpiredDetails] = useState([])
    const [flag, setFlag] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { InteractionAction, registerInteraction, registerAction } = G2;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ?   '#ff4d4f' :'#1677ff',
                    fontSize: '15px',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

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
                title: 'Team',
                key: 'month',
                dataIndex: 'team',
                width: '100px',
                ...getColumnSearchProps('team'),
            },
            {
                title: 'Brand Manager',
                key: 'month',
                dataIndex: 'brandManager',
                width: '100px',
                ...getColumnSearchProps('brandManager')

            },
            {
                title: 'Month',
                key: 'month',
                dataIndex: 'month',
                width: '100px',
                ...getColumnSearchProps('month')
            },
            {
                title: 'Year',
                key: 'year',
                dataIndex: 'year',
                width: '100px',
                ...getColumnSearchProps('year')
            },
            {
                title: 'Type',
                key: 'type',
                dataIndex: 'allocationType',
                width: '100px',
                ...getColumnSearchProps('allocationType')
            },
            {
                title: 'Submission Date',
                key: 'submissionDate',
                dataIndex: 'submissionDate',
                width: '100px',
                ...getColumnSearchProps('submissionDate')
            },
            {
                title: 'Status',
                key: 'currentStatus',
                dataIndex: 'currentStatus',
                width: '100px',
                ...getColumnSearchProps('currentStatus')
            }
        ]);
        setColumnHubNearExpiry([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px',
                ...getColumnSearchProps('category'),
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
                ...getColumnSearchProps('expiryDate'),
            },
            {
                title: 'Expires In',
                key: 'expiresIn',
                dataIndex: 'expiresIn',
                width: '100px',
                ...getColumnSearchProps('expiresIn'),
            },

        ]);
        setColumnHubPendingRevalidation([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px',
                ...getColumnSearchProps('category'),
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
                ...getColumnSearchProps('expiryDate'),
            },
            {
                title: 'Remaining Quantity',
                key: 'remainingQuantity',
                dataIndex: 'remainingQuantity',
                width: '100px',
                ...getColumnSearchProps('remainingQuantity'),
            },

        ]);
        setColumnHubGrnErrorLog([
            {
                title: 'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width: '100px',
                ...getColumnSearchProps('startTime'),
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width: '100px',
                ...getColumnSearchProps('endTime'),
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecords',
                width: '100px',
                ...getColumnSearchProps('totalRecords'),
            },
            {
                title: 'Record Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordsUploaded',
                width: '100px',
                ...getColumnSearchProps('recordsUploaded'),
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px',
                ...getColumnSearchProps('status'),
            },

        ]);
        setColumnItemExpiredDetails([
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width: '200px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title: 'Category',
                key: 'category',
                dataIndex: 'category',
                width: '100px',
                ...getColumnSearchProps('category'),
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '100px',
                ...getColumnSearchProps('expiryDate'),
            },
            {
                title: 'Quantity',
                key: 'quantity',
                dataIndex: 'quantity',
                width: '100px',
                ...getColumnSearchProps('quantity'),
            },
            {
                title: 'Cost',
                key: 'cost',
                dataIndex: 'cost',
                width: '100px',
                ...getColumnSearchProps('cost'),
            },
            {
                title: 'PoNo',
                key: 'pONO',
                dataIndex: 'pono',
                width: '100px',
                ...getColumnSearchProps('pono'),
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
        console.log(hubGrnErrorLogList)
        handlePendingDispatch ({
            certificate: authInfo.token
        });
        // handleHubNearExpiry({
        //     certificate: authInfo.token
        // })
        // handleHubPendingRevalidation({
        //     certificate: authInfo.token
        // })
        handleHubGrnErrorLog({
            certificate: authInfo.token
        })

        handleItemExpiredDetails({
            certificate: authInfo.token
        })
        searchData()
    },[status])

    const colData = [
        {
            "month": "JAN",
            "type": "Monthly",
            "sale": 14500
        },
        {
            "month": "JAN",
            "type": "Special",
            "sale": 8500
        },
        {
            "month": "JAN",
            "type": "Virtual",
            "sale": 10000
        },
        {
            "month": "FEB",
            "type": "Monthly",
            "sale": 7000
        },
        {
            "month": "FEB",
            "type": "Special",
            "sale": 9000
        },
        {
            "month": "FEB",
            "type": "Virtual",
            "sale": 8500
        },
    ]

    useEffect(() => {

            handleDispatchesMonthWiseList({
                certificate: authInfo.token,
            })

        searchData()
    }, [status])






    const [hoverInventory, setHoverInventory] = useState(false);
    const [hoverUser, setHoverUser] = useState(false);
    const [hoverDispatchRegister, setHoverDispatchRegister] = useState(false);
    const [hoverMonthlyDispatch, setHoverMonthlyDispatch] = useState(false);
    const [hoverSpecialDispatch, setHoverSpecialDispatch] = useState(false);
    const [hoverVirtualDispatch, setHoverVirtualDispatch] = useState(false);
    const [hoverSetPassword, setHoverSetPassword] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [showValidationMessage, setShowValidationMessage] = useState(true);
    const [formData, setFormData] = useState({
        oldPwd: '',
        newPwd: '',
        cnfPwd: ''
    });


    const navigate = useNavigate();


    const onHoverInventory = (e) =>{
        e.preventDefault()
        setHoverInventory(true)
        console.log("hovered")

    }

    const onHoverOverInventory = (e) => {
        e.preventDefault()
        setHoverInventory(false)
    }

    const HoverDataInventory = "Inventory";



    const onHoverUser = (e) =>{
        e.preventDefault()
        setHoverUser(true)
        console.log("hovered")

    }

    const onHoverOverUser = (e) => {
        e.preventDefault()
        setHoverUser(false)
    }

    const HoverDataUser = "FF Master";



    const onHoverDispatchRegister = (e) =>{
        e.preventDefault()
        setHoverDispatchRegister(true)
        console.log("hovered")

    }

    const onHoverOverDispatchRegister = (e) => {
        e.preventDefault()
        setHoverDispatchRegister(false)
    }

    const HoverDataDispatchRegister = "Dispatch Register";



    const onHoverMonthlyDispatch = (e) =>{
        e.preventDefault()
        setHoverMonthlyDispatch(true)
        console.log("hovered")

    }

    const onHoverOverMonthlyDispatch = (e) => {
        e.preventDefault()
        setHoverMonthlyDispatch(false)
    }

    const HoverDataMonthlyDispatch = "Monthly Dispatch";




    const onHoverSpecialDispatch = (e) =>{
        e.preventDefault()
        setHoverSpecialDispatch(true)
        console.log("hovered")

    }

    const onHoverOverSpecialDispatch = (e) => {
        e.preventDefault()
        setHoverSpecialDispatch(false)
    }

    const HoverDataSpecialDispatch = "Special Dispatch";





    const onHoverVirtualDispatch = (e) =>{
        e.preventDefault()
        setHoverVirtualDispatch(true)
        console.log("hovered")

    }

    const onHoverOverVirtualDispatch = (e) => {
        e.preventDefault()
        setHoverVirtualDispatch(false)
    }

    const HoverDataVirtualDispatch = "Virtual Dispatch";


    const onHoverSetPassword = (e) =>{
        e.preventDefault()
        setHoverSetPassword(true)
        console.log("hovered")

    }

    const onHoverOverSetPassword = (e) => {
        e.preventDefault()
        setHoverSetPassword(false)
    }

    const HoverDataSetPassword = "Change Password";

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if(formData.newPwd != formData.cnfPwd){
            setShowValidationMessage(true)
            alert("New password and confirm password does not match!")
        }else{
            // Handle form submission here
            const formFields = {
                oldPassword:formData.oldPwd,
                confirmPassword:formData.cnfPwd,
            }
            console.log('Form submitted:',formData);
            handleSetPassword(
                {
                    certificate: authInfo.token,
                    data:formFields
                }
            )
        }

        setIsModalVisible(false);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    const handleChangePassword = (username, password) => {
        // Your logic to handle password change goes here
        console.log('Change Password for:', username, password);
    };





    return (
        <div>
            <TitleWidget title={'Dashboards'}/>
            <Row gutter={16}>
                <Space wrap style={{marginLeft:"50px",marginBottom:"50px"}}>

                    {/*<Button  type="primary" onClick={() => navigate("/home/masters/ffMaster")} style={{backgroundColor:"green"}} ><UsergroupAddOutlined /> FF Master</Button>*/}
                    {/*<Button type="primary" onClick={() => navigate("/home/report/dispatchRegisterReport")} style={{backgroundColor:"navy"}} > <FileProtectOutlined /> Dispatch Register</Button>*/}
                    {/*<Button type="primary" onClick={() => navigate("/home/approvals/monthlyInputPlan")} style={{backgroundColor:"purple"}} > <GiftOutlined /> Monthly Approval</Button>*/}
                    {/*<Button type="primary" onClick={() => navigate("/home/approvals/specialDispatches")} style={{backgroundColor:"darkcyan"}}> <GiftOutlined /> Special Approval</Button>*/}
                    {/*<Button type="danger" onClick={() => navigate("/home/approvals/virtualDispatches")} style={{backgroundColor:"darkorange"}}> <GiftOutlined />Virtual Approval</Button>*/}

                    {/* if hover is true then only show the text */}
                    {hoverInventory && <p className={hoverInventory}>{HoverDataInventory}</p>}



                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={warehouse} alt="Warehouse"  width="100" height="80" onClick={() => navigate("/home/inventory/inventoryReport")}
                            // onMouseEnter={(e)=>onHoverInventory(e)}
                            // onMouseLeave={(e)=>onHoverOverInventory(e)}


                        />

                        <h3>Inventory</h3>
                    </div>


                    {hoverUser && <p className={hoverUser}>{HoverDataUser}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={user}
                            alt="user"
                            width="100"
                            height="80"
                            style={{ marginLeft: "50px" }}
                            onClick={() => navigate("/home/report/recipientReport")}
                            // onMouseEnter={(e) => onHoverUser(e)}
                            // onMouseLeave={(e) => onHoverOverUser(e)}
                        />
                        <h3 style={{ marginLeft: "50px" }} >FF Master</h3>
                    </div>





                    {hoverDispatchRegister && <p className={hoverDispatchRegister}  >{HoverDataDispatchRegister}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={dispatchregister} alt="dispatchregister"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/report/dispatchRegisterReport")}
                            // onMouseEnter={(e)=>onHoverDispatchRegister(e)}
                            // onMouseLeave={(e)=>onHoverOverDispatchRegister(e)}


                        />
                        <h3 style={{ marginLeft: "50px" }} >Dispatch Register</h3>
                    </div>



                    {hoverMonthlyDispatch && <p className={hoverMonthlyDispatch}  >{HoverDataMonthlyDispatch}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={monthlyallocation} alt="monthlyallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/dispatchInvoicing/monthlyDispatch")}
                            // onMouseEnter={(e)=>onHoverMonthlyAllocation(e)}
                            // onMouseLeave={(e)=>onHoverOverMonthlyAllocation(e)}


                        />
                        <h3 style={{ marginLeft: "50px" }} >Monthly Dispatch</h3>
                    </div>






                    {hoverSpecialDispatch && <p className={hoverSpecialDispatch}  >{HoverDataSpecialDispatch}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <img src={specialallocation} alt="specialallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/dispatchInvoicing/specialDispatch")}
                            // onMouseEnter={(e)=>onHoverSpecialAllocation(e)}
                            // onMouseLeave={(e)=>onHoverOverSpecialAllocation(e)}


                        />
                        <h3 style={{ marginLeft: "50px" }} >Special Dispatch</h3>
                    </div>




                    {hoverVirtualDispatch && <p className={hoverVirtualDispatch}  >{HoverDataVirtualDispatch}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={virtualallocation} alt="virtualallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/dispatchInvoicing/virtualDispatch")}
                            // onMouseEnter={(e)=>onHoverVirtualAllocation(e)}
                            // onMouseLeave={(e)=>onHoverOverVirtualAllocation(e)}


                        />

                        <h3 style={{ marginLeft: "50px" }} >Virtual Dispatch</h3>
                    </div>


                    {hoverSetPassword && <p className={hoverSetPassword}  >{HoverDataSetPassword}</p>}

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={passwordChange} alt="password"  width="100" height="80" style={{marginLeft:"50px"}} onClick={showModal}
                            // onMouseEnter={(e)=>onHoverVirtualAllocation(e)}
                            // onMouseLeave={(e)=>onHoverOverVirtualAllocation(e)}


                        />

                        <h3 style={{ marginLeft: "50px" }} >Change Password</h3>
                    </div>








                </Space>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Dispatches Month wise" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                        <ColumnChartComponent dispatchesMonthWiseData = {dispatchesMonthWiseData} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Special Courier Cost Month Wises" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                        <HorizontalBarComponent />
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="GRN Log" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px", overflow: "hidden"}}>
                        <span>Total Rows: <b>{hubGrnErrorLogList?.length}</b></span>
                        {
                            flag && <Table columns={columnHubGrnErrorLog} scroll={{y: '100%'}} dataSource={hubGrnErrorLogList} style={{height: "400px"}}/>
                        }
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Items Expired" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                        <span>Total Rows: <b>{itemExpiredDetailsList?.length}</b></span>
                        {
                            flag && <Table columns={columnItemExpiredDetails} scroll={{y: '100%'}} dataSource={itemExpiredDetailsList} style={{height: "400px"}}/>
                        }
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row gutter={16}>
                <Card title="Approved Plan Pending for Dispatch" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                    <span>Total Rows: <b>{pendingDispatchList?.length}</b></span>
                    {

                        flag && <Table columns={columnPendingDispatch} scroll={{y: '100%'}} dataSource={pendingDispatchList} style={{height: "400px"}}/>
                    }
                </Card>
            </Row>

            <Modal
                title="Change Password"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form
                    name="loginForm"
                    initialValues={{ remember: true }}
                    onValuesChange={handleFormChange}
                    onFinish={handleOk}
                >
                    <Form.Item
                        label="Old Passord"
                        name="oldPwd"
                        rules={[{ required: true, message: 'Please input old password!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="newPwd"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="cnfPwd"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
                            }

                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>;

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
    dispatchesMonthWiseList:PropTypes.array,
    handleDispatchesMonthWiseList:PropTypes.func,
    handleSetPassword:PropTypes.func,
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
    const dispatchesMonthWiseList = selectDispatchesMonthWiseList(state)
    console.log(dispatchesMonthWiseList)
    return {authInfo,pendingDispatchList,pendingDispatchLoading,hubNearExpiryList,hubNearExpiryLoading,hubPendingRevalidationList,hubPendingRevalidationLoading,
        hubGrnErrorLogList,hubGrnErrorLogLoading,itemExpiredDetailsList,itemExpiredDetailsLoading,dispatchesMonthWiseList}
}

const actions = {
    handlePendingDispatch: pendingDispatchStartAction,
    handleHubNearExpiry: hubNearExpiryStartAction,
    handleHubPendingRevalidation: hubPendingRevalidationStartAction,
    handleHubGrnErrorLog: hubGrnErrorLogStartAction,
    handleItemExpiredDetails: itemExpiredDetailsStartAction,
    handleDispatchesMonthWiseList :dispatchesMonthWiseStartAction,
    handleSetPassword:setPasswordStartAction,
}

export default connect(mapState, actions) (DashboardComponent)
