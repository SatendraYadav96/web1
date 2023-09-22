import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import SelectQuarterNameComponent from "../widgets/SelectQuarterNameComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {materialExpiryExcelStartAction, materialExpiryUploadLogStartAction} from "../../redux/actions/upload/uploadActions";
import {selectMaterialExpiryExcelListData, selectMaterialExpiryUploadLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";

;


const MaterialExpiryUpload = ({authInfo,profileInfo,materialExpiryUploadLog,handleMaterialExpiryUploadLog,materialExpiryExcel,handleMaterialExpiryExcel}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)
    const [data, setData] = useState([])
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



    useEffect(() => {
        console.log(materialExpiryExcel)

        if (materialExpiryExcel) {
            console.log("there is data")
            console.log(materialExpiryExcel)

            setExpErr(materialExpiryExcel.map(item => {
                return {

                    "EMPLOYEE_CODE": item.empCode,
                    "MATERIAL_CODE": item.materialCode,
                    "BATCH_NO": item.batchNo,
                    "MONTH": item.month,
                    "YEAR": item.year,
                    "QTY_DISPATCHED": item.qtyDispatched,
                    "QTY_VALIDATED": item.qtyValidated,
                   // "QTY_TRANSFERED": item.qtyTransfered,
                    "QTY_BALANCE": item.qtyBalance,
                    "EXPIRY_DATE": item.expiryDate,
                    "ISVALIDATED": item.isvalidated,
                    "Error": item.errorText,
                }
            }))
            setExp(materialExpiryExcel.map(item => {
                return {
                    "EMPLOYEE_CODE": item.empCode,
                    "MATERIAL_CODE": item.materialCode,
                    "BATCH_NO": item.batchNo,
                    "MONTH": item.month,
                    "YEAR": item.year,
                    "QTY_DISPATCHED": item.qtyDispatched,
                    "QTY_VALIDATED": item.qtyValidated,
                    //"QTY_TRANSFERED": item.qtyTransfered,
                    "QTY_BALANCE": item.qtyBalance,
                    "EXPIRY_DATE": item.expiryDate,
                    "ISVALIDATED": item.isvalidated,
                }
            }))
        } else {
            console.log('no data')
        }
    },[materialExpiryExcel])


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


    const handleExcelErr = (materialExpiryExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(materialExpiryExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"MaterialExpiryErrors.XLSX")
    }

    const handleExcel = (materialExpiryExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(materialExpiryExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"MaterialExpiryDownload.XLSX")
    }


    const handleViewError = (row) => {
        handleMaterialExpiryExcel({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }



    useEffect(() => {
        {Object.keys(materialExpiryUploadLog).length === 0 ? console.log('no data') : setData(materialExpiryUploadLog) }
    }, [materialExpiryUploadLog])

    useEffect(()=>{
        handleMaterialExpiryUploadLog({
            certificate:authInfo.token
        });
        searchData()
    },[authInfo.token])

    const refresh = () => {
        handleMaterialExpiryUploadLog({
            certificate:authInfo.token
        })
        searchData()
    }



    return(
        <div>
            <TitleWidget title={'Material Expiry Upload'} />
            <Row>
                <Col span={3}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'}>Upload</Button>
                </Col>
                <Col span={2}><Button type={"primary"} style={{width: "100%"}} onClick={refresh}>Refresh</Button>
                </Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{materialExpiryUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={materialExpiryUploadLog}/>
            }
        </div>
    )
}

MaterialExpiryUpload.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    materialExpiryUploadLog:PropTypes.array,
    handleMaterialExpiryUploadLog:PropTypes.func,
    materialExpiryExcel: PropTypes.array,
    handleMaterialExpiryExcel:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const materialExpiryUploadLog = selectMaterialExpiryUploadLogListData(state)
    const materialExpiryExcel = selectMaterialExpiryExcelListData(state)

    console.log(materialExpiryUploadLog)
    return {authInfo,profileInfo,materialExpiryUploadLog,materialExpiryExcel}
}

const actions = {
    handleMaterialExpiryUploadLog:materialExpiryUploadLogStartAction,
    handleMaterialExpiryExcel:materialExpiryExcelStartAction

}

export default connect(mapState, actions)(MaterialExpiryUpload)
