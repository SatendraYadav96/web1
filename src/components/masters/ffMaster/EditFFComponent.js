import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, message, Row, Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import SelectBusinessUnitComponent from "../../widgets/SelectBusinessUnitComponent";
import {selectEditFFData, selectEditFFFailError, selectFFByIdData} from "../../../redux/selectors/masterSelector";
import {editFFStartAction, getFFByIdStartAction, getFFStartAction} from "../../../redux/actions/master/masterActions";
import SelectRecipientStatusComponent from "../../widgets/SelectRecipientStatusComponent";
import SelectTeamComponent from "../../widgets/SelectTeamComponent";
import moment from "moment";
import SelectRecipientDesignationComponent from "../../widgets/SelectRecipientDesignationComponent";
import SelectStateWiseComponent from "../../widgets/SelectStateWsieComponent";
import SelectZoneWiseComponent from "../../widgets/SelectZoneWiseComponent";

const EditFFComponent = ({authInfo,ffById,editFF,handleFFByIdList,handleEditFF, editFFFailError}) => {

    const navigate = useNavigate()

    const [checked, setChecked] = useState(true);
    const [checkedValue, setCheckedValue] = useState(1)
    const [code, setCode] = useState()
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [role, setRole] = useState()
    const [state, setState] = useState()

    const [zone, setZone] = useState()
    const [workId, setWorkId] = useState()
    const [gender, setGender] = useState()
    const [jDate, setJDate] = useState()


    const [team, setTeam] = useState()
    const [subTeam, setSubTeam] = useState()

    const [headquater, setHeadquater] = useState()
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
   // const [remarks, setRemarks] = useState("")

    let { id } = useParams();

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

    useEffect(() =>{
        handleFFByIdList({
            certificate: authInfo.token,
            id: id,
        })
    },[authInfo])

    useEffect(() => {
        ffById.designation ?
            handleData(ffById) : console.log('no data')
    },[ffById])

    const handleData = (data) => {
        setCode(data.code)
        setName(data.name)
        setAddress(data.address)
        setCity(data.city)
        setRole(data.designation.id)
        setState(data.state)
        setZip(data.zip)
        setZone(data.zone)
        setWorkId(data.workId)
        setGender(data.gender)
        setJDate(data.joiningDate)
        setNumber(data.mobile)
        setEmail(data.email)
        setTeam(data.businessUnit.id)
        setSubTeam(data.team.id)
        setRBMEmail(data.emailRBM)
        setAMEmail(data.emailAM)
        setHeadquater(data.headQuarter)
        setStatus(data.recipientStatus.id)
    }

    const handleInsertFF = () => {

        const data = {
            id: id,
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
                id: subTeam
            },
            recipientStatus: {
                id: status
            },
            gender: gender,
            //remarks: remarks,
            workId: workId,
            emailAM: amEmail,
            emailRBM: rbmEmail,
            businessUnit: {
                id: team
            }
        }
        console.log(data)
        handleEditFF({
            certificate: authInfo.token,
            ff: data
        })
    }

    // const formatedDateString = jDate.format('yyyy-MM-DD').toString();
    const formatedDateString = moment(jDate).format('yyyy-MM-DD').toString();

    // const handleDate = (e) => {
    //     setJDate(e.target.value)
    //     const formatedDateString = jDate.format('yyyy-MM-DD').toString();
    // }

    useEffect(()=>{
        console.log(Object.keys(editFFFailError).length !== 0)
        if(editFFFailError!== undefined && Object.keys(editFFFailError).length !== 0){
            message.error(editFFFailError.message);
        }
    },[editFFFailError])



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
            <TitleWidget title={"Edit FF"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Code:<br/><Input placeholder={"Recipient Code"} value={code} onChange={(e) => setCode(e.target.value)} required/>
                </Col>
                <Col span={8} offset={2}>
                    Employee Name:<br/><Input placeholder={"Recipient Name "} value={name} onChange={(e) => setName(e.target.value)} required/>
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
                    Role :<br/>
                    <SelectRecipientDesignationComponent value={role} onChange={(value) => setRole(value)} required/>
                    {/*<Select style={{width: "100%"}} placeholder="Select Designation"></Select>*/}
                </Col>
                <Col span={8} offset={2}>
                    {/*State :<br/><Input placeholder={"State "} value={state} onChange={(e) => setState(e.target.value)}/>*/}
                    State :<br/><SelectStateWiseComponent  value={state} onChange={(value) => setState(value)}/>
                </Col>
            </Row>
            <br/>


            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Zip :<br/><Input placeholder={"pinCode"} value={zip}  onChange={handlePinCodeChange}/>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </Col>
                <Col span={8} offset={2}>
                    {/*Zone :<br/><Input placeholder={"zone "} value={zone} onChange={(e) => setZone(e.target.value)}/>*/}
                    Zone :<br/><SelectZoneWiseComponent  value={zone} onChange={(value) => setZone(value)}/>

                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Employee Workday id :<br/><Input placeholder={"employee workId "} value={workId} onChange={(e) => setWorkId(e.target.value)}/>
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
                    Joining Date :<br/><DatePicker value={moment(jDate)} onChange={(e) => setJDate(e)} format={"DD/MM/YYYY"} style={{width: "100%"}} required/>
                </Col>
                <Col span={8} offset={2}>
                    Mobile Number :<br/><Input placeholder={"Contact "} value={number}  onChange={handleMobileNumberChange}/>
                    {errorMobile && <div style={{ color: 'red' }}>{errorMobile}</div>}
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Email Address :<br/><Input placeholder={"Email Address"} value={email}  onChange={handleEmailChange}/>
                    {isValidEmail ? null : (
                        <span style={{ color: 'red' }}>Invalid email address</span>
                    )}
                </Col>
                <Col span={8} offset={2}>
                    Team :<br/>
                    <SelectBusinessUnitComponent value={team} onChange={(value) => setTeam(value)}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Sub Team :<br/>
                    <SelectTeamComponent value={subTeam} onChange={(value) => setSubTeam(value)}/>
                </Col>
                <Col span={8} offset={2}>
                    RBM Email :<br/><Input style={{width: "100%"}} placeholder={"RM Email"} value={rbmEmail} onChange={handleEmailRmChange}/>
                    {isValidEmailRm ? null : (
                        <span style={{ color: 'red' }}>Invalid LM-2 email address</span>
                    )}
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    AM Email :<br/><Input style={{width: "100%"}} placeholder="AM Email" value={amEmail} onChange={handleEmailAmChange}></Input>
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
                {/*<Col span={8} offset={2}>*/}
                {/*    Remarks :<br/><TextArea style={{width: "100%"}} placeholder="Remarks" onChange={(value) => setRemarks(value)}/>*/}
                {/*</Col>*/}
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={16}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertFF()} style={{width: "100%"}}>Submit</Button>
                </Col>
            </Row>
        </>
    )

}

EditFFComponent.propTypes = {
    authInfo: PropTypes.any,
    ffById: PropTypes.array,
    editFF: PropTypes.array,
    handleFFByIdList: PropTypes.func,
    handleEditFF: PropTypes.func,
    editFFFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const ffById = selectFFByIdData(state)
    const editFF = selectEditFFData(state)
    const editFFFailError = selectEditFFFailError(state)
    return {authInfo,ffById,editFF, editFFFailError}
}

const actions = {
    handleFFByIdList: getFFByIdStartAction,
    handleEditFF: editFFStartAction,
}

export default connect(mapState, actions) (EditFFComponent)
