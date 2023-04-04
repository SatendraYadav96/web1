import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {selectLoadingVendorByIdData, selectLoadingVendorData, selectVendorByIdListData, selectVendorListData} from "../../../redux/selectors/masterSelector";
import {getVendorByIdStartAction, getVendorStartAction} from "../../../redux/actions/master/masterActions";

const SamplesComponent = ({authInfo}) => {
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
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Button icon={<EditOutlined />} onClick={editSamples } ></Button>
                }
            }
        ]);
        setDataSource([
            {
                key: '1',
                name: 'ABC',
                code: ''
            }
        ]);
    }

    const createSamples = () => {
        return navigate("/home/masters/samples/create")
    }

    const editSamples = () => {
        return navigate("/home/masters/samples/edit")
    }

    return(
        <>
            <TitleWidget title={"Master - Samples"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => searchData()}>Search</Button>
                </Col>
                <Col span={1}>
                    <Button icon={<PlusOutlined />} onClick={()=> createSamples()}></Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource} />
            }
        </>
    )
}

SamplesComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)

    return {authInfo,profileInfo}

}

const actions = {



}

export default connect(mapState, actions) (SamplesComponent)

