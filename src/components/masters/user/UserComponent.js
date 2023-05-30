import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const UserComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: 'Email Address',
                key: 'email',
                dataIndex: 'email',
                width: '200px'
            },
            {
                title: 'Designation',
                key: 'designation',
                dataIndex: 'designation',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Button icon={<EditOutlined />} onClick={() => editUser()}></Button>
                }
            }
        ]);

        setDataSource([
            {
                key: '1',
                name: 'ABC',
                code: ''
            }
        ])
    }

    const createUser = () => {
        return navigate("/home/masters/user/create")
    }

    const editUser = () => {
        return navigate("/home/masters/user/edit")
    }

    return(
        <>
            <TitleWidget title={"Master - User"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <Select style={{width: '100%'}}></Select>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => searchData()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createUser()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource} />
            }
        </>
    )
}

UserComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (UserComponent)
