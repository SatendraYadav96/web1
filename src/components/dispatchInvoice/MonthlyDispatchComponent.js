import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Table} from "antd";
import {Option} from "antd/es/mentions";
import {Link} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import { getMonthlyDispatchStartAction } from '../../redux/actions/dispatchInvoice/monthlyDispatchAction'
import {selectMonthListData,selectLoadingMonthDispatchData} from "../../redux/selectors/monthlyDispatchSelector"

const MonthlyDispatchComponent = ({authInfo,monthList,monthlyDispatchLoading,handleMonthlyDispatchList,profileInfo}) => {

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
                title:'Team Name',
                key: 'teamName',
                dataIndex: 'nameTEM',
                width:'100px'
            },
            {
                title: 'Brand Manager Name',
                key: 'brandManagerName',
                dataIndex: 'nameBM',
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
                dataIndex: 'teamStatus',
                width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '100px',
                render: () => {
                    return <Link to="/home/dispatchInvoicing/monthlyDispatch/details">Show</Link>
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                teamName: '',
                brandManagerName: '',
                planStatus:'',
                invoiceStatus: ''
            }
        ])
    }


    const getMonthlyDispatchList = () => {
       console.log(year);
        console.log(month);

        console.log(monthList);
        handleMonthlyDispatchList ({
        year:year,
        month:month,
        certificate: authInfo.token
        });
        searchData()
    }

    return(
        <div>
            <TitleWidget title={'Monthly Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={() => getMonthlyDispatchList()}>Submit</Button>
                </Col>
                <Col span={14}>
                    <>
                        <div align="right">
                            <Input.Search style={{ width: 300 }} />
                        </div>
                    </>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column} dataSource={monthList}/>
            {/*<br/><br/>*/}

                {/*<>*/}
                {/*    <div align="right">*/}
                {/*        <Input.Search style={{ width: 304 }} />*/}
                {/*    </div>*/}
                {/*    <br/><br/>*/}
                {/*    <Table columns={column} dataSource={monthList}/>*/}
                {/*</>*/}
        </div>
    )
}

MonthlyDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    monthList:PropTypes.array,
    monthlyDispatchLoading:PropTypes.any,
    handleMonthlyDispatchList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const monthList = selectMonthListData(state)
    const monthlyDispatchLoading = selectLoadingMonthDispatchData(state)
    return {authInfo,monthList, monthlyDispatchLoading,profileInfo}
}


const actions = {
handleMonthlyDispatchList : getMonthlyDispatchStartAction

}

export default connect(mapState, actions)(MonthlyDispatchComponent)
