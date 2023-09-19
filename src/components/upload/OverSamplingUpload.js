import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {overSamplingExcelStartAction, overSamplingUploadLogStartAction} from "../../redux/actions/upload/uploadActions";
import {selectOverSamplingExcelListData, selectOverSamplingUploadLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";

;


const OverSamplingUpload = ({authInfo,profileInfo,handleOverSamplingUploadLog,overSamplingUploadLog,overSamplingExcel,handleOverSamplingExcel}) => {

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
        console.log(overSamplingExcel)

        if (overSamplingExcel) {
            console.log("there is data")
            console.log(overSamplingExcel)

            setExpErr(overSamplingExcel.map(item => {
                return {

                    "FF": item.ffCmp,
                    "FF_CODE": item.ffCode,
                    "TEAM": item.teamName,
                    "DR-ID": item.drCode,
                    "DR-NAME": item.drName,
                    "TOTSAMPLESGIVEN": item.totalSampleGiven,
                    "BU": item.bu,
                    "AM": item.am,
                    "RBM": item.rbm,
                    "REMARKS": item.remarks,
                    "Error": item.errorText,
                }
            }))
            setExp(overSamplingExcel.map(item => {
                return {
                    "FF": item.ffCmp,
                    "FF_CODE": item.ffCode,
                    "TEAM": item.teamName,
                    "DR-ID": item.drCode,
                    "DR-NAME": item.drName,
                    "TOTSAMPLESGIVEN": item.totalSampleGiven,
                    "BU": item.bu,
                    "AM": item.am,
                    "RBM": item.rbm,
                    "REMARKS": item.remarks,
                }
            }))
        } else {
            console.log('no data')
        }
    },[overSamplingExcel])




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


    const handleExcelErr = (overSamplingExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(overSamplingExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"OverSamplingErrors.XLSX")
    }

    const handleExcel = (overSamplingExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(overSamplingExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"OverSamplingDownload.XLSX")
    }


    const handleViewError = (row) => {
        handleOverSamplingExcel({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }




    useEffect(() => {
        {Object.keys(overSamplingUploadLog).length === 0 ? console.log('no data') : setData(overSamplingUploadLog) }
    }, [overSamplingUploadLog])

    useEffect(() => {
        handleOverSamplingUploadLog ({
            certificate: authInfo.token
        });
        searchData()
    },[authInfo.token])

    const refresh = () => {
        handleOverSamplingUploadLog({
            certificate: authInfo.token
        })
        searchData()
    }

    return(
        <div>
            <TitleWidget title={'Over Sampling Upload'} />
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
            <span>Total Rows: <b>{overSamplingUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={overSamplingUploadLog}/>
            }
        </div>
    )
}

OverSamplingUpload.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    overSamplingUploadLog: PropTypes.array,
    handleOverSamplingUploadLog:PropTypes.func,
    overSamplingExcel: PropTypes.array,
    handleOverSamplingExcel:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const overSamplingUploadLog = selectOverSamplingUploadLogListData(state)
    const overSamplingExcel = selectOverSamplingExcelListData(state)
    console.log(overSamplingUploadLog)
    return {authInfo,profileInfo,overSamplingUploadLog,overSamplingExcel}
}

const actions = {
    handleOverSamplingUploadLog:overSamplingUploadLogStartAction,
    handleOverSamplingExcel:overSamplingExcelStartAction
}

export default connect(mapState, actions)(OverSamplingUpload)
