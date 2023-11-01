import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {grnStartAction} from "../../redux/actions/grn/grnActions";
import {selectGrnUpload} from "../../redux/selectors/grnSelectors";
import {UploadOutlined} from "@ant-design/icons";
import {grnExcelUploadStartAction, grnUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectGrnExcelUploadListData, selectGrnUploadSuccess} from "../../redux/selectors/uploadSelector";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";



const GRNUploadComponent = ({authInfo,grnUpload,handleGrn,handleGrnUpload,handleGrnExcelUpload,grnExcelData, grnUploadSuccess}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [data, setData] = useState([])
    const [viewE, setViewE] = useState(false)
    const [viewD, setViewD] = useState(false)
    const [expErr, setExpErr] = useState([])
    const [exp, setExp] = useState([])
    const [flag, setFlag] = useState(false)
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
                width:'200px'
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
                width: '130px',
                render: (_,row) => {
                    return (
                        <>
                            <CSVLink
                                data={expErr}
                                filename={"grnviewerrors.csv"}
                                onClick={() => {
                                    handleViewError(row)
                                }}
                            >
                                <Button type="link">View Errors</Button>
                            </CSVLink>
                            |<CSVLink
                            data={exp}
                            filename={"grnviewDownload.csv"}
                            onClick={() => {
                                handleViewError(row)
                            }}
                        ><Button type="link">Download Details</Button>
                        </CSVLink>
                        </>
                    )
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                startTime: '',
                endTime: '',
                totalRecords:'',
                recordsUploaded: '',
                status:''
            }
        ])
    }

    useEffect(() => {
        console.log(grnExcelData)
        if (grnExcelData) {
            console.log("there is data")
            setExpErr(grnExcelData.map(item => {
                return {
                    "PO": item.poNo,
                    "Cost Ctr": item.costCenter,
                    "Material": item.material,
                    "Batch": item.batchNo,
                    "Material Description": item.materialDescription,
                    "Pstng Date": item.postingDate,
                    "Qty in UnE": item.quantity,
                    "Amount in LC": item.amount,
                    "Vendor Code": item.vendorCode,
                    "Vendor Name": item.vendorName,
                    "Rate": item.ratePerUnit,
                    "Medical Code": item.medicalCode,
                    "Mat.Doc.": item.materialDoc,
                    "Item": item.itemNo,
                    "Sample Expiry": item.sampleExpiry,
                    "Expiry Date": item.expiryDate,
                    "Error ": item.errorText,
                }
            }))
            setExp(grnExcelData.map(item => {
                return {
                    "PO": item.poNo,
                    "Cost Ctr": item.costCenter,
                    "Material": item.material,
                    "Batch": item.batchNo,
                    "Material Description": item.materialDescription,
                    "Pstng Date": item.postingDate,
                    "Qty in UnE": item.quantity,
                    "Amount in LC": item.amount,
                    "Vendor Code": item.vendorCode,
                    "Vendor Name": item.vendorName,
                    "Rate": item.ratePerUnit,
                    "Medical Code": item.medicalCode,
                    "Mat.Doc.": item.materialDoc,
                    "Item": item.itemNo,
                    "Sample Expiry": item.sampleExpiry,
                    "Expiry Date": item.expiryDate,
                }
            }))
        } else {
            console.log('no data')
        }
    },[grnExcelData])

    useEffect(() => {
        console.log("expErr: ", expErr)
        if (viewE) {
            if (expErr.length > 0) {
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

    // useEffect(() => {
    //     console.log("expErr: ", expErr)
    //     if (expErr.length > 0) {
    //         handleExcel(expErr)
    //         setViewE(false)
    //     }
    // },[expErr])

    const handleExcelErr = (data) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"grnviewerrors.XLSX")
    }

    const handleExcel = (data) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"grnviewDownload.XLSX")
    }

    const handleViewError = (row) => {
        handleGrnExcelUpload({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

    const getGrnUpload = () => {
        handleGrn ({
            certificate: authInfo.token
        });
    }

    useEffect(() => {
        {Object.keys(grnUpload).length === 0 ? console.log('no data') : setData(grnUpload) }
    }, [grnUpload])

    useEffect(() => {
        handleGrn ({
            certificate: authInfo.token
        });
        searchData()
    }, [authInfo.token])

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
        handleGrnUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    useEffect(() => {
        if(grnUploadSuccess){
            handleGrn ({
                certificate: authInfo.token
            });
        }
    }, [grnUploadSuccess])

    const handleRefresh = () => {
        handleGrn ({
            certificate: authInfo.token
        });
    }

    return(
        <div>
            <TitleWidget title={'GRN Upload Log'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={handleRefresh}>Refresh</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={data}/>
            }
        </div>
    )
}

GRNUploadComponent.propTypes = {
    authInfo: PropTypes.any,
    grnUpload:PropTypes.any,
    grnExcelData:PropTypes.array,
    handleGrnUpload:PropTypes.func,
    grnUploadSuccess: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const grnUpload = selectGrnUpload(state)
    const grnExcelData = selectGrnExcelUploadListData(state)
    const grnUploadSuccess = selectGrnUploadSuccess(state)
    console.log(grnUploadSuccess)
    return {authInfo,grnUpload,grnExcelData, grnUploadSuccess}
}

const actions = {
    handleGrn: grnStartAction,
    handleGrnUpload: grnUploadStartAction,
    handleGrnExcelUpload: grnExcelUploadStartAction,
}

export default connect(mapState, actions)(GRNUploadComponent)
