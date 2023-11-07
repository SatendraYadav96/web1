import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row} from "antd";
import dayjs from "dayjs";
import moment from "moment/moment";
import {selectShipRocketReport} from "../../redux/selectors/batchReconciliationReportSelector";
import {getShipRocketReportStartAction} from "../../redux/actions/reports/batchReconciliationReportActions";
import XLSX from "xlsx";

const ShipRocketReportComponent = ({authInfo,handleShipRocketReport,shipRocketReport }) => {

    let now = dayjs()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();


    const getShipRocketReport = () => {
      console.log(formatedStartDateString);
      console.log(formatedEndDateString);

      handleShipRocketReport ({
        fromDate:formatedStartDateString,
        toDate:formatedEndDateString,
        certificate: authInfo.token
      });

    }

    useEffect(()=> {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(shipRocketReport);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ShipRocketReport.xlsx")
    },[handleShipRocketReport])

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
    shipRocketReport: PropTypes.any,
    handleShipRocketReport: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const shipRocketReport = selectShipRocketReport(state)
    return {authInfo, shipRocketReport}
}

const actions = {
    handleShipRocketReport : getShipRocketReportStartAction
}

export default connect(mapState, actions)(ShipRocketReportComponent)
