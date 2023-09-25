import React, {useEffect, useState} from "react";
import {Col, Input, Row, Button, Table} from "antd";
import {Option} from "antd/es/mentions";
import {connect} from "react-redux";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import PropTypes from "prop-types";
import TitleWidget from "../../widgets/TitleWidget";


const AdminComponent = ({}) => {

    const [value, setValue] = React.useState("");
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'',
                width:'100px',

            },
            {
                title:'SubTeam',
                key:'division',
                dataIndex:'',
                width:'100px',

            },
            {
                title: 'GRN Date',
                key: 'grnDate',
                dataIndex: '',
                width: '100px',

            },
            {
                title: 'Vendor Name',
                key: 'vendorName',
                dataIndex: '',
                width: '150px',

            },
            {
                title: 'Vendor Code',
                key: 'vendorCode',
                dataIndex: '',
                width: '120px'

            }
        ])

        setDataSource([
            {title:'vendor',
            key:'vendor',
            dataIndex:'vendor',
            width:'120px'}
        ])
    }

        const handleChange = (event) => {
            setValue(event.target.value);
        };

        return ( <>
            <TitleWidget title={"Mark Tse"}/>
            <Row gutter={[16,16]}>
                <Col span={8} offset={2}>
                <Input placeholder={"Select TSE"} value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>

                <Col span={8}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Col>

            </Row>

                <span>Total Rows: <b>{dataSource?.length}</b></span>
                {flag &&
                    <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
                }
        </>
        )


}

AdminComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,

}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)

}

const actions = {

}

export default connect(mapState, actions) (AdminComponent)
