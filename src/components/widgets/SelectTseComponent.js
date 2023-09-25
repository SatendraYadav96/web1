import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import {selectTseDropdown, selectTseDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {tseDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";



const SelectTseComponent = ({value, multiple, onChange,authInfo,profileInfo,tseDropdown,tseDropdownLoading,handleTseDropDown}) => {

    const [tseId, setTseId] = useState()
    const [tseName, setTseName] = useState()
    const data  = {"id":tseId, "name":tseName}

    useEffect(() => {
        console.log(tseDropdown)
        console.log(data)
        console.log(tseName)

        handleTseDropDown ({
            certificate: authInfo.token,
            tseDropdown:data

        });
        console.log(tseDropdown)
    }, [authInfo.token])




    return <Select  placeholder={"Select Tse"} value={value} onChange={onChange} style={{width: "100%"}}>
        {tseDropdown?.map( item => {
            return(<Option key={item.userId} value={item.userName}>{item.userName}</Option>)
        })}
    </Select>
}

SelectTseComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    tseDropdown:PropTypes.array,
    tseDropdownLoading:PropTypes.any,
    handleTseDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const tseDropdown = selectTseDropdown(state)
    const tseDropdownLoading = selectTseDropdownLoading(state)
    return {authInfo,tseDropdown,tseDropdownLoading,profileInfo}
}

const actions = {
    handleTseDropDown : tseDropdownStartAction
}

export default connect(mapState, actions) (SelectTseComponent)
