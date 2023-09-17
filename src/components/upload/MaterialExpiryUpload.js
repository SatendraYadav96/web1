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
import {materialExpiryUploadLogStartAction} from "../../redux/actions/upload/uploadActions";
import {selectMaterialExpiryUploadLogListData} from "../../redux/selectors/uploadSelector";

;


const MaterialExpiryUpload = ({authInfo,profileInfo,materialExpiryUploadLog,handleMaterialExpiryUploadLog}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)
    const [data, setData] = useState([])

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
                render: () => {
                    return (<><Link to="">View Errors</Link> | <Link to="">Download Details</Link></>)
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
    handleMaterialExpiryUploadLog:PropTypes.func ,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const materialExpiryUploadLog = selectMaterialExpiryUploadLogListData(state)
    console.log(materialExpiryUploadLog)
    return {authInfo,profileInfo,materialExpiryUploadLog}
}

const actions = {
    handleMaterialExpiryUploadLog:materialExpiryUploadLogStartAction

}

export default connect(mapState, actions)(MaterialExpiryUpload)
