import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectYearComponent = ({value, onChange}) => {
    const date = new Date()
    const currentYear = date.getFullYear()

    return <Select placeholder={"Select Year"} value={value} onSelect={onChange}>
        <Option value={currentYear-6}>{currentYear-6}</Option>
        <Option value={currentYear-5}>{currentYear-5}</Option>
        <Option value={currentYear-4}>{currentYear-4}</Option>
        <Option value={currentYear-3}>{currentYear-3}</Option>
        <Option value={currentYear-2}>{currentYear-2}</Option>
        <Option value={currentYear-1}>{currentYear-1}</Option>
        <Option value={currentYear}>{currentYear}</Option>
        <Option value={currentYear+1}>{currentYear+1}</Option>
    </Select>
}

export default SelectYearComponent
