import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
const { TextArea } = Input;
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";

const CreateSamplesComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/vendor")
    }

    return(
        <>
            <TitleWidget title={"Create Samples"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Samples Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    LMID:<br/><Input placeholder={"Samples LMID"}/>
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
                    IsActive: <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"primary"} >Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
            </Row>

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
