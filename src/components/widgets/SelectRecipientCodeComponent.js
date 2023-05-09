import React, {useEffect, useState} from "react";
import {Col, Input, Row, Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {recipientDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {selectRecipientDropdown, selectRecipientDropdownLoading} from "../../redux/selectors/dropDownSelector";
import PropTypes from "prop-types";

const SelectRecipientComponent = ({value, onChange,authInfo,profileInfo,recipientDropdown,recipientDropdownLoading,handleRecipientDropDown}) => {

    const [recipientId, setRecipientId] = useState()
    const [name, setName] = useState()
    const [id, setId] = useState()
    const [obj, setObj] = useState([])
    const [recipientName, setRecipientName] = useState()
    const data  = {"id":recipientId, "name":recipientName}

    useEffect(() => {
        console.log(recipientDropdown)
        console.log(data)
        console.log(recipientName)

        handleRecipientDropDown ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    useEffect(() => {
        console.log(id)
        if (recipientDropdown === undefined) {
            console.log('undefined')
        } else {
            setObj(recipientDropdown.filter(item => item.recipientId === id))
        }
    }, [id])

    useEffect(() =>{
        setName(obj.map(item => item.recipientName))
    },[obj])

    return (
        <Row gutter={[8,8]}>
            <Col span={12}>
                <Select
                    showSearch
                    placeholder="Code"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    value={value}
                    onSelect={(value) => {onChange(value); setId(value)}}
                    style={{width: "100%"}}
                >
                    {recipientDropdown?.map( item => {
                        return(<Option key={item.recipientId} value={item.recipientId} label={item.recipientCode}>{item.recipientCode}</Option>)
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <Input value={name} placeholder={"Recipient Name"}/>
            </Col>
        </Row>
        )
}

SelectRecipientComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    recipientDropdown:PropTypes.array,
    recipientDropdownLoading:PropTypes.any,
    handleRecipientDropDown:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const recipientDropdown = selectRecipientDropdown(state)
    const recipientDropdownLoading = selectRecipientDropdownLoading(state)
    return {authInfo,recipientDropdown,recipientDropdownLoading,profileInfo}
}

const actions = {
    handleRecipientDropDown : recipientDropdownStartAction
}

export default connect(mapState, actions) (SelectRecipientComponent)
