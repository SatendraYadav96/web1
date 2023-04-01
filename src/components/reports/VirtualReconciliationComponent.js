import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import {Select} from "antd/es";

const VirtualReconciliationComponent = ({authInfo}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Invoice No.',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Doctor Name',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Doctor Code',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Upload Item Name',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Item Code',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Batch No',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Upload Batch',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Quantity Allocated',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Upload Quantity',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Address',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Upload Address',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'City',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'State',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Postal Code',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Mobile',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'FF Code',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'FF Name',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'FF Allocation Date',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'VRL Uploaded Date',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Invoice Created On',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Business Unit',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Status',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Dispatch Date',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Delivery Date',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'LR No.',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title: 'TRN Name',
                key: '',
                dataIndex: '',
                width: '100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Virtual Reconciliation" />
            <Row gutter={[8,8]}>
                <Col span={4}>
                    Business Unit<Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
                    <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
                    <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
                    <Button type={"primary"} onClick={()=>searchData()}>Search</Button>
                </Col>
                <Col span={4}></Col>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )

}

VirtualReconciliationComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(VirtualReconciliationComponent)
