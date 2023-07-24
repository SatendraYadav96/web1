import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Space, Table} from "antd";
import {Select} from "antd/es";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import SelectFilterPlanComponent from "../widgets/SelectFilterPlanComponent";
import SelectTeamComponent from "../widgets/SelectTeamComponent";
import { getDispatchRegisterReportStartAction } from '../../redux/actions/reports/dispatchRegisterReportActions'
import {selectDispatchRegisterListData,selectLoadingDispatchRegisterReportData} from "../../redux/selectors/dispatchRegisterReportSelector"
import moment from 'moment'
import dayjs from "dayjs";
import {CSVLink} from "react-csv";
import XLSX from "xlsx"
import {DownloadOutlined, SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {selectBuDropdown, selectDivisionDropdown, selectTeamDropdown} from "../../redux/selectors/dropDownSelector";
import {businessUnitDropdownStartAction, divisionDropdownStartAction, teamDropdownStartAction} from "../../redux/actions/dropDown/dropDownActions";
import {Link} from "react-router-dom";
import {getGenerateInvoiceStartAction} from "../../redux/actions/dispatchInvoice/monthlyDispatchAction";
import {selectGenerateInvoiceListData} from "../../redux/selectors/monthlyDispatchSelector";

const DispatchReportComponent = ({authInfo,profileInfo,dispatchRegisterList,dispatchRegisterReportLoading,handleDispatchRegisterReportList,buDropdown,divisionDropdown,teamDropdown,handleBusinessUnitDropDown,handleDivisionDropDown,handleTeamDropDown,handleGenerateInvoice,generateInvoiceList}) => {

    let now = dayjs()
    const [filterPlan, setFilterPlan] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [data, setData] = useState()
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [businessUnit, setBusinessUnit] = useState()
    const [bu, setBU] = useState()
    const [division, setDivision] = useState()
    const [d, setD] = useState()
    const [team, setTeam] = useState()
    const [count, setCount] = useState(1)
    const [t, setT] = useState()
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
                key:'businessUnit',
                dataIndex:'businessUnit',
                width:'100px'
            },

            {
                title: 'LR No.',
                key: 'lrno',
                dataIndex: 'lrno',
                width: '100px',
                ...getColumnSearchProps('lrno'),
                sorter: (a, b) => a.lrno - b.lrno,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Courier Name',
                key: '',
                dataIndex: 'courierName',
                width: '100px'
            },
            {
                title: 'No Of Boxes',
                key: 'noOfBoxes',
                dataIndex: 'noOfBoxes',
                width: '100px'
            },
            {
                title: 'Weight',
                key: 'weight',
                dataIndex: 'weight',
                width: '100px'
            },
            {
                title: 'Invoice No',
                key: 'invoiceNo',
                dataIndex: 'invoiceNo',
                width: '100px',
                ...getColumnSearchProps('invoiceNo'),
                sorter: (a, b) => a.invoiceNo - b.invoiceNo,
                sortDirections: ['descend', 'ascend'],
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
                title: 'Sample Value',
                key: '',
                dataIndex: 'sampleValue',
                width: '100px'
            },
            {
                title: 'Item Value',
                key: '',
                dataIndex: 'itemValue',
                width: '100px'
            },
            {
                title: 'Invoice Value',
                key: '',
                dataIndex: 'values',
                width: '100px'
            },
            {
                title: 'Invoice Date',
                key: '',
                dataIndex: 'invoiceDate',
                width: '120px'
            },
            {
                title: 'Recipient',
                key: 'recipient',
                dataIndex: 'recipient',
                width: '150px',
                ...getColumnSearchProps('recipient'),
            },
            {
                title: 'Designation',
                key: '',
                dataIndex: 'designation',
                width: '150px'
            },
            {
                title: 'Employee Code',
                key: 'employeeCode',
                dataIndex: 'employeeCode',
                width: '150px',
                ...getColumnSearchProps('employeeCode'),
                sorter: (a, b) => a.employeeCode - b.employeeCode,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Address',
                key: '',
                dataIndex: 'address',
                width: '300px'
            },
            {
                title: 'City',
                key: '',
                dataIndex: 'city',
                width: '100px'
            },
            {
                title: 'State',
                key: '',
                dataIndex: 'state',
                width: '100px'
            },
            {
                title: 'Zip',
                key: '',
                dataIndex: 'zip',
                width: '100px'
            },
            {
                title: 'Mobile No',
                key: '',
                dataIndex: 'mobileNo',
                width: '120px'
            },
            {
                title: 'Sub Team',
                key: '',
                dataIndex: 'teamName',
                width: '100px'
            },
            {
                title: 'Name of Receiver',
                key: '',
                dataIndex: 'nameofReceiver',
                width: '100px'
            },
            {
                title: 'Date of Delivery',
                key: '',
                dataIndex: 'dateofDelivery',
                width: '100px'
            },
            {
                title: 'Courier Cost',
                key: '',
                dataIndex: 'cost',
                width: '100px'
            }
        ])

        setDataSource([])
    }


    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const getDispatchRegisterReportList = () => {
         console.log(businessUnit);
         console.log(formatedStartDateString);
         console.log(formatedEndDateString);
         console.log(profileInfo.id);
         console.log(profileInfo.userDesignation.id);
         console.log(filterPlan);
         console.log(team);

         console.log(dispatchRegisterList);

        handleDispatchRegisterReportList ({
            dispReg: {
                businessUnit:bu,
                division:d,
                startDate:formatedStartDateString,
                endDate:formatedEndDateString,
                userId: profileInfo.id,
                userDesgId: profileInfo.userDesignation.id,
                team:t,
                filterPlan:filterPlan,
                statusId:"00000000-0000-0000-0000-000000000000",
            },
            certificate: authInfo.token
        });
        searchData()
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
                console.log("no download")
            }
        }
        setCount(1)
    },[count])

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

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"DispatchRegisterReport.xlsx")
    }

    useEffect(() => {
        setData(dispatchRegisterList.map(item => {
            return {
                team: item.businessUnit,
                lrNo: item.lrNo,
                courierName: item.courierName,
                noBoxes: item.noOfBoxes,
                weights: item.weight,
                invoiceNo: item.invoiceNo,
                sampleValue: item.sampleValue,
                itemValue: item.itemValue,
                invoiceValue: item.value,
                invoiceDate: item.invoiceDate,
                recipient: item.recipient,
                designation: item.designation,
                employeeCode: item.employeeCode,
                address: item.address,
                city: item.city,
                state: item.state,
                zip: item.zip,
                mobileNo: item.mobileNo,
                teamName: item.teamName,
                nameofReceiver: item.nameofReceiver,
                dateofDelivery: item.dateofDelivery,
                "Courier Cost": item.cost,
            }
        }))
        console.log(dispatchRegisterList)
    },[dispatchRegisterList])

    useEffect(() => {
        console.log(buDropdown)
        let array = [buDropdown?.map(item => item.id)]
        setBU(array[0])
    },[buDropdown])

    useEffect(() => {
        setBU(businessUnit)
    },[businessUnit])

    useEffect(() => {
        console.log(divisionDropdown)
        let array = [divisionDropdown?.map(item => item.id)]
        setD(array[0])
    },[divisionDropdown])

    useEffect(() => {
        setD(division)
    },[division])

    useEffect(() => {
        console.log(teamDropdown)
        let array = [teamDropdown?.map(item => item.id)]
        setT(array[0])
    },[teamDropdown])

    useEffect(() => {
        setT(team)
    },[team])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    useEffect(() => {
        if (bu?.length === 0) {
            let array = [buDropdown?.map(item => item.id)]
            setBU(array[0])
        }
        console.log(bu)
    },[bu])

    useEffect(() => {
        if (d?.length === 0) {
            let array = [divisionDropdown?.map(item => item.id)]
            setD(array[0])
        }
        console.log(d)
    },[d])

    useEffect(() => {
        if (t?.length === 0) {
            let array = [teamDropdown?.map(item => item.id)]
            setT(array[0])
        }
        console.log(t)
    },[t])

    const handleRefresh = () => {
        handleBusinessUnitDropDown({
            certificate: authInfo.token,
        })
        handleDivisionDropDown({
            certificate: authInfo.token,
        })
        handleTeamDropDown ({
            certificate: authInfo.token,
        })
    }

    return(
        <>
            <TitleWidget title="Dispatch Register Report" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Team<br/>
                    <SelectBusinessUnitComponent value={businessUnit} onChange={handleBusinessUnit}  multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Division<br/>
                    <SelectDivisionComponent value={division} onChange={handleDivision}  multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    Sub Team <br/>
                    <SelectTeamComponent value={team} style={{width: "100%"}} onChange={(e) => setTeam(e)} multiple={'multiple'}/>
                </Col>
                <Col span={3}>
                    From Date <br/><DatePicker value={startDate} onChange={(e) => setStartDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().startOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    To Date<br/><DatePicker value={endDate} onChange={(e) => setEndDate(e)} format={"DD/MM/YYYY"} defaultValue={moment().endOf('month')} style={{width: "100%"}}/>
                </Col>
                <Col span={3}>
                    Plan Type<br/>
                    <SelectFilterPlanComponent value={filterPlan} onChange={(e) => setFilterPlan(e)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getDispatchRegisterReportList()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button onClick={()=>handleRefresh()} style={{width: "100%"}}>Refresh</Button>
                </Col>
            </Row>
            {/*<Row gutter={[16,16]}>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectBusinessUnitComponent value={businessUnit} onChange={(e) => setBusinessUnit(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectDivisionComponent value={division} onChange={(e) => setDivision(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectTeamComponent value={team} onChange={(e) => setTeam(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <SelectFilterPlanComponent value={filterPlan} onChange={(e) => setFilterPlan(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        Dispatch Date <DatePicker value={startDate} onChange={(e) => setStartDate(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={6}>*/}
            {/*        <DatePicker value={endDate}  onChange={(e) => setEndDate(e)} />*/}
            {/*    </Col>*/}
            {/*    <Col span={4}>*/}
            {/*        <Button type={"primary"} onClick={()=>getDispatchRegisterReportList()}>Search</Button>*/}
            {/*    </Col>*/}
            {/*    <Col span={4}></Col>*/}
            {/*</Row>*/}
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (<CSVLink
                            data={data}
                            filename={"dispatchregisterreport.csv"}
                            onClick={() => {
                                console.log("clicked")
                            }}
                        >
                            <Button>CSV</Button>
                        </CSVLink>)}
                    &nbsp;
                    <Button onClick={handleExcel}>EXCEL</Button>
                </Col>
            </Row>
            <br/>
            {flag && (
                <>
                    <span>Total Rows: <b>{dispatchRegisterList?.length}</b></span>
                    <Table
                        columns={column}
                        scroll={{y: '100%'}}
                        dataSource={dispatchRegisterList}
                        // pagination={false}
                        // footer={(currentPageData) => {
                        //     // console.log(currentPageData);
                        //     return <span>{currentPageData.length}</span>;
                        // }}
                    />
                </>
                )
            }
        </>
    )

}

DispatchReportComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    buDropdown:PropTypes.array,
    teamDropdown:PropTypes.array,
    divisionDropdown:PropTypes.array,
    dispatchRegisterList:PropTypes.array,
    dispatchRegisterReportLoading:PropTypes.any,
    handleDispatchRegisterReportList:PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const buDropdown = selectBuDropdown(state)
    const teamDropdown = selectTeamDropdown(state)
    const divisionDropdown = selectDivisionDropdown(state)
    const generateInvoiceList = selectGenerateInvoiceListData(state)
    const dispatchRegisterList = selectDispatchRegisterListData(state)
    const dispatchRegisterReportLoading = selectLoadingDispatchRegisterReportData(state)
    return {authInfo,dispatchRegisterList,dispatchRegisterReportLoading,profileInfo,buDropdown,divisionDropdown,teamDropdown,generateInvoiceList}
}

const actions = {
    handleDispatchRegisterReportList : getDispatchRegisterReportStartAction,
    handleBusinessUnitDropDown : businessUnitDropdownStartAction,
    handleDivisionDropDown : divisionDropdownStartAction,
    handleGenerateInvoice: getGenerateInvoiceStartAction,
    handleTeamDropDown : teamDropdownStartAction

}

export default connect(mapState, actions)(DispatchReportComponent)
