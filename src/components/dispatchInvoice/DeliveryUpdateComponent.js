import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {Link} from "react-router-dom";
import {UploadOutlined} from "@ant-design/icons";


const DeliveryUpdateComponent = ({authInfo}) => {

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
                dataIndex: 'totalRecords',
                width:'100px'
            },
            {
                title: 'Records Uploaded',
                key: 'recordsUploaded',
                dataIndex: 'recordsUploaded',
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

    return(
        <div>
            <TitleWidget title={'Delivery Update'} />
            <Row>
                <Col span={4}>
                    <Upload>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => searchData()}>Upload</Button>
                </Col>
                <Col span={16}></Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </div>
    )
}

DeliveryUpdateComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(DeliveryUpdateComponent)
