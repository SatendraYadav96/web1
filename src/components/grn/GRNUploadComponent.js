import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table} from "antd";
import {Link} from "react-router-dom";
import {grnUploadStartAction} from "../../redux/actions/grn/grnActions";
import {selectGrnUpload} from "../../redux/selectors/grnSelectors";
import {empty} from "rxjs";



const GRNUploadComponent = ({authInfo,grnUpload,handleGrnUpload}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [data, setData] = useState([])
    const [flag, setFlag] = useState(false)

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
              dataIndex: 'statusId.id',
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
                key:'',
                startTime: '',
                endTime: '',
                totalRecords:'',
                recordsUploaded: '',
                status:''
            }
        ])
    }

    const getGrnUpload = () => {
        handleGrnUpload ({
            certificate: authInfo.token
        });
    }

    useEffect(() => {
        {Object.keys(grnUpload).length === 0 ? console.log('no data') : setData(grnUpload) }
    }, [grnUpload])

    useEffect(() => {
        handleGrnUpload ({
            certificate: authInfo.token
        });
        searchData()
    }, [authInfo.token])

    return(
        <div>
            <TitleWidget title={'GRN Upload Log'} />
            <Row>
                <Col span={4}></Col>
                <Col span={16}></Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => getGrnUpload()}>Process Now</Button>
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
    grnUpload:PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const grnUpload = selectGrnUpload(state)
    return {authInfo,grnUpload}
}

const actions = {
    handleGrnUpload: grnUploadStartAction
}

export default connect(mapState, actions)(GRNUploadComponent)
