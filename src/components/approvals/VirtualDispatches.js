import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Row, Space, Table} from "antd";
import {ArrowRightOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, InfoCircleOutlined, SearchOutlined, SyncOutlined, UnlockOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {selectApprovePlanListData, selectRejectPlanListData, selectSpecialPlanApprovalDetailsListData, selectSpecialPlanApprovalListData, selectVirtualPlanApprovalDetailsListData, selectVirtualPlanApprovalListData} from "../../redux/selectors/monthlyApprovalSelector";
import {
    approvePlanStartAction,
    getMonthlyApprovalDetailsStartAction,
    getMonthlyApprovalStartAction,
    rejectPlanStartAction,
    specialPlanApprovalDetailsStartAction,
    specialPlanApprovalStartAction,
    virtualPlanApprovalDetailsStartAction,
    virtualPlanApprovalStartAction
} from "../../redux/actions/approval/monthlyApprovalActions";
import Highlighter from "react-highlight-words";

const VirtualDispatchesComponent = ({authInfo,profileInfo,approvePlanList,rejectPlanList,virtualPlanApprovalList,virtualPlanApprovalDetailsList,handleVirtualPlan}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
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
                title:'Team',
                key: 'teamName',
                dataIndex: 'teamName',
                width:'200px',
                ...getColumnSearchProps('teamName'),
            },
            {
                title:'Plan Purpose',
                key: 'planName',
                dataIndex: 'planName',
                width:'200px',
                ...getColumnSearchProps('planName'),
            },
            {
                title:'Brand Manager',
                key: 'userName',
                dataIndex: 'userName',
                width:'200px',
                ...getColumnSearchProps('userName'),
            },
            {
                title:'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width:'100px',
                ...getColumnSearchProps('requestedOn'),
            },
            {
                title:'Status',
                key: 'planStatus',
                dataIndex: 'planStatus',
                width:'100px',
            ...getColumnSearchProps('planStatus'),
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>}></Button>
                },
            },{
                title: 'Reject',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CloseCircleOutlined />}></Button>
                },
            },
            {
                title: 'Download',
                key: '',
                dataIndex: '',
                width:'25px',
                render:(_,row) => {
                    return <Checkbox/>
                },
            },
        ]);
        setDataSource([
            {
                key:'',
                brandManager:'ARYAAN',
                status:'ACTIVE',
            }
        ])
    }

    const handleInvoice = (row) => {

    }

    const searchInv = () => {
        handleVirtualPlan({
            certificate: authInfo.token,
            month: month,
            year: year,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
        })
        searchData()
    }

    return(
        <>
            <TitleWidget title={'Virtual Allocation Review'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchInv()}>Submit</Button>
                </Col>
            </Row>
            <Row gutter={16}>
                <Space wrap style={{marginLeft:"1635px",marginBottom:"-25px"}}>
                    <Button type="primary"  >Download</Button>
                </Space>
            </Row>
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={virtualPlanApprovalList}/>
            }
        </>
    )
}

VirtualDispatchesComponent.propTypes = {
    authInfo: PropTypes.any,
    monthlyApprovalList: PropTypes.array,
    monthlyApprovalDetailsList: PropTypes.array,
    resetPlanList: PropTypes.array,
    rejectPlanList: PropTypes.array,
    virtualPlanApprovalDetailsList: PropTypes.array,
    handleMonthlyApproval: PropTypes.func,
    handleMonthlyApprovalDetails: PropTypes.func,
    handleApprovePlanList: PropTypes.func,
    handleVirtualPlanDetails: PropTypes.func,
    handleRejectPlanList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const approvePlanList = selectApprovePlanListData(state)
    const rejectPlanList = selectRejectPlanListData(state)
    const virtualPlanApprovalList = selectVirtualPlanApprovalListData(state)
    const virtualPlanApprovalDetailsList = selectVirtualPlanApprovalDetailsListData(state)
    return {authInfo,profileInfo,approvePlanList,rejectPlanList,virtualPlanApprovalList,virtualPlanApprovalDetailsList}
}

const actions = {
    handleMonthlyApproval: getMonthlyApprovalStartAction,
    handleMonthlyApprovalDetails: getMonthlyApprovalDetailsStartAction,
    handleApprovePlanList: approvePlanStartAction,
    handleRejectPlanList: rejectPlanStartAction,
    handleVirtualPlan: virtualPlanApprovalStartAction,
    handleVirtualPlanDetails: virtualPlanApprovalDetailsStartAction,
}

export default connect(mapState, actions)(VirtualDispatchesComponent)
