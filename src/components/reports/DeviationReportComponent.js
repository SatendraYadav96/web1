import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table,DatePicker,customFormat} from "antd";
import {Select} from "antd/es";
import SelectQuarterNameComponent from "../widgets/SelectQuarterNameComponent";
import { getDeviationReportStartAction } from '../../redux/actions/reports/deviationReportActions'
import {selectDeviationListData,selectLoadingDeviationReportData} from "../../redux/selectors/deviationReportSelector"
import moment from 'moment'
import {selectProfileInfo} from "../../redux/selectors/authSelectors";

const DeviationReportComponent = ({authInfo,profileInfo,deviationList,deviationReportLoading,handleDeviationReportList}) => {

    const [quarter, setQuarter] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'BU',
                key:'',
                dataIndex:'bu',
                width:'100px'
            },
            {
                title: 'Quarter',
                key: '',
                dataIndex: 'quarter',
                width: '100px'
            },
            {
                title: 'Brand Manager',
                key: '',
                dataIndex: 'brandManager',
                width: '100px'
            },
            {
                title: 'Brand',
                key: '',
                dataIndex: 'brand',
                width: '100px'
            },
            {
                title: 'Item Planned in QTR',
                key: '',
                dataIndex: 'itemPlannedInQtr',
                width: '100px'
            },
            {
                title: 'Item Dispatched in Allocation',
                key: '',
                dataIndex: 'itemDispatchedInAllocation',
                width: '100px'
            },
            {
                title: 'Dispatch Cycle',
                key: '',
                dataIndex: 'dispatchCycle',
                width: '100px'
            },
            {
                title: 'Remarks',
                key: '',
                dataIndex: 'remarks',
                width: '100px'
            }

        ])

        setDataSource([])
    }



    const formatedStartDateString = moment(fromDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(toDate).format('yyyy-MM-DD').toString();


                const getDeviationReportList = () => {
                     console.log(quarter);
                     console.log(formatedStartDateString);
                     console.log(formatedEndDateString);
                     console.log(profileInfo.id);
                     console.log(profileInfo.userDesignation.id);

                     console.log(deviationList);

                    handleDeviationReportList ({
                    quarterName:quarter,
                    userId: profileInfo.id,
                    userDesgId: profileInfo.userDesignation.id,
                    fromDate:formatedStartDateString,
                    toDate:formatedEndDateString,



                    certificate: authInfo.token
                    });
                    searchData()

                }

    return(
        <>
            <TitleWidget title="Deviation Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Quarter<br/>
                   <SelectQuarterNameComponent value={quarter} style={{width: "100%"}} onChange={(e) => setQuarter(e)} />
                </Col>
                <Col span={3}>
                    From Date<br/>
                    <DatePicker dateFormat="yyyy-MM-dd" value={fromDate} style={{width: "100%"}} onChange={(e) => setFromDate(e)} />
                </Col>
                <Col span={3}>
                    To Date<br/>
                     <DatePicker dateFormat="yyyy-MM-dd" value={toDate} style={{width: "100%"}} onChange={(e) => setToDate(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDeviationReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={18}>
                    <div align="right">
                        <Input.Search style={{ width: 300 }}/>
                    </div>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={deviationList}/>
            }
        </>
    )

}

DeviationReportComponent.propTypes = {
                authInfo: PropTypes.any,
                profileInfo: PropTypes.any,
                deviationList:PropTypes.array,
                deviationReportLoading:PropTypes.any,
                handleDeviationReportList:PropTypes.fun
}

const mapState = (state) => {
            const authInfo = selectAuthInfo(state)
            const profileInfo = selectProfileInfo(state)
            const deviationList = selectDeviationListData(state)
            const deviationReportLoading = selectLoadingDeviationReportData(state)
            return {authInfo,deviationList,deviationReportLoading,profileInfo}
}

const actions = {
handleDeviationReportList : getDeviationReportStartAction
}

export default connect(mapState, actions)(DeviationReportComponent)
