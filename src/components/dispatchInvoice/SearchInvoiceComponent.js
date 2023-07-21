import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, Input, Modal, Row, Select, Space, Table} from "antd";
import {Option} from "antd/es/mentions";
import {DownloadOutlined, FileOutlined, SearchOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {selectGenerateInvoiceListData, selectInvoiceListData, selectLoadingGenerateInvoiceData} from "../../redux/selectors/monthlyDispatchSelector";
import {selectLoadingSearchInvoiceData, selectSearchListData} from "../../redux/selectors/searchInvoiceSelector";
import {getEmployeeInvoiceDetailStartAction, getGenerateInvoiceStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import {searchInvoiceStartAction} from "../../redux/actions/dispatchInvoice/searchInvoiceAction";
import SelectRecipientComponent from "../widgets/SelectRecipientCodeComponent";
import SelectRecipientCodeComponent from "../widgets/SelectRecipientCodeComponent";
import SelectInvoiceComponent from "../widgets/SelectInvoiceComponent";
import Highlighter from "react-highlight-words";

const SearchInvoiceComponent = ({authInfo,profileInfo,searchInvoiceList,searchInvoiceLoading,handleInvoiceList,generateInvoiceList,handleGenerateInvoice}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [recipientCode, setRecipientCode] = useState("")
    const [invoiceNo, setInvoiceNo] = useState("")
    const [count, setCount] = useState(1)
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
                title:'Invoice Number',
                key: 'searchNumber',
                dataIndex: 'invoiceNo',
                width:'100px',
                ...getColumnSearchProps('invoiceNo'),
                sorter: (a, b) => a.invoiceNo - b.invoiceNo,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width:'200px',
                render:(_,row) => {
                    return <Button icon={<DownloadOutlined />} onClick={() => handleInvoice(row)}></Button>
                },
            }
        ]);
        setDataSource([
            {
                key:'',
                searchNumber:''
            }
        ])
    }

    const downloadPDF = (pdf, filename) => {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = `${filename}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        console.log("printed")
    }

    useEffect(() => {
        if(generateInvoiceList?.length !== 0) {
            setCount(0)
        }
    },[generateInvoiceList])

    useEffect(() => {
        console.log(generateInvoiceList)
        if (count === 0) {
            if(generateInvoiceList?.length !== 0) {
                generateInvoiceList?.map((invoice) => downloadPDF(invoice.content, invoice.fileName))
            } else {
                console.log("no downloads")
            }
        }
        setCount(1)
    },[count])

    const handleInvoice = (row) => {
        handleGenerateInvoice({
            inh: [
                {
                inhId: row.inhId,
                invoiceNo: `${row.invoiceNo}`,
                },
            ],
            certificate: authInfo.token
        })
    }

    const searchInv = () => {
        console.log(searchInvoiceList);
        const data = {
            monthIndex: month,
            yearIndex: year,
            recipientId: recipientCode,
            invoiceNo: invoiceNo,
        }

        handleInvoiceList({
            searchInvoice: data,
            certificate: authInfo.token
        });
        searchData()
    }

    return(
        <>
            <TitleWidget title={'Search Invoice'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={6}>
                    <SelectRecipientCodeComponent onChange={(value) => setRecipientCode(value)}/>
                </Col>
                <Col span={3}>
                    <SelectInvoiceComponent onChange={(e) => setInvoiceNo(e)}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchInv()}>Submit</Button>
                </Col>
            </Row>
            <span>Total Rows: <b>{searchInvoiceList?.length}</b></span>
            {flag &&
                <Table columns={column} dataSource={searchInvoiceList}/>
            }
        </>
    )
}

SearchInvoiceComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    searchInvoiceList:PropTypes.array,
    searchInvoiceLoading:PropTypes.any,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const searchInvoiceList = selectSearchListData(state)
    const searchInvoiceLoading = selectLoadingSearchInvoiceData(state)
    const generateInvoiceList = selectGenerateInvoiceListData(state)
    const generateInvoiceLoading = selectLoadingGenerateInvoiceData(state)
    return {authInfo,profileInfo,searchInvoiceList,searchInvoiceLoading,generateInvoiceList,generateInvoiceLoading}
}

const actions = {
    handleGenerateInvoice: getGenerateInvoiceStartAction,
    handleInvoiceList: searchInvoiceStartAction,
}

export default connect(mapState, actions)(SearchInvoiceComponent)
