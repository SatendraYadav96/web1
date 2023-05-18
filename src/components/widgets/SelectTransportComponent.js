import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {transportDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectTransportDropdown, selectTransportDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectTransportComponent = ({value, onChange,authInfo,profileInfo,transportDropdown,transportDropdownLoading,handleTransportDropdown}) => {

    const [transportId, setTransportId] = useState()
    const [transportName, setTransportName] = useState()
    const data  = {"id":transportId, "name":transportName}

    useEffect(() => {
        handleTransportDropdown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    useEffect(() => {
        console.log(transportDropdown)
    }, [transportDropdown])

    return (
        <Select
            showSearch
            placeholder="Select Transport"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={value}
            onSelect={onChange}
            style={{width: "100%"}}
        >
            {transportDropdown?.map( item => {
                return(<Option key={item.transporterId} value={item.transporterId} label={item.transporterName.toString()} >{item.transporterName}</Option>)
            })}
        </Select>
    )
}

SelectTransportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    transportDropdown:PropTypes.array,
    transportDropdownLoading:PropTypes.any,
    handleTransportDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const transportDropdown = selectTransportDropdown(state)
    const transportDropdownLoading = selectTransportDropdownLoading(state)
    return {authInfo,transportDropdown,transportDropdownLoading,profileInfo}
}

const actions = {
    handleTransportDropdown : transportDropdownStartAction
}

export default connect(mapState, actions) (SelectTransportComponent)
