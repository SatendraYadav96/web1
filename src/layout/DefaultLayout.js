import React, {Suspense, useState} from 'react'
import { Divider, Layout, Spin ,Typography} from 'antd'
import './DefaultLayout.less'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideMenuComponent from '../widgets/SideMenuComponent'
import PropTypes from 'prop-types'
import { selectAuthInfo } from '../redux/selectors/authSelectors'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../navigations/routes'
import { connect } from 'react-redux'
import HeaderComponent from '../components/header/HeaderComponent'

const DefaultLayout = ({ authInfo }) => {
    const [collapse, setCollapse]=useState(true)

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider width={172} collapsible collapsed={collapse} onCollapse={()=>setCollapse(!collapse)}>
          {
            collapse ? <Typography.Title
                    level={3}
                    style={{
                        marginLeft: 5,
                    }}
                > Promo </Typography.Title>:
                <Typography.Title
                    level={3}
                    style={{
                        marginLeft: 5,
                    }}
                > Promobee </Typography.Title>
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
          <HeaderComponent />
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
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}

DefaultLayout.propTypes = {
  authInfo: PropTypes.any,
}

const mapState = (state) => {
  const authInfo = selectAuthInfo(state)
  return { authInfo }
}

const actions = {}

export default connect(mapState, actions)(DefaultLayout)
