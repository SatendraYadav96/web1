import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Select, Table} from "antd";

const ItemRevalidationComponent = ({authInfo}) => {

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
            <TitleWidget title="Item Revalidation" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Expiry Date From: <DatePicker></DatePicker>
                </Col>
                <Col span={3}>
                    To: <DatePicker/>
                </Col>
                <Col span={3}>
                    Item <Input style={{width:'150px'}}/>
                </Col>
                <Col span={3}>
                    Status <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} >Search</Button>
                </Col>
                <Col span={9}>
                    <br/>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {/*<Row>*/}
            {/*    <Col span={6} offset={18}>*/}
            {/*        <Input.Search/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<br/><br/>*/}
            <Table columns={column}></Table>
        </>
    )

}

ItemRevalidationComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(ItemRevalidationComponent)
