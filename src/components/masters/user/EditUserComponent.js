import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row, Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import {selectEditUserData, selectEditUserFailError, selectUserByIdData} from "../../../redux/selectors/masterSelector";
import {editUserStartAction, getUserByIdStartAction} from "../../../redux/actions/master/masterActions";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import SelectLegalEntityComponent from "../../widgets/SelectLegalEntity";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";
import {delay} from "rxjs";
import SelectUserDesignationComponent from "../../widgets/SelectUserDesignationComponent";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import SelectApproverComponent from "../../widgets/SelectApproverComponent";

const EditUserComponent = ({authInfo,userById,editUser,handleUserById,handleEditUser, editUserFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [user, setUser] = useState(undefined)
    const [name, setName] = useState()
    const [loginName, setLoginName] = useState()
    const [employeeCode, setEmployeeCode] = useState()
   // const [email, setEmail] = useState()
    const [bu, setBU] = useState()
    const [designation, setDesignation] = useState()
    const [userStatus, setUserStatus] = useState()
    const [status, setStatus] = useState()
    const [brand, setBrand] = useState([])
    const [legalEntity, setLegalEntity] = useState([])
    const [app, setApp] = useState()


    let { id } = useParams();

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleApprover = (value) => {
        setApp( value)
    }

    const handleBack = () => {
        return navigate("/home/masters/user")
    }

    useEffect(() => {
        handleUserById({
            certificate: authInfo.token,
            id: id,
            // id: "DC36AC10-609C-4D92-93D4-20CF2B3EF70A",
        })
    },[])

    useEffect(() => {
        userById.brand ?
            data(userById)
            : console.log("no data")
    },[userById])

    const data = (user) => {
        console.log(user.userDesignation.id)
        setLoginName(user.username)
        setName(user.name)
        setEmail(user.email)
        setEmployeeCode(user.employeeCode)
        setDesignation(user.userDesignation.id)
        setStatus(user.userStatus.id)
        setBU(user.appBu.id)
        setLegalEntity(user.legalEntity)
        let brandArray = []
        for (var i of user.brand) {
                // setBrand(prev => {
                //     return [
                //         ...prev,
                //         i.id
                //     ]
                // })
                brandArray.push(i.id);
            }
            setBrand(brandArray)
    }

    // useEffect(() => {
    //     if (Object.keys(userById).length > 0) {
    //         console.log(`data${userById[0]}`)
    //         setUser(userById[0])
    //         // setName(userById[0].name)
    //         // setCode(userById[0].code)
    //     }
    // },[userById])
    //
    // useEffect(() => {
    //     // setBrand([])
    //     if (user === undefined) {
    //         console.log("no data")
    //     }
    //     else {
    //         setLoginName(user.username)
    //         setLegalEntity(user.legalEntity)
    //         setEmployeeCode(user.employeeCode)
    //         setEmail(user.email)
    //         setDesignation(user.userDesignation)
    //         setName(user.name)
    //         setUser(user.userStatus)
    //         setB(user.brand)
    //         console.log(`brand: ${user.brand}`)
    //         let brandArray = []
    //         // let legalEntityArray = []
    //         // setBrand(brands => ({
    //         //     ...brands
    //         //     user.brand.map(item => item.id)
    //         // }))
    //
    //         // for (var j of user.legalEntity) {
    //         //     // setLegalEntity(prev => {
    //         //     //     return [
    //         //     //         ...prev,
    //         //     //         j.id
    //         //     //     ]
    //         //     // })
    //         //     legalEntityArray.push(j.id);
    //         // }
    //         // setLegalEntity(legalEntityArray)
    //     }
    // },[user])
    // for (var i of user.brand) {
    //     // setBrand(prev => {
    //     //     return [
    //     //         ...prev,
    //     //         i.id
    //     //     ]
    //     // })
    //     brandArray.push(i.id);
    // }
    // setBrand(brandArray)

    useEffect(() => {
        if (userStatus === undefined) {}
        else {

        }
    },[userStatus])

    const handleLegalEntity = (value) => {
        setLegalEntity( value)
    }

    const handleDesignation = (value) => {
        setDesignation(value)
    }

    const handleBrand = (value) => {
        setBrand( value)
    }

    const handleInsertUser = () => {
        const data = {
            id: userById.id,
            email: email,
            legalEntity: {
                id: legalEntity.id,
            },
            userDesignation: {
                id: designation
            },
            userStatus: {
                id: status
            },
            approver: email,
            brand: brand,
        }
        handleEditUser({
            certificate: authInfo.token,
            usr: data,
        })
    }

    useEffect(()=>{
        console.log(Object.keys(editUserFailError).length !== 0)
        if(editUserFailError!== undefined && Object.keys(editUserFailError).length !== 0){
            message.error(editUserFailError.message);
        }
    },[editUserFailError])


    //EMAIL ADDRESS VALIDATION

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (event) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        const regex = /.*@unsc.co\.in$/i;
        const isSanofiEmail = regex.test(enteredEmail);
        setIsValidEmail(isSanofiEmail);

        // const regexs = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // const isEmailValid = regexs.test(enteredEmail);
        // setIsValidEmail(isEmailValid);
    };

    return(
        <>
            <TitleWidget title={"Edit User"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Name:<br/><Input placeholder={"Name "} value={name} disabled/>
                </Col>
                <Col span={8} offset={2}>
                    Login Name:<br/><Input placeholder={"Login Name "} value={loginName} disabled/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Code:<br/><Input placeholder={"Employee Code"} value={employeeCode} disabled/>
                </Col>
                <Col span={8} offset={2}>
                    Email Address:<br/><Input placeholder={"Email Address"} value={email} onChange={handleEmailChange}/>
                    {isValidEmail ? null : (
                        <span style={{ color: 'red' }}>Invalid email address</span>
                    )}
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
                    Approver: <br/> <SelectApproverComponent value = {app} onChange={(value) => setApp(value)}/>
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
                    <Button type={"primary"} onClick={() => handleInsertUser()} style={{width: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

EditUserComponent.propTypes = {
    authInfo: PropTypes.any,
    editUserFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const userById = selectUserByIdData(state)
    const editUser = selectEditUserData(state)
    const editUserFailError = selectEditUserFailError(state)
    return {authInfo,userById,editUser, editUserFailError}
}

const actions = {
    handleUserById: getUserByIdStartAction,
    handleEditUser: editUserStartAction,
}

export default connect(mapState, actions) (EditUserComponent)
