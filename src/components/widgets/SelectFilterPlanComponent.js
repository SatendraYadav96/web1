import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectFilterPlanComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Plan Type"} value={value} onSelect={onChange}>
        <Option value={0}>Monthly</Option>
        <Option value={1}>Special</Option>
        <Option value={2}>All</Option>

    </Select>
}

export default SelectFilterPlanComponent
