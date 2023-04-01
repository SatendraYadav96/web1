import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";

const AllocationReportComponent = ({authInfo}) => {

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Item Name',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title: 'Item Code',
                key: '',
                dataIndex: '',
                width: '100px'
            },
            {
                title: 'Quantity Allocated',
                key: '',
                dataIndex: '',
                width: '100px'
            },
            {
                title: 'Recipient Code',
                key: '',
                dataIndex: '',
                width: '100px'
            },
            {
                title: 'Recipient Name',
                key: '',
                dataIndex: '',
                width: '100px'
            },
            {
                title: 'Plan Month',
                key: '',
                dataIndex: '',
                width: '100px'
            },
            {
                title: 'Plan Year',
                key: '',
                dataIndex: '',
                width: '100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Allocation Report" />
            <Row gutter={[8,8]}>
                <Col span={5}>
                    <Input/>
                </Col>
                <Col span={4}>
                    <Button type={"primary"} onClick={()=>searchData()}>Search</Button>
                </Col>
                <Col span={15}></Col>
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

AllocationReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(AllocationReportComponent)
