import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row} from "antd";
import dayjs from "dayjs";
import moment from "moment/moment";

const ShipRocketReportComponent = ({authInfo}) => {

    let now = dayjs()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    return(
        <>
            <TitleWidget title="Ship Rocket Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    From Date <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To Date<br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={now}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} >Download Report</Button>
                </Col>
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
