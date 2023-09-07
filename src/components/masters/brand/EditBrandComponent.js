import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import {selectBrandByIdData, selectEditBrandData, selectEditUserData, selectUserByIdData} from "../../../redux/selectors/masterSelector";
import {editBrandStartAction, editUserStartAction, getBrandByIdStartAction, getUserByIdStartAction} from "../../../redux/actions/master/masterActions";
import SelectUserComponent from "../../widgets/SelectUserComponent";
import SelectCostCenterComponent from "../../widgets/SelectCostCenterComponent";
import SelectDivisionComponent from "../../widgets/SelectDivisionComponent";
import SelectMultipleCostCenterComponent from "../../widgets/SelectMultipleCostCenterComponent";

const EditBrandComponent = ({authInfo,brandById,editBrand,handleBrandById,handleEditBrand}) => {

    let { id } = useParams();
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
    const [status, setStatus] = useState()

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

    useEffect(() => {
       handleBrandById({
           certificate: authInfo.token,
           id: id,
       })
    },[])

    useEffect(() => {
        brandById.user ?
            data(brandById)
            : console.log("no data")
    },[brandById])

    const data = (brand) => {
        setName(brand.name)
        setCode(brand.code)
        setSubTeam(brand.division.id)
        // setUser(brand.user)
        let teamArray = []
        let userArray = []
        let costCenterArray = []
        for (var i of brand.user) {
            // setBrand(prev => {
            //     return [
            //         ...prev,
            //         i.id
            //     ]
            // })
            userArray.push(i.id);
        }
        setUser(userArray)
        for (var j of brand.team) {
            // setBrand(prev => {
            //     return [
            //         ...prev,
            //         i.id
            //     ]
            // })
            teamArray.push(j.id);
        }
        setTeam(teamArray)
        for (var k of brand.costCenter) {
            // setBrand(prev => {
            //     return [
            //         ...prev,
            //         i.id
            //     ]
            // })
            costCenterArray.push(k.id);
        }
        setCostCenter(costCenterArray)
    }

    const handleInsertBrand = () => {
        const data = {
            id: id,
            name: name,
            code: code,
            active: active,
            division: {id: subTeam},
            team: team,
            costCenter: costCenter,
            user: user,
        };

        console.log(data);
        console.log(authInfo.token);

        handleEditBrand({
            certificate: authInfo.token,
            brd: data,
        });
    }

    return(
        <>
            <TitleWidget title={"Edit Brand"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Team:<br/><SelectDivisionComponent value={subTeam} onChange={handleSubTeam}/>
                </Col>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Brand Name "} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Code:<br/><Input placeholder={"Code"} value={code} disabled/>
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
                <Col span={2}></Col>
                <Col span={3}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Delete Mapping</Button>
                </Col>
                <Col span={11}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertBrand()} style={{width: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </>
    )
}

EditBrandComponent.propTypes = {
    authInfo: PropTypes.any,
    brandById: PropTypes.array,
    editBrand: PropTypes.array,
    handleBrandById: PropTypes.func,
    handleEditBrand: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const brandById = selectBrandByIdData(state)
    const editBrand = selectEditBrandData(state)
    return {authInfo,brandById,editBrand}
}

const actions = {
    handleBrandById: getBrandByIdStartAction,
    handleEditBrand: editBrandStartAction,
}

export default connect(mapState, actions) (EditBrandComponent)
