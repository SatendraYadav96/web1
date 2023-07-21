import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, message, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {selectDeliveryUpdateListData} from "../../redux/selectors/deliveryUpdateSelector";
import {deliveryUpdateStartAction} from "../../redux/actions/dispatchInvoice/deliveryUpdateAction";
import {deliveryUpdateRequest} from "../../api/invoiceRequests";
import {selectGrnExcelUploadListData, selectTransportExcelUploadListData, selectTransportUploadListData} from "../../redux/selectors/uploadSelector";
import {grnExcelUploadStartAction, transportExcelUploadStartAction, transportUploadStartAction} from "../../redux/actions/upload/uploadActions";
import XLSX from "xlsx";


const DeliveryUpdateComponent = ({authInfo,profileInfo,deliveryUpdateList,handleDeliveryUpdateList,handleTransportUploadList,transportExcelData,handleGrnExcelUpload}) => {

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
                    return (<><Link onClick={() => {
                        handleViewError(row)
                        setViewE(true)
                    }} to="">View Errors </Link>|<Link onClick={() => {
                        handleViewError(row)
                        setViewD(true)
                    }} to=""> Download Details</Link></>)
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
        console.log(transportExcelData)
        if (transportExcelData) {
            console.log("there is data")
            setExpErr(transportExcelData.map(item => {
                return {
                    "Invoice No": item.invoiceNo,
                    "LR No": item.lrNo,
                    "Box": item.boxNo,
                    "Weight": item.weight,
                    "Dispatch Date": item.dispatchDate,
                    "Expected Delivery Date": item.expectedDeliveryDate,
                    "Actual Delivery Date": item.actuallyDeliveryDate,
                    "Transporter": item.trnName,
                    "Delivered To Name": item.deliveredToName,
                    "Cost": item.deliveryCost,
                    "Docket Status": item.docketState,
                    "Error ": item.errorText,
                }
            }))
            setExp(transportExcelData.map(item => {
                return {
                    "Invoice No": item.invoiceNo,
                    "LR No": item.lrNo,
                    "Box": item.boxNo,
                    "Weight": item.weight,
                    "Dispatch Date": item.dispatchDate,
                    "Expected Delivery Date": item.expectedDeliveryDate,
                    "Actual Delivery Date": item.actuallyDeliveryDate,
                    "Transporter": item.trnName,
                    "Delivered To Name": item.deliveredToName,
                    "Cost": item.deliveryCost,
                    "Docket Status": item.docketState,
                }
            }))
        } else {
            console.log('no data')
        }
    },[transportExcelData])

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
        XLSX.writeFile(wb,"deliveryupdateerror.XLSX")
    }

    const handleExcel = (data) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"deliveryupdate.XLSX")
    }

    const handleViewError = (row) => {
        handleGrnExcelUpload({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }

    useEffect(() => {
        handleDeliveryUpdateList({
            certificate: authInfo.token
        })
        searchData()
    },[authInfo.token])

    useEffect(() => {
        console.log(deliveryUpdateList)
    },[deliveryUpdateList])

    const refresh = () => {
        handleDeliveryUpdateList({
            certificate: authInfo.token
        })
        searchData()
    }

    // const handleFileRead = async (event) => {
    //     const file = event
    //     console.log(file)
    //     const base64 = await convertBase64(file)
    //     console.log(base64)
    // }

    // const convertBase64 = async (file) => {
    //     let result_base64 = await new Promise((resolve) => {
    //         let fileReader = new FileReader();
    //         fileReader.onload = (e) => resolve(fileReader.result);
    //         fileReader.readAsDataURL(file);
    //     });
    //
    //     console.log(result_base64); // aGV5IHRoZXJl...
    //
    //     return result_base64;
    // }

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

        handleTransportUploadList({
            certificate: authInfo.token,
            dto: {
                byteCode: bytecode,
                fileName: newFile.name,
            }
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

    return(
        <div>
            <TitleWidget title={'Delivery Update'} />
            <Row>
                <Col span={3}>
                    <Upload onChange={(info) => handleUpload(info)} customRequest={dummyRequest} fileList={file} {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={upload}>Upload</Button>
                </Col>
                <Col span={2}><Button type={"primary"} style={{width: "100%"}} onClick={refresh}>Refresh</Button></Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{deliveryUpdateList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={deliveryUpdateList}/>
            }
        </div>
    )
}

DeliveryUpdateComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    deliveryUpdateList:PropTypes.array,
    transportExcelData:PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const deliveryUpdateList = selectDeliveryUpdateListData(state)
    const transportUploadList = selectTransportUploadListData(state)
    const transportExcelData = selectTransportExcelUploadListData(state)

    return {authInfo,profileInfo,deliveryUpdateList,transportUploadList,transportExcelData}
}

const actions = {
    handleDeliveryUpdateList: deliveryUpdateStartAction,
    handleTransportUploadList: transportUploadStartAction,
    handleGrnExcelUpload: transportExcelUploadStartAction,

}

export default connect(mapState, actions)(DeliveryUpdateComponent)
