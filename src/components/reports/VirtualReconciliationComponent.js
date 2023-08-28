import React, {useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectQuarterNameComponent from "../widgets/SelectQuarterNameComponent";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const VirtualReconciliationComponent = ({authInfo}) => {

    const [column, setColumn] = useState([])
    const [businessUnit, setBusinessUnit] = useState()
    const [quater, setQuarter] = useState()
    const [division, setDivision] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const searchInput = useRef(null);


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
                title:'Invoice No.',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Doctor Name',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Doctor Code',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Item Name',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Upload Item Name',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Item Code',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Batch No',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Upload Batch',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Quantity Allocated',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Upload Quantity',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Address',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Upload Address',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'City',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'State',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Postal Code',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Mobile',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'FF Code',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'FF Name',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'FF Allocation Date',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'VRL Uploaded Date',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Invoice Created On',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Business Unit',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Status',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Dispatch Date',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'Delivery Date',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title:'LR No.',
                key:'',
                dataIndex:'',
                width:'100px',
                ...getColumnSearchProps(''),
            },
            {
                title: 'TRN Name',
                key: '',
                dataIndex: '',
                width: '100px',
                ...getColumnSearchProps(''),
            }
        ])

        setDataSource([])
    }

    const getVirtualRecon = () => {

        searchData()
    }

    return(
        <>
            <TitleWidget title="Virtual Reconciliation" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} style={{width: "100%"}} onChange={(e) => setBusinessUnit(e)} />
                </Col>
                <Col span={3}>
                    Subteam<br/>
                    <SelectDivisionComponent value={division} style={{width: "100%"}} onChange={(e) => setDivision(e)} />
                </Col>
                <Col span={3}>
                    Quater<br/>
                    <SelectQuarterNameComponent value={quater} style={{width: "100%"}} onChange={(e) => setQuarter(e)} />
                </Col>
                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getVirtualRecon()}>Search</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>
                <Col span={6}>
                    <Button>Excel</Button> &nbsp;&nbsp; <Button>CSV</Button>
                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{dataSource?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={dataSource}/>
            }
        </>
    )

}

VirtualReconciliationComponent.propTypes = {
    authInfo: PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    return {authInfo}
}

const actions = {

}

export default connect(mapState, actions)(VirtualReconciliationComponent)
