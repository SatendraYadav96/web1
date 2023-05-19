import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";

const CreateTeamComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/team")
    }

    return(
        <>
            <TitleWidget title={"Create Team"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Team:<br/><SelectBusinessUnitComponent/>
                </Col>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Team Name "} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Code"} disabled/>
                </Col>
                <Col span={8} offset={2}>
                    Brand :<br/><SelectBrandComponent/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Legal Entity :<br/><Select style={{width: "100%"}}></Select>
                </Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={checked} ></Checkbox>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertVendor()} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
        </>
    )

}

CreateTeamComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (CreateTeamComponent)
