import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectStateWiseComponent = ({value, onChange}) => {

    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];


    return <Select placeholder={"Select State"} value={value} onSelect={onChange} style={{ width: "100%" }}>
        {indianStates.map((state) => (
            <Option key={state} value={state}>
                {state}
            </Option>
        ))}
    </Select>

}

export default SelectStateWiseComponent
