import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectBrandDropdown, selectBrandDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {brandDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";

const SelectBrandComponent = ({value,multiple, disabled, onChange,authInfo,profileInfo,brandDropdown,brandDropdownLoading,handleBrandDropDown}) => {

    // const [brandId, setBrandId] = useState()
    // const [brandName, setBrandName] = useState()
    // const data  = {"id":brandId, "name":brandName}


    useEffect(() => {
        console.log(brandDropdown)
        handleBrandDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };



    return (

        <Select
            mode={multiple}
            allowClear
            style={{
                width: '100%',
            }}
            placeholder={"Select Brand"}
            onChange={onChange}
            disabled={disabled}
            value={(value && value.id) ? value.id : value}
            options={brandDropdown || []  }
           filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
           filterSort={(optionA, optionB) =>

           (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
        >
        </Select>

        // <Select
        //     mode="multiple"
        //     allowClear
        //     placeholder={"Select Brand"}
        //     value={value}
        //     onChange={onChange}
        //     style={{width: "100%"}}>
        //     <Option key="all" value="all">ALL</Option>
        //     {brandDropdown?.map( item => {
        //         return(<Option key={item.brandId} value={item.brandId}>{item.brandName}</Option>)
        //     })}
        // </Select>


    )
}


SelectBrandComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    brandDropdown:PropTypes.array,
    brandDropdownLoading:PropTypes.any,
    handleBrandDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const brandDropdown = selectBrandDropdown(state)
    const brandDropdownLoading = selectBrandDropdownLoading(state)
    return {authInfo,brandDropdown,brandDropdownLoading,profileInfo}
}


const actions = {

    handleBrandDropDown : brandDropdownStartAction

}


export default connect(mapState, actions) (SelectBrandComponent)
