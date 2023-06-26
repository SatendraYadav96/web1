import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {selectBuisnessUnitListData, selectLoadingBuisnessUnitData, selectLoadingTeamData, selectTeamListData} from "../../../redux/selectors/masterSelector";
import {getBuisnessUnitStartAction, getTeamStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";

const TeamComponent = ({authInfo,teamList,teamLoading,handleTeamList}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [status, setStatus] = useState(1)
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
        return navigate("/home/masters/team/create")
    }

    const editTeam = (row) => {
        return navigate(`/home/masters/team/edit/${row.id}`)
    }

    const getTeamList = () => {
        console.log(status);

        handleTeamList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title={"Master - Team"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getTeamList()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createTeam()}></Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={teamList} />
            }
        </>
    )
}

TeamComponent.propTypes = {
    authInfo: PropTypes.any,
    teamList: PropTypes.array,
    teamLoading: PropTypes.any,
    handleTeamList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const teamList = selectTeamListData(state)
    const teamLoading = selectLoadingTeamData(state)
    return {authInfo,teamList,teamLoading}
}

const actions = {
    handleTeamList: getTeamStartAction,
}

export default connect(mapState, actions) (TeamComponent)
