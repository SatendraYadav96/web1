import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import TextArea from "antd/es/input/TextArea";

const EditSamplesComponent = ({authInfo}) => {

    return(
        <>
            <TitleWidget title={"Edit Samples"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Samples Name"} disabled={true}/>
                </Col>
                <Col span={8} offset={2}>
                    LMID:<br/><Input placeholder={"Samples LMID"} disabled={true}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand:<br/><Select style={{width:'100%'}}></Select>
                </Col>
                <Col span={8} offset={2}>
                    Description:<br/><TextArea placeholder={"Samples Description"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Base Pack:<br/><Input placeholder={"Samples Packsize"}/>
                </Col>
                <Col span={8} offset={2}>
                    Cap Size:<br/><Input placeholder={"Samples cap size"}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    <Button type={"primary"}>Submit</Button>
                </Col>
            </Row>
            {/*<Row gutter={[8,8]}>*/}
            {/*    <Col span={8} offset={2}>*/}
            {/*        Name:<br/><Input placeholder={"Samples Name"}/>*/}
            {/*    </Col>*/}
            {/*    <Col span={8} offset={2}>*/}
            {/*        Code:<br/><Input placeholder={"Samples Code"}/>*/}
            {/*    </Col>*/}
            {/*    <Col span={4}></Col>*/}
            {/*    <Col span={8} offset={2}>*/}
            {/*        IsActive: <Checkbox />*/}
            {/*    </Col>*/}
            {/*    <Col span={14}></Col>*/}
            {/*    <Col span={22}></Col>*/}
            {/*    <Col span={2}><Button type={"primary"}>Submit</Button></Col>*/}
            {/*</Row>*/}
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
