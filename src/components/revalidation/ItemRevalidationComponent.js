import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Select, Table} from "antd";
import moment from "moment";
import {selectItemCodeListData, selectLoadingItemCodeData} from "../../redux/selectors/itemCodeSelector";
import {getItemCodeStartAction} from "../../redux/actions/revalidation/itemCodeActions";
import SelectItemCodeStatusComponent from "../widgets/itemCodeStatusComponent";
import SelectItemStatusComponent from "../widgets/SelectItemStatusComponent";

const ItemRevalidationComponent = ({authInfo,itemCodeList}) => {

    // const [fromDate, setFromDate] = useState()
    // const [toDate, setToDate] = useState()
    const [itemId, setItemId] = useState()
    const column = [
        {
            title:'Name',
            key: '',
            dataIndex: '',
            width: '150px'
        },
        {
            title:'Code',
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
            title:'Medical Code',
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

    return(
        <>
            <TitleWidget title="Item Revalidation" />
            <Row gutter={[8,8]}>
                {/*<Col span={3}>*/}
                {/*    Expiry Date From: <br/>*/}
                {/*    <DatePicker value={fromDate} style={{width: "100%"}} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>*/}
                {/*</Col>*/}
                {/*<Col span={3}>*/}
                {/*    To: <br/>*/}
                {/*    <DatePicker value={toDate} style={{width: "100%"}} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')}/>*/}
                {/*</Col>*/}
                <Col span={8}>
                    Item <br/>
                    <SelectItemCodeStatusComponent childToParent={childToParent}/>
                </Col>
                <Col span={3}><br/>
                    <SelectItemStatusComponent/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} >Search</Button>
                </Col>
                <Col span={24}>
                    <br/>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {/*<Row>*/}
            {/*    <Col span={6} offset={18}>*/}
            {/*        <Input.Search/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<br/><br/>*/}
            <Table columns={column}></Table>
        </>
    )
}

ItemRevalidationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,profileInfo}
}

const actions = {
}

export default connect(mapState, actions)(ItemRevalidationComponent)
