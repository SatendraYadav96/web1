import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {editVendorStartAction, getVendorByIdStartAction} from '../../../redux/actions/master/masterActions';
import {selectEditVendorData, selectEditVendorLoadingData, selectLoadingVendorByIdData, selectVendorByIdData} from "../../../redux/selectors/masterSelector";
import {useNavigate, useParams} from "react-router-dom";

const EditVendorComponent = ({authInfo,profileInfo,editVendor,editVendorLoading,handleEditVendor,vendorById,vendorByIdLoading,handleVendorById}) => {

    const navigate = useNavigate()

    const [uId, setUId] = useState()
    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [addressLine1, setAddressLine1] = useState()
    const [addressLine2, setAddressLine2] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [active, setActive] = useState()


    let {id} = useParams();
    // console.log({id})
    // const data = {id}
    // console.log(data);

    // const searchData = () => {
    // }


    const handleNameChange = (e) => {
         setName(e.target.value)
    }

    const handleCodeChange = (e) => {
       setCode(e.target.value)
    }

    const handleAddress1Change = (e) => {
         setAddressLine1(e.target.value)

    }

    const handleAddress2Change = (e) => {
       setAddressLine2(e.target.value)
    }

    const handleCityChange = (e) => {
         setCity(e.target.value)
    }

    const handleStateChange = (e) => {
       setState(e.target.value)
    }

    const handleZipChange = (e) => {
     setZip(e.target.value)
    }

    const handleActiveChange = (e) => {
       setActive(e.target.value)
    }



    const handleBack = () => {
        return navigate("/home/masters/vendor")
    }

    // const handleInsertVendor = () => {
    //
    //     const data  = {"id":uId,"name":name, "code":code , "addressLine1":addressLine1,"addressLine2":addressLine2,
    //     "city":city,"state":state,"zip":zip,"active":active}
    //     handleEditVendor({
    //         certificate: authInfo.token,
    //         vnd: data,
    //             id: editVendor.id
    //     });
    //     console.log(`vendorById: ${vendorById}`)
    //     console.log(vendorById)
    //     console.log(name);
    //     console.log(code);
    //     console.log(addressLine1);
    //     console.log(addressLine2);
    //     console.log(city);
    //     console.log(state);
    //     console.log(zip);
    //     console.log(active);
    //     console.log(editVendor);
    //     // searchData()
    // }



    useEffect(() => {

        const data1  = {"name":name, "code":code , "addressLine1":addressLine1,"addressLine2":addressLine2,
            "city":city,"state":state,"zip":zip,"active":active}

        handleVendorById({
            certificate: authInfo.token,
            vnd: data1,
            id: editVendor.id
        });

        console.log(`vendorById: ${vendorById}`)
        console.log(vendorById)
    },[]);

    return(
        <>
            <TitleWidget title={"Edit Vendor"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Vendor Name"} disabled={true} value={name} onChange={handleNameChange} />
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Vendor Code"} disabled={true} value={code} onChange={handleCodeChange} />
                </Col>
                <Col span={2}></Col>
                <Col span={8} offset={2}>
                    Address 1: <Input.TextArea placeholder={"Vendor Address 1"} value={addressLine1} onChange={handleAddress1Change} />
                </Col>
                <Col span={8} offset={2}>
                    Address 2: <Input placeholder={"Vendor Address 2"} value={addressLine2} onChange={handleAddress2Change} />
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
                    Zip: <Input placeholder={"Vendor Zip"} value={zip} onChange={handleZipChange} />
                </Col>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox onChange={handleActiveChange} />
                </Col>
                <Col span={2}></Col>
                <Col span={22}></Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={()=>handleInsertVendor()}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
            </Row>
        </>
    )

}



EditVendorComponent.propTypes = {
                    authInfo: PropTypes.any,
                    profileInfo: PropTypes.any,
                    editVendor:PropTypes.array,
                    editVendorLoading:PropTypes.any,
                    handleEditVendor:PropTypes.func,
                    vendorByIdLoading:PropTypes.any,
                    handleVendorById:PropTypes.func,
                    vendorById:PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const editVendor = selectEditVendorData(state)
    const editVendorLoading = selectEditVendorLoadingData(state)
    const profileInfo = selectProfileInfo(state)
    const vendorById = selectVendorByIdData(state)
    const vendorByIdLoading = selectLoadingVendorByIdData(state)

    return {authInfo,editVendor,editVendorLoading,profileInfo,vendorById,vendorByIdLoading}
}

const actions = {
    handleEditVendor: editVendorStartAction,
    handleVendorById: getVendorByIdStartAction,
}

export default connect(mapState, actions) (EditVendorComponent)
