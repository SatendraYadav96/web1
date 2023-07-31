import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {useNavigate} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import {selectInsertCostCenterData, selectInsertCostCenterLoadingData} from "../../../redux/selectors/masterSelector";
import {addCostCenterStartAction} from "../../../redux/actions/master/masterActions";

const CreateCostCenterComponent = ({authInfo,profileInfo,insertCostCenter,insertCostCenterLoading,handleAddCostCenter}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(false);
    const [active, setActive] = useState(0)
    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [brandId, setBrandId] = useState();

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setActive(e.target.checked ? 1 : 0)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }

    const handleBrandChange = (value) => {
        setBrandId(value)
    };

    const handleBack = () => {
        return navigate("/home/masters/costCenter")
    }

    const handleInsertCostCenter = () => {
        console.log(name);
        console.log(code);
        console.log(active);
        console.log(insertCostCenter);

        const data  = {
            "name":name,
            "code":code ,
            "active": 1,
            "brandId": brandId,
        }
        handleAddCostCenter({
            certificate: authInfo.token,
            ccm: data

        });
        // MessageWidget.success();
    }

    return(
        <>
            <TitleWidget title={"Create Cost Center"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Cost Center Name"} onChange={handleNameChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Cost Center Code"} onChange={handleCodeChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand:<br/><SelectBrandComponent value={brandId} onChange={handleBrandChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertCostCenter()}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

CreateCostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    insertCostCenter: PropTypes.array,
    insertCostCenterLoading: PropTypes.any,
    handleAddCostCenter: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertCostCenter = selectInsertCostCenterData(state)
    const insertCostCenterLoading = selectInsertCostCenterLoadingData(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,insertCostCenter,insertCostCenterLoading,profileInfo}
}

const actions = {
    handleAddCostCenter: addCostCenterStartAction,
}

export default connect(mapState, actions) (CreateCostCenterComponent)
