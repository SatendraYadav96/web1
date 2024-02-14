import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";
import SelectDivisionComponent from "../../widgets/SelectDivisionComponent";
import SelectUserComponent from "../../widgets/SelectUserComponent";
import SelectMultipleCostCenterComponent from "../../widgets/SelectMultipleCostCenterComponent";
import {selectEditBrandData, selectInsertBrandData, selectInsertBrandFailError} from "../../../redux/selectors/masterSelector";
import {addBrandStartAction, editBrandStartAction} from "../../../redux/actions/master/masterActions";
import {selectCostCenterDropdown, selectUserDropdown} from "../../../redux/selectors/dropDownSelector";
import SelectTeamComponent from "../../widgets/SelectTeamComponent";

const BrandTeamComponent = ({authInfo,addBrand,handleAddBrand,costCenterDropdown,userDropdown, insertBrandFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [name, setName] = useState()
    const [active, setActive] = useState();
    const [code, setCode] = useState()
    const [user, setUser] = useState()
    const [team, setTeam] = useState()
    const [costCenter, setCostCenter] = useState()
    const [cc, setCC] = useState()
    const [usr, setUsr] = useState()
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
        // if (value && value.length && value.includes("all")) {
        //     if (value.length === all.length + 1) {
        //         return [];
        //     }
        //     return [...all];
        // }
        // return value;
        setCostCenter(value)
    }

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    useEffect(() => {
        console.log(costCenter)
        if (costCenter?.includes('all')) {
            console.log('has all')
            setCC(costCenterDropdown?.map(item => item.id))
        } else {
            setCC(costCenter)
        }
    },[costCenter])

    useEffect(() => {
        console.log(user)
        if (user?.includes('all')) {
            console.log('has all')
            setUsr(userDropdown?.map(item => item.id))
        } else {
            setUsr(user)
        }
    },[user])

    useEffect(() => {
        console.log(cc)
    },[cc])

    const handleInsertBrand = () => {
        const data = {
            name: name,
            code: code,
            active: 1,
            division: {
                id: subTeam
            },
            costCenter: cc,
            user: user,
            team: team,
        };
        console.log(data)
        handleAddBrand({
            certificate: authInfo.token,
            brd: data,
        })
    }

    useEffect(()=>{
        console.log(Object.keys(insertBrandFailError).length !== 0)
        if(insertBrandFailError!== undefined && Object.keys(insertBrandFailError).length !== 0){
            message.error(insertBrandFailError.message);
        }
    },[insertBrandFailError])

    const handleTeam = (value) => {
        setTeam(value)
    }



    return(
        <>
            <TitleWidget title={"Create Brand"}/>
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
                    Code:<br/><Input placeholder={"Code"} value={code} onChange={(e) => setCode(e.target.value)}/>
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
                    Sub Team :<br/><SelectTeamComponent value={team} onChange={handleTeam}/>
                </Col>


                {/*<Col span={8} offset={2}>*/}
                {/*    Owner :<br/><Select placeholder="Select Owner" style={{width: "100%"}}></Select>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
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

BrandTeamComponent.propTypes = {
    authInfo: PropTypes.any,
    addBrand: PropTypes.array,
    costCenterDropdown: PropTypes.array,
    handleAddBrand: PropTypes.func,
    insertBrandFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const addBrand = selectInsertBrandData(state)
    const costCenterDropdown = selectCostCenterDropdown(state)
    const userDropdown = selectUserDropdown(state)
    const insertBrandFailError = selectInsertBrandFailError(state)
    return {authInfo,addBrand,costCenterDropdown,userDropdown, insertBrandFailError}
}

const actions = {
    handleAddBrand: addBrandStartAction,
}

export default connect(mapState, actions) (BrandTeamComponent)
