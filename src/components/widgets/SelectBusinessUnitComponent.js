import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectBusinessUnitComponent = ({value, onChange}) => {



    return <Select placeholder={"Select BU"} value={value} onSelect={onChange} style={{width: "100%"}}>
         <Option value={"59049834-D40E-4FCA-8C38-2FB23DA6E764"}>UNS</Option>
         <Option value={"FD9694D2-38C9-453C-BF50-302EB903947B"}>TESTBU</Option>

    </Select>
}


export default SelectBusinessUnitComponent
