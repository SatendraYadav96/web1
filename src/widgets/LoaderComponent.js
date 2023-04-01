import React from 'react'
import PropTypes from 'prop-types'
import { selectShowLoader } from '../redux/selectors/globalSelectors'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import './widgets.less'
const LoaderComponent = ({ selectShowSpinner, children }) => {
  return <Spin spinning={selectShowSpinner}>{children}</Spin>
}
LoaderComponent.propTypes = {
  selectShowSpinner: PropTypes.bool,
  children: PropTypes.any,
}

const mapState = (state) => {
  const selectShowSpinner = selectShowLoader(state)
  return { selectShowSpinner }
}

const actions = {}

export default connect(mapState, actions)(LoaderComponent)
