import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table,customFormat} from "antd";
import moment from 'moment'
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import {getNonComplianceStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import SelectUnBlockingStatusComponent from "../widgets/SelectUnBlockingStatus";
import * as nonComplianceList from "rxjs";
import {selectNonComplianceListData} from "../../redux/selectors/nonComplianceSelector";


const NonComplianceUnBlockingComponent = ({authInfo,nonComplianceList,handleNonCompliance}) => {

   // const date = new Date()

   // const currentYear = date.getFullYear()
   //const currentMonth = date.getMonth()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [status, setStatus] = useState(1)
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)



    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Employee Code',
                key:'employeeCode',
                dataIndex:'employeeCode',
                width:'100px'
            },
            {
                title:'Employee Name',
                key:'employeeCode',
                dataIndex:'employeeCode',
                width:'100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'Headquater',
                key: 'headquater',
                dataIndex: 'headquarter',
                width: '100px'
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'emailAM',
                width: '100px'
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'emailRM',
                width: '100px'
            },
            {
                title: 'Month',
                key: 'month',
                dataIndex: 'month',
                width: '100px'
            },
            {
                title: 'Year',
                key: 'year',
                dataIndex: 'year',
                width: '100px'
            },
            {
                title: 'Is Blocked',
                key: 'isBlocked',
                dataIndex: 'isBockedFF',
                width: '100px'
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px'
            },
            {
                title: 'Admin Remark',
                key: 'adminRemark',
                dataIndex: 'remarkByAdmin',
                width: '100px'
            },
        ])

        setDataSource([])
    }

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();


    const getPurchaseReportList = () => {
        // console.log(businessUnit);
        // console.log(division);
        // console.log(startDate);
        // console.log(endDate);
        // console.log(profileInfo.id);
        // console.log(profileInfo.userDesignation.id);
        //
        // console.log(purchaseList);

        // handlePurchaseReportList ({
        //     businessUnit:businessUnit,
        //     divison:division,
        //     userId: profileInfo.id,
        //     userDesgId: profileInfo.userDesignation.id,
        //     startDate:formatedStartDateString,
        //     endDate:formatedEndDateString,
        //     // startDate:startDate,
        //     // endDate:endDate,
        //
        //
        //
        //     certificate: authInfo.token
        // });
        searchData()

    }

    const handleNonComplianceData = () => {
        handleNonCompliance({
            certificate: authInfo.token,
            statusType: status,
            month: month,
            year: year,
        })
        searchData()
    }

    useEffect(() => {
        {nonComplianceList.length > 0 ? setData(nonComplianceList?.map(item => {
            return {
               employeeCode:item.employeeCode,
                employeeName:item.employeeName,
                team:item.team,
                headquarter:item.headquarter,
                month:item.month,
                year:item.year,
                am:item.emailAM,
                rm:item.emailRM,
                isBockedFF:item.isBockedFF,
                remark:item.remark,
                remarkByAdmin:item.remarkByAdmin,

            }
        })) : console.log('no data')}

        console.log(nonComplianceList)
    },[nonComplianceList])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"NonComplianceUnBlocking.xlsx")
    }

    return(
        <>
            <TitleWidget title="Non Compliance UnBlocking" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Status<br/>
                    <SelectUnBlockingStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    Month <br/>
                    <SelectMonthComponent onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>handleNonComplianceData()}>Search</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"NonComplianceUnBlocking.csv"}
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={nonComplianceList}/>
            }
        </>
    )

}

NonComplianceUnBlockingComponent.propTypes = {
    authInfo: PropTypes.any,
    // profileInfo: PropTypes.any,
    nonComplianceList: PropTypes.array,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    // const profileInfo = selectProfileInfo(state)
    const nonComplianceList = selectNonComplianceListData(state)
    return {authInfo,nonComplianceList}
}

const actions = {
    handleNonCompliance: getNonComplianceStartAction
}

export default connect(mapState, actions)(NonComplianceUnBlockingComponent)
