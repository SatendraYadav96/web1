import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import TitleWidget from "../../widgets/TitleWidget";
import {Row, Table} from "antd";

const ChangeAllocationComponent = ({authInfo, profileInfo}) => {

    const columns = [
        {
            title: 'Zone',
            dataIndex: '',
            key: ''
        },
        {
            title: 'State',
            dataIndex: '',
            key: ''
        },
        {
            title: 'Designation',
            dataIndex: '',
            key: ''
        },
        {
            title: 'Person',
            dataIndex: '',
            key: ''
        },
        {
            title: 'Code',
            dataIndex: '',
            key: ''
        },
        {
            title: 'Headquarter',
            dataIndex: '',
            key: ''
        },
        {
            title: 'Qty',
            dataIndex: '',
            key: ''
        }
    ]

    return (
        <div>
            <TitleWidget title={"Team Details"}></TitleWidget>
                <Table columns={columns}></Table>
        </div>
    )
}

ChangeAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    return { authInfo,  profileInfo }
}

const actions = {
}

export default connect(mapState, actions)(ChangeAllocationComponent)

