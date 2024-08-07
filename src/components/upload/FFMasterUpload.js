import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {ffExcelUploadStartAction, ffUploadLogStartAction, ffUploadStartAction, grnUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectffExcelUploadListData, selectFFExcelUploadSuccess, selectffUploadLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";
import CSVDownload from "react-csv/src/components/Download";



const FFMasterUpdateComponent = ({authInfo,profileInfo,handleFFUpload,handleFFUploadLog,ffUploadLog,ffExcelUpload, fFExcelUploadSuccess,handleFFExcelUploadLog}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)
    const [file, setFile] = useState([])
    const [viewE, setViewE] = useState(false)
    const [viewD, setViewD] = useState(false)
    const [expErr, setExpErr] = useState([])
    const [exp, setExp] = useState([])
    const [data, setData] = useState([])

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
                            <Button type="link" onClick={()=>{handleViewError(row)
                                setViewE(true)}}>View Errors</Button>
                            |<Button type="link" onClick={()=>{handleViewError(row)
                            setViewD(true)}}>Download Details</Button>
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


    useEffect(() => {
        console.log(ffExcelUpload)
        // console.log(`I am Super man${ffExcelUpload}`)
        if (ffExcelUpload) {
            console.log("there is data")

            // setExpErr(ffExcelUpload?.map(item => item))
            // setExp(ffExcelUpload?.map(item => item))
            if(viewE) {
                setExpErr(ffExcelUpload.map(item => {
                    return {

                        "Employee Code": item.code,
                        "Employee Name": item.name,
                        "Address": item.address,
                        "City": item.city,
                        "Role": item.designation,
                        "State": item.state,
                        "Zip": item.zip,
                        "Zone": item.zone,
                        "Employee Workday id": item.workId,
                        "Gender": item.gender,
                        "DOJ (DD/MM/YYYY)": item.joiningDate,
                        "Mobile Number": item.mobile,
                        "Email Address": item.email,
                        "Team": item.bu,
                        "Sub Team": item.team,
                        "AM Email": item.emailAM,
                        "RBM Email": item.emailRM,
                        "HQ": item.headquarter,
                        "Status": item.status,
                        "Remark": item.remarks,
                        "Error": item.errorText,
                    }
                }))
            }
            if(viewD) {
                setExp(ffExcelUpload.map(item => {
                    return {
                        "Employee Code": item.code,
                        "Employee Name": item.name,
                        "Address": item.address,
                        "City": item.city,
                        "Role": item.designation,
                        "State": item.state,
                        "Zip": item.zip,
                        "Zone": item.zone,
                        "Employee Workday id": item.workId,
                        "Gender": item.gender,
                        "DOJ (DD/MM/YYYY)": item.joiningDate,
                        "Mobile Number": item.mobile,
                        "Email Address": item.email,
                        "Team": item.bu,
                        "Sub Team": item.team,
                        "AM Email": item.emailAM,
                        "RBM Email": item.emailRM,
                        "HQ": item.headquarter,
                        "Status": item.status,
                        "Remark": item.remarks,
                    }
                }))
            }
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
    },[ffExcelUpload])


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
    // const handleExcelErr = (ffExcelUpload) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(ffExcelUpload);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"ffMasterErrors.XLSX")
    // }
    //
    // const handleExcel = (ffExcelUpload) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(ffExcelUpload);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"ffMasterDownload.XLSX")
    // }
    //

    const handleViewError = (row) => {
        handleFFExcelUploadLog({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        {Object.keys(ffUploadLog).length === 0 ? console.log('no data') : setData(ffUploadLog) }
    }, [ffUploadLog])

    useEffect(() => {
        handleFFUploadLog ({
            certificate: authInfo.token
        });
        searchData()
    },[authInfo.token])

    useEffect(() => {
        handleFFUploadLog ({
            certificate: authInfo.token
        });
        searchData()
    },[fFExcelUploadSuccess])




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

    const refresh = () => {
        handleFFUploadLog({
            certificate: authInfo.token
        })
        searchData()
    }


    return(
        <div>
            <TitleWidget title={'FF Master'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
                <Col span={2}><Button type={"primary"} style={{width: "100%"}} onClick={refresh}>Refresh</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{ffUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={ffUploadLog}/>
            }
            {expErr.length > 0 && <CSVDownload
                data={expErr}
                filename={"ffMasterError.csv"}/>
                // target="_blank"></CSVDownload>
            }
            {exp.length > 0 && <CSVDownload
                data={exp}
                filename={"ffMaster.csv"}/>
                // target="_blank"></CSVDownload>
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
    handleFFExcelUploadLog:PropTypes.func,
    fFExcelUploadSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const ffUploadLog = selectffUploadLogListData(state)
    const ffExcelUpload = selectffExcelUploadListData(state)
    const fFExcelUploadSuccess = selectFFExcelUploadSuccess(state)
    console.log(ffExcelUpload)
    return {authInfo,profileInfo,ffUploadLog,ffExcelUpload, fFExcelUploadSuccess}
}

const actions = {
    handleFFUpload: ffUploadStartAction,
    handleFFUploadLog: ffUploadLogStartAction,
    handleFFExcelUploadLog: ffExcelUploadStartAction,
}

export default connect(mapState, actions)(FFMasterUpdateComponent)
