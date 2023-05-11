import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";
import {selectDeliveryUpdateListData} from "../../redux/selectors/deliveryUpdateSelector";
import {deliveryUpdateStartAction} from "../../redux/actions/dispatchInvoice/deliveryUpdateAction";
import {deliveryUpdateRequest} from "../../api/invoiceRequests";


const DeliveryUpdateComponent = ({authInfo,profileInfo,deliveryUpdateList,handleDeliveryUpdateList}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
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
        handleDeliveryUpdateList({
            certificate: authInfo.token
        })
        searchData()
    },[authInfo.token])

    useEffect(() => {
        console.log(deliveryUpdateList)
    },[deliveryUpdateList])

    return(
        <div>
            <TitleWidget title={'Delivery Update'} />
            <Row>
                <Col span={3}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'}>Upload</Button>
                </Col>
            </Row>
            <br/><br/>
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
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const deliveryUpdateList = selectDeliveryUpdateListData(state)
    return {authInfo,profileInfo,deliveryUpdateList}
}

const actions = {
    handleDeliveryUpdateList: deliveryUpdateStartAction,
}

export default connect(mapState, actions)(DeliveryUpdateComponent)
