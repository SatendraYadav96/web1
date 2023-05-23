import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const SelectTypeComponent = ({value, onChange,authInfo}) => {

    // const [teamId, setTypeId] = useState()
    // const [teamName, setTypeName] = useState()
    // const data  = {"id":teamId, "name":teamName}

    // useEffect(() => {
    //
    // }, [authInfo.token])

    return (
        <Select placeholder={"Select Sub Type"} value={value} onSelect={onChange} style={{width: "100%"}}>
            <Option>BU wise final monthly plan approvals</Option>
            <Option>BU Wise Special Dispatches</Option>
            <Option>BU Wise block unblock FF Details</Option>
            <Option>Sample / Input Expired</Option>
            <Option>Value of inputs other that FF and RBM</Option>
            <Option>Sample Near Expiry notifications to BU Head/Marketing Team</Option>
            <Option>Promo Inputs - Near Expiry notifcations to BU Head/Marketing Team</Option>
        </Select>
    )
}

SelectTypeComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (SelectTypeComponent)
