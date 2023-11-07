import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectReasonComponent = ({value, onChange}) => {


    return <Select placeholder={"Select Reason"} value={value} onSelect={onChange} style={{width: "100%"}}>
        <Option value={"AC6813C2-EEAA-4E69-B70D-4B3A360481FD"}>Samples Given to doctor for Medical/Patient Camp</Option>
        <Option value={"A539E53D-FDEC-41E3-A73C-90C8561933ED"}>Samples Given for Doctor Conference/CME</Option>
        <Option value={"2BD908FA-C79A-4F85-9E3F-9E26CC985A39"}>Samples Given as starter packs to new Patients</Option>
        <Option value={"A2FED5CE-4A72-479B-89C5-EC8CBE641DB7"}>Samples Given for OPD Camp</Option>
        <Option value={"946ECBFE-07EB-4378-951C-D7E34F7A0DEE"}>Samples reporting error</Option>
    </Select>
}

export default SelectReasonComponent
