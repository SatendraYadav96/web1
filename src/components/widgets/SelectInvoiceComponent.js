import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {invoiceDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectInvoiceDropdown, selectInvoiceDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectInvoiceComponent = ({value, onChange,authInfo,profileInfo,invoiceDropdown,invoiceDropdownLoading,handleInvoiceDropdown}) => {

    const [invoiceId, setInvoiceId] = useState()
    const [invoiceName, setInvoiceName] = useState()
    const data  = {"id":invoiceId, "name":invoiceName}

    useEffect(() => {
        handleInvoiceDropdown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    useEffect(() => {
        console.log(invoiceDropdown)
    }, [invoiceDropdown])

    return (
        <Select
            showSearch
            placeholder="Select Invoice"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            value={value}
            onSelect={onChange}
            style={{width: "100%"}}
        >
            {invoiceDropdown?.map( item => {
                return(<Option key={item.inhId} value={item.invoiceNo} label={item.invoiceNo.toString()}>{item.invoiceNo}</Option>)
            })}
        </Select>
    )
}

SelectInvoiceComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    invoiceDropdown:PropTypes.array,
    invoiceDropdownLoading:PropTypes.any,
    handleInvoiceDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const invoiceDropdown = selectInvoiceDropdown(state)
    const invoiceDropdownLoading = selectInvoiceDropdownLoading(state)
    return {authInfo,invoiceDropdown,invoiceDropdownLoading,profileInfo}
}

const actions = {
    handleInvoiceDropdown : invoiceDropdownStartAction
}

export default connect(mapState, actions) (SelectInvoiceComponent)
