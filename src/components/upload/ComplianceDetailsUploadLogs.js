import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {overSamplingDetailsExcelStartAction, overSamplingDetailsUploadLogStartAction} from "../../redux/actions/upload/uploadActions";
import {selectOverSamplingDetailsExcelListData, selectOverSamplingDetailsUploadLogListData} from "../../redux/selectors/uploadSelector";
import XLSX from "xlsx";

;


const UploadComponent = ({authInfo,profileInfo,overSamplingDetailsUploadLog,handleOverSamplingDetailsUploadLog,overSamplingDetailsExcel,handleOverSamplingDetailsExcel}) => {

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
        console.log(overSamplingDetailsExcel)

        if (overSamplingDetailsExcel) {
            console.log("there is data")
            console.log(overSamplingDetailsExcel)

            setExpErr(overSamplingDetailsExcel.map(item => {
                return {

                    "MONTH": item.month,
                    "TERRITORYID": item.territoryId,
                    "TERRITORYNAME": item.territoryName,
                    "PERSONID": item.personId,
                    "PERSONNAME": item.personName,
                    "LOCATIONID": item.locationId,
                    "LOCATIONNAME": item.locationName,
                    "VISITED": item.visited,
                    "ITEMCATEGORY": item.itemCategory,
                    "ITEMID": item.itemId,
                    "ITEMNAME": item.nameItem,
                    "BATCHNO": item.batchNo,
                    "QUANTITYDISTRIBUTED": item.quantity,
                    "SUBTEAM": item.subTeam,
                    "TEAM": item.team,
                    "AM": item.am,
                    "RBM": item.rbm,
                    "ERROR": item.errorText,
                }
            }))
            setExp(overSamplingDetailsExcel.map(item => {
                return {
                    "MONTH": item.month,
                    "TERRITORYID": item.territoryId,
                    "TERRITORYNAME": item.territoryName,
                    "PERSONID": item.personId,
                    "PERSONNAME": item.personName,
                    "LOCATIONID": item.locationId,
                    "LOCATIONNAME": item.locationName,
                    "VISITED": item.visited,
                    "ITEMCATEGORY": item.itemCategory,
                    "ITEMID": item.itemId,
                    "ITEMNAME": item.nameItem,
                    "BATCHNO": item.batchNo,
                    "QUANTITYDISTRIBUTED": item.quantity,
                    "SUBTEAM": item.subTeam,
                    "TEAM": item.team,
                    "AM": item.am,
                    "RBM": item.rbm,
                }
            }))
        } else {
            console.log('no data')
        }
    },[overSamplingDetailsExcel])




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


    const handleExcelErr = (overSamplingDetailsExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(overSamplingDetailsExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"OverSamplingDetailsErrors.XLSX")
    }

    const handleExcel = (overSamplingDetailsExcel) => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(overSamplingDetailsExcel);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"OverSamplingDetailsDownload.XLSX")
    }


    const handleViewError = (row) => {
        handleOverSamplingDetailsExcel({
            uplId: row.uplId,
            certificate: authInfo.token
        })
    }




    useEffect(() => {
        {Object.keys(overSamplingDetailsUploadLog).length === 0 ? console.log('no data') : setData(overSamplingDetailsUploadLog) }
    }, [overSamplingDetailsUploadLog])

    useEffect(() => {
        handleOverSamplingDetailsUploadLog ({
            certificate: authInfo.token
        });
        searchData()
    },[authInfo.token])

    const refresh = () => {
        handleOverSamplingDetailsUploadLog({
            certificate: authInfo.token
        })
        searchData()
    }

    return(
        <div>
            <TitleWidget title={'Compliance Details Upload Logs'} />
            <Row gutter={[16,16]}>
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
            <span>Total Rows: <b>{overSamplingDetailsUploadLog?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={overSamplingDetailsUploadLog}/>
            }
        </div>
    )
}

UploadComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    overSamplingDetailsUploadLog:PropTypes.array,
    handleOverSamplingDetailsUploadLog: PropTypes.func,
    overSamplingDetailsExcel : PropTypes.array,
    handleOverSamplingDetailsExcel: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const overSamplingDetailsUploadLog = selectOverSamplingDetailsUploadLogListData(state)
    const overSamplingDetailsExcel = selectOverSamplingDetailsExcelListData(state)
    console.log(overSamplingDetailsUploadLog)
    return {authInfo,profileInfo,overSamplingDetailsUploadLog,overSamplingDetailsExcel}
}

const actions = {
    handleOverSamplingDetailsUploadLog:overSamplingDetailsUploadLogStartAction,
    handleOverSamplingDetailsExcel:overSamplingDetailsExcelStartAction
}

export default connect(mapState, actions)(UploadComponent)
