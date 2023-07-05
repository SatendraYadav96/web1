import React, {useEffect, useState} from "react";
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
import dayjs from "dayjs";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const DeviationReportComponent = ({authInfo,profileInfo,deviationList,deviationReportLoading,handleDeviationReportList}) => {

    let now = dayjs()
    const [quarter, setQuarter] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'bu',
                dataIndex:'bu',
                width:'100px'
            },
            {
                title: 'Quarter',
                key: 'quarter',
                dataIndex: 'quarter',
                width: '100px'
            },
            {
                title: 'Brand Manager',
                key: 'brandManager',
                dataIndex: 'brandManager',
                width: '100px'
            },
            {
                title: 'Brand',
                key: 'brand',
                dataIndex: 'brand',
                width: '100px'
            },
            {
                title: 'Item Planned in QTR',
                key: 'itemPlannedInQtr',
                dataIndex: 'itemPlannedInQtr',
                width: '100px'
            },
            {
                title: 'Item Dispatched in Allocation',
                key: 'itemDispatchedInAllocation',
                dataIndex: 'itemDispatchedInAllocation',
                width: '100px'
            },
            {
                title: 'Dispatch Cycle',
                key: 'dispatchCycle',
                dataIndex: 'dispatchCycle',
                width: '100px'
            },
            {
                title: 'Remarks',
                key: 'remarks',
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

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"DeviationReport.XLSX")
    }

    useEffect(() => {
        setData(deviationList.map(item => {
            return {
                team: item.bu,
                quarter: item.quarter,
                brandManager: item.brandManager,
                brand: item.brand,
                itemPlannedInQtr: item.itemPlannedInQtr,
                itemDispatchedInAllocation: item.itemDispatchedInAllocation,
                dispatchCycle: item.dispatchCycle,
                remarks: item.remarks,
            }
        }))
        console.log(deviationList)
    },[deviationList])

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
                    <DatePicker value={fromDate} onChange={(e) => setFromDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: '100%'}}/>
                </Col>
                <Col span={3}>
                    To Date<br/>
                    <DatePicker value={toDate} onChange={(e) => setToDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: '100%'}}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDeviationReportList()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"deviationreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
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
                handleDeviationReportList:PropTypes.func,
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
