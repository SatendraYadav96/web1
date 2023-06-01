import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectLegalEntityDropdown, selectLegalEntityDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {legalEntityDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";

const SelectLegalEntityComponent = ({value, onChange,authInfo,legalEntityDropdown,handleLegalEntityDropDown}) => {

    useEffect(() => {
        console.log(legalEntityDropdown)
        handleLegalEntityDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        // <Select placeholder={"Select LegalEntity"} value={value} onSelect={onChange} style={{width: "100%"}}>
        //     {legalEntityDropdown?.map( item => {
        //         return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        //     })}
        // </Select>
        <Select
            mode="multiple"
            allowClear
            style={{
                width: '100%',
            }}
            placeholder="Select LegalEntity"
            onChange={onChange}
            value={value}
        >
            {legalEntityDropdown?.map( item => {
                return(<Option key={item.id} value={item.id}>{item.name}</Option>)
            })}
        </Select>
    )
}

SelectLegalEntityComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    legalEntityDropdown:PropTypes.array,
    legalEntityDropdownLoading:PropTypes.any,
    handleLegalEntityDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const legalEntityDropdown = selectLegalEntityDropdown(state)
    const legalEntityDropdownLoading = selectLegalEntityDropdownLoading(state)
    return {authInfo,legalEntityDropdown,legalEntityDropdownLoading,profileInfo}
}

const actions = {
    handleLegalEntityDropDown : legalEntityDropdownStartAction

}

export default connect(mapState, actions) (SelectLegalEntityComponent)
