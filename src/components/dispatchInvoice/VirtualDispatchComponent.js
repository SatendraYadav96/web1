import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import {Link, useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";

const VirtualDispatchComponent = ({authInfo}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;

    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const history = useNavigate()


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Plan Purpose',
                key: 'planPurpose',
                dataIndex: 'planPurpose',
                width:'100px'
            },
            {
                title: 'Brand Manager Name',
                key: 'brandManagerName',
                dataIndex: 'brandManagerName',
                width:'200px'
            },
            {
                title: 'Plan Status',
                key: 'planStatus',
                dataIndex: 'planStatus',
                width:'100px'
            },
            {
                title: 'Invoice Status',
                key: 'invoiceStatus',
                dataIndex: 'invoiceStatus',
                width:'100px'
            },
            {
                title: 'Approval Date',
                key: 'approvalDate',
                dataIndex: 'approvalDate',
                width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Link to="/home/dispatchInvoicing/virtualDispatch/details">Show</Link>
                }
            }
        ]);
        setDataSource([
            {
                key:'1',
                planPurpose: 'UNS',
                brandManagerName: '-',
                planStatus:'Approved',
                invoiceStatus: 'Invoiced',
                approvalDate:'20/7/2022'
            }
        ])
    }

    const  handleShow = () => {
        history("/home/dispatchInvoicing/virtualDispatch/details", {state:
            {
                year: year,
                month: month,
            }});
    }

    return(
        <div>
            <TitleWidget title={'Virtual Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                    {/*<Select style={{ width: 120 }} placeholder={'Year'} value={year} onChange={(e) => setYear(e)}>*/}
                    {/*    <Option value="2020">2020</Option>*/}
                    {/*    <Option value="2021">2021</Option>*/}
                    {/*    <Option value="2022">2022</Option>*/}
                    {/*</Select>*/}
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                    {/*<Select style={{ width: 120 }} placeholder={'Month'} value={month} onChange={(e) => setMonth(e)}>*/}
                    {/*    <Option  value='Janaury'>Janaury</Option>*/}
                    {/*    <Option value='February'>February</Option>*/}
                    {/*    <Option value='March'>March</Option>*/}
                    {/*    <Option value='April'>April</Option>*/}
                    {/*    <Option value='May'>May</Option>*/}
                    {/*    <Option value='June'>June</Option>*/}
                    {/*    <Option value='July'>July</Option>*/}
                    {/*    <Option value='August'>August</Option>*/}
                    {/*    <Option value='September'>September</Option>*/}
                    {/*    <Option value='October'>October</Option>*/}
                    {/*    <Option value='November'>November</Option>*/}
                    {/*    <Option value='December'>December</Option>*/}
                    {/*</Select>*/}
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => searchData()}>Submit</Button>
                </Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }

            {/*<div className="grid">*/}
            {/*    <Select style={{ width: 120 }} placeholder={'Year'} value={year} onChange={(e) => setYear(e)}>*/}
            {/*        <Option value="2020">2020</Option>*/}
            {/*        <Option value="2021">2021</Option>*/}
            {/*        <Option value="2022">2022</Option>*/}
            {/*    </Select>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Select style={{ width: 120 }} placeholder={'Month'} value={month} onChange={(e) => setMonth(e)}>*/}
            {/*        <Option  value='Janaury'>Janaury</Option>*/}
            {/*        <Option value='February'>February</Option>*/}
            {/*        <Option value='March'>March</Option>*/}
            {/*        <Option value='April'>April</Option>*/}
            {/*        <Option value='May'>May</Option>*/}
            {/*        <Option value='June'>June</Option>*/}
            {/*        <Option value='July'>July</Option>*/}
            {/*        <Option value='August'>August</Option>*/}
            {/*        <Option value='September'>September</Option>*/}
            {/*        <Option value='October'>October</Option>*/}
            {/*        <Option value='November'>November</Option>*/}
            {/*        <Option value='December'>December</Option>*/}
            {/*    </Select>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button type={'primary'} onClick={() => searchData()}>Submit</Button>*/}
            {/*</div>*/}
            {/*<br/><br/>*/}
            {/*<div align="right">*/}
            {/*    <Input.Search style={{ width: 304 }} />*/}
            {/*</div>*/}
            {/*<br/><br/>*/}
            {/*{flag &&*/}
            {/*    <Table columns={column} dataSource={dataSource}/>*/}
            {/*}*/}

        </div>
    )
}

VirtualDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(VirtualDispatchComponent)
