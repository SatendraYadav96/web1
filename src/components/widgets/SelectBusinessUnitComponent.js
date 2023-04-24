import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {businessUnitDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectBuDropdown, selectBuDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectBusinessUnitComponent = ({value, onChange,authInfo,profileInfo,buDropdown,buDropdownLoading,handleBusinessUnitDropDown}) => {

    const [buId, setBuId] = useState()
    const [buName, setBuName] = useState()
    const data  = {"id":buId, "name":buName}

    useEffect(() => {
    console.log(buDropdown)
    console.log(data)
    console.log(buName)

    handleBusinessUnitDropDown ({
        certificate: authInfo.token,
        buDropdown: data
    });
    }, [authInfo.token])


    return <Select placeholder={"Select BU"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {buDropdown?.map( item => {
            return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        })}
    </Select>
}


SelectBusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    buDropdown:PropTypes.array,
    buDropdownLoading:PropTypes.any,
    handleBusinessUnitDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const buDropdownLoading = selectBuDropdownLoading(state)
    return {authInfo,buDropdown,buDropdownLoading,profileInfo}
}

const actions = {
    handleBusinessUnitDropDown : businessUnitDropdownStartAction
}

export default connect(mapState, actions) (SelectBusinessUnitComponent)
