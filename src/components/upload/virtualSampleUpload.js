import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {ffUploadStartAction, virtualSampleLogStartAction, virtualSampleStartAction, virtualUploadStartAction} from "../../redux/actions/upload/uploadActions";
import {selectVirtualSampleListData, selectVirtualSampleLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";

;


const VirtualSampleComponent = ({authInfo,handleVirtualUpload,handleVirtualSampleUpload,virtualSampleData,handleVirtualSampleLogUpload,virtualSampleLogData}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
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
        handleVirtualUpload({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
        })
    }

    useEffect(() => {
        searchData()
        handleVirtualSampleLogUpload({
            certificate: authInfo.token,
        })
    },[authInfo])

    const handleViewError = (row) => {
        handleVirtualSampleUpload({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

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
        console.log(virtualSampleData)
        if (virtualSampleData) {
            console.log("there is data")
            setExpErr(virtualSampleData?.map(item => {
                return {
                    "Created By": item.createdBy,
                    "User Email": item.userEmail,
                    "User Position": item.userPosition,
                    "Employee Id": item.empId,
                    "SKU": item.sku,
                    "LOT": item.lot,
                    "External Id": item.externalId,
                    "Customer": item.customer,
                    "Mobile": item.mobile,
                    "Quantity": item.quantity,
                    "Request Status": item.requestStatus,
                    "Team": item.team,
                    "Sub Team": item.subTeam,
                    "Address": item.address,
                    "Street1": item.street1,
                    "Street2": item.street2,
                    "Street3": item.street3,
                    "City": item.city,
                    "State": item.state,
                    "Postal Code ": item.postalCode,
                    "Date Created ": item.dateCreated,
                    "Request Completed": item.requestCompleted,
                    "Request Started": item.requestStarted,
                    "Error": item.errorText,
                }
            }))
            setExp(virtualSampleData?.map(item => {
                return {
                    "Created By": item.createdBy,
                    "User Email": item.userEmail,
                    "User Position": item.userPosition,
                    "Employee Id": item.empId,
                    "SKU": item.sku,
                    "LOT": item.lot,
                    "External Id": item.externalId,
                    "Customer": item.customer,
                    "Mobile": item.mobile,
                    "Quantity": item.quantity,
                    "Request Status": item.requestStatus,
                    "Team": item.team,
                    "Sub Team": item.subTeam,
                    "Address": item.address,
                    "Street1": item.street1,
                    "Street2": item.street2,
                    "Street3": item.street3,
                    "City": item.city,
                    "State": item.state,
                    "Postal Code ": item.postalCode,
                    "Date Created ": item.dateCreated,
                    "Request Completed": item.requestCompleted,
                    "Request Started": item.requestStarted,
                }
            }))
        } else {
            console.log('no data')
        }
    },[virtualSampleData])

    return(
        <div>
            <TitleWidget title={'Virtual Sample'} />
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
            <span>Total Rows: <b>{virtualSampleLogData?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={virtualSampleLogData}/>
            }
        </div>
    )
}

VirtualSampleComponent.propTypes = {
    authInfo: PropTypes.any,
    virtualSampleData: PropTypes.array,
    virtualSampleLogData: PropTypes.array,
    handleVirtualUpload: PropTypes.func,
    handleVirtualSampleUpload: PropTypes.func,
    handleVirtualSampleLogUpload: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const virtualSampleData = selectVirtualSampleListData(state)
    const virtualSampleLogData = selectVirtualSampleLogListData(state)
    return {authInfo,virtualSampleData,virtualSampleLogData}
}

const actions = {
    handleVirtualUpload: virtualUploadStartAction,
    handleVirtualSampleUpload: virtualSampleStartAction,
    handleVirtualSampleLogUpload: virtualSampleLogStartAction,
}

export default connect(mapState, actions)(VirtualSampleComponent)
