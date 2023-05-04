import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table} from "antd";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectRecipientStatusComponent from "../widgets/SelectRecipientStatusComponent";
import { getRecipientReportStartAction } from '../../redux/actions/reports/recipientReportActions'
import {selectRecipientListData,selectLoadingRecipientReportData} from "../../redux/selectors/recipientReportSelector"
import {CSVLink} from "react-csv";
import XLSX from "xlsx"

const RecipientReportComponent = ({authInfo,profileInfo,recipientList,recipientReportLoading,handleRecipientReportList}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [team, setTeam] = useState()
    const [recipientStatus, setRecipientStatus] = useState("80BC3490-9F53-4C92-8DBA-3D5C7755FD73")
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Team',
                key:'businessUnit',
                dataIndex:'businessUnit',
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
                width: '200px'
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
                title: 'Sub Team',
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
        // console.log(division);
         console.log(team);
         console.log(recipientStatus);
         console.log(recipientList);

        handleRecipientReportList ({
        businessUnit:businessUnit,
        //division:division,
        team:team,
        statusId:recipientStatus,
        certificate: authInfo.token
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"RecipientReport.xlsx")
    }

    useEffect(() => {
        setData(recipientList.map(item => {
            return {
                team: item.businessUnit,
                //division: item.division,
                employeeCode: item.employeeCode,
                employeeName: item.employeeName,
                designation: item.designation,
                address: item.address,
                state: item.state,
                zip: item.zip,
                zone: item.zone,
                loginId: item.loginId,
                workId: item.workId,
                gender: item.gender,
                joiningDate: item.joiningDate,
                mobile: item.mobile,
                email: item.email,
                SubTeam: item.team,
                nsmName: item.nsmName,
                nsmCode: item.nsmCode,
                rmName: item.rmName,
                rmCode: item.rmCode,
                amName: item.amName,
                amCode: item.amCode,
                cfa: item.cfa,
                hq: item.hq,
                remarks: item.remarks,
                status: item.status,
            }
        }))
    },[recipientList])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    // const handleDivision = (value) => {
    //     setDivision(value)
    // }

    const handleTeam = (value) => {
        setTeam(value)
    }

    return(
        <>
            <TitleWidget title="Recipient Report" />
            <Row gutter={[8,8]}>
                <Col span={2}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit}/>
                </Col>
                {/*<Col span={3}>*/}
                {/*    Subteam<br/>*/}
                {/*    <SelectDivisionComponent value={division} onChange={handleDivision}/>*/}
                {/*</Col>*/}
                <Col span={3}>
                    SubTeam<br/>
                    <SelectTeamComponent value={team} onChange={handleTeam}/>
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
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"recipientreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>
                        )
                    }&nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>

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
