import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {userDesignationsinessUnitDropdownStartAction, userDesignationDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectUserDesignation, selectUserDesignationDropdown} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectUserDesignationComponent = ({value, onChange,authInfo,userDesignationDropdown,handleUserDesignationDropDown}) => {

    const [userDesignationId, setBuId] = useState()
    const [userDesignationName, setBuName] = useState()
    const data  = {"id":userDesignationId, "name":userDesignationName}

    useEffect(() => {
        console.log(userDesignationDropdown)
        console.log(data)
        console.log(userDesignationName)

        handleUserDesignationDropDown ({
            certificate: authInfo.token,
            userDesignationDropdown: data
        });
    }, [authInfo.token])


    return <Select placeholder={"Select Team"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {userDesignationDropdown?.map( item => {
            return(<Option key={item.userDesignationId} value={item.userDesignationId}>{item.userDesignationName}</Option>)
        })}
    </Select>
}

SelectUserDesignationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    userDesignationDropdown:PropTypes.array,
    handleUserDesignationDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const userDesignationDropdown = selectUserDesignationDropdown(state)
    return {authInfo,userDesignationDropdown,profileInfo}
}

const actions = {
    handleUserDesignationDropDown : userDesignationDropdownStartAction
}

export default connect(mapState, actions) (SelectUserDesignationComponent)
