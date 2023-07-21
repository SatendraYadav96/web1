import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Space, Table} from "antd";
import {useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import { getSpecialDispatchStartAction } from '../../redux/actions/dispatchInvoice/specialDispatchAction'
import {selectSpecialData,selectLoadingSpecialDispatchData} from "../../redux/selectors/specialDispatchSelector"
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const SpecialDispatchComponent = ({authInfo,specialData,specialDispatchLoading,handleSpecialDispatchList,profileInfo}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const history = useNavigate()
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
                title:'Plan Purpose',
                key: 'namePlan',
                dataIndex: 'namePlan',
                width:'100px',
                ...getColumnSearchProps('namePlan'),
            },
            {
                title: 'Brand Manager Name',
                key: 'nameBmRec',
                dataIndex: 'nameBmRec',
                width:'200px',
                ...getColumnSearchProps('nameBmRec'),
            },
            {
                title: 'Plan Status',
                key: 'nameStatusDip',
                dataIndex: 'nameStatusDip',
                width:'100px',
            },
            {
                title: 'Invoice Status',
                key: 'invoiceStatus',
                dataIndex: 'invoiceStatus',
                width:'100px'
            },
            {
                title: 'Approval Date',
                key: 'approvalDate',
                dataIndex: 'approvalDate',
                width:'100px'
            },
            {
                title:'',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button to="/home/dispatchInvoicing/specialDispatch/details" onClick={() => handleShow(row)}>Show</Button>
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                planPurpose: '',
                brandManagerName: '',
                planStatus:'',
                invoiceStatus: '',
                approvalDate:''
            }
        ])


}

    const  handleShow = (row) => {
        history("/home/dispatchInvoicing/specialDispatch/details", {state:
            {
                year: year,
                month: month,
                team: row.idTEM,
                status: row.idPlanStatus,
                planId: row.idDip,
            }});
    }

    const getSpecialDispatchList = () => {
        console.log(year);
        console.log(month);
        console.log(specialData);
        handleSpecialDispatchList ({
            year:year,
            month:month,
            certificate: authInfo.token
        });
        searchData()
    }

    useEffect(() => {
        console.log(specialData)
    },[specialData])

    return(
        <div>
            <TitleWidget title={'Special Dispatch'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={4}>
                    <Button type={'primary'} onClick={() => getSpecialDispatchList()}>Submit</Button>
                </Col>
            </Row>
            <br/><br/>
            <span>Total Rows: <b>{specialData?.length}</b></span>
            <Table columns={column} dataSource={specialData}/>
        </div>
    )
}

SpecialDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    specialData:PropTypes.array,
    specialDispatchLoading:PropTypes.any,
    handleSpecialDispatchList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const specialData = selectSpecialData(state)
    const specialDispatchLoading = selectLoadingSpecialDispatchData(state)
    return {authInfo,specialData, specialDispatchLoading,profileInfo}
}

const actions = {
    handleSpecialDispatchList : getSpecialDispatchStartAction
}

export default connect(mapState, actions)(SpecialDispatchComponent)
