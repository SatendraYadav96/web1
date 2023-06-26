import React, {useEffect, useState} from "react";
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
import {selectInsertTeamData} from "../../../redux/selectors/masterSelector";
import {addTeamStartAction} from "../../../redux/actions/master/masterActions";
import SelectLegalEntityComponent from "../../widgets/SelectLegalEntity";

const CreateTeamComponent = ({authInfo,insertTeam,handleAddTeam}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [team, setTeam] = useState(undefined)
    const [subTeam, setSubTeam] = useState()
    const [name, setName] = useState()
    const [active, setActive] = useState()
    const [code, setCode] = useState()
    const [brand, setBrand] = useState([])
    const [legalEntity, setLegalEntity] = useState([])

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/team")
    }

    const handleInsertTeam = () => {
        const data = {
            name: name,
            code: code,
            active: active,
            division: {
                id: subTeam
            },
            brand: brand,
            ety: legalEntity,
        }
        handleAddTeam({
            tem: data,
            certificate: authInfo.token,
        })
    }

    const handleBrand = (value) => {
        setBrand( value)
    }

    const handleLegalEntity = (value) => {
        setLegalEntity( value)
    }

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    return(
        <>
            <TitleWidget title={"Create Team"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Division:<br/><SelectBusinessUnitComponent onChange={(value) => setSubTeam(value)}/>
                </Col>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Team Name "} onChange={(e) => setName(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Code"} onChange={(e) => setCode(e.target.value)}/>
                </Col>
                <Col span={8} offset={2}>
                    Brand :<br/><SelectBrandComponent onChange={handleBrand} value={brand} multiple='multiple'/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Legal Entity :<br/>
                    <SelectLegalEntityComponent onChange={handleLegalEntity} value={legalEntity}/>
                </Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={checked} onChange={handleActiveChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertTeam()} style={{width: "100%"}}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
            </Row>
        </>
    )

}

CreateTeamComponent.propTypes = {
    authInfo: PropTypes.any,
    insertTeam: PropTypes.any,
    handleAddTeam: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertTeam = selectInsertTeamData(state)
    return {authInfo,insertTeam}
}

const actions = {
    handleAddTeam: addTeamStartAction,
}

export default connect(mapState, actions) (CreateTeamComponent)
