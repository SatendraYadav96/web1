import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectStatusComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Status"} value={value} onSelect={onChange}>
        <Option value={0}>Inactive</Option>
        <Option value={1}>Active</Option>


    </Select>
}

export default SelectStatusComponent