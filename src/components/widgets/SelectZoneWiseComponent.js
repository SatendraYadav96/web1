import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";


const SelectZoneWiseComponent = ({value, onChange}) => {

    const zones = [
        "North",
        "South",
        "East",
        "West",
        "Central",

    ];


    return <Select placeholder={"Select Zone"} value={value} onSelect={onChange} style={{ width: "100%" }}>
        {zones.map((zone) => (
            <Option key={zone} value={zone}>
                {zone}
            </Option>
        ))}
    </Select>

}

export default SelectZoneWiseComponent
