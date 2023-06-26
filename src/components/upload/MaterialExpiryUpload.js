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

;


const MaterialExpiryUpload = ({authInfo,profileInfo,}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(true)

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
        searchData()
    },[])

    // useEffect(() => {
    //     handleUploadList({
    //         certificate: authInfo.token
    //     })
    //     searchData()
    // },[authInfo.token])
    //
    // useEffect(() => {
    //     console.log(deliveryUpdateList)
    // },[deliveryUpdateList])

    return(
        <div>
            <TitleWidget title={'Upload Logs'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectQuarterNameComponent />
                </Col>
                <Col span={3}>
                    <SelectYearComponent />
                </Col>
                <Col span={3}>
                    <Button type={'primary'}>Upload</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </div>
    )
}

MaterialExpiryUpload.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,profileInfo}
}

const actions = {

}

export default connect(mapState, actions)(MaterialExpiryUpload)
