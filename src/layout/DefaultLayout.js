import React, {Suspense, useEffect, useState} from 'react'
import {Col, Divider, Layout, Menu, Row, Spin, Typography} from 'antd'
import './DefaultLayout.less'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideMenuComponent from '../widgets/SideMenuComponent'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../redux/selectors/authSelectors'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import routes from '../navigations/routes'
import { connect } from 'react-redux'
import HeaderComponent from '../components/header/HeaderComponent'
import ReactRoundedImage from "react-rounded-image"
import  titleImg  from '../assets/SNY.png'
import {LogoutOutlined} from "@ant-design/icons";
import Title from "antd/es/skeleton/Title";
import {loadUserProfileStartAction} from "../redux/actions/auth/authActions";
import {selectPageTitle} from "../redux/selectors/uiSelectors";
//import './HeaderComponent.less'


const DefaultLayout = ({ authInfo ,profileInfo , handleLoadProfileInfo, pageTitle}) => {
    const [collapse, setCollapse]=useState(true)

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
        return navigate("/login")

    }

    //if(profileInfo.userDesignation.id === "2B264AFB-E2FD-483C-BD4C-C36A4E352FC5"){
        return (


                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Sider width={172} collapsible collapsed={collapse} onCollapse={()=>setCollapse(!collapse)}>
                        {
                            collapse ?
                                <div align={"center"} style={{marginTop: 5}}>
                                    <ReactRoundedImage
                                        image={titleImg}
                                        roundedSize="0"
                                        imageWidth="50"
                                        imageHeight="50"
                                    />
                                </div> :
                                <Row gutter={[2,2]} style={{marginTop: 5, marginLeft: 5}}>
                                    <Col span={6}>
                                        <ReactRoundedImage
                                            image={titleImg}
                                            roundedSize="0"
                                            imageWidth="30"
                                            imageHeight="30"
                                        />
                                    </Col>
                                    <Col span={18}>
                                        <Typography.Title
                                            level={3}>
                                            Promobee
                                        </Typography.Title>
                                    </Col>
                                </Row>
                        }
                        {/*<Typography.Title*/}
                        {/*  level={3}*/}
                        {/*  style={{*/}
                        {/*      marginLeft: 5,*/}
                        {/*  }}*/}
                        {/*>*/}
                        {/*  Promobee*/}
                        {/*</Typography.Title>*/}
                        <SideMenuComponent />
                    </Sider>
                    <Layout className="site-layout">
                        <Header>
                            {/*<HeaderComponent />*/}

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

                        </Header>
                        <Content className={'content-layout'}>
                            <Suspense fallback={<Spin />}>
                                <Routes>
                                    {routes.map((route, idx) => {
                                        return (
                                            route.element && (
                                                <Route
                                                    key={idx}
                                                    path={route.path}
                                                    exact={route.exact}
                                                    name={route.name}
                                                    element={<route.element />}
                                                />
                                            )
                                        )
                                    })}


                                    <Route path="/" element={<Navigate to="home/dashboard" replace />} />



                                </Routes>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>




        )





}

DefaultLayout.propTypes = {
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
  return { authInfo,profileInfo,pageTitle }
}

const actions = {
    handleLoadProfileInfo: loadUserProfileStartAction,
}


export default connect(mapState, actions)(DefaultLayout)
