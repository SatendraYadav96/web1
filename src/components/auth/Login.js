import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginStartAction } from '../../redux/actions/auth/authActions'
import { selectAuthInfo, selectLoggedIn } from '../../redux/selectors/authSelectors'
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd'
import './Login.less'
import { Navigate } from 'react-router-dom'

const Login = ({ handleLogin, authInfo, loggedIn }) => {
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
  return loggedIn ? (
    <Navigate push to="/home/dashboard" />
  ) : (
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
            <Title level={3}>Login</Title>
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
  handleLogin: PropTypes.func,
  navigation: PropTypes.any,
  loggedIn: PropTypes.bool,
}

const mapState = (state) => {
  const authInfo = selectAuthInfo(state)
  const loggedIn = selectLoggedIn(state)
  return { authInfo, loggedIn }
}

const actions = {
  handleLogin: loginStartAction,
}

export default connect(mapState, actions)(Login)
