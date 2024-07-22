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
    const [data, setData] = useState()

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

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ShiprocketReport.xlsx")
    }


    useEffect(() => {
       setData (shipRocketReport.map(item => {
            return {

                '*Order Id': item.invoiceNo,
                '*Order Date': item.invoiceDate,
                '*Channel':'Custome',
                '*Payment Method(COD/Prepaid)':'Prepaid',
                '*Customer First Name': item.recipientName,
                '*Customer Last Name': item.recipientCode,
                '*Email':'',
                '*Customer Mobile':item.mobile,
                'Customer Alternate Mobile':'',
                '*Shipping Address Line 1':item.address1,
                '*Shipping Address Line 2':item.address1,
                '*Shipping Address Country':'India',
                '*Shipping Address State':item.state,
                '*Shipping Address City':item.city,
                '*Shipping Address Postcode':item.postalCode,
                'Billing Address Line 1':"Sanofi CHC India Limited  S K Logistics",
                'Billing Address Line 2':"City Link warehousing Complex Building",
                'Billing Address Country':"No B3 Mumbai Nasik Highway  Vadape Bhiwandi",
                'Billing Address State':"Maharastra",
                'Billing Address City':"Thane",
                'Billing Address Postcode':"321302",
                '*Master SKU':item.itemName,
                '**Product Name':item.itemName,
                '*Product Quantity':item.dispatchedQuantity,
                '*Rate per Item':item.ratePerUnit,
                '*Product Value':item.value,
                'Tax %':item.tax,
                '*Selling Price(Per Unit Item, Inclusive of Tax)':item.totalValue,
                'Discount(Per Unit Item)':'',
                'Shipping Charges(Per Order)':'',
                'COD Charges(Per Order)':'',
                'Gift Wrap Charges(Per Order)':'',
                'Total Discount (Per Order)':'',
                "*Length (cm)":"90mm",
                "*Breadth (cm)": "140mm",
                "*Height (cm)": "140mm",
                'Weight Of Shipment(kg)':'',
                'Send Notification(True/False)':'',
                'Comment':'',
                'HSN Code':'',
                'Location Id':'',
                'Reseller Name':'',
                'Company Name':'SANOFI CONSUMER HEALTHCARE INDIA LIMITED',
                'latitude':'',
                'longitude':'',
                'Verified Order':'',
                'Is documents':'',
                'Order Type':item.ffCodeLog,
                'Order tag':item.ffCodeLog,

            }
        }))
    },[shipRocketReport])


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
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={getShipRocketReport}>Search</Button>
                </Col>
                <Col span={2} >
                    <br/>
                    <Button type={"primary"} onClick={handleExcel}>EXCEL</Button>
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
