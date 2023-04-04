import React, {useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectRecipientStatusComponent from "../widgets/SelectRecipientStatusComponent";
import { getRecipientReportStartAction } from '../../redux/actions/reports/recipientReportActions'
import {selectRecipientListData,selectLoadingRecipientReportData} from "../../redux/selectors/recipientReportSelector"

const RecipientReportComponent = ({authInfo,profileInfo,recipientList,recipientReportLoading,handleRecipientReportList}) => {
    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [team, setTeam] = useState()
    const [recipientStatus, setRecipientStatus] = useState()
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
                dataIndex:'division',
                width:'100px'
            },
            {
                title: 'Emp Code',
                key: 'empId',
                dataIndex: 'employeeCode',
                width: '100px'
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '100px'
            },
            {
                title: 'Job Role',
                key: 'jobRole',
                dataIndex: 'designation',
                width: '100px'
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address',
                width: '100px'
            },
            {
                title: 'City',
                key: 'city',
                dataIndex: 'city',
                width: '100px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'Pincode',
                key: 'pincode',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'Zone',
                key: 'region',
                dataIndex: 'zone',
                width: '100px'
            },
            {
                title: 'Login Id',
                key: 'loginId',
                dataIndex: 'loginId',
                width: '100px'
            },
            {
                title: 'Work Id',
                key: 'workId',
                dataIndex: 'workId',
                width: '100px'
            },
            {
                title: 'Gender',
                key: 'gender',
                dataIndex: 'gender',
                width: '100px'
            },
            {
                title: 'Joining Date',
                key: 'joiningDate',
                dataIndex: 'joiningDate',
                width: '100px'
            },
            {
                title: 'Phone',
                key: 'phone',
                dataIndex: 'mobile',
                width: '100px'
            },
            {
                title: 'Email',
                key: 'email',
                dataIndex: 'email',
                width: '100px'
            },
            {
                title: 'Team Name',
                key: 'teamName',
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'NSM',
                key: 'nsm',
                dataIndex: 'nsmName',
                width: '100px'
            },
            {
                title: 'NSM Emp Code',
                key: 'nsmEmpId',
                dataIndex: 'nsmCode',
                width: '100px'
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'rmName',
                width: '100px'
            },
            {
                title: 'RBM Emp Code',
                key: 'rbmEmpId',
                dataIndex: 'rmCode',
                width: '100px'
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'amName',
                width: '100px'
            },
            {
                title: 'AM Emp Code',
                key: 'amEmpId',
                dataIndex: 'amCode',
                width: '100px'
            },
            {
                title: 'CFA',
                key: 'cfa',
                dataIndex: 'cfa',
                width: '100px'
            },
            {
                title: 'Headquater',
                key: 'headquater',
                dataIndex: 'hq',
                width: '100px'
            },
            {
                title: 'Remarks',
                key: 'remarks',
                dataIndex: 'remarks',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px'
            }
        ])

        setDataSource([])
    }

        const getRecipientReportList = () => {
             console.log(businessUnit);
             console.log(division);
             console.log(team);
             console.log(recipientStatus);
             console.log(recipientList);

            handleRecipientReportList ({
            businessUnit:businessUnit,
            division:division,
            team:team,
            statusId:recipientStatus,
            certificate: authInfo.token
            });
            searchData()

        }




    return(
        <>
            <TitleWidget title="Recipient Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    BU<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)}  />
                </Col>
                <Col span={3}>
                    Division<br/>
                    <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    Team<br/>
                    <SelectTeamComponent value={team} onChange={(e) => setTeam(e)} />
                </Col>
                <Col span={3}>
                    Recipient Status<br/>
                     <SelectRecipientStatusComponent value={recipientStatus} onChange={(e) => setRecipientStatus(e)}/>
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getRecipientReportList()}>Search</Button>
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
                <Table columns={column} scroll={{y: '100%'}} dataSource={recipientList}/>
            }
        </>
    )

}

RecipientReportComponent.propTypes = {
        authInfo: PropTypes.any,
        profileInfo: PropTypes.any,
        recipientList:PropTypes.array,
        recipientReportLoading:PropTypes.any,
        handleRecipientReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const recipientList = selectRecipientListData(state)
    const recipientReportLoading = selectLoadingRecipientReportData(state)
    return {authInfo,recipientList,recipientReportLoading,profileInfo}
}

const actions = {

handleRecipientReportList : getRecipientReportStartAction

}

export default connect(mapState, actions)(RecipientReportComponent)
