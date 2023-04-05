import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectFilterPlanComponent from "../widgets/SelectFilterPlanComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import { getDispatchRegisterReportStartAction } from '../../redux/actions/reports/dispatchRegisterReportActions'
import {selectDispatchRegisterListData,selectLoadingDispatchRegisterReportData} from "../../redux/selectors/dispatchRegisterReportSelector"
import moment from 'moment'
import SelectFilterComponent from "../widgets/SelectFilterComponent";
import dayjs from "dayjs";

const DispatchReportComponent = ({authInfo,profileInfo,dispatchRegisterList,dispatchRegisterReportLoading,handleDispatchRegisterReportList}) => {

    let now = dayjs()
    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [filterPlan, setFilterPlan] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [team, setTeam] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Business Unit',
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },
            {
                title:'Division',
                key:'division',
                dataIndex:'divison',
                width:'100px'
            },
            {
                title: 'LR No.',
                key: '',
                dataIndex: 'lrNo',
                width: '100px'
            },
            {
                title: 'Courier Name',
                key: '',
                dataIndex: 'courierName',
                width: '100px'
            },
            {
                title: 'No Of Boxes',
                key: '',
                dataIndex: 'noBoxes',
                width: '100px'
            },
            {
                title: 'Weight',
                key: '',
                dataIndex: 'weights',
                width: '100px'
            },
            {
                title: 'Invoice No',
                key: '',
                dataIndex: 'invoiceNo',
                width: '100px'
            },
            {
                title: 'Sample Value',
                key: '',
                dataIndex: 'sampleValue',
                width: '100px'
            },
            {
                title: 'Item Value',
                key: '',
                dataIndex: 'itemValue',
                width: '100px'
            },
            {
                title: 'Invoice Value',
                key: '',
                dataIndex: 'values',
                width: '100px'
            },
            {
                title: 'Invoice Date',
                key: '',
                dataIndex: 'invoiceDate',
                width: '100px'
            },
            {
                title: 'Recipient',
                key: '',
                dataIndex: 'recipient',
                width: '100px'
            },
            {
                title: 'Designation',
                key: '',
                dataIndex: 'designation',
                width: '100px'
            },
            {
                title: 'Employee Code',
                key: '',
                dataIndex: 'employeeCode',
                width: '100px'
            },
            {
                title: 'Address',
                key: '',
                dataIndex: 'address',
                width: '100px'
            },
            {
                title: 'City',
                key: '',
                dataIndex: 'city',
                width: '100px'
            },
            {
                title: 'State',
                key: '',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'Zip',
                key: '',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'Mobile No',
                key: '',
                dataIndex: 'mobileNo',
                width: '100px'
            },
            {
                title: 'Team Name',
                key: '',
                dataIndex: 'teamName',
                width: '100px'
            },
            {
                title: 'Name of Receiver',
                key: '',
                dataIndex: 'nameofReceiver',
                width: '100px'
            },
            {
                title: 'Date of Delivery',
                key: '',
                dataIndex: 'dateofDelivery',
                width: '100px'
            },
            {
                title: 'Cost',
                key: '',
                dataIndex: 'cost',
                width: '100px'
            }
        ])

        setDataSource([])
    }


        const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
        const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();


                    const getDispatchRegisterReportList = () => {
                         console.log(businessUnit);
                         console.log(division);
                         console.log(formatedStartDateString);
                         console.log(formatedEndDateString);
                         console.log(profileInfo.id);
                         console.log(profileInfo.userDesignation.id);
                         console.log("00000000-0000-0000-0000-000000000000");
                         console.log(filterPlan);
                         console.log(team);

                         console.log(dispatchRegisterList);

                        handleDispatchRegisterReportList ({
                        businessUnit:businessUnit,
                        divison:division,
                        userId: profileInfo.id,
                        userDesgId: profileInfo.userDesignation.id,
                        startDate:formatedStartDateString,
                        endDate:formatedEndDateString,
                        team:team,
                        statusId:"00000000-0000-0000-0000-000000000000",
                        filterPlan:filterPlan,





                        certificate: authInfo.token
                        });
                        searchData()

                    }

    return(
        <>
            <TitleWidget title="Dispatch Register Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    BU<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    Division<br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    Team <br/>
                    <SelectTeamComponent value={team} style={{width: "100%"}} onChange={(e) => setTeam(e)} />
                </Col>
                <Col span={3}>
                    From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')}/>
                </Col>
                <Col span={3}>
                    To Date<br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={now}/>
                </Col>
                <Col span={3}>
                    Plan Type<br/>
                    <SelectFilterPlanComponent value={filterPlan} style={{width: "100%"}} onChange={(e) => setFilterPlan(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDispatchRegisterReportList()}>Search</Button>
                </Col>
            </Row>
            {/*<Row gutter={[16,16]}>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectTeamComponent value={team} onChange={(e) => setTeam(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectFilterPlanComponent value={filterPlan} onChange={(e) => setFilterPlan(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        Dispatch Date <DatePicker value={startDate} onChange={(e) => setStartDate(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <DatePicker value={endDate}  onChange={(e) => setEndDate(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={4}>*/}
            {/*        <Button type={"primary"} onClick={()=>getDispatchRegisterReportList()}>Search</Button>*/}
            {/*    </Col>*/}
            {/*    <Col span={4}></Col>*/}
            {/*</Row>*/}
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={dispatchRegisterList}/>
            }
        </>
    )

}

DispatchReportComponent.propTypes = {
                    authInfo: PropTypes.any,
                    profileInfo: PropTypes.any,
                    dispatchRegisterList:PropTypes.array,
                    dispatchRegisterReportLoading:PropTypes.any,
                    handleDispatchRegisterReportList:PropTypes.func
}

const mapState = (state) => {
                const authInfo = selectAuthInfo(state)
                const profileInfo = selectProfileInfo(state)
                const dispatchRegisterList = selectDispatchRegisterListData(state)
                const dispatchRegisterReportLoading = selectLoadingDispatchRegisterReportData(state)
                return {authInfo,dispatchRegisterList,dispatchRegisterReportLoading,profileInfo}
}

const actions = {
handleDispatchRegisterReportList : getDispatchRegisterReportStartAction
}

export default connect(mapState, actions)(DispatchReportComponent)
