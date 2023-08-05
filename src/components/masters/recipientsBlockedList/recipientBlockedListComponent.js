import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {selectBuisnessUnitListData, selectCostCenterListData, selectLoadingBuisnessUnitData, selectLoadingCostCenterData, selectMasterBlockedListData} from "../../../redux/selectors/masterSelector";
import {getBuisnessUnitStartAction, getCostCenterStartAction, getMasterBlockedListStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import SelectYearComponent from "../../widgets/SelectYearComponent";
import {selectMonthlyApprovalListData} from "../../../redux/selectors/monthlyApprovalSelector";
import {resetPlanStartAction} from "../../../redux/actions/approval/monthlyApprovalActions";

const BusinessUnitComponent = ({authInfo,handleMasterBlockedList,masterBlockedList}) => {

    const navigate = useNavigate()
    const date = new Date();
    const currentYear = date.getFullYear();
    const [status, setStatus] = useState(1)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [year, setYear] = useState(currentYear)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Employee Code',
                key: 'name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'Headquarter',
                key: 'headquarter',
                dataIndex: 'headquarter',
                width: '100px'
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'am',
                width: '100px'
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'rbm',
                width: '100px'
            },
            {
                title: 'Month',
                key: 'month',
                dataIndex: 'month',
                width: '100px'
            },
            {
                title: 'Year',
                key: 'year',
                dataIndex: 'year',
                width: '100px'
            },
            {
                title: 'Blocked On',
                key: 'blockedOn',
                dataIndex: 'blockedOn',
                width: '100px'
            },
            {
                title: 'Is Blocked',
                key: 'isBlocked',
                dataIndex: 'isBlocked',
                width: '100px'
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px'
            },
            {
                title: 'Blocked_Type',
                key: 'blockedType',
                dataIndex: 'blockedType',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editBusinessUnit(row)}></Button>
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

    const createBusinessUnit = () => {
        return navigate("/home/masters/businessUnit/create")
    }

    const editBusinessUnit = (row) => {
        return navigate(`/home/masters/businessUnit/edit/${row.id}`)
    }

    const getMasterBlockedList = () => {
        console.log(status);

        handleMasterBlockedList ({
            certificate: authInfo.token,
            year:year,
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title={"Master - Business Units"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getMasterBlockedList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button onClick={()=> createBusinessUnit()}>Save</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    {/*<CSVLink*/}
                    {/*    data={data}*/}
                    {/*    filename={"costcenter.csv"}*/}
                    {/*    onClick={() => {*/}
                    {/*        console.log("clicked")*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Button>CSV</Button>*/}
                    {/*</CSVLink>*/}
                    {/*&nbsp;*/}
                    {/*<Button onClick={handleExcel}>EXCEL</Button>*/}
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={masterBlockedList} />
            }
        </>
    )
}

BusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const masterBlockedList = selectMasterBlockedListData(state)
    return {authInfo,masterBlockedList}
}

const actions = {
    handleResetPlanList: resetPlanStartAction,
    handleMasterBlockedList: getMasterBlockedListStartAction,
}

export default connect(mapState, actions) (BusinessUnitComponent)
