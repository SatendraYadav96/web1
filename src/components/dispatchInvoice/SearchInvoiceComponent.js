import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import { FileOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";

const SearchInvoiceComponent = ({authInfo}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;

    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Invoice Number',
                key: 'invoiceNumber',
                dataIndex: 'invoiceNumber',
                width:'100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width:'200px',
                render:()=>{
                    return <Button icon={<FileOutlined/>}></Button>
                }
            }
        ]);
        setDataSource([
            {
                key:'1',
                invoiceNumber:'1000'
            }
        ])
    }

    return(
        <>
            <TitleWidget title={'Search Invoice'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                    {/*<Select style={{ width: 150 }} placeholder={'Year'} value={year} onChange={(e) => setYear(e)}>*/}
                    {/*    <Option value="2020">2020</Option>*/}
                    {/*    <Option value="2021">2021</Option>*/}
                    {/*    <Option value="2022">2022</Option>*/}
                    {/*</Select>*/}
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                    {/*<Select style={{ width: 150 }} placeholder={'Month'} value={month} onChange={(e) => setMonth(e)}>*/}
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
                <Col span={3}>
                    <Input placeholder={"Recipient Code"} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <Input placeholder={"Recipient Name"} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <Input placeholder={"Invoice No"} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchData()}>Submit</Button>
                </Col>
            </Row>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }
        </>
    )
}

SearchInvoiceComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(SearchInvoiceComponent)
