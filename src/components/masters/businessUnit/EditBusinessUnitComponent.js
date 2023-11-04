import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {selectBusinessUnitByIdData, selectCostCenterByIdData, selectEditBuisnessUnitData, selectEditBusinessUnitFailError, selectEditCostCenterData} from "../../../redux/selectors/masterSelector";
import {editBuisnessUnitStartAction, editCostCenterStartAction, getBuisnessUnitByIdStartAction, getCostCenterByIdStartAction} from "../../../redux/actions/master/masterActions";

const EditBusinessUnitComponent = ({authInfo,editBuisnessUnit,buisnessUnitById,handleBusinessUnitById,handleEditBusinessUnit, editBusinessUnitFailError}) => {

    const navigate = useNavigate();
    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [active, setActive] = useState();
    const [checked, setChecked] = useState(true);

    let { id } = useParams();
    useEffect(() => {
        handleBusinessUnitById({
            certificate: authInfo.token,
            id: id,
        });
    }, [authInfo.token])

    useEffect(() => {
        setName(buisnessUnitById.name)
        setCode(buisnessUnitById.code)
        setActive(buisnessUnitById.active)
    },[buisnessUnitById])

    const handleBack = () => {
        return navigate("/home/masters/businessUnit")
    }

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleInsertBusinessUnit = () => {
        const data = {
            name: name,
            code: code,
            active: active,
        };

        handleEditBusinessUnit({
            certificate: authInfo.token,
            bu: data,
        });
    }

    useEffect(()=>{
        console.log(Object.keys(editBusinessUnitFailError).length !== 0)
        if(editBusinessUnitFailError!== undefined && Object.keys(editBusinessUnitFailError).length !== 0){
            message.error(editBusinessUnitFailError.message);
        }
    },[editBusinessUnitFailError])

    return(
        <>
            <TitleWidget title={"Edit Business Unit"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Business Unit Name"} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Business Unit Code"} value={code} onChange={(e) => setCode(e.target.value)}/>
                </Col>
                <Col span={12} offset={2}>
                    IsActive: <Checkbox checked={checked} value={active} onChange={handleActiveChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={22}>
                    <Button type={"primary"} onClick={()=>handleInsertBusinessUnit()}>Submit</Button>
                </Col>
            </Row>
        </>
    )
}

EditBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    editBuisnessUnit: PropTypes.any,
    handleEditBusinessUnit: PropTypes.func,
    buisnessUnitById: PropTypes.any,
    handleBusinessUnitById: PropTypes.func,
    editBusinessUnitFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const editBuisnessUnit = selectEditBuisnessUnitData(state);
    const buisnessUnitById = selectBusinessUnitByIdData(state);
    const editBusinessUnitFailError = selectEditBusinessUnitFailError(state);
    return {authInfo,editBuisnessUnit,buisnessUnitById, editBusinessUnitFailError}
}

const actions = {
    handleEditBusinessUnit: editBuisnessUnitStartAction,
    handleBusinessUnitById: getBuisnessUnitByIdStartAction,
}

export default connect(mapState, actions) (EditBusinessUnitComponent)
