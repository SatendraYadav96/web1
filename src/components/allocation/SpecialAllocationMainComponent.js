import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table, Space, Select} from "antd";
import { getPurchaseReportStartAction } from '../../redux/actions/reports/purchaseReportActions'
import XLSX from "xlsx"
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectStatusComponent from "../widgets/SelectStatusComponent";
import {useNavigate} from "react-router-dom";
import {deleteSpecialAllocationStartAction, getAllocationStatusDropdownStartAction, searchSpecialPlanStartAction} from "../../redux/actions/allocation/allocationActions";
import {selectDeleteSpecialAllocation, selectGetAllocationStatusDropdown, selectSearchSpecialPlan} from "../../redux/selectors/allocationSelectors";
import {toDdMmYYYY} from "../../utils/DateUtils";

const SpecialAllocationMainComponent = ({authInfo,profileInfo,purchaseList,purchaseReportLoading,
                                     handleStatusDropdown, statusDropdown,handlePurchaseReportList,
                                     handleSearchSpecialPlan, searchSpecialPlan, handleDeleteSpecialAllocation,deleteSpecialAllocation}) => {

    let now = new Date()

    const navigate = useNavigate()

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [statusDD, setStatusDD] = useState("00000000-0000-0000-0000-000000000022")
    const [remark, setRemark] = useState()
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [deleteVal, setDelete] = useState(true);


    useEffect(() => {
        handleStatusDropdown({
            certificate: authInfo.token
        })
    },[])

    const editPlan = (row) => {
        console.log(row);
        // let s = statusDropdown.find(statusDD)
        return navigate(`/home/allocations/special/${row.id}/${year}/${month}/${row.remarks}`)
    }

    const deletePlan = (row) => {
        handleDeleteSpecialAllocation({
            certificate: authInfo.token,
            dipId: row.id
        })
        return navigate(`/home/allocations/special/create`)
    }

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

    const column = [
        {
            title: 'Purpose',
            dataIndex: 'remarks',
            key: 'remarks',
            ...getColumnSearchProps('remarks'),
        },
        {
            title: 'Requested On',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ...getColumnSearchProps('createdAt'),
            render: (_,row) => {
                return toDdMmYYYY(row.createdAt)
            }
        },
        {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button icon={<EditOutlined />} disabled={row.status === "SUBMIT" || row.status === "APPROVED" || row.status === "REJECTED"} onClick={ () => editPlan(row)}  ></Button>
                }
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: `100px`,
                render: (_, row) => {
                    return <Button icon={<DeleteOutlined />} disabled={row.status === "SUBMIT" || row.status === "APPROVED" || row.status === "REJECTED"} onClick={ () => deletePlan(row)}></Button>
                }
            },
    ]



    const createAllocation = () => {
        return navigate('/home/allocations/special/createNew')
    }

    const searchData = () => {
        console.log(statusDD)
        handleSearchSpecialPlan({
            certificate: authInfo.token,
            month: month,
            year: year,
            status: statusDD,
            remark: remark
        })
        setFlag(true)

    }

    useEffect(() => {
        console.log(deleteSpecialAllocation)
        handleSearchSpecialPlan({
            certificate: authInfo.token,
            month: month,
            year: year,
            status: statusDD,
            remark: remark
        })
        setFlag(true)

    },[deleteSpecialAllocation])

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"PurchaseReport.XLSX")
    }

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    return(
        <>
            <TitleWidget title="Special Allocation" />
            <Row gutter={[8,8]}>
                <Col span={10}>
                    <Button type={"primary"} onClick={()=> createAllocation()}>New Allocation</Button>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={4}>
                    Status <br/><Select style={{ width: 140 }} onChange={(e) => setStatusDD(e)} placeholder={"Select Status"} options={statusDropdown} value={statusDD} />
                </Col>
                <Col span={6}>
                    Purpose <br/><Input value={remark} onChange={(e) => setRemark(e.target.value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={searchData} style={{width: '100%'}}>Search</Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={searchSpecialPlan}/>
            }
        </>
    )

}

SpecialAllocationMainComponent.propTypes = {
    authInfo: PropTypes.any,
    statusDropdown: PropTypes.any,
    handleStatusDropdown: PropTypes.func,
    searchSpecialPlan: PropTypes.any,
    handleSearchSpecialPlan: PropTypes.func,
    handleDeleteSpecialAllocation: PropTypes.func,
    deleteSpecialAllocation : PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const statusDropdown = selectGetAllocationStatusDropdown(state)
    const searchSpecialPlan = selectSearchSpecialPlan(state)
    const deleteSpecialAllocation =  selectDeleteSpecialAllocation(state)
    console.log(searchSpecialPlan)
    return {authInfo, statusDropdown, searchSpecialPlan,deleteSpecialAllocation}
}

const actions = {
    handlePurchaseReportList : getPurchaseReportStartAction,
    handleStatusDropdown: getAllocationStatusDropdownStartAction,
    handleSearchSpecialPlan: searchSpecialPlanStartAction,
    handleDeleteSpecialAllocation: deleteSpecialAllocationStartAction
}

export default connect(mapState, actions)(SpecialAllocationMainComponent)
