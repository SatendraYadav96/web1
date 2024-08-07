import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row,  Table} from "antd";
import {DatePicker} from "antd/es";
import moment from "moment";
import {selectGroupInvoiceUploadListData, selectLoadingGroupInvoiceUploadData} from "../../redux/selectors/groupInvoiceSelector";
import {groupInvoiceUploadStartAction} from "../../redux/actions/dispatchInvoice/groupInvoiceAction";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";
import {useNavigate} from "react-router-dom";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";


const GroupInvoiceCreateComponent = ({authInfo,groupInvoiceUpload,groupInvoiceUploadLoading,handleGroupInvoiceUpload}) => {

    const navigate = useNavigate()

    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [visible, setVisible] = useState(false)
    const [invoiceNo, setInvoiceNo] = useState(0)

    const getRecipientDetail = () => {
        setVisible(true)
    }

    const handleBack = () => {
        return navigate("/home/dispatchInvoicing/groupInvoice")
    }

    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();

    const handleGroupInvoice = () => {
        const data = {
            fromDate: formatedStartDateString,
            toDate: formatedEndDateString,
            invoiceNumber: invoiceNo,
        }
        handleGroupInvoiceUpload({
            certificate: authInfo.token,
            groupInvoice: data,
        })
        searchData()
    }

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Invoice No',
                key: 'invoiceNumber',
                dataIndex: 'invoiceNumber',
                width: '50px'
            },
            {
                title: 'Invoice Date',
                key: 'invoiceDate',
                dataIndex: 'invoiceDate',
                width: '50px'
            },
            {
                title: 'Dispatch Type',
                key: 'dispatchType',
                dataIndex: 'dispatchType',
                width: '50px'
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
                key: 'recipientID',
                dataIndex: 'recipientID',
                width: '50px'
            },
            {
                title: 'Employee Name',
                key: 'recipientName',
                dataIndex: 'recipientName',
                width: '50px'
            },
            {
                title: 'Designation',
                key: 'recipientDesgName',
                dataIndex: 'recipientDesgName',
                width: '50px'
            },
            {
                title: 'State',
                key: 'recipientState',
                dataIndex: 'recipientState',
                width: '50px'
            },
            {
                title: 'City',
                key: 'recipientCity',
                dataIndex: 'recipientCity',
                width: '50px'
            },
            {
                title: 'Group Number',
                key: 'groupInvoiceNumber',
                dataIndex: 'groupInvoiceNumber',
                width: '50px'
            },
            {
                title: 'Grouping',
                key: 'grouping',
                dataIndex: 'grouping',
                width: '50px'
            },
        ]);
        setDataSource([
            {
                invoiceHeaderID: '3D7D385D-E2FD-45B9-BCC7-1741B11041A6',
                invoiceNumber: 108201,
                groupInvoiceNumber: null,
                statusID: '00000000-0000-0000-0000-000000000027',
                status: 'GENERATED/PRINTED',
                invoiceDate: '2023-05-30 16:12:09.41',
                recipientID: '65445481-E794-49A1-A840-1532F5A64A4C',
                recipientName: 'NILESH KUMAR LAL',
                boxes: 3,
                weight: 8,
                transporterID: 'D8CEE388-846A-4483-A39B-443E81CB35AD',
                transporterName: 'SHREE SAI SERVICE',
                teamId: 'AB2769D2-7D3C-4EFF-9F6A-C1CFD5BCCF38',
                teamName: 'UNS',
                dispatchType: '0',
                strDispatchType: 'Monthly',
                planName: 'June 2023',
                recipientCode: '10003482',
                recipientDesgID: 'B6B6FC59-44D5-46ED-95C2-15DA01EFC0C5',
                recipientDesgName: 'AREA BUSINESS MANAGER',
                recipientState: 'RAJASTHAN',
                recipientCity: 'JODHPUR',
                month: '6',
                year: '2023',
                lrnumber: '123',
            }
        ])
    }

    // const recipientColumn = [
    //     {
    //         title: 'Employee',
    //         key:'employee',
    //         dataIndex:'employee',
    //     },
    //     {
    //         title: 'Code',
    //         key: 'code',
    //         dataIndex: 'code'
    //     },
    //     {
    //         title: 'Invoice No',
    //         key: 'invoiceNo',
    //         dataIndex: 'invoiceNo'
    //     },
    //     {
    //         title: 'Status',
    //         key: 'status',
    //         dataIndex: 'status'
    //     },
    //     {
    //         title: 'Boxes',
    //         key: 'boxes',
    //         dataIndex: 'boxes'
    //     },
    //     {
    //         title: 'Weight',
    //         key: 'weight',
    //         dataIndex: 'weight'
    //     },
    //     {
    //         title: 'Transporter',
    //         key: 'transporter',
    //         dataIndex: 'transporter'
    //     },
    //     {
    //         title: 'LR No.',
    //         key: 'lrNo',
    //         dataIndex: 'lrNo'
    //     }
    // ]

    useEffect(() => {
        console.log(groupInvoiceUpload)
    },[groupInvoiceUpload])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(groupInvoiceUpload);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"groupinvoice.xlsx")
    }

    return(
        <div>
            <TitleWidget title={'Create Group Invoice'} > </TitleWidget>
            <Row gutter={[16,16]}>
                <Col span={3}>
                    Invoice Number: <br/>
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
                    <br/><Button type={'primary'} onClick={handleGroupInvoice}>Search</Button>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                {/*<Col span={1}>*/}
                {/*    <br/><Button icon={<PlusOutlined />} onClick={() => createGroupInvoice()}></Button>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={6}>
                    {groupInvoiceUpload &&
                        (<CSVLink
                            data={groupInvoiceUpload}
                            filename={"groupinvoice.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={20}>
                    <div align="right">
                        <Input.Search style={{ width: 300}} />
                    </div>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{groupInvoiceUpload?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={groupInvoiceUpload}/>
            }
            <br/>
            {/*<div align={"right"}>*/}
            {/*    <Button type={"primary"}>Group Invoice</Button>*/}
            {/*</div>*/}
        </div>
    )
}

GroupInvoiceCreateComponent.propTypes = {
    authInfo: PropTypes.any,
    groupInvoiceUpload: PropTypes.array,
    groupInvoiceUploadLoading:PropTypes.any,
    handleGroupInvoiceUpload: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const groupInvoiceUpload = selectGroupInvoiceUploadListData(state)
    const groupInvoiceUploadLoading = selectLoadingGroupInvoiceUploadData(state)
    return {authInfo,groupInvoiceUpload,groupInvoiceUploadLoading}
}

const actions = {
    handleGroupInvoiceUpload: groupInvoiceUploadStartAction
}

export default connect(mapState, actions)(GroupInvoiceCreateComponent)
