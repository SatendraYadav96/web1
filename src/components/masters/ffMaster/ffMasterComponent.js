import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Space, Table} from "antd";
import {EditOutlined, PlusOutlined, InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectRecipientCodeComponent from "../../widgets/SelectRecipientCodeComponent";
import SelectRecipientStatusComponent from "../../widgets/SelectRecipientStatusComponent";
import {selectFFHistoryByIdData, selectFFListData} from "../../../redux/selectors/masterSelector";
import {getFFHistoryByIdStartAction, getFFStartAction} from "../../../redux/actions/master/masterActions";
import Highlighter from "react-highlight-words";
import XLSX from "xlsx";
import {CSVLink} from "react-csv";

const TeamComponent = ({authInfo,ffList,handleFFList,ffHistoryList,handleFFHistoryList}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [historyColumn, setHistoryColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState("80BC3490-9F53-4C92-8DBA-3D5C7755FD73")
    const [recipientCode, setRecipientCode] = useState("")



    const [name, setName] = useState("")

    const [ffHistory, setFFHistory] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState()


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
                    color: filtered ?   '#ff4d4f' :'#1677ff',
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
                dataIndex: 'code',
                width: '100px',
                ...getColumnSearchProps('employeeCode'),
                sorter: (a, b) => a.employeeCode - b.employeeCode,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'name',
                width: '100px',
                ...getColumnSearchProps('name'),
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
                render: item => Object.values(item)[1],
                width: '100px'
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
                key: 'team',
                dataIndex: 'businessUnit',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: 'Sub Team',
                key: 'subTeam',
                dataIndex: 'team',
                render: item => Object.values(item)[1],
                width: '100px',

            },
            // {
            //     title: 'AM Name',
            //     key: 'amName',
            //     dataIndex: 'amName',
            //     width: '100px'
            // },
            // {
            //     title: 'AM Code',
            //     key: 'amCode',
            //     dataIndex: 'amCode',
            //     width: '100px'
            // },
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
                dataIndex: 'emailRBM',
                width: '100px',
                ...getColumnSearchProps('emailRBM'),
            },
            {
                title: 'HQ',
                key: 'hq',
                dataIndex: 'headQuarter',
                width: '100px',
                ...getColumnSearchProps('headQuarter'),
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px',
                ...getColumnSearchProps('remark'),
            },
            {
                title: 'IS BLOCKED',
                key: 'isBlocked',
                dataIndex: 'state',
                width: '100px',
                render: () => {
                    return <Checkbox/>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<InfoCircleOutlined/>} onClick={() => handleHistory(row)}></Button>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editTeam(row)}></Button>
                }
            }
        ]);
        setHistoryColumn([
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'teamName',
                width: '100px'
            },
            {
                title: 'Designation',
                key: 'designation',
                dataIndex: 'designationName',
                width: '100px'
            },
            {
                title: 'Contact',
                key: 'contact',
                dataIndex: 'contact',
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
                title: 'Zip',
                key: 'zip',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'CFA',
                key: 'cfa',
                dataIndex: 'cfa',
                width: '100px'
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                width: '100px'
            },
            {
                title: 'Remarks',
                key: 'remarks',
                dataIndex: 'remarks',
                width: '100px'
            },
            {
                title: 'Changed On',
                key: 'changedOnDate',
                dataIndex: 'changedOnDate',
                width: '100px'
            },
            {
                title: 'Changed By',
                key: 'changedBy',
                dataIndex: 'changedBy',
                width: '100px'
            },
        ])
        setDataSource([
            {
                key: '1',
                name: 'ABC',
                code: ''
            }
        ])
    }

    const createTeam = () => {
        return navigate("/home/masters/ffMaster/create")
    }

    const editTeam = (row) => {
        return navigate(`/home/masters/ffMaster/edit/${row.id}`)
    }

    const handleFF = () => {
        handleFFList({
            ff: {
                status: status,
                ffCode: recipientCode,
                ffName: name,
            },
            certificate: authInfo.token,
        })
        searchData()
    }

    const handleHistory = (row) => {
        handleFFHistoryList({
            certificate: authInfo.token,
            id: row.id,
        })
        setFFHistory(true)
    }

    useEffect(() => {
        setData(ffList.map(item => {
            return {
                'Employee Name': item.name,
                'Employee Code': item.code,
                'Address': item.address,
                'City': item.city,
                'Role': item.designation,
                'State': item.state,
                'Zip': item.zip,
                'Zone': item.zone,
                'Employee WorkId': item.workId,
                'Gender': item.gender,
                'Joining Date': item.joiningDate,
                'Mobile Number': item.mobile,
                'Email Address': item.email,
                'Team': item.team,
                'Sub Team': item.businessUnit,
                'AM Name': item.amName,
                'AM Code': item.amCode,
                'AM Email': item.emailAM,
                'RBM Code': item.emailRBM,
                'HQ': item.headQuarter,
                'Remark': item.remark,
            }
        }))
        console.log(ffList)
    },[ffList])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"ffmaster.XLSX")
    }

    return(
        <>
            <TitleWidget title={"Master - FF"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectRecipientStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>



               <Col span={3}>
                    {/*<SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>*/}
                    <Input value={recipientCode} onChange={(e) => setRecipientCode(e.target.value)} placeholder={"Enter Code"}></Input>
                </Col>
                <Col span={3}>
                    {/*<SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>*/}
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={"Enter Name"}></Input>

                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => handleFF()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createTeam()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"ffmaster.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={12}></Col>
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{ffList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={ffList} />
            }
            <Modal open={ffHistory} title="FF History" footer={null} width={"80vw"} onCancel={() => {
                setFFHistory(false)
            }}>
                <Table
                    columns={historyColumn}
                    dataSource={ffHistoryList}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
            </Modal>
        </>
    )
}

TeamComponent.propTypes = {
    authInfo: PropTypes.any,
    ffList: PropTypes.array,
    handleFFList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const ffList = selectFFListData(state)
    const ffHistoryList = selectFFHistoryByIdData(state)
    return {authInfo,ffList,ffHistoryList}
}

const actions = {
    handleFFList: getFFStartAction,
    handleFFHistoryList: getFFHistoryByIdStartAction,
}

export default connect(mapState, actions) (TeamComponent)
