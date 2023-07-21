import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import { PlusOutlined } from "@ant-design/icons";
import {DatePicker} from "antd/es";
import {useNavigate} from "react-router-dom";
import moment from "moment/moment";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";
import {selectGroupInvoiceListData, selectLoadingGroupInvoiceData} from "../../redux/selectors/groupInvoiceSelector";
import {groupInvoiceStartAction} from "../../redux/actions/dispatchInvoice/groupInvoiceAction";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"


const GroupInvoiceComponent = ({authInfo,profileInfo,groupInvoiceList,groupInvoiceLoading, handleGroupInvoiceList}) => {

    const navigate = useNavigate()

    // const [invoiceNumber, setInvoiceNumber] = useState("")
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [invoiceNo, setInvoiceNo] = useState(0)
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
                key: 'invoiceNumber ',
                dataIndex: 'invoiceNumber ',
                width: '150px',
                fixed: 'left'
            },
            {
                title: 'Group No',
                key: 'groupInvoiceNumber ',
                dataIndex: 'groupInvoiceNumber ',
                width: '150px',
                fixed: 'left',
                render: () => {
                    return <Button type="link" onClick={() => getRecipientDetail()}>1234</Button>
                }
            },
            {
                title: 'Status',
                key: 'statusID ',
                dataIndex: 'statusID ',
                width: '50px'
            },
            {
                title: 'Invoice Date',
                key: 'invoiceDate ',
                dataIndex: 'invoiceDate ',
                width: '50px'
            },
            {
                title: 'Recipient',
                key: 'recipientName ',
                dataIndex: 'recipientName ',
                width: '50px'
            },
            {
                title: 'Boxes',
                key: 'boxes ',
                dataIndex: 'boxes ',
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
                key: 'transporterName ',
                dataIndex: 'transporterName ',
                width: '170px'
            },
            {
                title: 'LR No.',
                key: 'lRNumber ',
                dataIndex: 'lRNumber ',
                width: '170px'
            }
        ]);
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
      console.log(invoiceNo)

      const data = {
          invoiceNumber: invoiceNo,
          fromDate: formatedStartDateString,
          toDate: formatedEndDateString,
      }

      handleGroupInvoiceList ({
          certificate: authInfo.token,
          groupInvoice: data,
      });
      groupData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"GroupInvoiceReport.xlsx")
    }

    useEffect(() => {
        setData(groupInvoiceList.map(item => {
            return {
                invoiceNo: item.invoiceNo,
                groupNo: item.groupNo,
                status: item.status,
                recipient: item.recipient,
                boxes: item.boxes,
                weight: item.weight,
                transporter: item.transporter,
                lrNo: item.lrNo,
                loginId: item.loginId,
                workId: item.workId,
                gender: item.gender,
                joiningDate: item.joiningDate,
                mobile: item.mobile,
                email: item.email,
                SubTeam: item.team,
                nsmName: item.nsmName,
                nsmCode: item.nsmCode,
                rmName: item.rmName,
                rmCode: item.rmCode,
                amName: item.amName,
                amCode: item.amCode,
                cfa: item.cfa,
                hq: item.hq,
                remarks: item.remarks,
            }
        }))
    },[groupInvoiceList])

    return(
        <div>
            <TitleWidget title={'Group Invoice'} > </TitleWidget>
            <Row gutter={[16,16]}>
                <Col span={3}>
                    Invoice Number <br/>
                    <SelectInvoiceComponent onChange={(e) => setInvoiceNo(e)}/>
                </Col>
                <Col span={3}>
                    From Date: <br/>
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date: <br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={2}>
                    <br/><Button type={'primary'} onClick={() => getGroupInvoiceList()}>Search</Button>
                </Col>
                <Col span={1}>
                    <br/><Button icon={<PlusOutlined />} onClick={() => createGroupInvoice()}></Button>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                                data={data}
                                filename={"GroupInvoiceReport.csv"}
                                onClick={() => {
                                    console.log("clicked")
                                }}
                            >
                                <Button>CSV</Button>
                            </CSVLink>
                        )
                    }&nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300}}  />
                    </div>
                </Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{groupInvoiceList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={groupInvoiceList}/>
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
