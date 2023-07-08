import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {selectInvoiceUploadListData} from "../../redux/selectors/invoiceUploadSelector";
import {invoiceUploadCsvStartAction, invoiceUploadStartAction} from "../../redux/actions/dispatchInvoice/invoiceUploadAction";

const InvoiceUploadDetailComponent = ({authInfo,profileInfo,invoiceUploadList,handleInvoiceUploadList,handleInvoiceUpload}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [file, setFile] = useState([])


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width: '150px'
            },
            {
                title:'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width: '150px'
            },
            {
                title:'Total Records',
                key: 'totalRecord',
                dataIndex: 'totalRecord',
                width: '150px'
            },
            {
                title:'Records Uploaded',
                key: 'recordUpload',
                dataIndex: 'recordUpload',
                width: '150px'
            },
            {
                title:'Status',
                key: 'status',
                dataIndex: 'status',
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

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info.file.name)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        beforeUpload: (file) => {
            const isCSV = file.type === 'text/csv';
            if (!isCSV) {
                message.error(`${file.name} is not a csv file`);
            }
            return isCSV || Upload.LIST_IGNORE;
        },
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        const bytecode = base64.split(",")[1];
        console.log(newFile)
        console.log(bytecode)
        handleInvoiceUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    return(
        <div>
            <TitleWidget title={'Upload Invoice Details'} />
            <Row gutter={16}>
                <Col span={2.5}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props} style={{width: '100%'}}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
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
    handleInvoiceUpload:PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const invoiceUploadList = selectInvoiceUploadListData(state)
    return {authInfo,profileInfo,invoiceUploadList}
}

const actions = {
    handleInvoiceUploadList: invoiceUploadStartAction,
    handleInvoiceUpload: invoiceUploadCsvStartAction,

}

export default connect(mapState, actions)(InvoiceUploadDetailComponent)
