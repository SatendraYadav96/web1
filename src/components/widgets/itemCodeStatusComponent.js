import React, {useEffect, useState} from "react";
import {Col, Input, Row, Select} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import {selectItemCodeListData, selectLoadingItemCodeData} from "../../redux/selectors/itemCodeSelector";
import {getItemCodeStartAction} from "../../redux/actions/revalidation/itemCodeActions";

const SelectItemCodeStatusComponent = ({value, childToParent,authInfo,itemCodeList,itemCodeLoading,profileInfo,handleItemCodeList}) => {

    const [name, setName] = useState()
    const [obj, setObj] = useState([])
    const [id, setId] = useState()

    useEffect(() => {
        handleItemCodeList ({
            certificate: authInfo.token,
        });
    }, [authInfo.token])

    useEffect(() => {
        console.log(itemCodeList)
    }, [itemCodeList])

    useEffect(() => {
        console.log(id)
        if (itemCodeList === undefined) {
            console.log('undefined')
        } else {
            setObj(itemCodeList.filter(item => item.itemId === id))
        }
    }, [id])

    useEffect(() =>{
        setName(obj.map(item => item.itemName))
    },[obj])

    return (
        <>
            <Row gutter={[8,8]}>
                <Col span={12}>
                    <Select placeholder={"Item Code"} value={id} onSelect={(value) => {setId(value); childToParent(value)}} style={{width: "100%"}}>
                        {itemCodeList?.map( item => {
                            return(<Option key={item.itemId} value={item.itemId}>{item.itemCode}</Option>)
                        })}
                    </Select>
                </Col>
                <Col span={12}>
                    <Input value={name} />
                </Col>
            </Row>
            {/*onChange={() => childToParent(id)}*/}

        </>
    )
}

SelectItemCodeStatusComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    itemCodeList:PropTypes.array,
    itemCodeLoading:PropTypes.any,
    handleItemCodeList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const itemCodeList = selectItemCodeListData(state)
    const itemCodeLoading = selectLoadingItemCodeData(state)
    return {authInfo,itemCodeList,itemCodeLoading,profileInfo}
}

const actions = {
    handleItemCodeList : getItemCodeStartAction
}

export default connect(mapState, actions) (SelectItemCodeStatusComponent)
