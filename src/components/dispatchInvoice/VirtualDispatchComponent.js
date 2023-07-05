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
import {selectVirtualData} from "../../redux/selectors/virtualDispatchSelector";
import {getVirtualDispatchStartAction} from "../../redux/actions/dispatchInvoice/virtualDispatchAction";


const VirtualDispatchComponent = ({authInfo,virtualData,handleVirtualDispatchList}) => {

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
                key: 'namePlan',
                dataIndex: 'namePlan',
                width:'100px'
            },
            {
                title: 'Brand Manager Name',
                key: 'nameBmRec',
                dataIndex: 'nameBmRec',
                width:'200px'
            },
            {
                title: 'Plan Status',
                key: 'nameStatusDip',
                dataIndex: 'nameStatusDip',
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
                render: (_,row) => {
                    return <Button to="/home/dispatchInvoicing/virtualDispatch/details" onClick={() => handleShow(row)}>Show</Button>
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

    const  handleShow = (row) => {
        history("/home/dispatchInvoicing/virtualDispatch/details", {state:
            {
                year: year,
                month: month,
                team: row.idTEM,
                status: row.idPlanStatus,
                planId: row.idDip,
            }});
    }

    const getVirtualDispatchList = () => {
        handleVirtualDispatchList({
            year:year,
            month:month,
            certificate: authInfo.token
        })
        searchData()
    }

    return(
        <div>
            <TitleWidget title={'Virtual Dispatch'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => getVirtualDispatchList()}>Submit</Button>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column} dataSource={virtualData}/>
        </div>
    )
}

VirtualDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
    handleVirtualDispatchList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const virtualData = selectVirtualData(state)
    return {authInfo,virtualData}
}

const actions = {
    handleVirtualDispatchList : getVirtualDispatchStartAction,
}

export default connect(mapState, actions)(VirtualDispatchComponent)
