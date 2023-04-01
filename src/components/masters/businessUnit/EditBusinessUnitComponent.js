import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";

const EditBusinessUnitComponent = ({authInfo}) => {

    return(
        <>
            <TitleWidget title={"Edit Business Unit"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Business Unit Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Business Unit Code"}/>
                </Col>
                <Col span={4}></Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox />
                </Col>
                <Col span={14}></Col>
                <Col span={22}></Col>
                <Col span={2}><Button type={"primary"}>Submit</Button></Col>
            </Row>
        </>
    )

}

EditBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (EditBusinessUnitComponent)
