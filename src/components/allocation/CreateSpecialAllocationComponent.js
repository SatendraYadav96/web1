import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";

const CreateSpecialAllocationComponent = ({authInfo}) => {



        const column = [
            {
                title: 'Cost Center',
                key: 'costCenter',
                dataIndex: 'costCenter',
                width: '150px'
            },
            {
                title: 'Item',
                key: 'item',
                dataIndex: 'item',
                width: '150px'
            },
            {
                title: 'Stock',
                key: 'stock',
                dataIndex: 'stock',
                width: '150px'
            },
            {
                title: 'Expiry Date',
                key: 'expiryDate',
                dataIndex: 'expiryDate',
                width: '150px'
            },
            {
                title: 'PO No.',
                key: 'PO No.',
                dataIndex: 'PO No.',
                width: '150px'
            },
            {
                title: 'Base Pack',
                key: 'basePack',
                dataIndex: 'basePack',
                width: '150px'
            },
            {
                title: 'Quantity Allocated',
                key: 'quantityAllocated',
                dataIndex: 'quantityAllocated',
                width: '150px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '50px',
                render: () => {
                    return <Button type={"link"}>Allocate Item</Button>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '150px',
                render: () => {
                    return(<><Button>Download</Button>&nbsp;&nbsp;<Button>Upload CSV</Button></>)
                }
            }
        ]

        const dataSource =[
            {
                key:'1',

            }
        ]


    return(
        <>
            <TitleWidget title={"Create Special Dispatches"} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month <Select style={{width: '150px'}}></Select>
                </Col>
                <Col span={3}>
                    Year <Select style={{width: '150px'}}></Select>
                </Col>
                <Col span={3}>
                    Status <Select style={{width: '150px'}}></Select>
                </Col>
                <Col span={3}>
                    Purpose <Input style={{width: '200px'}}></Input>
                </Col>
            </Row>
            <br/><br/>
            <p>
                <b>Allocation Status</b> : Approved
                <br/>
                <b>Allocation Invoice Status</b>: Fully Invoiced
            </p>
            <Row>
                <Col span={5} offset={19}><Input.Search/></Col>
            </Row>
            <br/><br/>
                <Table columns={column} dataSource={dataSource}/>
        </>
    )
}

CreateSpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (CreateSpecialAllocationComponent)
