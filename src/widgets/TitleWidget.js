import React from 'react'
import {Divider, PageHeader, Typography} from 'antd'
import PropTypes from 'prop-types'

const TitleWidget = ({ title, subTitle}) => {
  return (
      <>
        <PageHeader style={{paddingTop: 0, paddingBottom: 0}}
                    title={title}
            subTitle={subTitle}
        />
        <Divider style={{paddingBottom: 0, marginTop: 0, backgroundColor: '#9B51E0'}}/>
     </>
  )
}

TitleWidget.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}
export default TitleWidget
