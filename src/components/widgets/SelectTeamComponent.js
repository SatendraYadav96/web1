import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectTeamDropdown, selectTeamDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {teamDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const SelectTeamComponent = ({value, onChange,authInfo,teamDropdown,teamDropdownLoading,profileInfo,handleTeamDropDown}) => {

    const [teamId, setTeamId] = useState()
    const [teamName, setTeamName] = useState()
    const data  = {"id":teamId, "name":teamName}

    useEffect(() => {
        console.log(teamDropdown)
        console.log(data)
        console.log(teamName)

        handleTeamDropDown ({
            certificate: authInfo.token,
            teamDropdown: data
        });
    }, [authInfo.token])

    return <Select placeholder={"Select Sub Team"} value={value} onSelect={onChange} style={{width: "100%"}}>
        {teamDropdown?.map( item => {
            return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        })}
    </Select>
}

SelectTeamComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    teamDropdown:PropTypes.array,
    teamDropdownLoading:PropTypes.any,
    handleTeamDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const teamDropdown = selectTeamDropdown(state)
    const teamDropdownLoading = selectTeamDropdownLoading(state)
    return {authInfo,teamDropdown,teamDropdownLoading,profileInfo}
}

const actions = {
    handleTeamDropDown : teamDropdownStartAction
}

export default connect(mapState, actions) (SelectTeamComponent)
