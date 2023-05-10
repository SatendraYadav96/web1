import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectItemRevalidationComponent = ({value, onChange}) => {
    return <Select placeholder={"Select Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={"F62FFDF4-CC5B-4268-94D4-1903F701FC2B"}>VALIDATED</Option>
        <Option value={"22660113-FEDC-4BA3-853F-2D99C5DC08D4"}>REQUESTED</Option>
        <Option value={"5810B269-3141-454D-9CA8-66AACDF42CAB"}>REJECTED</Option>
        <Option value={"5C9C6EB7-D19A-4920-BC87-8BE722BA586D"}>INITIAL</Option>
    </Select>
}

export default SelectItemRevalidationComponent
