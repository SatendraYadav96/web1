import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Space, Table} from "antd";
import {EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {selectUserListData} from "../../../redux/selectors/masterSelector";
import {getUserStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";
import Highlighter from "react-highlight-words";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const UserComponent = ({authInfo,userList,handleUserList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState("1D2F12F3-F84A-4200-9590-70680528779B")
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState([])
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
                title: 'Name',
                key: 'name',
                dataIndex: 'name',
                width: '100px',
                ...getColumnSearchProps('name'),
            },
            {
                title: 'Code',
                key: 'code',
                dataIndex: 'employeeCode',
                width: '100px',
                ...getColumnSearchProps('employeeCode'),

            },
            {
                title: 'Email Address',
                key: 'email',
                dataIndex: 'email',
                width: '200px',
                ...getColumnSearchProps('email'),

            },
            {
                title: 'Designation',
                key: 'userDesignation',
                dataIndex: 'userDesignation',
                // ...getColumnSearchProps('userDesignation'),
                render: item => Object.values(item)[1],
                width: '100px',

            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'userStatus',
                // ...getColumnSearchProps('userStatus'),
                render: item => Object.values(item)[1],
                width: '100px',

            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editUser(row)}></Button>
                }
            }
        ]);

        setDataSource([
            {
                key: '1',
                name: 'ABC',
                code: ''
            }
        ])
    }

    const createUser = () => {
        return navigate("/home/masters/user/create")
    }

    const editUser = (row) => {
        return navigate(`/home/masters/user/edit/${row.id}`)
    }

    const getUserList = () => {
        console.log(status);
        console.log(userList);

        handleUserList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()
    }


    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"User.xlsx")
    }

    useEffect(() => {
        setData(userList.map(item => {
            return {
                name: item.name,
                code: item.employeeCode,
                email:item.email,
                designation:item.userDesignation.name,
                status:item.userStatus.name,

            }
        }))
    },[userList])

    return(
        <>
            <TitleWidget title={"Master - User"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectUserStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getUserList()} style={{width: '100%'}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createUser()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <CSVLink
                        data={data}
                        filename={"User.csv"}
                        onClick={() => {
                            console.log("clicked")
                        }}
                    >
                        <Button>CSV</Button>
                    </CSVLink>
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
                <Col span={12}></Col>
                {/*<Col span={6}><Input.Search/></Col>*/}
            </Row>
            <br/><br/>

            <span>Total Rows: <b>{userList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={userList} />
            }
        </>
    )
}

UserComponent.propTypes = {
    authInfo: PropTypes.any,
    userList: PropTypes.array,
    handleUserList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const userList = selectUserListData(state)
    return {authInfo,userList}
}

const actions = {
    handleUserList: getUserStartAction,
}

export default connect(mapState, actions) (UserComponent)
