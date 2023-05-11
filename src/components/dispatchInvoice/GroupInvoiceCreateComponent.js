import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {DatePicker} from "antd/es";
import moment from "moment";


const GroupInvoiceCreateComponent = ({authInfo}) => {

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

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();

    const handleGroupInvoice = () => {

        searchData()
    }

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Invoice No',
                key: 'invoiceNo',
                dataIndex: 'invoiceNo',
                width: '150px'
            },
            {
                title:'Invoice Date',
                key: 'invoiceDate',
                dataIndex: 'invoiceDate',
                width: '150px'
            },
            {
                title: 'Dispatch Type',
                key: 'dispatchType',
                dataIndex: 'dispatchType',
                width: '150px'
            },
            {
                title: 'Plan Name',
                key: 'planName',
                dataIndex: 'planName',
                width: '50px'
            },
            {
                title: 'Team Name',
                key: 'teamName',
                dataIndex: 'teamName',
                width: '50px'
            },
            {
                title: 'Employee Code',
                key: 'employeeCode',
                dataIndex: 'employeeCode',
                width: '50px'
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '50px'
            },
            {
                title: 'Designation',
                key: 'designation',
                dataIndex: 'designation',
                width: '50px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '50px'
            },
            {
                title: 'City',
                key: 'city',
                dataIndex: 'city',
                width: '50px'
            },
            {
                title: 'Group Number',
                key: 'groupNumber',
                dataIndex: 'groupNumber',
                width: '50px'
            },
            {
                title: 'Grouping',
                key: 'grouping',
                dataIndex: 'grouping',
                width: '50px'
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

    return(
        <div>
            <TitleWidget title={'Create Group Invoice'} > </TitleWidget>
            <Row gutter={[16,16]}>
                <Col span={3}>
                    Invoice Number: <br/><Select style={{ width: 150 }} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e)}></Select>
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
                    <br/><Button type={'primary'} onClick={handleGroupInvoice}>Search</Button>
                </Col>
                {/*<Col span={1}>*/}
                {/*    <br/><Button icon={<PlusOutlined />} onClick={() => createGroupInvoice()}></Button>*/}
                {/*</Col>*/}
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
                        <Input.Search style={{ width: 300}} />
                    </div>
                </Col>
            </Row>
            {/*<div>*/}
            {/*    <Button>Excel</Button>*/}
            {/*    &nbsp;&nbsp;*/}
            {/*    <Button>CSV</Button>*/}
            {/*    <Input.Search style={{ width: 300, marginLeft: '1200px' }} />*/}
            {/*</div>*/}
            <br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
            <div align={"right"}>
                <Button type={"primary"}>Group Invoice</Button>
            </div>
        </div>
    )
}

GroupInvoiceCreateComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(GroupInvoiceCreateComponent)
