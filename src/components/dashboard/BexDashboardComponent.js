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
import titleImg from "../../assets/SNY.png";


const BexDashboardComponents = ({authInfo,profileInfo}) => {

    const navigate = useNavigate();

    return (

        <div>

        <TitleWidget title={'Dashboards'}/>

            <Row gutter={16}>
            <Space wrap style={{marginLeft:"50px",marginBottom:"50px"}}>
                <Button type="primary"  onClick={() => navigate("/home/inventory/inventoryReport")}  > <ShoppingCartOutlined  />Inventory</Button>
                <Button  type="primary" onClick={() => navigate("/home/masters/ffMaster")} style={{backgroundColor:"green"}} ><UsergroupAddOutlined /> FF Master</Button>
                <Button type="primary" onClick={() => navigate("/home/report/dispatchRegisterReport")} style={{backgroundColor:"navy"}} > <FileProtectOutlined /> Dispatch Register</Button>
                <Button type="primary" onClick={() => navigate("/home/approvals/monthlyInputPlan")} style={{backgroundColor:"purple"}} > <GiftOutlined /> Monthly Approval</Button>
                <Button type="primary" onClick={() => navigate("/home/approvals/specialDispatches")} style={{backgroundColor:"darkcyan"}}> <GiftOutlined /> Special Approval</Button>
                <Button type="danger" onClick={() => navigate("/home/approvals/virtualDispatches")} style={{backgroundColor:"darkorange"}}> <GiftOutlined />Virtual Approval</Button>





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
