import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row, Select} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import {selectInsertUserData, selectInsertUserFailError} from "../../../redux/selectors/masterSelector";
import {addBuisnessUnitStartAction, addUserStartAction} from "../../../redux/actions/master/masterActions";
import SelectUserDesignationComponent from "../../widgets/SelectUserDesignationComponent";
import SelectLegalEntityComponent from "../../widgets/SelectLegalEntity";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";
import SelectApproverComponent from "../../widgets/SelectApproverComponent";


const CreateUserComponent = ({authInfo,insertUser,handleAddUser, insertUserFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [name, setName] = useState()
    const [loginName, setLoginName] = useState()
    const [employeeCode, setEmployeeCode] = useState()
    const [email, setEmail] = useState()
    const [bu, setBU] = useState()
    const [app, setApp] = useState()
    const [designation, setDesignation] = useState()
    const [userStatus, setUserStatus] = useState()
    const [status, setStatus] = useState()
    const [brand, setBrand] = useState([])
    const [legalEntity, setLegalEntity] = useState([])

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/user")
    }

    const handleDesignation = (value) => {
        setDesignation(value)
    }

    const handleBrand = (value) => {
        setBrand( value)
    }


    const handleApprover = (value) => {
        setApp( value)
    }
    const handleLegalEntity = (value) => {
        setLegalEntity( value)
    }

    const handleInsertUser = () => {
        const data = {
            name: name,
            username: loginName,
            employeeCode: employeeCode,
            email: email,
            approver: email,
            userDesignation: {
                id: designation
            },
            userStatus: {
                id: status
            },
            legalEntity: {
                id: legalEntity[0],
            },
            appBu: {
                id: bu
            },
            brand: brand,
        }
        handleAddUser({
            certificate: authInfo.token,
            usr: data,
        })
    }

    useEffect(()=>{
        console.log(Object.keys(insertUserFailError).length !== 0)
        if(insertUserFailError!== undefined && Object.keys(insertUserFailError).length !== 0){
            message.error(insertUserFailError.message);
        }
    },[insertUserFailError])

    return(
        <>
            <TitleWidget title={"Create User"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Name "} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col span={8} offset={2}>
                    Login Name:<br/><Input placeholder={"Login Name "} value={loginName} onChange={(e) => setLoginName(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Code:<br/><Input placeholder={"Employee Code"} value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)}/>
                </Col>
                <Col span={8} offset={2}>
                    Email Address:<br/><Input placeholder={"Email Address"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Designation: <br/><SelectUserDesignationComponent value={designation} onChange={handleDesignation}/>
                </Col>
                <Col span={8} offset={2}>
                    Legal Entity :<br/><SelectLegalEntityComponent onChange={handleLegalEntity} value={legalEntity.id}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand :<br/><SelectBrandComponent onChange={handleBrand} value={brand} multiple='multiple'/>
                </Col>
                <Col span={8} offset={2}>
                    Approving Team :<br/><SelectBusinessUnitComponent value={bu} onChange={(value) => setBU(value)} disabled/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Status :<br/><SelectUserStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={8} offset={2}>
                    {/*Approver: <br/><Input placeholder={"Approver Email"} value={email} onChange={(e) => setEmail(e.target.value)} />*/}
                    Approver: <br/> <SelectApproverComponent value = {app} onChange={(value) => setApp(value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertUser()} style={{width: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

CreateUserComponent.propTypes = {
    authInfo: PropTypes.any,
    insertUserFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertUser = selectInsertUserData(state)
    const insertUserFailError = selectInsertUserFailError(state)
    return {authInfo, insertUserFailError, insertUser}
}

const actions = {
    handleAddUser: addUserStartAction,
}

export default connect(mapState, actions) (CreateUserComponent)
