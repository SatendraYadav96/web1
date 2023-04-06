import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";

const CreateCostCenterComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(false);
    const [checkedValue, setCheckedValue] = useState(0)

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    // useEffect(() => {
    //     console.log(checkedValue)
    // },[checkedValue])

    const handleBack = () => {
        return navigate("/home/masters/vendor")
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
                    IsActive: <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                    {/*<Checkbox checked={checked} disabled={disabled} onChange={onChange}>*/}
                    {/*    {label}*/}
                    {/*</Checkbox>*/}
                </Col>
                <Col span={8} offset={2}>
                    Brand:<br/><Select style={{width:'100%'}}></Select>
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
