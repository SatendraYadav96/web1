import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectStatusComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={0}>INACTIVE</Option>
        <Option value={1}>ACTIVE</Option>


    </Select>
}

export default SelectStatusComponent
