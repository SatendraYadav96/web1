import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row} from "antd";
import {Select} from "antd/es";
import TextArea from "antd/es/input/TextArea";
import {useNavigate, useParams} from "react-router-dom";
import {selectSamplesByIdData, selectEditSamplesData, selectEditSamplesLoadingData, selectLoadingSamplesByIdData, selectEditSamplesFailError} from "../../../redux/selectors/masterSelector";
import {editSamplesStartAction, getSamplesByIdStartAction} from "../../../redux/actions/master/masterActions";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";

const EditSamplesComponent = ({
  authInfo,
  profileInfo,
  editSamples,
  editSamplesLoading,
  handleEditSamples,
  samplesById,
  samplesByIdLoading,
  handleSamplesById,
  editSamplesFailError
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
  const [lmid, setLmid] = useState();
  const [active, setActive] = useState();
  const [brandId, setBrandId] = useState();
  const [description, setDescription] = useState();
  const [packSize, setPackSize] = useState();
  const [capSize, setCapSize] = useState();

  useEffect(() => {
    console.log(samplesById)
    if (samplesById !== undefined && samplesById.brandId !== undefined) {
      console.log(samplesById);
      console.log(samplesById.brandId.id);
      setName(samplesById.name)
      setLmid(samplesById.lmid)
      setActive(samplesById.active)
      setBrandId(samplesById.brandId.id)
      setDescription(samplesById.description)
      setPackSize(samplesById.packSize)
      setCapSize(samplesById.cap)
    }
  },[samplesById])

  const handleBack = () => {
    return navigate("/home/masters/samples")
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLmidChange = (e) => {
    setLmid(e.target.value);
  };
  const handleBrandChange = (value) => {
    setBrandId(value);
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
      lmid: lmid,
      name: name,
      description: description,
      brandId: {
          id: brandId
      },
      packSize: packSize,
      active: active,
      cap: capSize,
    };

    console.log(data);
    console.log(authInfo.token);

    handleEditSamples({
      certificate: authInfo.token,
      smp: data,
      id: id,
    });
  }

    useEffect(()=>{
        console.log(Object.keys(editSamplesFailError).length !== 0)
        if(editSamplesFailError!== undefined && Object.keys(editSamplesFailError).length !== 0){
            message.error(editSamplesFailError.message);
        }
    },[editSamplesFailError])

  return(
    <>
      <TitleWidget title={"Edit Samples"}/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          Name:<br/><Input placeholder={"Samples Name"} disabled={true} value={name} onChange={handleNameChange}/>
        </Col>
        <Col span={8} offset={2}>
          LMID:<br/><Input placeholder={"Samples LMID"} value={lmid} onChange={handleLmidChange} disabled={true}/>
        </Col>
      </Row>
      <br/>
      <Row gutter={[16,16]}>
        <Col span={8} offset={2}>
          Brand:<br/><SelectBrandComponent value={brandId} onChange={handleBrandChange} />
            {/*<Input placeholder={"Cost Center Brand"} value={brandId} onChange={handleBrandChange}/>*/}
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
          <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
        </Col>
        <Col span={2}>
            <Button type={"primary"} onClick={()=>handleInsertSamples()}>Submit</Button>
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
    editSamplesFailError: PropTypes.any
}

const mapState = (state) => {
  const authInfo = selectAuthInfo(state)
  const editSamples = selectEditSamplesData(state);
  const editSamplesLoading = selectEditSamplesLoadingData(state);
  const profileInfo = selectProfileInfo(state);
  const samplesById = selectSamplesByIdData(state);
  const samplesByIdLoading = selectLoadingSamplesByIdData(state);
  const editSamplesFailError = selectEditSamplesFailError(state)
  return {
    authInfo,
    editSamples,
    editSamplesLoading,
    profileInfo,
    samplesById,
    samplesByIdLoading,
      editSamplesFailError
  }
}

const actions = {
  handleEditSamples: editSamplesStartAction,
  handleSamplesById: getSamplesByIdStartAction,
}

export default connect(mapState, actions) (EditSamplesComponent)
