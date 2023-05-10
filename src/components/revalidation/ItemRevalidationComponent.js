import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Select, Table} from "antd";
import moment from "moment";
import {selectItemRevalidationListData, selectLoadingItemRevalidationData} from "../../redux/selectors/itemRevalidationSelector";
import {getItemRevalidationStartAction} from "../../redux/actions/revalidation/itemRevalidationActions";
import SelectItemRequisitionComponent from "../widgets/SelectItemRequisitionComponent";
import SelectItemCodeStatusComponent from "../widgets/SelectItemCodeStatusComponent";
import SelectItemRevalidationComponent from "../widgets/SelectItemRevalidationComponent";

const ItemRevalidationComponent = ({authInfo,itemRevalidationList,itemRevalidationLoading,profileInfo, handleItemRevalidationList}) => {

    // const [fromDate, setFromDate] = useState()
    // const [toDate, setToDate] = useState()
    const [itemId, setItemId] = useState("")
    const [revldType, setRevldType] = useState("")
    const column = [
        {
            title:'Name',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Revalidation',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Category',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Medical Revalidation',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'PO No.',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Available Stock',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Expiry Date',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'',
            key: '',
            dataIndex: '',
            width: '150px'
        }
    ]

    const childToParent =(childData) => {
        setItemId(childData)
    }

    useEffect(() => {
        console.log(`The Item Id is ${itemId}`)
    }, [itemId])

    const handleRevalidation =() => {
        handleItemRevalidationList({
            certificate: authInfo.token,
            itemId: itemId,
            revldType: revldType,
        })
    }

    useEffect(() => {
        console.log(revldType)
    },[revldType])

    return(
        <>
            <TitleWidget title="Item Revalidation" />
            <Row gutter={[8,8]}>
                <Col span={8}>
                    Item <br/>
                    <SelectItemCodeStatusComponent childToParent={childToParent}/>
                </Col>
                <Col span={3}><br/>
                    <SelectItemRevalidationComponent onChange={(e) => setRevldType(e)}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={handleRevalidation} >Search</Button>
                </Col>
                <Col span={24}>
                    <br/>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
            <Table columns={column}></Table>
        </>
    )
}

ItemRevalidationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    itemRevalidationList:PropTypes.array,
    itemRevalidationLoading:PropTypes.any,
    handleItemRevalidationList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const itemRevalidationList = selectItemRevalidationListData(state)
    const itemRevalidationLoading = selectLoadingItemRevalidationData(state)
    return {authInfo,itemRevalidationList,itemRevalidationLoading,profileInfo}
}

const actions = {
    handleItemRevalidationList : getItemRevalidationStartAction
}


export default connect(mapState, actions)(ItemRevalidationComponent)
