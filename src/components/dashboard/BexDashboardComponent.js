import React, {useEffect, useState} from "react";
import {Card, Col, Row, Select} from "antd";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import BexDashboardComponent from "./BexDashboardComponent";
import TitleWidget from "../../widgets/TitleWidget";
import ColumnChartComponent from "./ColumnChartComponent";
import HorizontalBarComponent from "./HorizontalBarComponent";
import { Button, Space  } from 'antd';
import {useNavigate} from "react-router-dom";
import {ShoppingCartOutlined ,UsergroupAddOutlined , FileProtectOutlined ,GiftOutlined  } from '@ant-design/icons';
import ReactRoundedImage from "react-rounded-image";
import warehouse from "../../assets/warehouse.png";
import user from "../../assets/user.png";
import dispatchregister from "../../assets/dispatchregister.png";
import {hover} from "@testing-library/user-event/dist/hover";
import monthlyallocation from "../../assets/monthlyallocation.png";
import specialallocation from "../../assets/specialallocation.png";
import virtualallocation from "../../assets/virtualallocation.png";



const BexDashboardComponents = ({authInfo,profileInfo}) => {
    const [hoverInventory, setHoverInventory] = useState(false);
    const [hoverUser, setHoverUser] = useState(false);
    const [hoverDispatchRegister, setHoverDispatchRegister] = useState(false);
    const [hoverMonthlyAllocation, setHoverMonthlyAllocation] = useState(false);
    const [hoverSpecialAllocation, setHoverSpecialAllocation] = useState(false);
    const [hoverVirtualAllocation, setHoverVirtualAllocation] = useState(false);


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



    const onHoverMonthlyAllocation = (e) =>{
        e.preventDefault()
        setHoverMonthlyAllocation(true)
        console.log("hovered")

    }

    const onHoverOverMonthlyAllocation = (e) => {
        e.preventDefault()
        setHoverMonthlyAllocation(false)
    }

    const HoverDataMonthlyAllocation = "Monthly Approval";




    const onHoverSpecialAllocation = (e) =>{
        e.preventDefault()
        setHoverSpecialAllocation(true)
        console.log("hovered")

    }

    const onHoverOverSpecialAllocation = (e) => {
        e.preventDefault()
        setHoverSpecialAllocation(false)
    }

    const HoverDataSpecialAllocation = "Special Approval";





    const onHoverVirtualAllocation = (e) =>{
        e.preventDefault()
        setHoverVirtualAllocation(true)
        console.log("hovered")

    }

    const onHoverOverVirtualAllocation = (e) => {
        e.preventDefault()
        setHoverVirtualAllocation(false)
    }

    const HoverDataVirtualAllocation = "Virtual Approval";





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
                        onClick={() => navigate("/home/masters/ffMaster")}
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



                {hoverMonthlyAllocation && <p className={hoverMonthlyAllocation}  >{HoverDataMonthlyAllocation}</p>}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={monthlyallocation} alt="monthlyallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/approvals/monthlyInputPlan")}
                     // onMouseEnter={(e)=>onHoverMonthlyAllocation(e)}
                     // onMouseLeave={(e)=>onHoverOverMonthlyAllocation(e)}


                />
                    <h3 style={{ marginLeft: "50px" }} >Monthly Approval</h3>
                </div>






                {hoverSpecialAllocation && <p className={hoverSpecialAllocation}  >{HoverDataSpecialAllocation}</p>}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <img src={specialallocation} alt="specialallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/approvals/specialDispatches")}
                     // onMouseEnter={(e)=>onHoverSpecialAllocation(e)}
                     // onMouseLeave={(e)=>onHoverOverSpecialAllocation(e)}


                />
                    <h3 style={{ marginLeft: "50px" }} >Special Approval</h3>
                </div>




                {hoverVirtualAllocation && <p className={hoverVirtualAllocation}  >{HoverDataVirtualAllocation}</p>}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={virtualallocation} alt="virtualallocation"  width="100" height="80" style={{marginLeft:"50px"}} onClick={() => navigate("/home/approvals/virtualDispatches")}
                     // onMouseEnter={(e)=>onHoverVirtualAllocation(e)}
                     // onMouseLeave={(e)=>onHoverOverVirtualAllocation(e)}


                />

                    <h3 style={{ marginLeft: "50px" }} >Virtual Approval</h3>
                </div>






            </Space>
            </Row>
    <Row gutter={16}>
        <Col span={12}>
            <Card title="Dispatches Month wise" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                <ColumnChartComponent />
            </Card>
        </Col>
        <Col span={12}>
            <Card title="Special Courier Cost Month Wises" bordered={true} style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "20px", height: "500px"}}>
                <HorizontalBarComponent />
            </Card>
        </Col>
    </Row>
    <br/>

        </div>

    )
}


BexDashboardComponents.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)

    return {authInfo,profileInfo}
}


const actions = {



}


export default connect(mapState, actions) (BexDashboardComponents)
