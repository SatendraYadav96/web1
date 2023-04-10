import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import TextArea from "antd/es/input/TextArea";
import {useNavigate, useParams} from "react-router-dom";
import {selectSamplesByIdData, selectEditSamplesData, selectEditSamplesLoadingData, selectLoadingSamplesByIdData} from "../../../redux/selectors/masterSelector";
import {editSamplesStartAction, getSamplesByIdStartAction} from "../../../redux/actions/master/masterActions";

const EditSamplesComponent = ({
  authInfo,
  profileInfo,
  editSamples,
  editSamplesLoading,
  handleEditSamples,
  samplesById,
  samplesByIdLoading,
  handleSamplesById,
}) => {

  const navigate = useNavigate()

  let { id } = useParams();
  useEffect(() => {
    handleSamplesById({
      certificate: authInfo.token,
      id: id,
    });
  }, [authInfo.token])

  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [active, setActive] = useState();
  const [brand, setBrand] = useState();
  const [description, setDescription] = useState();
  const [packSize, setPackSize] = useState();
  const [capSize, setCapSize] = useState();

  useEffect(() => {
    console.log(samplesById)
    if (samplesById !== undefined) {
      // console.log(samplesById);
      // setName(samplesById.name)
      // setCode(samplesById.code)
      // setActive(samplesById.active)
      // setBrand(samplesById.brand)
      // setDescription(samplesById.description)
      // setPackSize(samplesById.packSize)
      // setCapSize(samplesById.capSize)
    }
  },[samplesById])

  const handleBack = () => {
    return navigate("/home/masters/samples")
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handleActiveChange = (e) => {
    setActive(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePackSizeChange = (e) => {
    setPackSize(e.target.value);
  };

  const handleCapSizeChange = (e) => {
    setCapSize(e.target.value);
  };

  const handleInsertSamples = () => {
    const data = {
      id: id,
      name: name,
      code: code,
      active: active,
    };

    console.log(data);
    console.log(authInfo.token);

    handleEditSamples({
      certificate: authInfo.token,
      vnd: data,
      id: id,
    });
  }

  return(
    <>
      <TitleWidget title={"Edit Samples"}/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          Name:<br/><Input placeholder={"Samples Name"} disabled={true} value={name} onChange={handleNameChange}/>
        </Col>
        <Col span={8} offset={2}>
          LMID:<br/><Input placeholder={"Samples LMID"} value={code} onChange={handleCodeChange} disabled={true}/>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          Brand:<br/><Input placeholder={"Cost Center Brand"} value={brand} onChange={handleBrandChange}/>
          {/*<Select style={{width:'100%'}}></Select>*/}
        </Col>
        <Col span={8} offset={2}>
          Description:<br/><TextArea placeholder={"Samples Description"} value={description} onChange={handleDescriptionChange}/>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          Base Pack:<br/><Input placeholder={"Samples Packsize"} value={packSize} onChange={handlePackSizeChange}/>
          {/*<Input placeholder={"Samples Packsize"}/>*/}
        </Col>
        <Col span={8} offset={2}>
          Cap Size:<br/><Input placeholder={"Samples cap size"} value={capSize} onChange={handleCapSizeChange}/>
          {/*<Input placeholder={"Samples cap size"}/>*/}
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          IsActive: <Checkbox checked={active === 1} value={active} onChange={handleActiveChange}/>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={20}></Col>
        <Col span={2}>
            <Button type={"primary"} onClick={()=>handleInsertSamples()}>Submit</Button>
        </Col>
        <Col span={2}>
            <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
        </Col>
      </Row>
    </>
  )

}

EditSamplesComponent.propTypes = {
  authInfo: PropTypes.any,
  profileInfo: PropTypes.any,
  editSamples: PropTypes.array,
  editSamplesLoading: PropTypes.any,
  handleEditSamples: PropTypes.func,
  samplesByIdLoading: PropTypes.any,
  handleSamplesById: PropTypes.func,
  samplesById: PropTypes.array,
}

const mapState = (state) => {
  const authInfo = selectAuthInfo(state)
  const editSamples = selectEditSamplesData(state);
  const editSamplesLoading = selectEditSamplesLoadingData(state);
  const profileInfo = selectProfileInfo(state);
  const samplesById = selectSamplesByIdData(state);
  const samplesByIdLoading = selectLoadingSamplesByIdData(state);
  return {
    authInfo,
    editSamples,
    editSamplesLoading,
    profileInfo,
    samplesById,
    samplesByIdLoading,
  }
}

const actions = {
  handleEditSamples: editSamplesStartAction,
  handleSamplesById: getSamplesByIdStartAction,
}

export default connect(mapState, actions) (EditSamplesComponent)
