<<<<<<< HEAD
import React, {useState,useEffect} from "react";
=======
import React, {useEffect, useState} from "react";
>>>>>>> 7ce0bddd6c515dac2b199957f0d540a66b85fbe1
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
<<<<<<< HEAD
//import {useEffect} from "@types/react";
=======
>>>>>>> 7ce0bddd6c515dac2b199957f0d540a66b85fbe1

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
    const [zip, setZip] = useState()
    const [zone, setZone] = useState()
    const [workId, setWorkId] = useState()
    const [gender, setGender] = useState()
    const [jDate, setJDate] = useState()
    const [number, setNumber] = useState()
    const [email, setEmail] = useState()
    const [team, setTeam] = useState()
    const [subTeam, setSubTeam] = useState()
    const [rbmEmail, setRBMEmail] = useState()
    const [amEmail, setAMEmail] = useState()
    const [headquater, setHeadquater] = useState()
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
    const [remarks, setRemarks] = useState("")
    const [form] = Form.useForm();

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

    return(
        <>
            <TitleWidget title={"Create FF"}/>
            <Form onFinish={() => handleInsertFF()} form={form}>
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
                        <Form.Item
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your role!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <SelectRecipientDesignationComponent value={role} onChange={(value) => setRole(value)}/>
                        </Form.Item>
                        {/*<Select style={{width: "100%"}} placeholder="Select Designation"></Select>*/}
                    </Col>
                    <Col span={8} offset={2}>
                        State :<br/><Input placeholder={"State "} value={state} onChange={(e) => setState(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Zip :
                            <InputNumber  placeholder={"Zip"} value={zip} onChange={(e) => setZip(e)} style={{width: '100%'}} maxLength={6}/>
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
                        Gender :<br/><Input placeholder={"Contact "} value={gender} onChange={(e) => setGender(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Joining Date :<br/><DatePicker value={moment(jDate)} onChange={(e) => setJDate(e)} format={"DD/MM/YYYY"} style={{width: "100%"}}/>
                    </Col>
                    <Col span={8} offset={2}>
                        Mobile Number :<br/><Input placeholder={"Contact "} value={number} onChange={(e) => setNumber(e.target.value)}/>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Email Address :
                        <Form.Item
                            name="email"
                            // label="E-mail"
                            rules={[
                                {
                                    pattern: /^[^\s@]+@sanofi\.com$/,
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <Input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={2}>
                        Team :
                        <Form.Item
                            name="team"
                            // label="E-mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your team!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <SelectBusinessUnitComponent value={team} onChange={(value) => setTeam(value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        Sub Team :
                        <Form.Item
                            name="subteam"
                            // label="E-mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your team!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <SelectTeamComponent value={subTeam} onChange={(value) => setSubTeam(value)}/>
                        </Form.Item>
                    </Col>
                    <Col span={8} offset={2}>
                        RBM Email :
                        <Form.Item
                            name="rbmEmail"
                            // label="E-mail"
                            rules={[
                                {
                                    pattern: /^[^\s@]+@sanofi\.com$/,
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <Input style={{width: "100%"}} placeholder="RM Email" value={rbmEmail} onChange={(e) => setRBMEmail(e.target.value)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <br/>
                <Row gutter={[16,16]}>
                    <Col span={8} offset={2}>
                        AM Email :
                        <Form.Item
                            name="amEmail"
                            // label="E-mail"
                            rules={[
                                {
                                    pattern: /^[^\s@]+@sanofi\.com$/,
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                            style={{marginBottom: 0}}
                        >
                            <Input style={{width: "100%"}} placeholder="AM Email" value={amEmail} onChange={(e) => setAMEmail(e.target.value)}></Input>
                        </Form.Item>
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
                        <Form.Item>
                            {/*<Button type={"primary"} onClick={() => handleInsertFF()} style={{width: "100%"}} htmlType="submit">Submit</Button>*/}
                            <Button type={"primary"} style={{width: "100%"}} htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
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
