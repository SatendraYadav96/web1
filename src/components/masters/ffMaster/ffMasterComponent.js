import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const TeamComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Employee Code',
                key: 'employeeCode',
                dataIndex: 'employeeCode',
                width: '100px'
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '100px'
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address',
                width: '100px'
            },
            {
                title: 'City',
                key: 'city',
                dataIndex: 'city',
                width: '100px'
            },
            {
                title: 'Role',
                key: 'role',
                dataIndex: 'role',
                width: '100px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'Zip',
                key: 'zip',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'Zone',
                key: 'zone',
                dataIndex: 'zone',
                width: '100px'
            },
            {
                title: 'Employee WorkId',
                key: 'workId',
                dataIndex: 'workId',
                width: '100px'
            },
            {
                title: 'Gender',
                key: 'gender',
                dataIndex: 'gender',
                width: '100px'
            },
            {
                title: 'Joining Date',
                key: 'joiningDate',
                dataIndex: 'joiningDate',
                width: '100px'
            },
            {
                title: 'Mobile Number',
                key: 'mobileNumber',
                dataIndex: 'mobileNumber',
                width: '100px'
            },
            {
                title: 'Email Address',
                key: 'emailAddress',
                dataIndex: 'emailAddress',
                width: '100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'Sub Team',
                key: 'subTeam',
                dataIndex: 'subTeam',
                width: '100px'
            },
            {
                title: 'AM Name',
                key: 'amName',
                dataIndex: 'amName',
                width: '100px'
            },
            {
                title: 'AM Code',
                key: 'amCode',
                dataIndex: 'amCode',
                width: '100px'
            },
            {
                title: 'AM Email',
                key: 'amEmail',
                dataIndex: 'amEmail',
                width: '100px'
            },
            {
                title: 'RBM Email',
                key: 'rbmEmail',
                dataIndex: 'rbmEmail',
                width: '100px'
            },
            {
                title: 'HQ',
                key: 'hq',
                dataIndex: 'hq',
                width: '100px'
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'IS BLOCKED',
                key: 'isBlocked',
                dataIndex: 'state',
                width: '100px',
                render: () => {
                    return <Checkbox/>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Button icon={<EditOutlined />} onClick={() => editTeam()}></Button>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Button icon={<EditOutlined />} onClick={() => editTeam()}></Button>
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

    const createTeam = () => {
        return navigate("/home/masters/ffMaster/create")
    }

    const editTeam = () => {
        return navigate("/home/masters/ffMaster/edit")
    }

    return(
        <>
            <TitleWidget title={"Master - FF"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <Select style={{width: '100%'}}></Select>
                </Col>
                <Col span={3}>
                    <Input placeholder="Recipient Code"/>
                </Col>
                <Col span={3}>
                    <Input placeholder="Recipient Name"/>
                </Col>
                <Col span={3}>
                    <Select style={{width: '100%'}}></Select>
                </Col>
                <Col span={1}>
                    <Button type={"primary"} onClick={() => searchData()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createTeam()}></Button>
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

TeamComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (TeamComponent)
