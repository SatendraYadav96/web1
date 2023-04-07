import React from "react";
import { Checkbox } from 'antd';


const SelectIsActiveComponent = ({value, onChange}) => {
    return <Checkbox onChange={onChange} checked={true}></Checkbox>
}

export default SelectIsActiveComponent
