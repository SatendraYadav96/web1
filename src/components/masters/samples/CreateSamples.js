import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
const { TextArea } = Input;
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";

const CreateSamplesComponent = ({authInfo}) => {

    return(
        <>
            <TitleWidget title={"Create Samples"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Samples Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    LMID: <Input placeholder={"Samples LMID"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand: <Select style={{width:'100%'}}></Select>
                </Col>
                <Col span={8} offset={2}>
                    Description: <TextArea placeholder={"Samples Description"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Base Pack: <Input placeholder={"Samples Packsize"}/>
                </Col>
                <Col span={8} offset={2}>
                    Cap Size: <Input placeholder={"Samples cap size"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox />
                </Col>
            </Row>
            <Col span={2}><Button type={"primary"}>Submit</Button></Col>
        </>
    )

}

CreateSamplesComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (CreateSamplesComponent)
