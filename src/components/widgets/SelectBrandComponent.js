import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectBrandDropdown, selectBrandDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {brandDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";

const SelectBrandComponent = ({value,multiple, onChange,authInfo,profileInfo,brandDropdown,brandDropdownLoading,handleBrandDropDown}) => {

    useEffect(() => {
        console.log(brandDropdown)
        handleBrandDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        // <Select placeholder={"Select Brand"} value={value} onSelect={onChange} style={{width: "100%"}}>
        //     {brandDropdown?.map( item => {
        //         return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        //     })}
        // </Select>
        <Select
            mode={multiple}
            allowClear
            style={{
                width: '100%',
            }}
            placeholder={"Select Brand"}
            onChange={onChange}
            value={value}
        >
            {brandDropdown?.map( item => {
                return(<Option key={item.id} value={item.id}>{item.name}</Option>)
            })}
        </Select>
    )
}


SelectBrandComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    brandDropdown:PropTypes.array,
    brandDropdownLoading:PropTypes.any,
    handleBrandDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const brandDropdown = selectBrandDropdown(state)
    const brandDropdownLoading = selectBrandDropdownLoading(state)
    return {authInfo,brandDropdown,brandDropdownLoading,profileInfo}
}


const actions = {

    handleBrandDropDown : brandDropdownStartAction

}


export default connect(mapState, actions) (SelectBrandComponent)
