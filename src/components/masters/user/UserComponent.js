import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {selectUserListData} from "../../../redux/selectors/masterSelector";
import {getUserStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";

const UserComponent = ({authInfo,userList,handleUserList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState()
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
                dataIndex: 'employeeCode',
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
                key: 'userDesignation',
                dataIndex: 'userDesignation',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'userStatus',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editUser(row)}></Button>
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

    const editUser = (row) => {
        return navigate(`/home/masters/user/edit/${row.id}`)
    }

    const getUserList = () => {
        console.log(status);
        console.log(userList);

        handleUserList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title={"Master - User"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectUserStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getUserList()} style={{width: '100%'}}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={userList} />
            }
        </>
    )
}

UserComponent.propTypes = {
    authInfo: PropTypes.any,
    userList: PropTypes.array,
    handleUserList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const userList = selectUserListData(state)
    return {authInfo,userList}
}

const actions = {
    handleUserList: getUserStartAction,
}

export default connect(mapState, actions) (UserComponent)
