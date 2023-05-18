import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import {useNavigate} from "react-router-dom";
import SelectTransportComponent from "../widgets/SelectTransportComponent";


const VirtualDispatchDetailComponent = ({authInfo}) => {

    const navigate = useNavigate()

    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'City',
                key: 'city',
                dataIndex: 'city',
                width:'150px',
                fixed:'left'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width:'150px',
                fixed: 'left'
            },
            {
                title: 'Employee',
                key: 'employee',
                dataIndex: 'employee',
                width:'150px',
                fixed: 'left'
            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'code',
                width:'150px',
                fixed: 'left'
            },
            {
                title:'Invoice No',
                key: 'invoiceNo',
                dataIndex: 'invoiceNo',
                width: '150px',
                fixed: 'left'
            },
            {
                title: 'Group No',
                key: 'groupNo',
                dataIndex: 'groupNo',
                width: '150px',
                fixed: 'left'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '50px'
            },
            {
                title: 'Boxes',
                key: 'boxes',
                dataIndex: 'boxes',
                width: '50px',
                render:() =>{
                    return <Input/>
                }
            },
            {
                title: 'Weight',
                key: 'weight',
                dataIndex: 'weight',
                width: '50px',
                render: () =>{
                    return <Input/>
                }
            },
            {
                title: 'Transporter',
                key: 'transporter',
                dataIndex: 'transporter',
                width: '170px'  ,
                render: () =>{
                    return <SelectTransportComponent/>
                }
            },
            {
                title: 'LR No.',
                key: 'lrNo',
                dataIndex: 'lrNo',
                width: '170px',
                render: () => {
                    return <Input/>
                }
            },
            {
                title: 'Dimension',
                key: 'dimension',
                dataIndex: 'dimension',
                width: '170px',
                render: () => {
                    return <Input/>
                }
            }
        ]);
        setDataSource([
            {
                key:'1',
                City: '',
                state: '-',
                employee:'',
                code: '',
                invoiceNo:'',
                groupNo:'',
                status:'',
                boxes: '',
                weight: '',
            }
        ])
    }

    const handleBack = () => {
        return navigate("/home/dispatchInvoicing/virtualDispatch")
    }

    return(
        <div>
            <TitleWidget title={'Virtual Dispatch'} />
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
            {/*    <Select style={{ width: 120 }} placeholder=""></Select>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button type={'primary'} onClick={() => searchData()}>Submit</Button>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button type={'primary'} style={{marginLeft: '600px'}}>Generate Invoices</Button>*/}
            {/*    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*/}
            {/*    <Button type={'primary'}>Export</Button>*/}
            {/*</div>*/}
            <br/>
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={() => searchData()}>Submit</Button>
                </Col>
                <Col span={2}>
                    <Button type={"default"} onClick={()=>handleBack()}>Back</Button>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} style={{width: "100%"}}>Generate Invoices</Button>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} style={{width: "100%"}}>Export</Button>
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={24}>
                    <div align="right">
                        <Input.Search style={{ width: 304 }} />
                    </div>
                </Col> />
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={dataSource}/>
            }

        </div>
    )
}

VirtualDispatchDetailComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(VirtualDispatchDetailComponent)
