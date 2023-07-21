import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {selectBuisnessUnitListData, selectCostCenterListData, selectLoadingBuisnessUnitData, selectLoadingCostCenterData} from "../../../redux/selectors/masterSelector";
import {getBuisnessUnitStartAction, getCostCenterStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";

const BusinessUnitComponent = ({authInfo,buisnessUnitList,buisnessUnitLoading,handleBuisnessUnitList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState(1)
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

    const getBuisnessUnitList = () => {
        console.log(status);
        console.log(buisnessUnitList);

        handleBuisnessUnitList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title={"Master - Business Units"}/>
            <Row gutter={[8,8]}>
                <Col span={4}>
                    <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getBuisnessUnitList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createBusinessUnit()}></Button>
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
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{buisnessUnitList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={buisnessUnitList} />
            }
        </>
    )
}

BusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    buisnessUnitList: PropTypes.array,
    buisnessUnitLoading: PropTypes.any,
    handleBuisnessUnitList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buisnessUnitList = selectBuisnessUnitListData(state)
    const buisnessUnitLoading = selectLoadingBuisnessUnitData(state)
    return {authInfo,profileInfo,buisnessUnitList,buisnessUnitLoading}
}

const actions = {
    handleBuisnessUnitList: getBuisnessUnitStartAction,
}

export default connect(mapState, actions) (BusinessUnitComponent)
