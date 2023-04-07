import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectTeamComponent = ({value, onChange}) => {



    return <Select placeholder={"Select Team"} value={value} onSelect={onChange} style={{width: "100%"}}>
         <Option value={"AB2769D2-7D3C-4EFF-9F6A-C1CFD5BCCF38"}>UNS</Option>
         <Option value={"1B376459-4EE5-4D65-AFC8-E98C13DA17C0"}>TESTINGTEAM</Option>

    </Select>
}

export default SelectTeamComponent
