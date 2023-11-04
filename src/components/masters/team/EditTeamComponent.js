import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row, Select} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate, useParams} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import {editTeamStartAction, getBuisnessUnitByIdStartAction, getTeamByIdStartAction} from "../../../redux/actions/master/masterActions";
import {selectBusinessUnitByIdData, selectEditTeamData, selectEditTeamFailError, selectTeamByIdData} from "../../../redux/selectors/masterSelector";
import {propTypes} from "react-csv/lib/metaProps";
import SelectDivisionComponent from "../../widgets/SelectDivisionComponent";
import SelectLegalEntityComponent from "../../widgets/SelectLegalEntity";

const EditTeamComponent = ({authInfo,teamById,handleTeamById,editTeam,handleEditTeam, editTeamFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1);
    const [team, setTeam] = useState(undefined)
    const [subTeam, setSubTeam] = useState()
    const [name, setName] = useState()
    const [active, setActive] = useState()
    const [code, setCode] = useState()
    const [brand, setBrand] = useState([])
    const [legalEntity, setLegalEntity] = useState([])

    let { id } = useParams();

    useEffect( () => {
        handleTeamById({
            certificate: authInfo.token,
            id: id,
        });
    }, [])

    const handleSubmit = () => {
        console.log(brand)
        console.log(legalEntity)
        const data = {
            id: team.id,
            name: name,
            code: code,
            active: active,
            division: {
                id: subTeam
            },
            brand: brand,
            ety: legalEntity,
        }
        handleEditTeam({
            certificate: authInfo.token,
            tem: data,
        })
    }


    useEffect(() => {
        if (teamById.len !== 0) {
            console.log(teamById[0])
            setTeam(teamById[0])
            // setName(teamById[0].name)
            // setCode(teamById[0].code)
        }
    },[teamById])


    useEffect(() => {
        // setBrand([])
        if (team !== undefined) {
            setName(team.name)
            setCode(team.code)
            setSubTeam(team.division.id)
            let brandArray = []
            let legalEntityArray = []
            // setBrand(brands => ({
            //     ...brands
            //     team.brand.map(item => item.id)
            // }))
            for (var i of team.brand) {
                // setBrand(prev => {
                //     return [
                //         ...prev,
                //         i.id
                //     ]
                // })
                brandArray.push(i.id);
            }
            setBrand(brandArray)
            for (var j of team.ety) {
                // setLegalEntity(prev => {
                //     return [
                //         ...prev,
                //         j.id
                //     ]
                // })
                legalEntityArray.push(j.id);
            }
            setLegalEntity(legalEntityArray)
        }
    },[team])

    const handleBack = () => {
        setName(undefined)
        setCode(undefined)
        setSubTeam(undefined)
        setBrand(undefined)
        setLegalEntity(undefined)
        return navigate("/home/masters/team")
    }

    const handleBrand = (value) => {
        setBrand( value)
    }

    const handleLegalEntity = (value) => {
        setLegalEntity( value)
    }

    useEffect(() => {
        console.log(brand)
    },[brand])

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    useEffect(()=>{
        console.log(Object.keys(editTeamFailError).length !== 0)
        if(editTeamFailError!== undefined && Object.keys(editTeamFailError).length !== 0){
            message.error(editTeamFailError.message);
        }
    },[editTeamFailError])

    return(
        <>
            <TitleWidget title={"Edit Team"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Team:<br/><SelectDivisionComponent value={subTeam}/>
                </Col>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Team Name "} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Code"} value={code} disabled />
                </Col>
                <Col span={8} offset={2}>
                    Brand :
                    <br/>
                    <SelectBrandComponent onChange={handleBrand} value={brand} multiple='multiple'/>
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
                <Col span={2}></Col>
                <Col span={3}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Delete Mapping</Button>
                </Col>
                <Col span={11}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleSubmit()} style={{width: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

EditTeamComponent.propTypes = {
    authInfo: PropTypes.any,
    teamById: PropTypes.any,
    handleTeamById: PropTypes.func,
    editTeam: PropTypes.any,
    handleEditTeam: PropTypes.func,
    editTeamFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const teamById = selectTeamByIdData(state)
    const editTeam = selectEditTeamData(state)
    const editTeamFailError = selectEditTeamFailError(state)
    return {authInfo,teamById,editTeam, editTeamFailError}
}

const actions = {
    handleTeamById: getTeamByIdStartAction,
    handleEditTeam: editTeamStartAction,
}

export default connect(mapState, actions) (EditTeamComponent)
