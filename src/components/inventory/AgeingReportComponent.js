import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";

const AgeingReportComponent = ({authInfo}) => {

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
                title:'Item Code',
                key:'itemCode',
                dataIndex:'itemCode',
                width:'100px'
            },
            {
                title:'Item Name',
                key:'itemName',
                dataIndex:'itemName',
                width:'100px'
            },
            {
                title:'Item Category',
                key:'itemCategory',
                dataIndex:'itemCategory',
                width:'100px'
            },
            {
                title:'(0-30) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(31-60) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(61-90) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(91-120) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },
            {
                title:'(>120) days',
                key:'',
                dataIndex:'',
                width:'100px'
            },
            {
                title:'Value',
                key:'value',
                dataIndex:'value',
                width:'100px'
            },

            {
                title:'Total Quantity',
                key:'totalQuantity',
                dataIndex:'totalQuantity',
                width:'100px'
            },
            {
                title:'Total Value',
                key:'totalValue',
                dataIndex:'totalValue',
                width:'100px'
            }
        ])

        setDataSource([])
    }

    return(
        <>
            <TitleWidget title="Ageing Report" />
            <Row gutter={[8,8]}>
                <Col span={4}>
                    Business Unit <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
                    Division <Select style={{width:'150px'}}></Select>
                </Col>
                <Col span={4}>
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

AgeingReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(AgeingReportComponent)
