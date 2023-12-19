import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Space, Table} from "antd";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectRecipientStatusComponent from "../widgets/SelectRecipientStatusComponent";
import { getRecipientReportStartAction } from '../../redux/actions/reports/recipientReportActions'
import {selectRecipientListData,selectLoadingRecipientReportData} from "../../redux/selectors/recipientReportSelector"
import {CSVLink} from "react-csv";
import XLSX from "xlsx"
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {selectBuDropdown, selectTeamDropdown} from "../../redux/selectors/dropDownSelector";

const RecipientReportComponent = ({authInfo,profileInfo,recipientList,recipientReportLoading,handleRecipientReportList,buDropdown,teamDropdown}) => {

    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [team, setTeam] = useState()
    const [t, setT] = useState()
    const [recipientStatus, setRecipientStatus] = useState("80BC3490-9F53-4C92-8DBA-3D5C7755FD73")
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#0099FFFF' : '#0099FFFF',
                    fontSize: '15px',
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Employee Code',
                key: 'employeeCode',
                dataIndex: 'employeeCode',
                width: '100px',
                ...getColumnSearchProps('employeeCode'),
                sorter: (a, b) => a.employeeCode - b.employeeCode,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '100px',
                ...getColumnSearchProps('employeeName'),
            },
            {
                title: 'Address',
                key: 'address',
                dataIndex: 'address',
                width: '200px',
                ...getColumnSearchProps('address'),
            },
            {
                title: 'City',
                key: 'city',
                dataIndex: 'city',
                width: '100px',
                ...getColumnSearchProps('city'),
            },
            {
                title: 'Role',
                key: 'role',
                dataIndex: 'designation',
                // render: item => Object.values(item)[1],
                width: '100px',
                ...getColumnSearchProps('designation'),
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '120px',
                ...getColumnSearchProps('state'),
            },
            {
                title: 'Zip',
                key: 'zip',
                dataIndex: 'zip',
                width: '100px',
                ...getColumnSearchProps('zip'),
            },
            {
                title: 'Zone',
                key: 'zone',
                dataIndex: 'zone',
                width: '100px',
                ...getColumnSearchProps('zone'),
            },
            {
                title: 'Employee WorkId',
                key: 'workId',
                dataIndex: 'workId',
                width: '100px',
                ...getColumnSearchProps('workId'),
            },
            {
                title: 'Gender',
                key: 'gender',
                dataIndex: 'gender',
                width: '100px',
                ...getColumnSearchProps('gender'),
            },
            {
                title: 'Joining Date',
                key: 'joiningDate',
                dataIndex: 'joiningDate',
                width: '100px',
                ...getColumnSearchProps('joiningDate'),
            },
            {
                title: 'Mobile Number',
                key: 'mobileNumber',
                dataIndex: 'mobile',
                width: '100px',
                ...getColumnSearchProps('mobile'),
            },
            {
                title: 'Email Address',
                key: 'emailAddress',
                dataIndex: 'email',
                width: '100px',
                ...getColumnSearchProps('email'),
            },
            {
                title: 'Team',
                key: 'divison',
                dataIndex: 'businessUnit',
                // render: item => Object.values(item)[1],
                width: '100px',
                ...getColumnSearchProps('businessUnit'),
            },
            {
                title: 'Sub Team',
                key: 'businessUnit',
                dataIndex: 'team',
                // render: item => Object.values(item)[1],
                width: '100px',
                ...getColumnSearchProps('team'),
            },
            {
                title: 'AM Email',
                key: 'amEmail',
                dataIndex: 'emailAM',
                width: '100px',
                ...getColumnSearchProps('emailAM'),
            },
            {
                title: 'RBM Email',
                key: 'rbmEmail',
                dataIndex: 'emailRM',
                width: '100px',
                ...getColumnSearchProps('emailRM'),
            },
            {
                title: 'HQ',
                key: 'hq',
                dataIndex: 'hq',
                width: '100px',
                ...getColumnSearchProps('hq'),
            },
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
            ff: {
                businessUnit: bu,
                //division:division,
                team: t,
                statusId:recipientStatus,
            },
            certificate: authInfo.token
        });
        searchData()
    }

    useEffect(() => {
        console.log(buDropdown)
        let array = [buDropdown?.map(item => item.id)]
        setBU(array[0])
    },[buDropdown])

    useEffect(() => {
        setBU(businessUnit)
    },[businessUnit])

    useEffect(() => {
        console.log(teamDropdown)
        let array = [teamDropdown?.map(item => item.id)]
        setT(array[0])
    },[teamDropdown])

    useEffect(() => {
        setT(team)
    },[team])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setTeam(value)
    }

    useEffect(() => {
        if (bu?.length === 0) {
            let array = [buDropdown?.map(item => item.id)]
            setBU(array[0])
        }
        console.log(bu)
    },[bu])

    useEffect(() => {
        if (t?.length === 0) {
            let array = [teamDropdown?.map(item => item.id)]
            setT(array[0])
        }
        console.log(t)
    },[t])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"RecipientReport.xlsx")
    }

    useEffect(() => {
        setData(recipientList.map(item => {
            return {

                //division: item.division,
                employeeCode: item.employeeCode,
                employeeName: item.employeeName,

                address: item.address,
                city : item.city,
                role: item.designation,
                state: item.state,
                zip: item.zip,
                zone: item.zone,
                //loginId: item.loginId,
                workId: item.workId,
                gender: item.gender,
                joiningDate: item.joiningDate,
                mobile: item.mobile,
                email: item.email,
                team: item.businessUnit,
                SubTeam: item.team,
                emailAM:item.emailAM,
                emailRM:item.emailRM,
                // nsmName: item.nsmName,
                // nsmCode: item.nsmCode,
                // rmName: item.rmName,
                // rmCode: item.rmCode,
                // amName: item.amName,
                // amCode: item.amCode,
                // cfa: item.cfa,
                hq: item.hq,
            }
        }))
    },[recipientList])

    // const handleDivision = (value) => {
    //     setDivision(value)
    // }

    const handleTeam = (value) => {
        setTeam(value)
    }

    return(
        <>
            <TitleWidget title="Field Force Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    SubTeam<br/>
                    <SelectTeamComponent value={team} onChange={handleTeam} multiple={'multiple'}/>
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
                        (<><CSVLink
                            data={data}
                            filename={"recipientreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>
                                &nbsp;
                        <Button onClick={handleExcel}>EXCEL</Button></>
                        )
                    }

                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{recipientList?.length}</b></span>
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
        buDropdown:PropTypes.array,
        teamDropdown:PropTypes.array,
        handleRecipientReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const recipientList = selectRecipientListData(state)
    const buDropdown = selectBuDropdown(state)
    const teamDropdown = selectTeamDropdown(state)
    return {authInfo,recipientList,profileInfo,buDropdown,teamDropdown}
}

const actions = {
    handleRecipientReportList : getRecipientReportStartAction

}

export default connect(mapState, actions)(RecipientReportComponent)
