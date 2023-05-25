import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import {selectInsertBuisnessUnitData, selectInsertCostCenterData} from "../../../redux/selectors/masterSelector";
import {propTypes} from "react-csv/lib/metaProps";
import {addBuisnessUnitStartAction, addCostCenterStartAction} from "../../../redux/actions/master/masterActions";

const CreateBusinessUnitComponent = ({authInfo,insertBuisnessUnit,handleAddBuisnessUnit}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [active, setActive] = useState(1)
    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [ciName, setCiName] = useState();

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setActive(e.target.checked ? 1 : 0)
    }

    useEffect(() => {
        console.log(active)
    },[active])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }

    const handleBack = () => {
        return navigate("/home/masters/businessUnit")
    }

    const handleInsertCostCenter = () => {

        const data  = {
            "name":name,
            "code":code ,
            "active": active,
        }
        handleAddBuisnessUnit({
            certificate: authInfo.token,
            bu: data

        });
        // MessageWidget.success();
    }

    return(
        <>
            <TitleWidget title={"Create Business Unit"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Business Unit Name"} onChange={handleNameChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Business Unit Code"} onChange={handleCodeChange}/>
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertCostCenter()}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
            </Row>
        </>
    )
}

CreateBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    insertBuisnessUnit: PropTypes.any,
    handleAddBuisnessUnit: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertBuisnessUnit = selectInsertBuisnessUnitData(state)
    return {authInfo,insertBuisnessUnit}
}

const actions = {
    handleAddBuisnessUnit: addBuisnessUnitStartAction,
}

export default connect(mapState, actions) (CreateBusinessUnitComponent)
