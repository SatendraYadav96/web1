import React, {useEffect, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, message, Row} from "antd";
import {Select} from "antd/es";
import {useNavigate, useParams} from "react-router-dom";
import {
    selectCostCenterByIdData,
    selectEditCostCenterData,
    selectEditCostCenterFailError,
    selectEditCostCenterLoadingData,
    selectEditVendorData,
    selectEditVendorLoadingData,
    selectLoadingCostCenterByIdData,
    selectLoadingVendorByIdData,
    selectVendorByIdData
} from "../../../redux/selectors/masterSelector";
import {editCostCenterStartAction, editVendorStartAction, getCostCenterByIdStartAction, getVendorByIdStartAction} from "../../../redux/actions/master/masterActions";
import SelectBrandComponent from "../../widgets/SelectBrandComponent";
import {selectBrandDropdown, selectBrandDropdownLoading} from "../../../redux/selectors/dropDownSelector";
import {brandDropdownStartAction} from "../../../redux/actions/dropDown/dropDownActions";


const EditCostCenterComponent = ({
     authInfo,
     profileInfo,
     editCostCenter,
     editCostCenterLoading,
     handleEditCostCenter,
     costCenterById,
     costCenterByIdLoading,
     handleCostCenterById,
     editCostCenterFailError,

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
    const [active, setActive] = useState(false);
    const [brandId, setBrandId] = useState();
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        console.log(costCenterById.name)
        console.log(costCenterById.code)
        console.log(costCenterById.active)
        console.log(costCenterById.brandId)
        console.log(costCenterById)

        if (costCenterById.brandId !== undefined) {
            let brandArray = []
            console.log(costCenterById);
            setName(costCenterById.name)
            setCode(costCenterById.code)
            setActive(costCenterById.active)
            setBrandId(costCenterById.brandId)
            for (var i of costCenterById.brandId) {
                brandArray.push(i.id);
            }
             setBrandId(brandArray)
            // console.log(name);
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
        setActive(e.target.checked);
    };

    useEffect(() => {
        setActive(checked ? 1 : 0)
    },[checked])

    useEffect(() => {
        console.log(active)
    },[active])

    useEffect(() => {
        console.log(name)
    },[name])


    const handleBrandChange = (value) => {
        setBrandId(value);
    };

    const showData = () => {
        console.log(name)
        console.log(code)
        console.log(active)
        console.log(brandId)
    }

    const handleInsertCostCenter = () => {

            const data = {
                id: id,
                name: name,
                code: code,
                active: active ? 1 : 0,
                brandId: brandId
            };

            console.log(data);
            console.log(authInfo.token);

            handleEditCostCenter({
                certificate: authInfo.token,
                ccm: data,
                // id: id,
            });


    }

    useEffect(()=>{
        console.log(Object.keys(editCostCenterFailError).length !== 0)
        if(editCostCenterFailError!== undefined && Object.keys(editCostCenterFailError).length !== 0){
            message.error(editCostCenterFailError.message);
        }
    },[editCostCenterFailError])



    return(
        <>
            <TitleWidget title={"Edit Cost Center"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Name: <Input placeholder={"Cost Center Name"} value={name} onChange={handleNameChange}/>
                </Col>
                <Col span={8} offset={2}>
                    Code: <Input placeholder={"Cost Center Code"} value={code} onChange={handleCodeChange}/>
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                    Brand: <SelectBrandComponent value={brandId} onChange={handleBrandChange}/>
                </Col>

                <Col span={8} offset={2} style={{ marginTop: '20px' }}>
                    IsActive: <Checkbox checked={active} onChange={handleActiveChange} />
                </Col>
            </Row>
            <br/>
            <Row gutter={[16,16]}>
                <Col span={2}></Col>
                {/*<Col span={3}>*/}
                {/*    <Button type={"default"} onClick={()=>handleBack()} style={{width: "100%"}}>Delete Mapping</Button>*/}
                {/*</Col>*/}
                <Col span={11}></Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={()=>handleInsertCostCenter()}>Submit</Button>
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
    editCostCenterFailError: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const editCostCenter = selectEditCostCenterData(state);
    const editCostCenterLoading = selectEditCostCenterLoadingData(state);
    const profileInfo = selectProfileInfo(state);
    const costCenterById = selectCostCenterByIdData(state);
    const costCenterByIdLoading = selectLoadingCostCenterByIdData(state);
    const editCostCenterFailError = selectEditCostCenterFailError(state);

    return {
        authInfo,
        editCostCenter,
        editCostCenterLoading,
        profileInfo,
        costCenterById,
        costCenterByIdLoading,
        editCostCenterFailError,

    }
}

const actions = {
    handleEditCostCenter: editCostCenterStartAction,
    handleCostCenterById: getCostCenterByIdStartAction,

};

export default connect(mapState, actions) (EditCostCenterComponent)

