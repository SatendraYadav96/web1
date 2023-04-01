import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";

const VirtualAllocationComponent = ({authInfo}) => {

    const [datasource, setDataSource] = useState([])

    const columns = ([
        {
            title: 'Cost Center',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'Item',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'Available Stock',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'Expiry date',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'PO No.',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'Base Pack',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: 'Qty Allocated',
            key: '',
            dataIndex: '',
            width: '100px'
        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '100px'
        }
    ])

    return(
        <>
            <TitleWidget title={"Virtual Input Plan"}/>
            <Row>
               <Col span={4}>
                   <Select style={{width:'150px'}}></Select>
               </Col>
                <Col span={4}>
                    <Select style={{width: '150px'}}></Select>
                </Col>
                <Col span={4}>
                    <Button type={"primary"}>Create / View</Button>
                </Col>
                <Col span={3} offset={9}>
                    <Button type={"primary"}>Submit</Button>
                </Col>
            </Row>
            <br/>
            <p>
                <b>Allocation Status:</b> DRAFT
                <br/>
                <b>Allocation Invoice Status:</b> Not Initiated
            </p>
            <br/><br/>
            <Row>
                <Col span={8}>
                    <Button>Download Allocation</Button> &nbsp;&nbsp; <Button>Blocked FF</Button> &nbsp;&nbsp;<Button>Active User</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={4}><Input.Search/></Col>
            </Row>
            <br/><br/>
            <Table columns={columns} dataSource={datasource}/>
        </>
    )

}

VirtualAllocationComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (VirtualAllocationComponent)
