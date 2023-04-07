import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import moment from "moment/moment";

const StockLedgerReportComponent = ({authInfo}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Transaction Date',
                key:'transactionDate',
                dataIndex:'transactionDate',
                width:'100px'
            },
            {
                title:'Particulars',
                key:'particulars',
                dataIndex:'particulars',
                width:'100px'
            },
            {
                title:'Receipt',
                key:'receipt',
                dataIndex:'receipt',
                width:'100px'
            },
            {
                title:'Issue',
                key:'issue',
                dataIndex:'issue',
                width:'100px'
            },
            {
                title:'Balance',
                key:'balance',
                dataIndex:'balance',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Stock Ledger Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Date From: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To:<br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')}/>
                </Col>
                <Col span={3}>
                    Item Code <br/>
                    <Input placeholder={"Item Code"} />
                </Col>
                <Col span={3}>
                    Item Name<br/>
                    <Input placeholder={"Item Name"} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>searchData()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )

}

StockLedgerReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(StockLedgerReportComponent)
