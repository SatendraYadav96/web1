import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Input, Select, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {DatePicker} from "antd/es";


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
            <div className="grid">
                Invoice Number: <Select style={{ width: 120 }} value={invoiceNumber} onChange={(e) => setInvoiceNumber(e)}>
            </Select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                From Date: <DatePicker value={fromDate} onChange={(e) => setFromDate(e)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                To Date: <DatePicker value={toDate} onChange={(e) => setToDate(e)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type={'primary'} onClick={() => searchData()}>Search</Button>
                <Button icon={<SearchOutlined />} style={{marginLeft: '700px'}} />
            </div>
            <br/><br/>
            <div>
                <Button>Excel</Button>
                &nbsp;&nbsp;
                <Button>CSV</Button>
                <Input.Search style={{ width: 300, marginLeft: '1200px' }} />
            </div>
            <br/><br/>
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
