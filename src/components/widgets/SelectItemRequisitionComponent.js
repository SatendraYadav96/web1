import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectItemRequisitionComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Item Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={"00000000-0000-0000-1000-900000000001"}>ITEM RECEIVED</Option>
        <Option value={"00000000-0000-0000-1000-900000000002"}>PENDING</Option>
        <Option value={"00000000-0000-0000-1000-900000000003"}>PENDING > 90 DAYS</Option>
        <Option value={"00000000-0000-0000-1000-900000000004"}>REMOVED</Option>
    </Select>
}

export default SelectItemRequisitionComponent
