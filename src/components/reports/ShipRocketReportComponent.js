import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row} from "antd";
import dayjs from "dayjs";
import moment from "moment/moment";

const ShipRocketReportComponent = ({authInfo,handleShipRocketReport}) => {

    let now = dayjs()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();


    const getShipRocketReport = () => {
      console.log(formatedStartDateString);
      console.log(formatedEndDateString);

      // handleShipRocketReport ({
      //   fromDate:formatedStartDateString,
      //   toDate:formatedEndDateString,
      //   statusId:"EDC4D827-6C08-46CA-BF60-B41FFFC4EABE",
      //   certificate: authInfo.token
      // });

    }

    return(
        <>
            <TitleWidget title="Ship Rocket Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    From Date <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date<br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={getShipRocketReport}>Download Report</Button>
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
