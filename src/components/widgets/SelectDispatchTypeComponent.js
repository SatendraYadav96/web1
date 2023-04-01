import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";

const SelectDispatchTypeComponent = ({desgId, value, onChange}) => {

    const [designation, setDesignation] = useState(false)

    useEffect(() => {
        if(desgId!== undefined){
            if(desgId === '943E1237-984B-46FD-8465-8DD94A10AE26' || desgId === '88F90CCF-FB95-42DB-AECF-B4C5E8C25BE6'){
                setDesignation(true)
            }
        }
    }, [desgId])

    return<Select placeholder={"Select Dispatch Type"} value={value} onSelect={onChange}>
        <Option value="0">Monthly</Option>
        <Option value="1">Special</Option>
        {designation
            &&
        <Option value="Virtual">Virtual</Option>
        }
    </Select>

}

export default SelectDispatchTypeComponent
