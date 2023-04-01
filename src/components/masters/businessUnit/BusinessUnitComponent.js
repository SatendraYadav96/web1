import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const BusinessUnitComponent = ({authInfo}) => {

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
                    return <Button icon={<EditOutlined />} onClick={() => editBusinessUnit()}></Button>
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

    const editBusinessUnit = () => {
        return navigate("/home/masters/businessUnit/edit")
    }

    return(
        <>
            <TitleWidget title={"Master - Business Units"}/>
            <Row gutter={[8,8]}>
                <Col span={4}>
                    <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
                    <Button type={"primary"} onClick={() => searchData()}>Search</Button>
                </Col>
                <Col span={14}></Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createBusinessUnit()}></Button>
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

BusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (BusinessUnitComponent)
