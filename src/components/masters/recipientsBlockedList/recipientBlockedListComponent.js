import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Space, Table} from "antd";
import {EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {selectBuisnessUnitListData, selectCostCenterListData, selectLoadingBuisnessUnitData, selectLoadingCostCenterData, selectMasterBlockedListData} from "../../../redux/selectors/masterSelector";
import {getBuisnessUnitStartAction, getCostCenterStartAction, getMasterBlockedListStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import SelectYearComponent from "../../widgets/SelectYearComponent";
import {selectMonthlyApprovalListData} from "../../../redux/selectors/monthlyApprovalSelector";
import {resetPlanStartAction} from "../../../redux/actions/approval/monthlyApprovalActions";
import Highlighter from "react-highlight-words";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const BusinessUnitComponent = ({authInfo,handleMasterBlockedList,masterBlockedList}) => {

    const navigate = useNavigate()
    const date = new Date();
    const currentYear = date.getFullYear();
    const [data, setData] = useState()
    const [status, setStatus] = useState(1)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [year, setYear] = useState(currentYear)
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
                key: 'name',
                dataIndex: 'employeeCode',
                width: '100px',
                ...getColumnSearchProps('employeeCode'),
            },
            {
                title: 'Employee Name',
                key: 'employeeName',
                dataIndex: 'employeeName',
                width: '100px',
                ...getColumnSearchProps('employeeName'),
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width: '100px',
                ...getColumnSearchProps('team'),
            },
            {
                title: 'Headquarter',
                key: 'headquarter',
                dataIndex: 'headquarter',
                width: '100px',
                ...getColumnSearchProps('headquarter'),
            },
            {
                title: 'AM',
                key: 'am',
                dataIndex: 'am',
                width: '100px',
                ...getColumnSearchProps('am'),
            },
            {
                title: 'RBM',
                key: 'rbm',
                dataIndex: 'rbm',
                width: '100px',
                ...getColumnSearchProps('rbm'),
            },
            {
                title: 'Month',
                key: 'month',
                dataIndex: 'month',
                width: '100px',
                ...getColumnSearchProps('month'),
            },
            {
                title: 'Year',
                key: 'year',
                dataIndex: 'year',
                width: '100px',
                ...getColumnSearchProps('year'),
            },
            {
                title: 'Blocked On',
                key: 'blockedOn',
                dataIndex: 'blocked_On',
                width: '100px',
                ...getColumnSearchProps('blockedOn'),
            },
            {
                title: 'Is Blocked',
                key: 'isBlocked',
                dataIndex: 'isBockedFF',
                width: '100px',
                ...getColumnSearchProps('isBlocked'),
            },
            {
                title: 'Remark',
                key: 'remark',
                dataIndex: 'remark',
                width: '100px',
                ...getColumnSearchProps('remark'),
            },
            {
                title: 'Blocked_Type',
                key: 'blockedType',
                dataIndex: 'blockedType',
                width: '100px',
                ...getColumnSearchProps('blockedType'),
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} onClick={() => editBusinessUnit(row)}></Button>
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

    const createBusinessUnit = () => {
        return navigate("/home/masters/businessUnit/create")
    }

    const editBusinessUnit = (row) => {
        return navigate(`/home/masters/businessUnit/edit/${row.id}`)
    }

    const getMasterBlockedList = () => {
        console.log(status);

        handleMasterBlockedList ({
            certificate: authInfo.token,
            year:year,
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"masterBlockedList.XLSX")
    }

    useEffect(() => {
        setData(masterBlockedList?.map(item => {
            return {
                'employeeCode': item.employeeCode,
                'employeeName': item.employeeName,
                'team': item.team,
                'headquarter': item.headquarter,
                'am': item.am,
                'rbm': item.rbm,
                'month': item.month,
                'year': item.year,
                'blocked_On': item.blocked_On,
                'isBockedFF': item.isBockedFF,
                'remark': item.remark,
                'blocked_type': item.blocked_type,

            }
        }))
        console.log(masterBlockedList)
    },[masterBlockedList])


    return(
        <>
            <TitleWidget title={"Master - Business Units"}/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getMasterBlockedList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button onClick={()=> createBusinessUnit()}>Save</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"masterBlockedList.csv"}
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
            <br/><br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={masterBlockedList} />
            }
        </>
    )
}

BusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const masterBlockedList = selectMasterBlockedListData(state)
    return {authInfo,masterBlockedList}
}

const actions = {
    handleResetPlanList: resetPlanStartAction,
    handleMasterBlockedList: getMasterBlockedListStartAction,
}

export default connect(mapState, actions) (BusinessUnitComponent)
