import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectMonthComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Month"} value={value} onSelect={onChange}>
        <Option value={1}>January</Option>
        <Option value={2}>February</Option>
        <Option value={3}>March</Option>
        <Option value={4}>April</Option>
        <Option value={5}>May</Option>
        <Option value={6}>June</Option>
        <Option value={7}>July</Option>
        <Option value={8}>August</Option>
        <Option value={9}>September</Option>
        <Option value={10}>October</Option>
        <Option value={11}>November</Option>
        <Option value={12}>December</Option>
    </Select>
}

export default SelectMonthComponent
