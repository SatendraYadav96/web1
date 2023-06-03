import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectUserStatusComponent = ({value, onChange}) => {

    return <Select placeholder={"Select User Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={"1D2F12F3-F84A-4200-9590-70680528779B"}>ACTIVE</Option>
        <Option value={"5E2B715C-4FF0-49D9-90F8-38C402AB0BC2"}>INACTIVE</Option>
    </Select>
}

export default SelectUserStatusComponent
