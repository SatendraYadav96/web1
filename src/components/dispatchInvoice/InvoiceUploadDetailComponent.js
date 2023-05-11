import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {selectInvoiceUploadListData} from "../../redux/selectors/invoiceUploadSelector";
import {invoiceUploadStartAction} from "../../redux/actions/dispatchInvoice/invoiceUploadAction";

const InvoiceUploadDetailComponent = ({authInfo,profileInfo,invoiceUploadList,handleInvoiceUploadList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Start Time',
                key: '',
                dataIndex: '',
                width: '150px'
            },
            {
                title:'End Time',
                key: '',
                dataIndex: '',
                width: '150px'
            },
            {
                title:'Total Records',
                key: '',
                dataIndex: '',
                width: '150px'
            },
            {
                title:'Records Uploaded',
                key: '',
                dataIndex: '',
                width: '150px'
            },
            {
                title:'Status',
                key: '',
                dataIndex: '',
                width: '150px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '150px',
                render: () => {
                    return (<><Link to="">View Errors</Link> | <Link to="">Download File</Link></>)
                }
            }
        ]);
        setDataSource([
            {
                key:'1',
                startTime: '',
                endTime: '',
                totalRecords:'',
                recordsUploaded: '',
                status:''
            }
        ])
    }

    const refresh = () => {
        handleInvoiceUploadList({
            certificate: authInfo.token
        })
        searchData()
    }

    useEffect(() => {
        handleInvoiceUploadList({
            certificate: authInfo.token
        })
        searchData()
    },[authInfo.token])

    return(
        <div>
            <TitleWidget title={'Upload Invoice Details'} />
            <Row gutter={16}>
                <Col span={2} >
                    <Upload>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'}  style={{width: "100%"}}>Upload</Button>
                </Col>
                <Col span={2}><Button type={"primary"} style={{width: "100%"}} onClick={refresh}>Refresh</Button></Col>
                <Col span={15}></Col>
            </Row>
            <br/><br/>
                <Table columns={column} dataSource={invoiceUploadList}/>
        </div>
    )
}

InvoiceUploadDetailComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    invoiceUploadList:PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const invoiceUploadList = selectInvoiceUploadListData(state)
    return {authInfo,profileInfo,invoiceUploadList}
}

const actions = {
    handleInvoiceUploadList: invoiceUploadStartAction,
}

export default connect(mapState, actions)(InvoiceUploadDetailComponent)
