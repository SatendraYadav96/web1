import React, {useEffect, useState} from "react";
import {MessageWidget} from "../../../widgets/MessageWidget";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, message, InputNumber} from "antd";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import { addVendorStartAction } from '../../../redux/actions/master/masterActions';
import {selectInsertVendorData, selectInsertVendorFailError, selectInsertVendorLoadingData} from "../../../redux/selectors/masterSelector";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import {showMessageAction} from "../../../redux/actions/global/GlobalActions";
import {isEmpty} from "rxjs";


const CreateVendorComponent = ({authInfo,profileInfo,insertVendor,insertVendorLoading,handleAddVendor, insertVendorFailError}) => {

    const navigate = useNavigate()

    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [checked, setChecked] = useState(true);
    const [active, setActive] = useState();

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    useEffect(() => {
        console.log("success!")
    },[insertVendor])

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCodeChange = (e) => {
       setCode(e.target.value)

    }

    const handleAddress1Change = (e) => {
         setAddress1(e.target.value)

      }

    const handleAddress2Change = (e) => {
       setAddress2(e.target.value)

    }

    const handleCityChange = (e) => {
         setCity(e.target.value)
    }

    const handleStateChange = (e) => {
       setState(e.target.value)
    }

    const handleZipChange = (e) => {
         setZip(e)
    }

    const handleInsertVendor = () => {
        console.log(name);
        console.log(code);
        console.log(address1);
        console.log(address2);
        console.log(city);
        console.log(state);
        console.log(zip);
        console.log(active);
        console.log(insertVendor);

        const data  = {
            "name":name,
            "code":code ,
            "addressLine1":address1,
            "addressLine2":address2,
            "city":city,
            "state":state,
            "zip":zip,
            "active":1,
        }
        handleAddVendor({
            certificate: authInfo.token,
            vnd: data

        });
        // MessageWidget.success();
    }

    const handleBack = () => {
        return navigate("/home/masters/vendor")
    }

    useEffect(()=>{
        console.log(Object.keys(insertVendorFailError).length !== 0)
        if(insertVendorFailError!== undefined && Object.keys(insertVendorFailError).length !== 0){
                message.error(insertVendorFailError.message);
        }
    },[insertVendorFailError])

    return(
        <>
            <TitleWidget title={"Create Vendor"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Vendor Name"} value={name} onChange={handleNameChange} />
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Vendor Code"} value={code} onChange={handleCodeChange} />
                </Col>
                <Col span={2}></Col>
                <Col span={8} offset={2}>
                    Address 1: <Input.TextArea placeholder={"Vendor Address 1"} value={address1} onChange={handleAddress1Change} />
                </Col>
                <Col span={8} offset={2}>
                    Address 2: <Input placeholder={"Vendor Address 2"} value={address2} onChange={handleAddress2Change} />
                </Col>
                <Col span={2}></Col>
                <Col span={8} offset={2}>
                    City: <Input placeholder={"Vendor City"} value={city} onChange={handleCityChange} />
                </Col>
                <Col span={8} offset={2}>
                    State: <Input placeholder={"Vendor State"} value={state} onChange={handleStateChange} />
                </Col>
                <Col span={2}></Col>
                <Col span={8} offset={2}>
                    Zip: <br/><InputNumber  placeholder={"Vendor Zip"} value={zip} onChange={handleZipChange} style={{width: '100%'}}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={()=>handleInsertVendor()}>Submit</Button>
                </Col>
            </Row>


        </>
    )

}

CreateVendorComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    insertVendor:PropTypes.array,
    insertVendorLoading:PropTypes.any,
    handleAddVendor:PropTypes.func,
    insertVendorFailError: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertVendor = selectInsertVendorData(state)
    const insertVendorLoading = selectInsertVendorLoadingData(state)
    const profileInfo = selectProfileInfo(state)
    const insertVendorFailError = selectInsertVendorFailError(state)
    return {authInfo,insertVendor,insertVendorLoading,profileInfo, insertVendorFailError}



}

const actions = {
    handleAddVendor: addVendorStartAction,
}

export default connect(mapState, actions) (CreateVendorComponent)
