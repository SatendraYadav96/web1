import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row} from "antd";

const ShipRocketReportComponent = ({authInfo}) => {


    return(
        <>
            <TitleWidget title="Ship Rocket Report" />
            <Row gutter={[16,16]}>
                <Col span={6}>
                    From Date <DatePicker />
                </Col>
                <Col span={6}>
                    To Date<DatePicker/>
                </Col>
                <Col span={4}>
                    <Button type={"primary"} >Download Report</Button>
                </Col>
                <Col span={4}></Col>
            </Row>
        </>
    )

}

ShipRocketReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(ShipRocketReportComponent)
