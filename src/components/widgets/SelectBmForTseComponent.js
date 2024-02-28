import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import {bmForTseStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectBmForTse, selectBmForTseLoading} from "../../redux/selectors/dropDownSelector";



const SelectBmForTseComponent = ({value, multiple, onChange,authInfo,profileInfo,handleBmForTse,bmForTse,bmForTseLoading}) => {



    useEffect(() => {

        handleBmForTse({
            certificate:authInfo.token,
            id:profileInfo.id
        })

    },[profileInfo])




    return <Select  placeholder={"Select User"} value={value} onChange={onChange} style={{width: "100%"}}>
        {bmForTse?.map( item => {
            return(<Option key={item.id_USR} value={item.id_USR}>{item.name_USR}</Option>)
        })}
    </Select>
}

SelectBmForTseComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    handleBmForTse:PropTypes.func

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const bmForTse = selectBmForTse(state)
    const bmForTseLoading = selectBmForTseLoading(state)
    console.log(bmForTse)


    return {authInfo,profileInfo,bmForTse,bmForTseLoading}
}

const actions = {
    handleBmForTse : bmForTseStartAction
}

export default connect(mapState, actions) (SelectBmForTseComponent)
