import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";

const CreateCostCenterComponent = ({authInfo}) => {

    return(
        <>
            <TitleWidget title={"Create Cost Center"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Cost Center Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Cost Center Code"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox />
                </Col>
                <Col span={8}>
                    Brand:<br/><Select style={{width:'100%'}}></Select>
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    <Button type={"primary"}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

CreateCostCenterComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (CreateCostCenterComponent)
