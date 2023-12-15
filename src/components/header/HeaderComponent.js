import React, { useEffect } from 'react'
import {Col, Divider, Menu, Row, Skeleton, Typography} from 'antd'
import PropTypes from 'prop-types'
import { selectAuthInfo, selectProfileInfo } from '../../redux/selectors/authSelectors'
import { connect } from 'react-redux'
import { loadUserProfileStartAction } from '../../redux/actions/auth/authActions'
import { selectPageTitle } from '../../redux/selectors/uiSelectors'
import './HeaderComponent.less'
import {LogoutOutlined} from '@ant-design/icons';
import {Navigate, useNavigate} from "react-router-dom";


const HeaderComponent = ({ authInfo, profileInfo, handleLoadProfileInfo, pageTitle }) => {
    const navigate = useNavigate()
    useEffect(() => {
    handleLoadProfileInfo({
        certificate: authInfo.token,
        userId: authInfo.id,
    })
    }, [])
    const {Title} = Typography

    const handleLogout = () => {
        console.log('satya')
       //  (<Navigate push to="/login" />)

         return navigate("/login")

    }
    return (
    <Row justify={'space-between'} style={{ height: '100%' }}>
        <Col span={4} offset={20}>
            <Title>
                <Menu mode={"horizontal"} >
                    <Menu.SubMenu title={profileInfo === null ? '' : profileInfo.name}>
                        <Menu.Item icon={<LogoutOutlined />}
                                    onClick={() => handleLogout()}
                        >LogOut</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Title>
        </Col>
    </Row>
    )
}

HeaderComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    pageTitle: PropTypes.any,
    handleLoadProfileInfo: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const pageTitle = selectPageTitle(state)
    console.log(profileInfo)
    return { authInfo, profileInfo, pageTitle }
}

const actions = {
    handleLoadProfileInfo: loadUserProfileStartAction,
}

export default connect(mapState, actions)(HeaderComponent)
