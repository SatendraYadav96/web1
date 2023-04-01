import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Row, Table, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const InvoiceUploadDetailComponent = ({authInfo}) => {

    const column=[
        {
            title:'Start Time',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'End Time',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Total Records',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Records Uploaded',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Status',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'',
            key: '',
            dataIndex: '',
            width: '150px',
            render: () => {
                return (<><Link to="">View Errors</Link> | <Link to="">Download File</Link></>)
            }
        }
    ]

    const dataSource = [
        {
            key:'1'
        }
    ]

    return(
        <div>
            <TitleWidget title={'Upload Invoice Details'} />
            <Row>
                <Col span={3} >
                    <Upload >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} >Upload</Button>
                </Col>
                <Col span={3}><Button type={"primary"}>Refresh</Button></Col>
                <Col span={15}></Col>
            </Row>
            <br/><br/>
                <Table columns={column} dataSource={dataSource}/>
        </div>
    )
}

InvoiceUploadDetailComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(InvoiceUploadDetailComponent)
