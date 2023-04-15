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
import SelectBrandComponent from "../../widgets/SelectBrandComponent";


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
    const [brandId, setBrandId] = useState();
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        console.log(costCenterById)
        if (costCenterById !== undefined && costCenterById.brandId !== undefined) {
            console.log(costCenterById);
            setName(costCenterById.name)
            setCode(costCenterById.code)
            setActive(costCenterById.active)
            setBrandId(costCenterById.brandId.id)
            console.log(name);
        }
    },[costCenterById])

    const handleBack = () => {
        return navigate("/home/masters/costCenter")
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleActiveChange = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])


    const handleBrandChange = (value) => {
        setBrandId(value);
    };

    const handleInsertCostCenter = () => {
        const data = {
            id: id,
            name: name,
            code: code,
            active: active,
            brandId: {
                id: brandId
            },
        };

        console.log(data);
        console.log(authInfo.token);

        handleEditCostCenter({
            certificate: authInfo.token,
            ccm: data,
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
                    IsActive: <Checkbox checked={checked} value={active} onChange={handleActiveChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Brand: <SelectBrandComponent value={brandId} onChange={handleBrandChange}/>
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

