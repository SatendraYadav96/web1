

import React, {useEffect, useState} from "react";

import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Row, Select} from "antd";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import SelectRecipientDesignationComponent from "../../widgets/SelectRecipientDesignationComponent";
import moment from "moment/moment";
import SelectTeamComponent from "../../widgets/SelectTeamComponent";
import SelectRecipientStatusComponent from "../../widgets/SelectRecipientStatusComponent";
import {selectInsertFFData, selectInsertFFFailError} from "../../../redux/selectors/masterSelector";
import {addFFStartAction, getFFByIdStartAction} from "../../../redux/actions/master/masterActions";



const CreateFFComponent = ({authInfo,insertFF,handleAddFF, insertFFFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [role, setRole] = useState()
    const [state, setState] = useState()
    // const [zip, setZip] = useState()
    const [zone, setZone] = useState()
    const [workId, setWorkId] = useState()
    const [gender, setGender] = useState()
    const [jDate, setJDate] = useState()
    // const [number, setNumber] = useState()
    // const [email, setEmail] = useState()
    const [team, setTeam] = useState()
    const [subTeam, setSubTeam] = useState()
    // const [rbmEmail, setRBMEmail] = useState()
    // const [amEmail, setAMEmail] = useState()
    const [headquater, setHeadquater] = useState()
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
    const [remarks, setRemarks] = useState("")
    const [form] = Form.useForm();
    //const [selectedGender, setSelectedGender] = React.useState('');

    const genders = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
]

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setCheckedValue(e.target.checked ? 1 : 0)
    }

    const handleBack = () => {
        return navigate("/home/masters/ffMaster")
    }

    const formatedDateString = moment(jDate).format('yyyy-MM-DD').toString();

    const handleInsertFF = () => {

        const data = {
            name: name,
            code: code,
            address: address,
            city: city,
            state: state,
            zip: zip,
            email: email,
            mobile: number,
            designation: {
                id: role
            },
            headQuarter: headquater,
            zone: zone,
            joiningDate: formatedDateString,
            team: {
                id: team
            },
            recipientStatus: {
                id: status
            },
            gender: gender,
            remarks: remarks,
            workId: workId,
            emailAM: amEmail,
            emailRBM: rbmEmail,
            businessUnit: {
                id: subTeam
            }
        }
        console.log(data)
        handleAddFF({
            certificate: authInfo.token,
            ff: data
        })
    }

    useEffect(()=>{
        console.log(Object.keys(insertFFFailError).length !== 0)
        if(insertFFFailError!== undefined && Object.keys(insertFFFailError).length !== 0){
            message.error(insertFFFailError.message);
        }
    },[insertFFFailError])


    // PIN CODE VALIDATION

    const pinCodeRegex = /^[0-9]{6}$/;


    const [zip, setZip] = useState()
    const [error, setError] = React.useState('');

    const handlePinCodeChange = (event) => {
        const newPinCode = event.target.value;
        setZip(newPinCode);

        if (!pinCodeRegex.test(newPinCode)) {
            setError('Invalid pin code format. Pin code must be 6 digits long.' +
                '' +
                '');
        } else {
            setError('');
        }
    };


    //MOBILE NUMBER VALIDATION
    const mobileNumberRegex = /^[0-9]{10}$/;


    const [number, setNumber] = useState()
    const [errorMobile, setErrorMobile] = React.useState('');

    const handleMobileNumberChange = (event) => {
        const newContact = event.target.value;
        setNumber(newContact);

        if (!mobileNumberRegex.test(newContact)) {
            setErrorMobile('Mobile number must be 10 digits long.' +
                '' +
                '');
        } else {
            setErrorMobile('');
        }
    };


    //EMAIL ADDRESS VALIDATION

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (event) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        const regex = /.*@sanofi\.com$/i;
        const isSanofiEmail = regex.test(enteredEmail);
        setIsValidEmail(isSanofiEmail);

        // const regexs = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // const isEmailValid = regexs.test(enteredEmail);
        // setIsValidEmail(isEmailValid);
    };



    //AM EMAIL ADDRESS VALIDATION


    const [amEmail, setAMEmail] = useState()
    const [isValidEmailAm, setIsValidEmailAm] = useState(true);

    const handleEmailAmChange = (event) => {
        const enteredEmailAm = event.target.value;
        setAMEmail(enteredEmailAm);

        const regex = /.*@sanofi\.com$/i;
        const isSanofiEmailAm = regex.test(enteredEmailAm);
        setIsValidEmailAm(isSanofiEmailAm);

    };

    //RM EMAIL ADDRESS VALIDATION


    const [rbmEmail, setRBMEmail] = useState()

    const [isValidEmailRm, setIsValidEmailRm] = useState(true);

    const handleEmailRmChange = (event) => {
        const enteredEmailRm = event.target.value;
        setRBMEmail(enteredEmailRm);

        const regex = /.*@sanofi\.com$/i;
        const isSanofiEmailRm = regex.test(enteredEmailRm);
        setIsValidEmailRm(isSanofiEmailRm);

    };

    const handleGenderChange = (value) => {
        setGender(value);
    };





    return(
        <>
            <TitleWidget title={"Create FF"}/>

                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Employee Code:
                        <Form.Item
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your code!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <Input placeholder={"Recipient Code"} value={code} onChange={(e) => setCode(e.target.value)}/>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={2}>
                        Employee Name:
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <Input placeholder={"Recipient Name "} value={name} onChange={(e) => setName(e.target.value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Address:<br/><TextArea placeholder={"Recipient Address"} value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Col>
                    <Col span={8} offset={2}>
                        City :<br/><Input placeholder={"City "} value={city} onChange={(e) => setCity(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Role :

                            <SelectRecipientDesignationComponent value={role} onChange={(value) => setRole(value)}/>

                        {/*<Select style={{width: "100%"}} placeholder="Select Designation"></Select>*/}
                    </Col>
                    <Col span={8} offset={2}>
                        State :<br/><Input placeholder={"State "} value={state} onChange={(e) => setState(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Zip :<br/><Input placeholder={"pinCode"} value={zip}  onChange={handlePinCodeChange}/>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </Col>
                    <Col span={8} offset={2}>
                        Zone :<br/><Input placeholder={"Zone "} value={zone} onChange={(e) => setZone(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Employee Workday id :<br/><Input placeholder={"Contact "} value={workId} onChange={(e) => setWorkId(e.target.value)}/>
                    </Col>
                    <Col span={8} offset={2}>
                        Gender :<br/><Select
                        placeholder="Select Gender"
                        value={gender}
                        onChange={handleGenderChange}
                        style={{ width: 200 }}
                    >
                        {genders.map((gender) => (
                            <Select.Option key={gender.value} value={gender.value}>
                                {gender.label}
                            </Select.Option>
                        ))}
                    </Select>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Joining Date :<br/><DatePicker value={moment(jDate)} onChange={(e) => setJDate(e)} format={"DD/MM/YYYY"} style={{width: "100%"}}/>
                    </Col>
                    <Col span={8} offset={2}>
                        Mobile Number :<br/><Input placeholder={"Contact "} value={number}   onChange={handleMobileNumberChange}/>
                        {errorMobile && <div style={{ color: 'red' }}>{errorMobile}</div>}
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Email Address :

                            <Input placeholder="Email Address" value={email} onChange={handleEmailChange}/>
                        {isValidEmail ? null : (
                            <span style={{ color: 'red' }}>Invalid email address</span>
                        )}

                    </Col>
                    <Col span={8} offset={2}>
                        Team :
                            <SelectBusinessUnitComponent value={team} onChange={(value) => setTeam(value)}/>

                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Sub Team :
                            <SelectTeamComponent value={subTeam} onChange={(value) => setSubTeam(value)}/>

                    </Col>
                    <Col span={8} offset={2}>
                        RBM Email :
                            <Input style={{width: "100%"}} placeholder="RM Email" value={rbmEmail} onChange={handleEmailRmChange}/>
                        {isValidEmailRm ? null : (
                            <span style={{ color: 'red' }}>Invalid LM-2 email address</span>
                        )}

                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        AM Email :
                            <Input style={{width: "100%"}} placeholder="AM Email" value={amEmail}  onChange={handleEmailAmChange}></Input>
                        {isValidEmailAm ? null : (
                            <span style={{ color: 'red' }}>Invalid LM-1 email address</span>
                        )}
                    </Col>
                    <Col span={8} offset={2}>
                        Headquater :<br/><Input style={{width: "100%"}} placeholder="Headquater" value={headquater} onChange={(e) => setHeadquater(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Status :<br/>
                        <SelectRecipientStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                    </Col>
                    <Col span={8} offset={2}>
                        Remarks :<br/><TextArea style={{width: "100%"}} placeholder="Remarks" onChange={(value) => setRemarks(value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={16}></Col>
                    <Col span={2}>
                        <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                    </Col>
                    <Col span={2}>

                            <Button type={"primary"} style={{width: "100%"}} htmlType="submit" onClick={() => handleInsertFF()} >Submit</Button>

                    </Col>
                </Row>

        </>
    )

}

CreateFFComponent.propTypes = {
    authInfo: PropTypes.any,
    insertFFFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertFF = selectInsertFFData(state)
    const insertFFFailError = selectInsertFFFailError(state)
    return {authInfo,insertFF, insertFFFailError}
}

const actions = {
    handleAddFF: addFFStartAction,
}

export default connect(mapState, actions) (CreateFFComponent)
