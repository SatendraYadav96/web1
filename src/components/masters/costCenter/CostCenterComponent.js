import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {selectCostCenterListData, selectLoadingCostCenterData, selectLoadingVendorData, selectVendorListData} from "../../../redux/selectors/masterSelector";
import {getCostCenterStartAction, getVendorStartAction} from "../../../redux/actions/master/masterActions";

const CostCenterComponent = ({authInfo, profileInfo,costCenterList, costCenterLoading, handleCostCenterList}) => {
    const [status, setStatus] = useState(1)
    const navigate = useNavigate()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Name',
                key: 'Name',
                dataIndex: 'name',
                width: '100px'
            },
            {
                title: 'Code',
                key: 'Code',
                dataIndex: 'code',
                width: '100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Button icon={<EditOutlined />} onClick={editCostCenter } ></Button>
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

    const createCostCenter = () => {
        return navigate("/home/masters/costCenter/create")
    }

    const editCostCenter = () => {
        return navigate("/home/masters/costCenter/edit")
    }

    const getCostCenterList = () => {
        console.log(status);
        console.log(costCenterList);

        handleCostCenterList ({
            status:status,
            costCenter: costCenterList,
            certificate: authInfo.token
        });
        searchData()

    }

    return(
        <>
            <TitleWidget title={"Master - Cost Center"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getCostCenterList()}>Search</Button>
                </Col>
                <Col span={1}>
                    <Button icon={<PlusOutlined />} onClick={()=> createCostCenter()}></Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300}} />
                    </div>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={costCenterList} />
            }
        </>
    )
}

CostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    costCenterList: PropTypes.array,
    costCenterLoading: PropTypes.any,
    handleCostCenterList: PropTypes.func,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const costCenterList = selectCostCenterListData(state)
    const costCenterLoading = selectLoadingCostCenterData(state)

    return {authInfo,profileInfo,costCenterList,costCenterLoading}

}

const actions = {
    handleCostCenterList: getCostCenterStartAction,
}

export default connect(mapState, actions) (CostCenterComponent)
