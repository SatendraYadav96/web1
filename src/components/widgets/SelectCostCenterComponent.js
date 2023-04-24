import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectCostCenterDropdown, selectCostCenterDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {costCenterDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const SelectCostCenterComponent = ({value, onChange,authInfo,costCenterDropdown,costCenterDropdownLoading,profileInfo,handleCostCenterDropDown}) => {

    const [costCenterId, setCostCenterId] = useState()
    const [costCenterName, setCostCenterName] = useState()
    const data  = {"id":costCenterId, "name":costCenterName}

    useEffect(() => {
        console.log(costCenterDropdown)
        console.log(data)
        console.log(costCenterName)

        handleCostCenterDropDown ({
            certificate: authInfo.token,
            costCenterDropdown: data
        });
    }, [authInfo.token])

    return <Select placeholder={"Select CostCenter"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {costCenterDropdown?.map( item => {
            return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        })}
    </Select>
}

SelectCostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    costCenterDropdown:PropTypes.array,
    costCenterDropdownLoading:PropTypes.any,
    handleCostCenterDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const costCenterDropdown = selectCostCenterDropdown(state)
    const costCenterDropdownLoading = selectCostCenterDropdownLoading(state)
    return {authInfo,costCenterDropdown,costCenterDropdownLoading,profileInfo}
}

const actions = {
    handleCostCenterDropDown : costCenterDropdownStartAction
}

export default connect(mapState, actions) (SelectCostCenterComponent)
