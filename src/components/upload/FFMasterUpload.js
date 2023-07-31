import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {ffExcelUploadStartAction, ffUploadLogStartAction, ffUploadStartAction, grnUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectffExcelUploadListData, selectffUploadLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";

;


const FFMasterUpdateComponent = ({authInfo,profileInfo,handleFFUpload,handleFFUploadLog,ffUploadLog,ffExcelUpload,handleFFExcelUploadLog}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)
    const [file, setFile] = useState([])
    const [viewE, setViewE] = useState(false)
    const [viewD, setViewD] = useState(false)
    const [expErr, setExpErr] = useState([])
    const [exp, setExp] = useState([])

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width:'150px'
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width:'150px'
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecord',
                width:'50px'
            },
            {
                title: 'Records Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordUpload',
                width:'50px'
            },
            {
                title: 'Status',
                key:'status',
                dataIndex: 'status',
                width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '150px',
                render: (_,row) => {
                    return (
                        <>
                            <Link onClick={() => {
                                handleViewError(row)
                                setViewE(true)
                            }} to="">View Errors </Link>|<Link onClick={() => {
                            handleViewError(row)
                            setViewD(true)
                        }} to=""> Download Details</Link>
                        </>
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
                message?.error(`${file.name} is not a csv file`);
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
        handleFFUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    useEffect(() => {
        searchData()
        handleFFUploadLog({
            certificate: authInfo.token,
        })
    },[authInfo])

    const handleViewError = (row) => {
        handleFFExcelUploadLog({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        console.log("expErr: ", expErr)
        if (viewE) {
            if (expErr?.length > 0) {
                handleExcelErr(expErr)
                setViewE(false)
            }
        }
    },[expErr])

    useEffect(() => {
        console.log("exp: ", exp)
        if (viewD) {
            if (exp.length > 0) {
                handleExcel(exp)
                setViewD(false)
            }
        }
    },[exp])

    const handleExcelErr = (data) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"virtualSampleErrors.XLSX")
    }

    const handleExcel = (data) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"virtualSampleDownload.XLSX")
    }

    useEffect(() => {
        // console.log(`I am Super man${ffExcelUpload}`)
        if (ffExcelUpload) {
            console.log("there is data")
            console.log(ffExcelUpload)
            // setExpErr(ffExcelUpload?.map(item => item))
            // setExp(ffExcelUpload?.map(item => item))
            setExpErr(ffExcelUpload?.map(item => {
                return {
                    "Name": item.name,
                    "Code": item.code,
                    "Address": item.address,
                    "City": item.city,
                    "State": item.state,
                    "Zip": item.zip,
                    "Email": item.email,
                    "Mobile": item.mobile,
                    "Designation": item.designation,
                    "Zone": item.zone,
                    "Joining Date": item.joiningDate,
                    "Team": item.team,
                    "Status": item.status,
                    "Remarks": item.remarks,
                    "Headquarter": item.headquarter,
                    "Work Id": item.workId,
                    "Gender": item.gender,
                    "Email RM": item.emailRM,
                    "Email AM ": item.emailAM,
                    "BU": item.bu,
                    "Error": item.errorText,
                }
            }))
            setExp(ffExcelUpload?.map(item => {
                return {
                    "Name": item.name,
                    "Code": item.code,
                    "Address": item.address,
                    "City": item.city,
                    "State": item.state,
                    "Zip": item.zip,
                    "Email": item.email,
                    "Mobile": item.mobile,
                    "Designation": item.designation,
                    "Zone": item.zone,
                    "Joining Date": item.joiningDate,
                    "Team": item.team,
                    "Status": item.status,
                    "Remarks": item.remarks,
                    "Headquarter": item.headquarter,
                    "Work Id": item.workId,
                    "Gender": item.gender,
                    "Email RM": item.emailRM,
                    "Email AM ": item.emailAM,
                    "BU": item.bu,
                }
            }))
        } else {
            console.log('no data')
        }
    },[ffExcelUpload])

    return(
        <div>
            <TitleWidget title={'FF Master'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{ffUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={ffUploadLog}/>
            }
        </div>
    )
}

FFMasterUpdateComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    ffUploadLog: PropTypes.array,
    ffExcelUpload: PropTypes.array,
    handleFFUpload: PropTypes.func,
    handleFFUploadLog: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const ffUploadLog = selectffUploadLogListData(state)
    const ffExcelUpload = selectffExcelUploadListData(state)
    return {authInfo,profileInfo,ffUploadLog,ffExcelUpload}
}

const actions = {
    handleFFUpload: ffUploadStartAction,
    handleFFUploadLog: ffUploadLogStartAction,
    handleFFExcelUploadLog: ffExcelUploadStartAction,
}

export default connect(mapState, actions)(FFMasterUpdateComponent)
