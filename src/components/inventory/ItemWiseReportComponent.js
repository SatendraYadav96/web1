import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";

const ItemWiseReportComponent = ({authInfo}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Business Unit',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'Division',
                key:'division',
                dataIndex:'division',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'itemName',
                width:'100px'
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px'
            },
            {
                title:'Item Code',
                key:'itemCode',
                dataIndex:'itemCode',
                width:'100px'
            },
            {
                title:'Opening Quantity',
                key:'openingQuantity',
                dataIndex:'openingQuantity',
                width:'100px'
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px'
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px'
            },
            {
                title:'Closing Quantity',
                key:'closingQuantity',
                dataIndex:'closingQuantity',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Item Wise Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    Business Unit <Select style={{width:'100px', marginLeft:'20px'}}></Select>
                </Col>

                <Col span={2}>
                    Division <Select style={{width:'100px'}}></Select>
                </Col>

                <Col span={3}>
                    Date <DatePicker/>
                </Col>
                <Col span={3}>
                    <DatePicker/>
                </Col>

                <Col span={2}>
                    <Button type={"primary"} onClick={()=>searchData()}>Search</Button>
                </Col>

                <Col span={12}></Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )

}

ItemWiseReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(ItemWiseReportComponent)
