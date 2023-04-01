import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectQuarterNameComponent = ({value, onChange}) => {



    return <Select placeholder={"Select Quarter"} value={value} onSelect={onChange}>
         <Option value={"0001"}>QTR/JAN-MAR/0001</Option>
         <Option value={"0002"}>QTR/APR-JUN/0002</Option>
         <Option value={"0003"}>QTR/JUL-SEP/0003</Option>
         <Option value={"0004"}>QTR/OCT-DEC/0004</Option>


    </Select>
}

export default SelectQuarterNameComponent
