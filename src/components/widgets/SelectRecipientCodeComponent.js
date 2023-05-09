import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {recipientDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectRecipientDropdown, selectRecipientDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectRecipientComponent = ({value, onChange,authInfo,profileInfo,recipientDropdown,recipientDropdownLoading,handleRecipientDropDown}) => {

    const [recipientId, setRecipientId] = useState()
    const [recipientName, setRecipientName] = useState()
    const data  = {"id":recipientId, "name":recipientName}

    useEffect(() => {
        console.log(recipientDropdown)
        console.log(data)
        console.log(recipientName)

        handleRecipientDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])


    return <Select placeholder={"Select Recipient Code"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {recipientDropdown?.map( item => {
            return(<Option key={item.recipientId} value={item.recipientId}>{item.recipientCode}</Option>)
        })}
    </Select>
}

SelectRecipientComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    recipientDropdown:PropTypes.array,
    recipientDropdownLoading:PropTypes.any,
    handleRecipientDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const recipientDropdown = selectRecipientDropdown(state)
    const recipientDropdownLoading = selectRecipientDropdownLoading(state)
    return {authInfo,recipientDropdown,recipientDropdownLoading,profileInfo}
}

const actions = {
    handleRecipientDropDown : recipientDropdownStartAction
}

export default connect(mapState, actions) (SelectRecipientComponent)
