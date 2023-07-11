import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectDivisionDropdown, selectDivisionDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {divisionDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const SelectDivisionComponent = ({value, multiple, onChange,authInfo,divisionDropdown,divisionDropdownLoading,profileInfo,handleDivisionDropDown}) => {

    const [divisionId, setDivisionId] = useState()
    const [divisionName, setDivisionName] = useState()
    const data  = {"id":divisionId, "name":divisionName}

    useEffect(() => {
        console.log(divisionDropdown)
        console.log(data)
        console.log(divisionName)

        handleDivisionDropDown ({
            certificate: authInfo.token,
            divisionDropdown: data
        });
    }, [authInfo.token])

    return <Select mode={multiple} allowClear placeholder={"Select SubTeam"} value={value} onChange={onChange} style={{width: "100%"}}>
        {divisionDropdown?.map( item => {
            return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        })}
    </Select>
}

SelectDivisionComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    divisionDropdown:PropTypes.array,
    divisionDropdownLoading:PropTypes.any,
    handleDivisionDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const divisionDropdownLoading = selectDivisionDropdownLoading(state)
    return {authInfo,divisionDropdown,divisionDropdownLoading,profileInfo}
}

const actions = {
    handleDivisionDropDown : divisionDropdownStartAction
}

export default connect(mapState, actions) (SelectDivisionComponent)
