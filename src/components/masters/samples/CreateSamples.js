import React, {useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
const { TextArea } = Input;
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, InputNumber, Row} from "antd";
import {Select} from "antd/es";
import SelectIsActiveComponent from "../../widgets/SelectIsActiveComponent";
import {useNavigate} from "react-router-dom";
import {selectInsertSamplesData, selectInsertSamplesLoadingData} from "../../../redux/selectors/masterSelector";
import {addSamplesStartAction} from "../../../redux/actions/master/masterActions";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";

const CreateSamplesComponent = ({
    authInfo,
    profileInfo,
    insertSamples,
    insertSamplesLoading,
    handleAddSamples,
}) => {

    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState();
    const [lmid, setLmid] = useState();
    const [active, setActive] = useState(0);
    const [brandId, setBrandId] = useState();
    const [description, setDescription] = useState();
    const [packSize, setPackSize] = useState();
    const [capSize, setCapSize] = useState();

    const handleChange = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
        setActive(e.target.checked ? 1 : 0)
    }

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
        setPackSize(e);
    };

    const handleCapSizeChange = (e) => {
        setCapSize(e);
    };

    const handleInsertVendor = () => {
        console.log(name);
        console.log(lmid);
        console.log(brandId);
        console.log(description);
        console.log(packSize);
        console.log(capSize);
        console.log(active);

        const data  = {
            "name":name,
            "lmid":lmid,
            "brandId": {
                id: brandId
            },
            "description":description,
            "packSize":packSize,
            "cap":capSize,
            "active":1,
        }
        handleAddSamples({
            certificate: authInfo.token,
            smp: data,
        });
        // MessageWidget.success();
    }

    return(
        <>
            <TitleWidget title={"Create Samples"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name:<br/><Input placeholder={"Samples Name"} onChange={handleNameChange}/>
                </Col>
                <Col span={8} offset={2}>
                    LMID:<br/><Input placeholder={"Samples LMID"} onChange={handleLmidChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand:<br/><SelectBrandComponent value={brandId} onChange={handleBrandChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Description:<br/><TextArea placeholder={"Samples Description"} onChange={handleDescriptionChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Base Pack:<br/><InputNumber placeholder={"Samples Packsize"} onChange={handlePackSizeChange} style={{width: '100%'}}/>
                </Col>
                <Col span={8} offset={2}>
                    Cap Size:<br/><InputNumber placeholder={"Samples cap size"} onChange={handleCapSizeChange} style={{width: '100%'}}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleInsertVendor()}>Submit</Button>
                </Col>
            </Row>
        </>
    )
}

CreateSamplesComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    insertSamples:PropTypes.array,
    insertSamplesLoading:PropTypes.any,
    handleAddSamples:PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const insertSamples = selectInsertSamplesData(state)
    const insertSamplesLoading = selectInsertSamplesLoadingData(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,insertSamples,insertSamplesLoading,profileInfo}
}

const actions = {
    handleAddSamples: addSamplesStartAction,
}

export default connect(mapState, actions) (CreateSamplesComponent)
