import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {loadUserProfileStartAction, loginStartAction} from '../../redux/actions/auth/authActions'
import {selectAuthInfo, selectLoggedIn, selectProfileInfo, selectProfileInfoLoading} from '../../redux/selectors/authSelectors'
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd'
import './Login.less'
import { Navigate } from 'react-router-dom'

const Login = ({ handleLogin, authInfo, loggedIn,profileInfo,profileInfoLoading,handleLoadProfileInfo }) => {

  const [form] = Form.useForm()
  const { Title } = Typography
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 19 },
  }
  const tailLayout = {
    wrapperCol: { offset: 18, span: 1 },
  }
  const onFinish = () => {

    console.log('On finish', form)
  }

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleLogin({ data: values })
      })
      .catch((errorInfo) => {})
  }

  useEffect(() => {
      if (loggedIn){
          handleLoadProfileInfo({
              certificate: authInfo.token,
          })
      }

    }, [loggedIn ])




      return profileInfo?.userDesignation?  (

    profileInfo?.userDesignation?.id === "2B264AFB-E2FD-483C-BD4C-C36A4E352FC5" ? (
    <Navigate push to="/home/bmdashboard" />
    ) : profileInfo?.userDesignation?.id === "88F90CCF-FB95-42DB-AECF-B4C5E8C25BE6" ? (
    <Navigate push to="/home/bexdashboard" />
    ) : profileInfo?.userDesignation?.id === "20B61A71-6102-4E3D-9871-711D205DD0E7" ? (
            <Navigate push to="/home/admin" />
    ): profileInfo?.userDesignation?.id === "943E1237-984B-46FD-8465-8DD94A10AE26" ? (
            <Navigate push to="/home/dashboard" />
        ) : profileInfo?.userDesignation?.id === "6B1C8B6D-C38E-4B4D-8C73-25ADF30CE474" ? (
            <Navigate push to="/home/buheaddashboard" />
        ) : profileInfo?.userDesignation?.id === "C71C2C60-33DB-481B-8AFF-5BAFA9654691" ? (
            <Navigate push to="/home/rbmdashboard" />
        ) : (
    <Navigate push to="/login" />
    )


    ):(
          <Layout className={'login-page'}>
              <Row>
                  <Col span={6} offset={2}>
                      <Form
                          {...layout}
                          form={form}
                          name="login-form"
                          onFinish={onFinish}
                          className={'login-form'}
                          autoComplete="off"
                     >
                          <Title level={3}>Promobee 2.0</Title>
                          <Form.Item
                              label={'Username'}
                              name="username"
                              rules={[{ required: true, message: 'Username is required' }]}
                          >
                              <Input placeholder="Username" />
                          </Form.Item>
                          <Form.Item
                              label={'Password'}
                              name="password"
                              rules={[{ required: true, message: 'Password is required' }]}
                          >
                              <Input.Password placeholder="Password" />
                          </Form.Item>
                          <Form.Item {...tailLayout}>
                              <Button type="primary" onClick={handleFormSubmit}>
                                  Submit
                              </Button>
                          </Form.Item>
                      </Form>
                  </Col>
              </Row>
          </Layout>
       )


}

Login.propTypes = {

    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    profileInfoLoading: PropTypes.any,
    handleLogin: PropTypes.func,
    navigation: PropTypes.any,
    loggedIn: PropTypes.bool,
}

const mapState = (state) => {

    const authInfo = selectAuthInfo(state)
    const loggedIn = selectLoggedIn(state)
    const profileInfo = selectProfileInfo(state)
    const profileInfoLoading = selectProfileInfoLoading(state)
    console.log(profileInfo)
    console.log(profileInfoLoading)
  return { authInfo, loggedIn,profileInfo,profileInfoLoading }
}

const actions = {
    handleLogin: loginStartAction,
handleLoadProfileInfo : loadUserProfileStartAction,

}

export default connect(mapState, actions)(Login)
