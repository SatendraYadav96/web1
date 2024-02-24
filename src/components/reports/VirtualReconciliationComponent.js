import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectQuarterNameComponent from "../widgets/SelectQuarterNameComponent";
import {DownloadOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import SelectYearComponent from "../widgets/SelectYearComponent";
import {getVirtualReconciliationReportStartAction} from "../../redux/actions/reports/batchReconciliationReportActions";
import {selectVirtualReconciliationReport} from "../../redux/selectors/batchReconciliationReportSelector";
import XLSX from "xlsx";
import {CSVLink} from "react-csv";
import {businessUnitDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {getGenerateInvoiceStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import moment from "moment/moment";

const VirtualReconciliationComponent = ({authInfo, virtualReconciliationList, handleVirtualReconciliationReport,handleBusinessUnitDropDown,buDropdown,handleGenerateInvoice}) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [quarter, setQuarter] = useState()
    const [year, setYear] = useState()
    const [data, setData] = useState()
    const [division, setDivision] = useState()
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

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
                title:'Invoice No.',
                key:'',
                dataIndex:'invoiceNo',
                width:'100px',
                ...getColumnSearchProps('invoiceNo'),
            },
            {
                title: 'Download Invoice',
                key: '',
                dataIndex: '',
                width: '100px',
                render:(_,row) => {
                    return <Button icon={<DownloadOutlined />} onClick={() => handleInvoice(row)}></Button>
                },
            },
            {
                title:'Doctor Name',
                key:'',
                dataIndex:'recipientName',
                width:'200px',
                ...getColumnSearchProps('recipientName'),
            },
            {
                title:'Doctor Code',
                key:'',
                dataIndex:'recipientCode',
                width:'100px',
                ...getColumnSearchProps('recipientCode'),
            },
            {
                title:'Item Name',
                key:'',
                dataIndex:'itemName',
                width:'300px',
                ...getColumnSearchProps('itemName'),
            },
            {
                title:'Upload Item Name',
                key:'',
                dataIndex:'uploadItemName',
                width:'300px',
                ...getColumnSearchProps('uploadItemName'),
            },
            {
                title:'Item Code',
                key:'',
                dataIndex:'itemCode',
                width:'100px',
                ...getColumnSearchProps('itemCode'),
            },
            {
                title:'Batch No',
                key:'',
                dataIndex:'batchNo',
                width:'200px',
                ...getColumnSearchProps('batchNo'),
            },
            {
                title:'Upload Batch',
                key:'',
                dataIndex:'uploadBatchNo',
                width:'200px',
                ...getColumnSearchProps('uploadBatchNo'),
            },
            {
                title:'Quantity Allocated',
                key:'',
                dataIndex:'allocatedQuantity',
                width:'100px',
                ...getColumnSearchProps('allocatedQuantity'),
            },
            {
                title:'Upload Quantity',
                key:'',
                dataIndex:'uploadedQuantity',
                width:'100px',
                ...getColumnSearchProps('uploadedQuantity'),
            },

            {
                title:'RatePerItem',
                key:'',
                dataIndex:'ratePerItem',
                width:'100px',
                ...getColumnSearchProps('ratePerItem'),
            },
            {
                title:'GSTRate',
                key:'',
                dataIndex:'gstRate',
                width:'100px',
                ...getColumnSearchProps('gstRate'),
            },
            {
                title:'Amount',
                key:'',
                dataIndex:'amount',
                width:'100px',
                ...getColumnSearchProps('amount'),
            },
            {
                title:'Address',
                key:'',
                dataIndex:'address',
                width:'300px',
                ...getColumnSearchProps('address'),
            },
            {
                title:'Upload Address',
                key:'',
                dataIndex:'uploadAddress',
                width:'300px',
                ...getColumnSearchProps('uploadAddress'),
            },
            {
                title:'City',
                key:'',
                dataIndex:'city',
                width:'200px',
                ...getColumnSearchProps('city'),
            },
            {
                title:'State',
                key:'',
                dataIndex:'state',
                width:'200px',
                ...getColumnSearchProps('state'),
            },
            {
                title:'Postal Code',
                key:'',
                dataIndex:'postalCode',
                width:'200px',
                ...getColumnSearchProps('postalCode'),
            },
            {
                title:'Mobile',
                key:'',
                dataIndex:'mobile',
                width:'200px',
                ...getColumnSearchProps('mobile'),
            },
            {
                title:'FF Code',
                key:'',
                dataIndex:'ffCode',
                width:'100px',
                ...getColumnSearchProps('ffCode'),
            },
            {
                title:'FF Name',
                key:'',
                dataIndex:'ffName',
                width:'200px',
                ...getColumnSearchProps('ffName'),
            },
            {
                title:'FF Allocation Date',
                key:'',
                dataIndex:'ffAllocationDate',
                width:'200px',
                ...getColumnSearchProps('ffAllocationDate'),
            },
            {
                title:'VRL Uploaded Date',
                key:'',
                dataIndex:'vrlUploadDate',
                width:'200px',
                ...getColumnSearchProps('vrlUploadDate'),
            },
            {
                title:'Invoice Created On',
                key:'',
                dataIndex:'createdOn',
                width:'200px',
                ...getColumnSearchProps('createdOn'),
            },
            {
                title:'Business Unit',
                key:'',
                dataIndex:'businessUnit',
                width:'200px',
                ...getColumnSearchProps('businessUnit'),
            },
            {
                title:'Status',
                key:'',
                dataIndex:'status',
                width:'200px',
                ...getColumnSearchProps('status'),
            },
            {
                title:'Dispatch Date',
                key:'',
                dataIndex:'dispatchDate',
                width:'200px',
                ...getColumnSearchProps('dispatchDate'),
            },
            {
                title:'Delivery Date',
                key:'',
                dataIndex:'deliveryDate',
                width:'200px',
                ...getColumnSearchProps('deliveryDate'),
            },
            {
                title:'LR No.',
                key:'',
                dataIndex:'lrNo',
                width:'200px',
                ...getColumnSearchProps('lrNo'),
            },
            {
                title: 'Courier',
                key: '',
                dataIndex: 'courierName',
                width: '200px',
                ...getColumnSearchProps('courierName'),
            }
        ])

        setDataSource([])
    }


    const handleInvoice = (row) => {
        handleGenerateInvoice({
            inh: [
                {
                    inhId: row.invoiceHeaderID,
                    invoiceNo: `${row.invoiceNo}`,
                },
            ],
            certificate: authInfo.token
        })
    }

    const getVirtualRecon = () => {
        handleVirtualReconciliationReport({
            certificate: authInfo.token,
            startDate:formatedStartDateString,
            endDate:formatedEndDateString,
            businessUnit: bu
        })
        searchData()
    }

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"VirtualReconciliationReport.xlsx")
    }



    useEffect(() => {
        setData(virtualReconciliationList.map(item => {
            return {

                invoiceNo: item.invoiceNo,
                recipientCode: item.recipientCode,
                recipientName: item.recipientName,
                itemName: item.itemName,
                uploadItemName : item.uploadItemName,
                itemCode: item.itemCode,
                batchNo: item.batchNo,
                uploadBatchNo: item.uploadBatchNo,
                allocatedQuantity: item.allocatedQuantity,
                uploadedQuantity: item.uploadedQuantity,
                ratePerItem: item.ratePerItem,
                gstRate: item.gstRate,
                amount: item.amount,
                address: item.address,
                uploadAddress: item.uploadAddress,
                city: item.city,
                state: item.state,
                postalCode:item.postalCode,
                mobile:item.mobile,
                ffCode: item.ffCode,
                ffName: item.ffName,
                ffAllocationDate: item.ffAllocationDate,
                vrlUploadDate: item.vrlUploadDate,
                createdOn: item.createdOn,
                businessUnit: item.businessUnit,
                status: item.status,
                dispatchDate: item.dispatchDate,
                deliveryDate: item.deliveryDate,
                lrNo: item.lrNo,
                courierName: item.courierName,
            }
        }))
    },[virtualReconciliationList])


    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    useEffect(() => {
        console.log(buDropdown)
        let array = [buDropdown?.map(item => item.id)]
        setBU(array[0])
    },[buDropdown])

    useEffect(() => {
        setBU(businessUnit)
    },[businessUnit])

    const handleRefresh = () => {
        handleBusinessUnitDropDown({
            certificate: authInfo.token,
        })

    }





    return(
        <>
            <TitleWidget title="Virtual Reconciliation" />
            <Row gutter={[8,8]}>
                {/*<Col span={3}>*/}
                {/*    Quarter<br/>*/}
                {/*    <SelectQuarterNameComponent value={quarter} style={{width: "100%"}} onChange={(e) => setQuarter(e)} />*/}
                {/*</Col>*/}
                {/*<Col span={3}>*/}
                {/*    Year <br/>*/}
                {/*    <SelectYearComponent value={year} onChange={(e) => setYear(e)}/>*/}
                {/*</Col>*/}
                <Col span={3}>
                    From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date<br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Team <br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit}  multiple={'multiple'}/>
                </Col>

                <Col span={3}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getVirtualRecon()}>Search</Button>
                </Col>
            </Row>
            <br/><br/>
            <Row>

                <Col span={6}>
                    {data &&
                        (<><CSVLink
                                data={data}
                                filename={"virtualReconciliationReport.csv"}
                                onClick={() => {
                                    console.log("clicked")
                                }}
                            >
                                <Button>CSV</Button>
                            </CSVLink>
                                &nbsp;
                                <Button onClick={handleExcel}>EXCEL</Button></>
                        )
                    }

                </Col>
            </Row>
            <br/>
            <span>Total Rows: <b>{virtualReconciliationList?.length}</b></span>
            {flag &&
                <Table columns={column} scroll={{y: '100%'}} dataSource={virtualReconciliationList}/>
            }
        </>
    )

}

VirtualReconciliationComponent.propTypes = {
    authInfo: PropTypes.any,
    handleVirtualReconciliationReport: PropTypes.func,
    virtualReconciliationList: PropTypes.any
}


const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const virtualReconciliationList = selectVirtualReconciliationReport(state)
    return {authInfo, virtualReconciliationList}
}

const actions = {
    handleVirtualReconciliationReport : getVirtualReconciliationReportStartAction,
    handleBusinessUnitDropDown : businessUnitDropdownStartAction,
    handleGenerateInvoice: getGenerateInvoiceStartAction,
}

export default connect(mapState, actions)(VirtualReconciliationComponent)
