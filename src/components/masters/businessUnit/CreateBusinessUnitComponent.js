import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";

const CreateBusinessUnitComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/businessUnit")
    }

    return(
        <>
            <TitleWidget title={"Create Business Unit"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Business Unit Name"}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Business Unit Code"}/>
                </Col>
                <Col span={4}></Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                </Col>
                <Col span={14}></Col>
                <Col span={22}></Col>
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

CreateBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (CreateBusinessUnitComponent)
