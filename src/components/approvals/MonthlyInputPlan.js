import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import {ArrowRightOutlined, CheckOutlined, CloseOutlined, DownloadOutlined, FileOutlined, InfoCircleOutlined, RedoOutlined, SyncOutlined, UnlockOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {selectGenerateInvoiceListData, selectInvoiceListData, selectLoadingGenerateInvoiceData} from "../../redux/selectors/monthlyDispatchSelector";
import {selectLoadingMonthlyInputData, selectSearchListData} from "../../redux/selectors/searchInvoiceSelector";
import {getEmployeeInvoiceDetailStartAction, getGenerateInvoiceStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import {searchInvoiceStartAction} from "../../redux/actions/dispatchInvoice/searchInvoiceAction";
import SelectRecipientComponent from "../widgets/SelectRecipientCodeComponent";
import SelectRecipientCodeComponent from "../widgets/SelectRecipientCodeComponent";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";

const MonthlyInputComponent = ({authInfo}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [recipientCode, setRecipientCode] = useState("")
    const [invoiceNo, setInvoiceNo] = useState("")
    const [count, setCount] = useState(0)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Brand Manager',
                key: 'brandManager',
                dataIndex: 'brandManager',
                width:'200px',
            },
            {
                title:'Status',
                key: 'status',
                dataIndex: 'status',
                width:'200px',
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>}></Button>
                },
            },
            {
                title: 'Reset',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<SyncOutlined spin/>}></Button>
                },
            },
            {
                title: 'Unlock',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<UnlockOutlined />}></Button>
                },
            },
            {
                title: 'Review',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CheckOutlined />}></Button>
                },
            },
            {
                title: 'Reject',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CloseOutlined />} ></Button>
                },
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<ArrowRightOutlined />} ></Button>
                },
            },
        ]);
        setDataSource([
            {
                key:'',
                brandManager:'ARYAAN',
                status:'ACTIVE',
            }
        ])
    }

    const handleInvoice = (row) => {

    }

    const searchInv = () => {
        searchData()
    }

    return(
        <>
            <TitleWidget title={'Monthly Allocation Review'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={6}>
                    <SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>
                </Col>
                <Col span={3}>
                    <Input placeholder="Manager Name"/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchInv()}>Submit</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )
}

MonthlyInputComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(MonthlyInputComponent)
