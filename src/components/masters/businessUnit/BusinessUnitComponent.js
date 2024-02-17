import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Space, Table} from "antd";
import {EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {selectBuisnessUnitListData, selectCostCenterListData, selectLoadingBuisnessUnitData, selectLoadingCostCenterData} from "../../../redux/selectors/masterSelector";
import {getBuisnessUnitStartAction, getCostCenterStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import Highlighter from "react-highlight-words";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";

const BusinessUnitComponent = ({authInfo,buisnessUnitList,buisnessUnitLoading,handleBuisnessUnitList}) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState(1)
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
                dataIndex: 'code',
                width: '100px',
                ...getColumnSearchProps('code'),
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

    const getBuisnessUnitList = () => {
        console.log(status);
        console.log(buisnessUnitList);

        handleBuisnessUnitList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()
    }


    let i = 0;

    useEffect(() => {
        handleBuisnessUnitList ({
            certificate: authInfo.token,
            status:status,
        });
        searchData()

        i++;
    }, [i]);

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"BusinessUnit.xlsx")
    }

    useEffect(() => {
        setData(buisnessUnitList.map(item => {
            return {
                name: item.name,
                code: item.code,

            }
        }))
    },[buisnessUnitList])



    return(
        <>
            <TitleWidget title={"Master - Business Units"}/>
            <Row gutter={[8,8]}>
                <Col span={4}>
                    <SelectStatusComponent value={status} onChange={(e) => setStatus(e)} />
                </Col>
                <Col span={2}>
                    <Button type={"primary"} onClick={() => getBuisnessUnitList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={2}>
                    <Button icon={<PlusOutlined />} onClick={()=> createBusinessUnit()}></Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <CSVLink
                        data={data}
                        filename={"BusinessUnit.csv"}
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
            <span>Total Rows: <b>{buisnessUnitList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={buisnessUnitList} />
            }
        </>
    )
}

BusinessUnitComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    buisnessUnitList: PropTypes.array,
    buisnessUnitLoading: PropTypes.any,
    handleBuisnessUnitList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buisnessUnitList = selectBuisnessUnitListData(state)
    const buisnessUnitLoading = selectLoadingBuisnessUnitData(state)
    return {authInfo,profileInfo,buisnessUnitList,buisnessUnitLoading}
}

const actions = {
    handleBuisnessUnitList: getBuisnessUnitStartAction,
}

export default connect(mapState, actions) (BusinessUnitComponent)
