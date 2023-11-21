import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {approverDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectApproverDropdown, selectApproverDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";


const SelectApproverComponent = ({value, multiple, disabled, onChange,authInfo,profileInfo,approverDropdown,approverDropdownLoading,handleApproverDropDown}) => {

    const [appId, setAppId] = useState()
    const [appName, setAppName] = useState()
    const data  = {"id":appId, "name":appName}

    useEffect(() => {
        console.log(approverDropdown)
        console.log(data)
        console.log(appName)

        handleApproverDropDown ({
            certificate: authInfo.token,
            approverDropdown: data
        });
        console.log(approverDropdown)
    }, [authInfo.token])


    return <Select mode={multiple} allowClear placeholder={"Select Approver"} value={value} onChange={onChange} disabled={disabled} style={{width: "100%"}}>
        {approverDropdown?.map( item => {
            return(<Option key={item.userId} value={item.userEmail}>{item.userEmail}</Option>)
        })}
    </Select>
}

SelectApproverComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    approverDropdown:PropTypes.array,
    approverDropdownLoading:PropTypes.any,
    handleApproverDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const approverDropdown = selectApproverDropdown(state)
    const approverDropdownLoading = selectApproverDropdownLoading(state)
    return {authInfo,approverDropdown,approverDropdownLoading,profileInfo}
}

const actions = {
    handleApproverDropDown : approverDropdownStartAction
}

export default connect(mapState, actions) (SelectApproverComponent)
