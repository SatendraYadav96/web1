import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {userDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectUserDropdown} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectUserComponent = ({value, onChange,authInfo,userDropdown,handleUserDropDown}) => {

    const [userId, setBuId] = useState()
    const [userName, setBuName] = useState()
    const data  = {"id":userId, "name":userName}

    useEffect(() => {
        console.log(userDropdown)
        console.log(data)
        console.log(userName)

        handleUserDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])


    return (
        <Select
            mode="multiple"
            allowClear
            placeholder={"Select User"}
            value={value}
            onChange={onChange}
            style={{width: "100%"}}>
            {/*<Option key="all" value="all">ALL</Option>*/}
            {userDropdown?.map( item => {
                return(<Option key={item.userId} value={item.userId}>{item.userName}</Option>)
            })}
        </Select>
    )
}

SelectUserComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    userDropdown:PropTypes.array,
    handleUserDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const userDropdown = selectUserDropdown(state)
    return {authInfo,userDropdown,profileInfo}
}

const actions = {
    handleUserDropDown : userDropdownStartAction
}

export default connect(mapState, actions) (SelectUserComponent)
