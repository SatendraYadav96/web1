import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";
import SelectDivisionComponent from "../../widgets/SelectDivisionComponent";
import SelectUserComponent from "../../widgets/SelectUserComponent";
import SelectMultipleCostCenterComponent from "../../widgets/SelectMultipleCostCenterComponent";
import {selectEditBrandData, selectInsertBrandData} from "../../../redux/selectors/masterSelector";
import {addBrandStartAction, editBrandStartAction} from "../../../redux/actions/master/masterActions";

const BrandTeamComponent = ({authInfo,addBrand,handleAddBrand}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [name, setName] = useState()
    const [active, setActive] = useState();
    const [code, setCode] = useState()
    const [user, setUser] = useState()
    const [team, setTeam] = useState()
    const [costCenter, setCostCenter] = useState()
    const [subTeam, setSubTeam] = useState()

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/brand")
    }

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    }

    const handleSubTeam = (value) => {
        setSubTeam(value)
    }

    const handleUser = (value) => {
        setUser(value)
    }

    const handleCostCenter = (value) => {
        setCostCenter(value)
    }

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    const handleInsertBrand = () => {
        const data = {
            name: name,
            code: code,
            active: active,
            division: {
                id: subTeam
            },
            team: team,
            costCenter: costCenter,
            user: user,
        };
        handleAddBrand({
            certificate: authInfo.token,
            brd: data,
        })
    }

    return(
        <>
            <TitleWidget title={"Brand Team"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Sub Team:<br/><SelectDivisionComponent value={subTeam} onChange={handleSubTeam}/>
                </Col>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Brand Name "} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Code"} value={code} />
                </Col>
                <Col span={8} offset={2}>
                    User :<br/><SelectUserComponent value={user} onChange={handleUser}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Cost Center :<br/><SelectMultipleCostCenterComponent value={costCenter} onChange={handleCostCenter}/>
                </Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={checked} value={active} onChange={handleActiveChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertBrand()} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
        </>
    )

}

BrandTeamComponent.propTypes = {
    authInfo: PropTypes.any,
    addBrand: PropTypes.array,
    handleAddBrand: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const addBrand = selectInsertBrandData(state)
    return {authInfo,addBrand}
}

const actions = {
    handleAddBrand: addBrandStartAction,
}

export default connect(mapState, actions) (BrandTeamComponent)
