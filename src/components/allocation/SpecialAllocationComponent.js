import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {useNavigate} from "react-router-dom";

const SpecialAllocationComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Purpose',
                key: 'purpose',
                dataIndex: 'purpose',
                width: '250px'
            },
            {
                title: 'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width: '250px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '50px',
                render: () => {
                    return <Button type={"link"}>Edit</Button>
                }
            }
        ])

        setDataSource([
            {
                key:'1',
                purpose: '',
                requestedOn: ''
            }
        ])
    }

    const newAllocation = () => {
        return navigate('/home/allocations/special/createNew')
    }

    return(
        <>
            <TitleWidget title={"Search Special Dispatches"} />
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
                <Col span={3}>
                    <Button type={"primary"} onClick={() => searchData()}>Search</Button>
                </Col>
                <Col span={2} offset={7}>
                    <Button type={"primary"} onClick={() => newAllocation()}>New</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={5} offset={19}><Input.Search/></Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )
}

SpecialAllocationComponent.propTypes = {
    authInfo: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions) (SpecialAllocationComponent)
