import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {editVendorStartAction, getVendorByIdStartAction,} from "../../../redux/actions/master/masterActions";
import {selectEditVendorData, selectEditVendorLoadingData, selectLoadingVendorByIdData, selectVendorByIdData,} from "../../../redux/selectors/masterSelector";
import {useNavigate, useParams} from "react-router-dom";

const EditVendorComponent = ({
  authInfo,
  profileInfo,
  editVendor,
  editVendorLoading,
  handleEditVendor,
  vendorById,
  vendorByIdLoading,
  handleVendorById,
}) => {
      const navigate = useNavigate();

    let { id } = useParams();
    console.log({ id });
    handleVendorById({
        certificate: authInfo.token,
        id: id,
    });
    console.log(vendorById.name)
    console.log(vendorById.addressLine1)


    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [addressLine1, setAddressLine1] = useState();
    const [addressLine2, setAddressLine2] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip, setZip] = useState();
    const [active, setActive] = useState();
    console.log(name);
    console.log(addressLine1);

    useEffect(() => {
        setName(vendorById.name)
        setCode(vendorById.code)
        setAddressLine1(vendorById.addressLine1)
        setAddressLine2(vendorById.addressLine2)
        setCity(vendorById.city)
        setState(vendorById.state)
        setZip(vendorById.zip)
        setActive(vendorById.active)
        console.log(name);
        console.log(addressLine1);
    },[vendorById])

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleAddress1Change = (e) => {
    setAddressLine1(e.target.value);
  };

  const handleAddress2Change = (e) => {
    setAddressLine2(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handleActiveChange = (e) => {
    setActive(e.target.value);
  };

  const handleBack = () => {
    return navigate("/home/masters/vendor");
  };

  const handleInsertVendor = () => {
    const data = {
      name: name,
      code: code,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      zip: zip,
      active: active,
    };
    handleEditVendor({
      certificate: authInfo.token,
      vnd: data,
      id: id,
    });
    console.log(data)

    // searchData();
  };

  return (
    <>
      <TitleWidget title={"Edit Vendor"} />
      <Row gutter={[16, 16]}>
        <Col span={8} offset={2}>
          Name:{" "}
          <Input
            placeholder={"Vendor Name"}
            disabled={true}
            value={name}
            onChange={handleNameChange}
          />
        </Col>
        <Col span={8} offset={2}>
          Code:{" "}
          <Input
            placeholder={"Vendor Code"}
            disabled={true}
            value={code}
            onChange={handleCodeChange}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={8} offset={2}>
          Address 1:{" "}
          <Input.TextArea
            placeholder={"Vendor Address 1"}
            value={addressLine1}
            onChange={handleAddress1Change}
          />
        </Col>
        <Col span={8} offset={2}>
          Address 2:{" "}
          <Input
            placeholder={"Vendor Address 2"}
            value={addressLine2}
            onChange={handleAddress2Change}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={8} offset={2}>
          City:{" "}
          <Input
            placeholder={"Vendor City"}
            value={city}
            onChange={handleCityChange}
          />
        </Col>
        <Col span={8} offset={2}>
          State:{" "}
          <Input
            placeholder={"Vendor State"}
            value={state}
            onChange={handleStateChange}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={8} offset={2}>
          Zip:{" "}
          <Input
            placeholder={"Vendor Zip"}
            value={zip}
            onChange={handleZipChange}
          />
        </Col>
        <Col span={8} offset={2}>
          IsActive: <Checkbox checked={active === 1} onChange={handleActiveChange} />
        </Col>
        <Col span={2}></Col>
        <Col span={22}></Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}></Col>
        <Col span={2}>
          <Button type={"primary"} onClick={() => handleInsertVendor()}>
            Submit
          </Button>
        </Col>
        <Col span={2}>
          <Button type={"default"} onClick={() => handleBack()}>
            Back
          </Button>
        </Col>
      </Row>
    </>
  );
};


EditVendorComponent.propTypes = {
  authInfo: PropTypes.any,
  profileInfo: PropTypes.any,
  editVendor: PropTypes.array,
  editVendorLoading: PropTypes.any,
  handleEditVendor: PropTypes.func,
  vendorByIdLoading: PropTypes.any,
  handleVendorById: PropTypes.func,
  vendorById: PropTypes.array,
};

const mapState = (state) => {
  const authInfo = selectAuthInfo(state);
  const editVendor = selectEditVendorData(state);
  const editVendorLoading = selectEditVendorLoadingData(state);
  const profileInfo = selectProfileInfo(state);
  const vendorById = selectVendorByIdData(state);
  const vendorByIdLoading = selectLoadingVendorByIdData(state);

  return {
    authInfo,
    editVendor,
    editVendorLoading,
    profileInfo,
    vendorById,
    vendorByIdLoading,
  };
};

const actions = {
  handleEditVendor: editVendorStartAction,
  handleVendorById: getVendorByIdStartAction,
};

export default connect(mapState, actions)(EditVendorComponent);
