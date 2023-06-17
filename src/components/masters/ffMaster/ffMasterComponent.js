import React, {useRef, useState} from "react";
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

const TeamComponent = ({authInfo,ffList,handleFFList,ffHistoryList,handleFFHistoryList}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [historyColumn, setHistoryColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState("80BC3490-9F53-4C92-8DBA-3D5C7755FD73")
    const [recipientCode, setRecipientCode] = useState("")
    const [ffHistory, setFFHistory] = useState(false)
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
                    color: filtered ? '#1677ff' : undefined,
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
                width: '100px'
            },
            {
                title: 'Zip',
                key: 'zip',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'Zone',
                key: 'zone',
                dataIndex: 'zone',
                width: '100px'
            },
            {
                title: 'Employee WorkId',
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
                title: 'Mobile Number',
                key: 'mobileNumber',
                dataIndex: 'mobile',
                width: '100px'
            },
            {
                title: 'Email Address',
                key: 'emailAddress',
                dataIndex: 'email',
                width: '100px'
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: 'Sub Team',
                key: 'subTeam',
                dataIndex: 'businessUnit',
                render: item => Object.values(item)[1],
                width: '100px'
            },
            {
                title: 'AM Name',
                key: 'amName',
                dataIndex: 'amName',
                width: '100px'
            },
            {
                title: 'AM Code',
                key: 'amCode',
                dataIndex: 'amCode',
                width: '100px'
            },
            {
                title: 'AM Email',
                key: 'amEmail',
                dataIndex: 'emailAM',
                width: '100px'
            },
            {
                title: 'RBM Email',
                key: 'rbmEmail',
                dataIndex: 'emailRBM',
                width: '100px'
            },
            {
                title: 'HQ',
                key: 'hq',
                dataIndex: 'headQuarter',
                width: '100px'
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px'
            },
            {
                title: 'State',
                key: 'state',
                dataIndex: 'state',
                width: '100px'
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
                dataIndex: 'team',
                width: '100px'
            },
            {
                title: 'Designation',
                key: 'designation',
                dataIndex: 'designation',
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
                ffName: "",
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

    return(
        <>
            <TitleWidget title={"Master - FF"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectRecipientStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={6}>
                    <SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>
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
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
                <Col span={12}></Col>
                <Col span={6}><Input.Search/></Col>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={ffList} />
            }
            <Modal open={ffHistory} title="Recipient Invoices" footer={null} width={"80vw"} onCancel={() => {
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
