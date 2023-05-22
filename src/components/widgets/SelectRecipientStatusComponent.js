import React from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectRecipientStatusComponent = ({value, onChange}) => {



    return <Select placeholder={"Select Status"} value={value} onSelect={onChange} style={{width: "100%"}}>
         <Option value={"80BC3490-9F53-4C92-8DBA-3D5C7755FD73"}>ACTIVE</Option>
         <Option value={"D5806EC9-30E6-4DB0-B3EF-E2EAD29EA0DC"}>INACTIVE</Option>
    </Select>
}

export default SelectRecipientStatusComponent
