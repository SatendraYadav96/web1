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
   // const [data, setData] = useState()

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

    // useEffect(()=> {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet();
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"ShiprocketReport.xlsx")
    // },[handleShipRocketReport])


    // useEffect(() => {
    //     (shipRocketReport.map(item => {
    //         return {
    //
    //             invoiceNo: item.invoiceNo,
    //             invoiceDate: item.invoiceDate,
    //             recipientName: item.recipientName,
    //             recipientCode: item.recipientCode,
    //             designation : item.designation,
    //             itemName: item.itemName,
    //             itemCode: item.itemCode,
    //             batchNo: item.batchNo,
    //             expiry: item.expiry,
    //             dispatchedQuantity: item.dispatchedQuantity,
    //             brandName: item.brandName,
    //             brandCode: item.brandCode,
    //             itemCategory: item.itemCategory,
    //             address1: item.address1,
    //             city: item.city,
    //             state: item.state,
    //             postalCode: item.postalCode,
    //             team:item.team,
    //             billingAddress1:"Sanofi India Limited  S K Logistics",
    //             billingAddress2:"City Link warehousing Complex Building",
    //             billingAddress3:"No B3 Mumbai Nasik Highway  Vadape Bhiwandi",
    //             billingAddressCity:"Thane",
    //             billingAddressState:"Maharastra",
    //             billingAddressPostalCode:"321302",
    //            length:"90mm",
    //             height: "140mm",
    //             width: "140mm",
    //             company:"SANOFI INDIA PVT LTD",
    //             ffCodeLog: item.ffCodeLog,
    //             territory: item.territory,
    //             totalValue: item.totalValue,
    //             tax: item.tax,
    //
    //         }
    //     }))
    // },[shipRocketReport])


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
