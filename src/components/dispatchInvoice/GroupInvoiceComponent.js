import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import { PlusOutlined } from "@ant-design/icons";
import {DatePicker} from "antd/es";
import {useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import moment from "moment/moment";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";
import {selectGroupInvoiceListData, selectLoadingGroupInvoiceData} from "../../redux/selectors/groupInvoiceSelector";
import {groupInvoiceStartAction} from "../../redux/actions/dispatchInvoice/groupInvoiceAction";


const GroupInvoiceComponent = ({authInfo,profileInfo,groupInvoiceList,groupInvoiceLoading, handleGroupInvoiceList}) => {

    const navigate = useNavigate()

    const [invoiceNumber, setInvoiceNumber] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [visible, setVisible] = useState(false)

    const getRecipientDetail = () => {
        setVisible(true)
    }

    const groupData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Invoice No',
                key: 'invoiceNo',
                dataIndex: 'invoiceNo',
                width: '150px',
                fixed: 'left'
            },
            {
                title: 'Group No',
                key: 'groupNo',
                dataIndex: 'groupNo',
                width: '150px',
                fixed: 'left',
                render: () => {
                    return <Button type="link" onClick={() => getRecipientDetail()}>1234</Button>
                }
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '50px'
            },
            {
                title: 'Invoice Date',
                key: 'invoiceDate',
                dataIndex: 'invoiceDate',
                width: '50px'
            },
            {
                title: 'Recipient',
                key: 'recipient',
                dataIndex: 'recipient',
                width: '50px'
            },
            {
                title: 'Boxes',
                key: 'boxes',
                dataIndex: 'boxes',
                width: '50px'
            },
            {
                title: 'Weight',
                key: 'weight',
                dataIndex: 'weight',
                width: '50px'
            },
            {
                title: 'Transporter',
                key: 'transporter',
                dataIndex: 'transporter',
                width: '170px'
            },
            {
                title: 'LR No.',
                key: 'lrNo',
                dataIndex: 'lrNo',
                width: '170px'
            }
        ]);
        setDataSource([
            {
                key:'1',
                invoiceNo:'123',
                status:'123',
                invoiceDate: '20/7/2022',
                recipient:'123',
                boxes: '123',
                weight: '123',
                transporter: '123',
                lrNo:'123'
            }
        ])
    }

    const recipientColumn = [
        {
            title: 'Employee',
            key:'employee',
            dataIndex:'employee',
        },
        {
            title: 'Code',
            key: 'code',
            dataIndex: 'code'
        },
        {
            title: 'Invoice No',
            key: 'invoiceNo',
            dataIndex: 'invoiceNo'
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status'
        },
        {
            title: 'Boxes',
            key: 'boxes',
            dataIndex: 'boxes'
        },
        {
            title: 'Weight',
            key: 'weight',
            dataIndex: 'weight'
        },
        {
            title: 'Transporter',
            key: 'transporter',
            dataIndex: 'transporter'
        },
        {
            title: 'LR No.',
            key: 'lrNo',
            dataIndex: 'lrNo'
        }
    ]

    const createGroupInvoice = () => {
        return navigate("/home/dispatchInvoicing/groupInvoice/create")
    }

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();

    const getGroupInvoiceList = () => {
      console.log(formatedStartDateString);
      console.log(formatedEndDateString);

      const data = {
          "invoiceNumber": invoiceNumber,
          "fromDate": formatedStartDateString,
          "toDate": formatedEndDateString,
      }

      handleGroupInvoiceList ({
          certificate: authInfo.token,
          groupInvoice: data,
      });
      // groupData()

    }

    return(
        <div>
            <TitleWidget title={'Group Invoice'} > </TitleWidget>
            <Row gutter={[16,16]}>
                <Col span={3}>
                    Invoice Number: <br/>
                    <SelectInvoiceComponent value={invoiceNumber} onChange={(e) => setInvoiceNumber(e)}/>
                    {/*<Select style={{ width: 150 }} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e)}></Select>*/}
                </Col>
                <Col span={3}>
                    From Date: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To Date: <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')}/>
                </Col>
                <Col span={2}>
                    <br/><Button type={'primary'} onClick={() => groupData()}>Search</Button>
                </Col>
                <Col span={1}>
                    <br/><Button icon={<PlusOutlined />} onClick={() => createGroupInvoice()}></Button>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={2}>
                    <Button>Excel</Button>
                </Col>
                <Col span={2}>
                    <Button>CSV</Button>
                </Col>
                <Col span={20}>
                    <div align="right">
                        <Input.Search style={{ width: 300}}  onClick={() => getGroupInvoiceList()}/>
                    </div>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
            <Modal title={'Recipient Detail'} width={700}  onCancel={() => setVisible(false)} visible={visible}>
                <Row gutter={[16,16]}>
                    <Col span={7}>Name: <Select style={{ width: 140 }} placeholder="Select Name">
                                            <Option></Option>
                                        </Select></Col>
                    <Col span={1}/>
                    <Col span={7}>Transporter: <Select style={{ width: 140 }} placeholder="Select Transporter">
                                                <Option></Option>
                                                </Select></Col>
                    <Col span={1} />
                    <Col span={7}>LR No: <Input /></Col>
                    <Col span={1}/>
                    <Col span={8}>TotalBoxes:1</Col>

                    <Col span={16}>Total Weights:2</Col>
                </Row>
                <TitleWidget title={"Selected Invoices"} />
                <Table columns={recipientColumn}/>
            </Modal>
        </div>
    )
}

GroupInvoiceComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    groupInvoiceList:PropTypes.array,
    groupInvoiceLoading:PropTypes.any,
    handleAgeingReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const groupInvoiceList = selectGroupInvoiceListData(state)
    const groupInvoiceLoading = selectLoadingGroupInvoiceData(state)
    return {authInfo,profileInfo,groupInvoiceList,groupInvoiceLoading}
}

const actions = {
    handleGroupInvoiceList: groupInvoiceStartAction,
}

export default connect(mapState, actions)(GroupInvoiceComponent)
