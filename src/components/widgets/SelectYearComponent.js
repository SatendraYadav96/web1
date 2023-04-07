import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectYearComponent = ({value, onChange}) => {
    const date = new Date()
    const currentYear = date.getFullYear()

    return <Select placeholder={"Select Year"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={currentYear-1}>{currentYear-1}</Option>
        <Option value={currentYear}>{currentYear}</Option>
        <Option value={currentYear+1}>{currentYear+1}</Option>
    </Select>
}

export default SelectYearComponent
