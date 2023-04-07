import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectFilterComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Type"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={1}>By Recipient</Option>
        <Option value={2}>By Product</Option>

    </Select>
}

export default SelectFilterComponent
