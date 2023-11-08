import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {nonComplianceExcelStartAction, nonComplianceUploadLogStartAction, nonComplianceUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectNonComplianceExcelListData, selectNonComplianceUpload, selectNonComplianceUploadLoading, selectNonComplianceUploadLogListData, selectNonComplianceUploadSuccess} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";
import CSVDownload from "react-csv/src/components/Download";

;


const UploadComponent = ({authInfo,profileInfo,handleNonComplianceUploadLog,nonComplianceUploadLog,nonComplianceExcel,handleNonComplianceExcel,
                             handleNonComplianceUpload, nonComplianceUpload, nonComplianceUploadLoading,nonComplianceUploadSuccess}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)
    const [data, setData] = useState([])
    const [viewE, setViewE] = useState(false)
    const [viewD, setViewD] = useState(false)
    const [expErr, setExpErr] = useState([])
    const [exp, setExp] = useState([])
    const [file, setFile] = useState([])

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Start Time',
                key: 'startTime',
                dataIndex: 'startTime',
                width:'100px'
            },
            {
                title: 'End Time',
                key: 'endTime',
                dataIndex: 'endTime',
                width:'100px'
            },
            {
                title: 'Total Records',
                key: 'totalRecords',
                dataIndex: 'totalRecord',
                width:'100px'
            },
            {
                title: 'Records Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordUpload',
                width:'100px'
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
                width: '100px',
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
        console.log(nonComplianceExcel)

        if (nonComplianceExcel) {
            console.log("there is data")
            console.log(nonComplianceExcel)
                if(viewE) {
                    setExpErr(nonComplianceExcel.map(item => {
                        return {

                            "EMPLOYEE_CODE": item.empCode,
                            "MATERIAL_CODE": item.materialCode,
                            "BATCH_NO": item.batchNo,
                            "MONTH": item.month,
                            "YEAR": item.year,
                            "QTY_DISPATCHED": item.qtyDispatched,
                            "QTY_VALIDATED": item.qtyValidated,
                            "QTY_TRANSFERED": item.qtyTransfered,
                            "QTY_BALANCE": item.qtyBalance,
                            "EXPIRY_DATE": item.expiryDate,
                            "ISVALIDATED": item.isvalidated,
                            "ERROR": item.errorText,
                        }
                    }))
                }
                if(viewD) {
                    setExp(nonComplianceExcel.map(item => {
                        return {
                            "EMPLOYEE_CODE": item.empCode,
                            "MATERIAL_CODE": item.materialCode,
                            "BATCH_NO": item.batchNo,
                            "MONTH": item.month,
                            "YEAR": item.year,
                            "QTY_DISPATCHED": item.qtyDispatched,
                            "QTY_VALIDATED": item.qtyValidated,
                            "QTY_TRANSFERED": item.qtyTransfered,
                            "QTY_BALANCE": item.qtyBalance,
                            "EXPIRY_DATE": item.expiryDate,
                            "ISVALIDATED": item.isvalidated,
                        }
                    }))
                }
        } else {
            console.log('no data')
        }
        if (viewE) {
            if (expErr.length > 0) {
                console.log(expErr)
                setViewE(false)
            }
        }
        if (viewD) {
            if (exp.length > 0) {
                console.log(exp)
                setViewD(false)
            }
        }
    },[nonComplianceExcel])


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
    //
    // const handleExcelErr = (nonComplianceExcel) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(nonComplianceExcel);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"NonComplianceErrors.XLSX")
    // }
    //
    // const handleExcel = (nonComplianceExcel) => {
    //     const wb = XLSX.utils.book_new(),
    //         ws = XLSX.utils.json_to_sheet(nonComplianceExcel);
    //     XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
    //     XLSX.writeFile(wb,"NonComplianceDownload.XLSX")
    // }


    const handleViewError = (row) => {
        handleNonComplianceExcel({
            uplId: row.uplId,
            certificate: authInfo.token
        })
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

    const handleUpload = (info) => {
        setFile(info.fileList)
        console.log(info.file.name)
        console.log(info)
        // const file = info.file.originFileObj
        // const base64 = await convertBase64(file)
        // console.log(base64)
        // console.log(file.name)
    }


    const upload = async () => {
        console.log(file)
        const newFile = file[0].originFileObj
        const base64 = await convertBase64(newFile)
        const bytecode = base64.split(",")[1];
        console.log(newFile)
        console.log(bytecode)
        handleNonComplianceUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    useEffect(() => {
        {Object.keys(nonComplianceUploadLog).length === 0 ? console.log('no data') : setData(nonComplianceUploadLog) }
    }, [nonComplianceUploadLog])

    useEffect(() => {
        handleNonComplianceUploadLog ({
            certificate: authInfo.token
        });
        searchData()
    },[authInfo.token])

    const refresh = () => {
        handleNonComplianceUploadLog({
            certificate: authInfo.token
        })
        searchData()
    }

    useEffect(() => {
        handleNonComplianceUploadLog({
            certificate: authInfo.token
        })
        searchData()
    },[nonComplianceUploadSuccess])

    return(
        <div>
            <TitleWidget title={'Non Compliance Upload'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
                <Col span={2}><Button type={"primary"} style={{width: "100%"}} onClick={refresh}>Refresh</Button>
                </Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{nonComplianceUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={nonComplianceUploadLog}/>
            }
            {expErr.length > 0 && <CSVDownload
                data={expErr}
                filename={"NonComplianceErrors.csv"}/>
                // target="_blank"></CSVDownload>
            }
            {exp.length > 0 && <CSVDownload
                data={exp}
                filename={"NonComplianceDownload.csv"}/>
                // target="_blank"></CSVDownload>
            }
        </div>
    )
}

UploadComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    nonComplianceUploadLog:PropTypes.array,
    handleNonComplianceUploadLog:PropTypes.func,
    nonComplianceExcel:PropTypes.array,
    handleNonComplianceExcel:PropTypes.func,
    handleNonComplianceUpload: PropTypes.func,
    nonComplianceUpload: PropTypes.any,
    nonComplianceUploadLoading: PropTypes.any,
    nonComplianceUploadSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const nonComplianceUploadLog = selectNonComplianceUploadLogListData(state)
    const nonComplianceExcel = selectNonComplianceExcelListData(state)
    const nonComplianceUpload = selectNonComplianceUpload(state)
    const nonComplianceUploadLoading = selectNonComplianceUploadLoading(state)
    const nonComplianceUploadSuccess = selectNonComplianceUploadSuccess(state)
    return {authInfo,profileInfo,nonComplianceUploadLog,nonComplianceExcel, nonComplianceUpload, nonComplianceUploadLoading,nonComplianceUploadSuccess }
}

const actions = {
    handleNonComplianceUploadLog:nonComplianceUploadLogStartAction,
    handleNonComplianceExcel:nonComplianceExcelStartAction,
    handleNonComplianceUpload: nonComplianceUploadStartAction
}

export default connect(mapState, actions)(UploadComponent)
