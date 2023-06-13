import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectUnBlockingStatusComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={0}>UnBlocked</Option>
        <Option value={1}>Blocked</Option>
        <Option value={2}>Rejected</Option>
    </Select>
}

export default SelectUnBlockingStatusComponent
