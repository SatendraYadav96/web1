import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './widgets.less'
import {getLOVStartAction} from "../redux/actions/widget/widgetActions";
import {selectAuthInfo} from "../redux/selectors/authSelectors";
import {selectLovs} from "../redux/selectors/widgetSelectors";
import {Select} from "antd";

const LOVComponent = ({ type, handleLoadLOVs, authInfo, lovs, selectLOV, deselectLOV }) => {
    const { Option } = Select
    useEffect(() => {
        handleLoadLOVs({
            certificate: authInfo.token,
            type: type
        })
    }, [type])

    return <Select loading={lovs[type] === undefined} allowClear
                   style={{width: '100%'}} onSelect={selectLOV} onDeselect={deselectLOV}>
        {lovs[type]!== undefined && lovs[type].map(lov => <Option key={lov.id}>{lov.name}</Option>)}
    </Select>
}
LOVComponent.propTypes = {
    authInfo: PropTypes.any,
    handleLoadLOVs: PropTypes.func,
    lovs: PropTypes.any,
    selectLOV: PropTypes.func,
    deselectLOV: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const lovs = selectLovs(state)
    return { authInfo, lovs }
}

const actions = {
    handleLoadLOVs: getLOVStartAction
}

export default connect(mapState, actions)(LOVComponent)
