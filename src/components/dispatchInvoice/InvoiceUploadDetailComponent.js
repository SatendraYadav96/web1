import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {selectInvoiceUploadCsvListData, selectInvoiceUploadListData} from "../../redux/selectors/invoiceUploadSelector";
import {invoiceUploadCsvStartAction, invoiceUploadStartAction} from "../../redux/actions/dispatchInvoice/invoiceUploadAction";
import XLSX from "xlsx";
import {grnExcelUploadStartAction, invoiceExcelUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectGrnExcelUploadListData, selectInvoiceExcelUploadListData, selectInvoiceUploadSuccess} from "../../redux/selectors/uploadSelector";
import {CSVLink} from "react-csv";
import CSVDownload from "react-csv/src/components/Download";

const InvoiceUploadDetailComponent = ({data, type,authInfo,profileInfo,invoiceUploadList,handleInvoiceUploadList,handleInvoiceUpload,handleInvoiceExcelUpload,invoiceExcelData, success,invoiceUploadCsvList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [file, setFile] = useState([])
    const [viewE, setViewE] = useState(false)
    const [viewD, setViewD] = useState(false)
    const [expErr, setExpErr] = useState([])
    const [exp, setExp] = useState([])
    const location = useLocation()
    const history = useNavigate()

    // const navigate = useNavigate()


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
                render: (_,row) => {
                    return (
                        <><Button type="link" onClick={()=>{handleViewError(row)
                            setViewE(true)}}>View Errors</Button>
                            |<Button type="link" onClick={()=>{handleViewError(row)
                                setViewD(true)}}>Download Details</Button></>
                    )
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

    useEffect(() => {
        console.log(invoiceExcelData)
        if (invoiceExcelData) {
            console.log("there is data")
            setExpErr(invoiceExcelData.map(item => {
                return {
                    "Month": item.month,
                    "Year": item.year,
                    "Plan Name": item.planName,
                    "State": item.state,
                    "Employee": item.employeeName,
                    "Designation": item.employeeDesignation,
                    "Code": item.code,
                    "Boxes": item.boxes,
                    "Weight": item.weight,
                    "Dimension": item.dimension,
                    "Transporter": item.transporterName,
                    "LR Nov": item.lrNo,
                    "PlanId": item.planId,
                    "Plan": item.planName,
                    "FFCode": item.ffCode,
                    "Error": item.errorText,
                }
            }))
            setExp(invoiceExcelData.map(item => {
                return {
                    "Month": item.month,
                    "Year": item.year,
                    "Plan Name": item.planName,
                    "State": item.state,
                    "Employee": item.employeeName,
                    "Designation": item.employeeDesignation,
                    "Code": item.code,
                    "Boxes": item.boxes,
                    "Weight": item.weight,
                    "Dimension": item.dimension,
                    "Transporter": item.transporterName,
                    "LR Nov": item.lrNo,
                    "PlanId": item.planId,
                    "Plan": item.planName,
                    "FFCode": item.ffCode,
                }
            }))
        } else {
            console.log('no data')
        }
        if (viewE) {
            if (expErr.length > 0) {
                // csvLinkError.current.link.click()
                setViewE(false)
            }
        }
        if (viewD) {
            if (exp.length > 0) {
                // csvLink.current.link.Click()
                setViewD(false)
            }
        }
    },[invoiceExcelData])

    const handleViewError = (row) => {
        handleInvoiceExcelUpload({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

    // useEffect(() => {
    //     console.log("expErr: ", expErr)
    //     if (viewE) {
    //         if (expErr.length > 0) {
    //             handleExcelErr(expErr)
    //             setViewE(false)
    //         }
    //     }
    // },[expErr])
    //
    // useEffect(() => {
    //     console.log("exp: ", exp)
    //     if (viewD) {
    //         if (exp.length > 0) {
    //             handleExcel(exp)
    //             setViewD(false)
    //         }
    //     }
    // },[exp])
    //
    // const handleExcelErr = (data) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(data);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"invoiceerrors.XLSX")
    // }
    //
    // const handleExcel = (data) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(data);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"invoiceDownload.XLSX")
    // }

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
    },[success])

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

    const handleBack = () => {
        if(location.state.type == "monthly"){
            history("/home/dispatchInvoicing/monthlyDispatch/details", {state:
                    {
                        year: location.state.year,
                        month: location.state.month,
                        team: location.state.all.team,
                        status: location.state.all.status,
                        planId: location.state.all.planId,
                    }});
        }else if(location.state.type == "special"){
            history("/home/dispatchInvoicing/specialDispatch/details", {state:
                    {
                        year: location.state.year,
                        month: location.state.month,
                        team: location.state.all.team,
                        status: location.state.all.status,
                        planId: location.state.all.planId,
                    }});
        }else if(location.state.type == "virtual"){
            history("/home/dispatchInvoicing/virtualDispatch/details", {state:
                    {
                        year: location.state.year,
                        month: location.state.month,
                        team: location.state.all.team,
                        status: location.state.all.status,
                        planId: location.state.all.planId,
                    }});
        }
    }

    useEffect(() => {
        console.log(invoiceUploadCsvList)
        handleInvoiceUploadList({
            certificate: authInfo.token
        })
        searchData()
    },[invoiceUploadCsvList])

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
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>


                <Col span={15}></Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{invoiceUploadList?.length}</b></span>
                <Table columns={column} dataSource={invoiceUploadList}/>
            {expErr.length > 0 && <CSVDownload
                data={expErr}
                filename={"grnviewErr.csv"}/>
                // target="_blank"></CSVDownload>
            }
            {exp.length > 0 && <CSVDownload
                data={exp}
                filename={"grnviewDownload.csv"}/>
                // target="_blank"></CSVDownload>
            }
        </div>
    )
}

InvoiceUploadDetailComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    invoiceUploadList:PropTypes.array,
    invoiceExcelData:PropTypes.array,
    handleInvoiceUpload:PropTypes.func,
    handleInvoiceExcelUpload:PropTypes.func,
    success: PropTypes.any,
    invoiceUploadCsvList:PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const invoiceUploadList = selectInvoiceUploadListData(state)
    const invoiceExcelData = selectInvoiceExcelUploadListData(state)
    const success = selectInvoiceUploadSuccess(state)
    const invoiceUploadCsvList = selectInvoiceUploadCsvListData(state)
    return {authInfo,profileInfo,invoiceUploadList,invoiceExcelData, success,invoiceUploadCsvList}
}

const actions = {
    handleInvoiceUploadList: invoiceUploadStartAction,
    handleInvoiceUpload: invoiceUploadCsvStartAction,
    handleInvoiceExcelUpload: invoiceExcelUploadStartAction,
}

export default connect(mapState, actions)(InvoiceUploadDetailComponent)
