import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";

const EditSamplesComponent = ({authInfo}) => {

    return(
        <>
            <TitleWidget title={"Edit Samples"}/>
            <Row gutter={[8,8]}>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Samples Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Samples Code"}/>
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

EditSamplesComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (EditSamplesComponent)
