import React, {useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Space, Table} from "antd";
import {Option} from "antd/es/mentions";
import {Link, useNavigate} from "react-router-dom";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import { getMonthlyDispatchStartAction } from '../../redux/actions/dispatchInvoice/monthlyDispatchAction'
import {selectMonthListData,selectLoadingMonthDispatchData} from "../../redux/selectors/monthlyDispatchSelector"
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const MonthlyDispatchComponent = ({authInfo,monthList,monthlyDispatchLoading,handleMonthlyDispatchList,profileInfo}) => {

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
                title:'Team Name',
                key: 'teamName',
                dataIndex: 'nameTEM',
                width:'100px',
                ...getColumnSearchProps('nameTEM'),

            },
            {
                title: 'Brand Manager Name',
                key: 'nameBM',
                dataIndex: 'nameBM',
                width:'200px',
                ...getColumnSearchProps('nameBM'),
            },
            {
                title: 'Plan Status',
                key: 'planStatus',
                dataIndex: 'planStatus',
                width:'100px'
            },
            {
                title: 'Invoice Status',
                key: 'invoiceStatus',
                dataIndex: 'teamStatus',
                width:'100px'
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_, row) => {
                    return <Button to="/home/dispatchInvoicing/monthlyDispatch/details" onClick={() => handleShow(row)}>Show</Button>
                }
            }
        ]);
        setDataSource([
            {
                key:'',
                teamName: '',
                brandManagerName: '',
                planStatus:'',
                invoiceStatus: ''
            }
        ])
    }

        const  handleShow = (row) => {
            history("/home/dispatchInvoicing/monthlyDispatch/details", {state:
                    {
                        year: year,
                        month: month,
                    }});
        }

    const getMonthlyDispatchList = () => {
       console.log(year);
        console.log(month);

        console.log(monthList);
        handleMonthlyDispatchList ({
            year:year,
            month:month,
            certificate: authInfo.token
        });
        searchData()
    }

    return(
        <div>
            <TitleWidget title={'Monthly Dispatch'} />
            <Row gutter={[16,16]}>
                <Col span={3}>
                    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={2}>
                    <Button type={'primary'} onClick={() => getMonthlyDispatchList()}>Submit</Button>
                </Col>
                <Col span={14}>
                    <>
                        <div align="right">
                            <Input.Search style={{ width: 300 }} />
                        </div>
                    </>
                </Col>
            </Row>
            <br/><br/>
            <Table columns={column} dataSource={monthList}/>
            {/*<br/><br/>*/}

                {/*<>*/}
                {/*    <div align="right">*/}
                {/*        <Input.Search style={{ width: 304 }} />*/}
                {/*    </div>*/}
                {/*    <br/><br/>*/}
                {/*    <Table columns={column} dataSource={monthList}/>*/}
                {/*</>*/}
        </div>
    )
}

MonthlyDispatchComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    monthList:PropTypes.array,
    monthlyDispatchLoading:PropTypes.any,
    handleMonthlyDispatchList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const monthList = selectMonthListData(state)
    const monthlyDispatchLoading = selectLoadingMonthDispatchData(state)
    return {authInfo,monthList, monthlyDispatchLoading,profileInfo}
}


const actions = {
handleMonthlyDispatchList : getMonthlyDispatchStartAction

}

export default connect(mapState, actions)(MonthlyDispatchComponent)
