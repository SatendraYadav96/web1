import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectInvoiceTypeComponent = ({value, onChange}) => {
    return (
        <Select placeholder={"Select Invoice Type"} value={value} onSelect={onChange} style={{width: "100%"}}>
           <Option value={"00000000-0000-0000-0000-000000000024"}>DRAFT</Option>
           <Option value={"00000000-0000-0000-0000-000000000027"}>GENERATED/PRINTED</Option>
           <Option value={"00000000-0000-0000-0000-000000000028"}>CANCELLED</Option>
           <Option value={"00000000-0000-0000-0000-000000000029"}>REDIRECTED</Option>
        </Select>
    )
}

export default SelectInvoiceTypeComponent
