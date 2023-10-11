import React, {useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Table, Space} from "antd";
import { getPurchaseReportStartAction } from '../../redux/actions/reports/purchaseReportActions'
import XLSX from "xlsx"
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectStatusComponent from "../widgets/SelectStatusComponent";
import {useNavigate} from "react-router-dom";

const PurchaseReportComponent = ({authInfo,profileInfo,purchaseList,purchaseReportLoading,handlePurchaseReportList}) => {

    let now = new Date()

    const navigate = useNavigate()

    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [deleteVal, setDelete] = useState(true);
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

    const EditAllocation = () => {
        return navigate('/home/allocations/special/create')
    }

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Purpose',
                key:'purpose',
                dataIndex:'purpose',
                width:'100px'
            },
            {
                title:'',
                key:'requestedOn',
                dataIndex:'requestedOn',
                width:'100px'
            },
            {
                title: '',
                key: 'grnDate',
                dataIndex: 'grnDate',
                width: '100px',
                render: (_,row) => {
                    return <Button onClick={() => navigate("/home/allocations/special")}>Edit</Button>
                }
            },
            {
                title: '',
                key: 'grnDate',
                dataIndex: 'grnDate',
                width: `100px`,
                render: (_, row) => {
                    return <Button disabled={deleteVal}>Delete</Button>
                }
            },
        ])
        setDataSource([
            {
                purpose: 'Aryaan',
                requestedOn: 'Aryaan',
            }

        ])
    }

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
                    <Button type={"primary"}>New Allocation</Button>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    Status <br/><SelectStatusComponent />
                </Col>
                <Col span={3}>
                    Purpose <br/><Input />
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={searchData} style={{width: '100%'}}>Search</Button>
                </Col>
            </Row>
            <br/>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )

}

PurchaseReportComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {
    handlePurchaseReportList : getPurchaseReportStartAction
}

export default connect(mapState, actions)(PurchaseReportComponent)
