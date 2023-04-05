import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectDivisionComponent = ({value, onChange}) => {



    return <Select placeholder={"Select Division"} value={value} onSelect={onChange} style={{width: "100%"}}>
         <Option value={"EA8CE342-D5DA-4D51-98AB-0134285B9598"}>UNS</Option>
         <Option value={"A943B95A-B26D-4DD7-B34D-FE2AA2CD0FB3"}>TESTDIV</Option>

    </Select>
}

export default SelectDivisionComponent
