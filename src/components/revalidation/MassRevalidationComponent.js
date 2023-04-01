import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Select, Table} from "antd";

const MassRevalidationComponent = ({authInfo}) => {

    const column = [
        {
            title:'Name',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Code',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Category',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Medical Code',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'PO No.',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Available Stock',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Expiry Date',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'',
            key: '',
            dataIndex: '',
            width: '150px'
        }
    ]

    return(
        <>
            <TitleWidget title="Mass Revalidation" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Expiry Date <DatePicker></DatePicker>
                </Col>
                <Col span={3}>
                    <DatePicker/>
                </Col>
                <Col span={3}>
                    Item <Input style={{width:'150px'}}/>
                </Col>
                <Col span={3}>
                    Status <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={3}>
                    <Button type={"primary"} >Search</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6} offset={18}>
                    <Input.Search/>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column}></Table>
        </>
    )

}

MassRevalidationComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(MassRevalidationComponent)
