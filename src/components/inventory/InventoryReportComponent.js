import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";

const InventoryReportComponent = ({authInfo}) => {

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
            },{
                title:'Cost Center',
                key:'costCenter',
                dataIndex:'costCenter',
                width:'100px'
            },
            {
                title:'Category',
                key:'category',
                dataIndex:'category',
                width:'100px'
            },
            {
                title:'Product Code',
                key:'productCode',
                dataIndex:'productCode',
                width:'100px'
            },
            {
                title:'Input Name',
                key:'inputName',
                dataIndex:'inputName',
                width:'100px'
            },

            {
                title:'GRN Data',
                key:'grnData',
                dataIndex:'grnData',
                width:'100px'
            },
            {
                title:'Medical Code',
                key:'medicalCode',
                dataIndex:'medicalCode',
                width:'100px'
            },
            {
                title:'PO No',
                key:'poNo',
                dataIndex:'poNo',
                width:'100px'
            },
            {
                title:'Batch No',
                key:'batchNo',
                dataIndex:'batchNo',
                width:'100px'
            },
            {
                title:'Expiry date',
                key:'expiryDate',
                dataIndex:'expiryDate',
                width:'100px'
            },
            {
                title:'Base Pack',
                key:'basePack',
                dataIndex:'basePack',
                width:'100px'
            },
            {
                title:'Rate',
                key:'rate',
                dataIndex:'rate',
                width:'100px'
            },
            {
                title:'Received Quantity',
                key:'receivedQuantity',
                dataIndex:'receivedQuantity',
                width:'100px'
            },
            {
                title:'Allocated Quantity',
                key:'allocatedQuantity',
                dataIndex:'allocatedQuantity',
                width:'100px'
            },
            {
                title:'Dispatched Quantity',
                key:'dispatchedQuantity',
                dataIndex:'dispatchedQuantity',
                width:'100px'
            },

            {
                title:'Allocation Balance',
                key:'allocationBalance',
                dataIndex:'allocatedBalance',
                width:'100px'
            },
            {
                title:'Physical Balance',
                key:'physicalBalance',
                dataIndex:'physicalBalance',
                width:'100px'
            },
            {
                title:'HSN Code',
                key:'hsnCode',
                dataIndex:'hsnCode',
                width:'100px'
            },
            {
                title:'GST Rate',
                key:'gstRate',
                dataIndex:'gstRate',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Inventory Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Business Unit <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={3}>
                    Division <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>searchData()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{width: 300}}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )

}

InventoryReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(InventoryReportComponent)
