import React, {useEffect, useState} from "react";
import {Select, TreeSelect} from "antd";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectCostCenterDropdown, selectCostCenterDropdownLoading} from "../../redux/selectors/dropDownSelector";
import {costCenterDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Option} from "antd/es/mentions";
const { TreeNode } = TreeSelect;

const SelectCostCenterComponent = ({value,multiple, onChange,authInfo,costCenterDropdown,costCenterDropdownLoading,profileInfo,handleCostCenterDropDown}) => {

    const [costCenterId, setCostCenterId] = useState()
    const [costCenterName, setCostCenterName] = useState()
    const data  = {"id":costCenterId, "name":costCenterName}
    const [dropdownData, setDropDownData] = useState([])

    // useEffect(() => {
    //     // let y = costCenterDropdown.map(item => ({
    //     //     title: item.name,
    //     //     value: item.id
    //     // }))
    //     setX(costCenterDropdown.map(item => ({
    //         title: item.name,
    //         value: item.id
    //     })))
    //     // y = undefined
    //     // const z = x.map(({ value }) => value);
    //     setAllIds(x.map(({ value }) => value))
    // },[costCenterDropdown])

    useEffect(() => {
        setDropDownData([costCenterDropdown?.map(item => (
            item.id
        ))])
    },[costCenterDropdown])

    useEffect(() => {
        console.log(dropdownData)
    },[dropdownData])

    useEffect(() => {
        console.log(costCenterDropdown)
        console.log(data)
        console.log(costCenterName)

        handleCostCenterDropDown ({
            certificate: authInfo.token,
            costCenterDropdown: data
        });
    }, [authInfo.token])

    return (
        // <Select mode="multiple" allowClear onChange={onChange} placeholder={"Select CostCenter"} value={value} style={{width: "100%"}} >
        //     <Option key="all" value="all">---SELECT ALL---</Option>
        //     {costCenterDropdown?.map( item => {
        //         return(<Option key={item.id} value={item.id}>{item.name}</Option>)
        //     })}
        // </Select>
        // <TreeSelect
        //     allowClear={true}
        //     placeholder="Select CostCenter"
        //     treeCheckable={true}
        //     showCheckedStrategy={TreeSelect.SHOW_CHILD}
        //     style={{ width: "350px" }}
        //     dropdownStyle={{ maxHeight: "300px" }}
        //     onSelect={onChange}
        //     value={value}
        // >
        //     <TreeNode value="all" title="all"></TreeNode>
        //     {costCenterDropdown?.map( item => {
        //         return(<TreeNode key={item.id} value={item.id} title={item.name}></TreeNode>)
        //     })}
        // </TreeSelect>
        <Select
            mode={multiple}
            allowClear
            style={{
                width: '100%',
            }}
            placeholder={"Select Cost Center"}
            onChange={onChange}
            value={(value && value.id) ? value.id : value}
            options={costCenterDropdown || []  }
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>

                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
        >
            <Option key="all" value="all">ALL</Option>

            {/*{costCenterDropdown?.map( item => {*/}
            {/*    return(<Option key={item.id} value={item.id}>{item.name}</Option>)*/}
            {/*})}*/}
        </Select>
    )
}

SelectCostCenterComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    costCenterDropdown:PropTypes.array,
    costCenterDropdownLoading:PropTypes.any,
    handleCostCenterDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const costCenterDropdown = selectCostCenterDropdown(state)
    const costCenterDropdownLoading = selectCostCenterDropdownLoading(state)
    return {authInfo,costCenterDropdown,costCenterDropdownLoading,profileInfo}
}

const actions = {
    handleCostCenterDropDown : costCenterDropdownStartAction
}

export default connect(mapState, actions) (SelectCostCenterComponent)
