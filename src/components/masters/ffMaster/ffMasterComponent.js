import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import SelectRecipientCodeComponent from "../../widgets/SelectRecipientCodeComponent";
import SelectRecipientStatusComponent from "../../widgets/SelectRecipientStatusComponent";
import {selectFFListData} from "../../../redux/selectors/masterSelector";
import {getFFStartAction} from "../../../redux/actions/master/masterActions";

const TeamComponent = ({authInfo,ffList,handleFFList}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState("80BC3490-9F53-4C92-8DBA-3D5C7755FD73")
    const [recipientCode, setRecipientCode] = useState("")


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Employee Code',
                key: 'employeeCode',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address',
                width: '200px'
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
                dataIndex: 'designation',
                render: item => Object.values(item)[1],
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
                dataIndex: 'mobile',
                width: '100px'
            },
            {
                title: 'Email Address',
                key: 'emailAddress',
                dataIndex: 'email',
                width: '100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: 'Sub Team',
                key: 'subTeam',
                dataIndex: 'businessUnit',
                render: item => Object.values(item)[1],
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
                dataIndex: 'emailAM',
                width: '100px'
            },
            {
                title: 'RBM Email',
                key: 'rbmEmail',
                dataIndex: 'emailRBM',
                width: '100px'
            },
            {
                title: 'HQ',
                key: 'hq',
                dataIndex: 'headQuarter',
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
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editTeam(row)}></Button>
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

    const editTeam = (row) => {
        return navigate(`/home/masters/ffMaster/edit/${row.id}`)
    }

    const handleFF = () => {
        handleFFList({
            ff: {
                status: status,
                ffCode: recipientCode,
                ffName: "",
            },
            certificate: authInfo.token,
        })
        searchData()
    }

    return(
        <>
            <TitleWidget title={"Master - FF"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectRecipientStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={6}>
                    <SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleFF()} style={{width: '100%'}}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={ffList} />
            }
        </>
    )
}

TeamComponent.propTypes = {
    authInfo: PropTypes.any,
    ffList: PropTypes.array,
    handleFFList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const ffList = selectFFListData(state)
    return {authInfo,ffList}
}

const actions = {
    handleFFList: getFFStartAction,
}

export default connect(mapState, actions) (TeamComponent)
