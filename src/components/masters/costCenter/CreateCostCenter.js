import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";

const CreateCostCenterComponent = ({authInfo}) => {

    const [isChecked, setIsChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)

    const handleChange = () => {
        setIsChecked(!isChecked)
        setCheckedValue(isChecked ? 0 : 1)
        console.log(isChecked)
        console.log(checkedValue)
    }

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
                    IsActive: <SelectIsActiveComponent checked={!isChecked} onChange={handleChange}/>
                </Col>
                <Col span={8} offset={2}>
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
