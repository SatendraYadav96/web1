import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row} from "antd";
import {Select} from "antd/es";
import {useNavigate, useParams} from "react-router-dom";
import {selectCostCenterByIdData, selectEditCostCenterData, selectEditCostCenterLoadingData, selectEditVendorData, selectEditVendorLoadingData, selectLoadingCostCenterByIdData, selectLoadingVendorByIdData, selectVendorByIdData} from "../../../redux/selectors/masterSelector";
import {editCostCenterStartAction, editVendorStartAction, getCostCenterByIdStartAction, getVendorByIdStartAction} from "../../../redux/actions/master/masterActions";


const EditCostCenterComponent = ({
     authInfo,
     profileInfo,
     editCostCenter,
     editCostCenterLoading,
     handleEditCostCenter,
     costCenterById,
     costCenterByIdLoading,
     handleCostCenterById,
}) => {
    const navigate = useNavigate()

    let { id } = useParams();
    useEffect(() => {
        handleCostCenterById({
            certificate: authInfo.token,
            id: id,
        });
    }, [authInfo.token])

    const [name, setName] = useState();
    const [code, setCode] = useState();
    const [active, setActive] = useState();
    const [brand, setBrand] = useState();

    useEffect(() => {
        console.log(costCenterById)
        if (costCenterById !== undefined) {
            console.log(costCenterById);
            setName(costCenterById.name)
            setCode(costCenterById.code)
            setActive(costCenterById.active)
            setBrand(costCenterById.brand)
            console.log(name);
        }
    },[costCenterById])

    const handleBack = () => {
        return navigate("/home/masters/vendor")
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleActiveChange = (e) => {
        setActive(e.target.value);
    };

    const handleBrandChange = (e) => {
        setBrand(e.target.value);
    };

    const handleInsertCostCenter = () => {
        const data = {
            id: id,
            name: name,
            code: code,
            active: active,
        };

        console.log(data);
        console.log(authInfo.token);

        handleEditCostCenter({
            certificate: authInfo.token,
            vnd: data,
            id: id,
        });
    }

    return(
        <>
            <TitleWidget title={"Edit Cost Center"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Cost Center Name"} value={name} onChange={handleNameChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Cost Center Code"} value={code} disabled={true} onChange={handleCodeChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    IsActive: <Checkbox checked={active === 1} value={active} onChange={handleActiveChange}/>
                </Col>
                <Col span={8} offset={2}>

                    Brand:
                    <Input placeholder={"Cost Center Brand"} value={brand} onChange={handleBrandChange}/>
                    {/*<br/><Select style={{width:'100%'}}></Select>*/}
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={20}></Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={()=>handleInsertCostCenter()}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
            </Row>
        </>
    )
}

EditCostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    editCostCenter: PropTypes.array,
    editCostCenterLoading: PropTypes.any,
    handleEditCostCenter: PropTypes.func,
    costCenterByIdLoading: PropTypes.any,
    handleCostCenterById: PropTypes.func,
    costCenterById: PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const editCostCenter = selectEditCostCenterData(state);
    const editCostCenterLoading = selectEditCostCenterLoadingData(state);
    const profileInfo = selectProfileInfo(state);
    const costCenterById = selectCostCenterByIdData(state);
    const costCenterByIdLoading = selectLoadingCostCenterByIdData(state);
    return {
        authInfo,
        editCostCenter,
        editCostCenterLoading,
        profileInfo,
        costCenterById,
        costCenterByIdLoading,
    }
}

const actions = {
    handleEditCostCenter: editCostCenterStartAction,
    handleCostCenterById: getCostCenterByIdStartAction,
};

export default connect(mapState, actions) (EditCostCenterComponent)

