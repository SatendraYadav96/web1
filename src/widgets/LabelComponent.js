import React from 'react'
import {Typography} from 'antd'
const {Title} = Typography
const LabelComponent = ({children}) => {
    return <Title level={5}>{children}</Title>
}

export default LabelComponent
