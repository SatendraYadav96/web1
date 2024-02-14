import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Row, Select, Space, Table} from "antd";
import {EditOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import SelectUserStatusComponent from "../../widgets/SelectUserStatusComponent";
import {selectBrandListData, selectUserListData} from "../../../redux/selectors/masterSelector";
import {getBrandStartAction, getUserStartAction} from "../../../redux/actions/master/masterActions";
import SelectStatusComponent from "../../widgets/SelectStatusComponent";
import {CSVLink} from "react-csv";
import XLSX from "xlsx";
import Highlighter from "react-highlight-words";

const BrandComponent = ({authInfo,brandList,handleBrandList,profileInfo}) => {

    const navigate = useNavigate()

    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [status, setStatus] = useState(1)
    const [flag, setFlag] = useState(false)
    const [data, setData] = useState()
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
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
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
                        backgroundColor: '#ff4d4f',
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
                    return <Button icon={<EditOutlined />} onClick={() => editBrand(row)}></Button>
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

    const createBrand = () => {
        return navigate("/home/masters/brand/create")
    }

    const editBrand = (row) => {
        return navigate(`/home/masters/brand/edit/${row.id}`)
    }

    const getBrandList = () => {
        console.log(status);
        console.log(brandList);

        handleBrandList ({
            certificate: authInfo.token,
            status: status,
        });
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"Brand.xlsx")
    }

    useEffect(() => {
        setData(brandList.map(item => {
            return {
                name: item.name,
                code: item.code,
            }
        }))
        console.log(brandList)
    },[brandList])

    if(profileInfo.userDesignation.id === "2B264AFB-E2FD-483C-BD4C-C36A4E352FC5"){
        return(

            <>
                <TitleWidget title={"Brand"}/>
                <Row gutter={[8,8]}>
                    <Col span={3}>
                        <SelectStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={() => getBrandList()} style={{width: '100%'}}>Search</Button>
                    </Col>
                    {/*<Col span={2}>*/}
                    {/*    <Button icon={<PlusOutlined />} onClick={()=> createBrand()}></Button>*/}
                    {/*</Col>*/}
                </Row>
                <br/><br/>
                <Row>
                    <Col span={6}>
                        {data &&
                            (<CSVLink
                                data={data}
                                filename={"brand.csv"}
                                onClick={() => {
                                    console.log("clicked")
                                }}
                            >
                                <Button>CSV</Button>
                            </CSVLink>)}
                        &nbsp;
                        <Button onClick={handleExcel}>EXCEL</Button>
                    </Col>
                    <Col span={12}></Col>
                    {/*<Col span={6}><Input.Search/></Col>*/}
                </Row>
                <br/><br/>
                <span>Total Rows: <b>{brandList?.length}</b></span>
                {flag &&
                    <Table columns={column} scroll={{y: '100%'}} dataSource={brandList} />
                }
            </>


        )
    }else {
        return(

            <>
                <TitleWidget title={"Master - Brand"}/>
                <Row gutter={[8,8]}>
                    <Col span={3}>
                        <SelectStatusComponent value={status} onChange={(value) => setStatus(value)}/>
                    </Col>
                    <Col span={2}>
                        <Button type={"primary"} onClick={() => getBrandList()} style={{width: '100%'}}>Search</Button>
                    </Col>
                    <Col span={2}>
                        <Button icon={<PlusOutlined />} onClick={()=> createBrand()}></Button>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col span={6}>
                        {data &&
                            (<CSVLink
                                data={data}
                                filename={"brand.csv"}
                                onClick={() => {
                                    console.log("clicked")
                                }}
                            >
                                <Button>CSV</Button>
                            </CSVLink>)}
                        &nbsp;
                        <Button onClick={handleExcel}>EXCEL</Button>
                    </Col>
                    <Col span={12}></Col>
                    {/*<Col span={6}><Input.Search/></Col>*/}
                </Row>
                <br/><br/>
                <span>Total Rows: <b>{brandList?.length}</b></span>
                {flag &&
                    <Table columns={column} scroll={{y: '100%'}} dataSource={brandList} />
                }
            </>


        )
    }


}

BrandComponent.propTypes = {
    authInfo: PropTypes.any,
    brandList: PropTypes.array,
    handleBrandList: PropTypes.func,
    profileInfo: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const brandList = selectBrandListData(state)
    const profileInfo = selectProfileInfo(state)
    return {authInfo,brandList,profileInfo}
}

const actions = {
    handleBrandList: getBrandStartAction,
}

export default connect(mapState, actions) (BrandComponent)
