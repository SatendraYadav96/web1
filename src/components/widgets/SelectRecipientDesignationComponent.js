import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {recipientDesignationsinessUnitDropdownStartAction, recipientDesignationDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectRecipientDesignation, selectRecipientDesignationDropdown} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectRecipientDesignationComponent = ({value, onChange,authInfo,recipientDesignationDropdown,handleRecipientDesignationDropDown}) => {

    const [recipientDesignationId, setBuId] = useState()
    const [recipientDesignationName, setBuName] = useState()
    const data  = {"id":recipientDesignationId, "name":recipientDesignationName}

    useEffect(() => {
        console.log(recipientDesignationDropdown)
        console.log(data)
        console.log(recipientDesignationName)

        handleRecipientDesignationDropDown ({
            certificate: authInfo.token,
            recipientDesignationDropdown: data
        });
    }, [authInfo.token])


    return <Select placeholder={"Select Team"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {recipientDesignationDropdown?.map( item => {
            return(<Option key={item.recipientDesignationId} value={item.recipientDesignationId}>{item.recipientDesignationName}</Option>)
        })}
    </Select>
}

SelectRecipientDesignationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    recipientDesignationDropdown:PropTypes.array,
    handleRecipientDesignationDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const recipientDesignationDropdown = selectRecipientDesignationDropdown(state)
    return {authInfo,recipientDesignationDropdown,profileInfo}
}

const actions = {
    handleRecipientDesignationDropDown : recipientDesignationDropdownStartAction
}

export default connect(mapState, actions) (SelectRecipientDesignationComponent)
