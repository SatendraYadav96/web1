import React, {useEffect, useState} from "react";
import {Col, Input, Row, Button, Space, Table, Tag} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import TitleWidget from "../../widgets/TitleWidget";
import SelectApproverComponent from "../widgets/SelectApproverComponent";
import SelectTseComponent from "../widgets/SelectTseComponent";
import {assignTseStartAction, getTseListStartAction, tseDropdownStartAction, unassignTseStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAssignTse, selectAssignTseLoading, selectTseDropdown, selectTseDropdownLoading, selectTseList, selectTseListLoading, selectUnAssignTse, selectUnAssignTseLoading} from "../../redux/selectors/dropDownSelector";
import {EditOutlined,DeleteOutlined } from "@ant-design/icons";


const AdminComponent = ({authInfo,profileInfo,handleAssignTse,assignTse,assignTseLoading,tseDropdown,handleTseDropDown,tseDropdownLoading,tseList ,tseListLoading,handleTseList,
                            unassignTse,unassignTseLoading,handleUnAssignTse,row}) => {

    const [value, setValue] = React.useState("");
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [tse, setTse] = useState()
    const [tseId, setTseId] = useState()


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Name',
                key: 'name',
                dataIndex: 'name_USR',
                width: '100px',

            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'employee_CODE_USR',
                width: '100px',


            },
            {
                title: 'Login Id',
                key: 'code',
                dataIndex: 'login_NAME_USR',
                width: '100px',


            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button type = {"link"} onClick={() => deleteTse(row)}>Unassign</Button>
                }
            }
        ]);
        setDataSource([
            {
                key: '',
                name: '',
                code: ''
            }
        ]);
    }

    const deleteTse = (row) => {
        //return navigate(`/home/masters/costCenter/edit/${row.id}`)
        console.log(row)
        handleUnAssignTse({
            certificate:authInfo.token,
            id:row.id_USR
        })
    }

    const handleInsertTse = () =>{

        console.log(authInfo)
        console.log(profileInfo)
        console.log(tse)
        handleAssignTse({
            certificate: authInfo.token,
            id:tse

        })

    }


    const getAssignList = () => {
        console.log(tseList)
        handleTseList({
            certificate:authInfo.token,
            id:profileInfo.id
        })
        searchData()
    }

        return ( <>
            <TitleWidget title={"Assign Tse"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    <SelectTseComponent value = {tse} onChange={(value) => setTse(value)}/>
                </Col>

                <Col span={8}>
                    <Button type="primary" onClick={()=>handleInsertTse()}>Assign</Button>
                </Col>

                <Col span={2}>
                    <Button type="primary" onClick={()=>getAssignList()}>Search</Button>
                </Col>

            </Row>

                <span>Total Rows: <b>{tseList?.length}</b></span>
                {flag &&
                    <Table columns={column} dataSource={tseList} />
                }
        </>
        )


}

AdminComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    assignTse: PropTypes.array,
    assignTseLoading: PropTypes.array,
    handleAssignTse: PropTypes.func,
    tseList:PropTypes.array,
    tseListLoading: PropTypes.array,
    handleTseList: PropTypes.func,
    unassignTse:PropTypes.array,
    unassignTseLoading:PropTypes.array,
    handleUnAssignTse:PropTypes.func

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const assignTse = selectAssignTse(state)
    const assignTseLoading = selectAssignTseLoading(state)
    const tseDropdown = selectTseDropdown(state)
    const tseDropdownLoading = selectTseDropdownLoading(state)
    const tseList = selectTseList(state)
    const tseListLoading = selectTseListLoading(state)
    const unassignTse = selectUnAssignTse(state)
    const unassignTseLoading = selectUnAssignTseLoading(state)
    console.log(tseList)

    return {authInfo, profileInfo,assignTse,assignTseLoading,tseDropdown,tseDropdownLoading,tseList,tseListLoading,unassignTse,unassignTseLoading}

}

const actions = {
    handleAssignTse:assignTseStartAction,
    handleTseDropDown : tseDropdownStartAction,
    handleTseList:getTseListStartAction,
    handleUnAssignTse:unassignTseStartAction

}

export default connect(mapState, actions) (AdminComponent)
