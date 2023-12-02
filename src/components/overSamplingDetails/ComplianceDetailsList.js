import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo} from "../../redux/selectors/authSelectors";
import {selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Col, DatePicker, Input, Row, Table, customFormat, Modal, Space} from "antd";
import {Select} from "antd/es";
import SelectBusinessUnitComponent from "../widgets/SelectBusinessUnitComponent";
import SelectDivisionComponent from "../widgets/SelectDivisionComponent";
import { getPurchaseReportStartAction } from '../../redux/actions/reports/purchaseReportActions'
import {selectPurchaseListData,selectLoadingPurchaseReportData} from "../../redux/selectors/purchaseReportSelector"
import moment from 'moment'
import {CSVLink} from "react-csv"
import XLSX from "xlsx"
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import {getComplianceDetailsStartAction, overSamplingDetailsDataStartAction, saveOverSamplingStartAction} from "../../redux/actions/compliance/nonComplianceActions";
import {selectComplianceDetailsListData, selectOverSamplingDetailData, selectSaveOverSamplingSuccess} from "../../redux/selectors/nonComplianceSelector";
import MonthlyInputPlan from "../approvals/MonthlyInputPlan";
import {InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
import SelectReasonComponent from "../widgets/SelectReasonComponent";
import {Option} from "antd/es/mentions";
import Highlighter from "react-highlight-words";


const ComplianceDetailsListComponent = ({authInfo,complianceDetailsList,handleComplianceDetailsList, handleSaveOverSampling,
                                            saveOverSamplingSuccess, handleOverSamplingDetailData, overSamplingDetailData,profileInfo}) => {

    const date = new Date()

    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()+1

    const [complianceData, setComplianceData] = useState()
    const [reason, setReason] = useState()
    const [businessUnit, setBusinessUnit] = useState()
    const [division, setDivision] = useState()
    const [startDate, setStartDate] = useState()
    const [dataFlag, setDataFlag] = useState(true)
    const [endDate, setEndDate] = useState()
    const [column, setColumn] = useState([])
    const [data, setData] = useState()
    const [dataDetail, setDataDetail] = useState()
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState(false)
    const [reasonModal, setReasonModal] = useState(false)
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
                        size="large"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="large"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="large"
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
                    color: filtered ? '#0099FFFF' : '#0099FFFF',
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

    const forceUpdate = React.useReducer(() => ({}))[1];

    // const setReason = (id, value) => {
    //     console.log(complianceData)
    //     complianceData.forEach(i => {
    //         if(i.id == id){
    //             i['reason'] = value
    //         }
    //     })
    //     setComplianceData([...complianceData])
    //     console.log(complianceData)
    // }

    const detailColumn = [
        {
            title:'Month',
            key:'month',
            dataIndex:'month',
            width:'100px'
        },
        {
            title:'Territory Name',
            key:'territoryName',
            dataIndex:'territoryName',
            width:'100px'
        },
        {
            title:'Person ID',
            key:'personId',
            dataIndex:'personId',
            width:'100px'
        },
        {
            title:'Person Name',
            key:'personName',
            dataIndex:'personName',
            width:'100px'
        },
        {
            title:'Item Category',
            key:'itemCategory',
            dataIndex:'itemCategory',
            width:'100px'
        },
        {
            title:'Item Id',
            key:'itemId',
            dataIndex:'itemId',
            width:'100px'
        },
        {
            title:'Item Name',
            key:'itemName',
            dataIndex:'itemName',
            width:'100px'
        },
        {
            title:'Batch No',
            key:'batchNo',
            dataIndex:'batchNo',
            width:'100px'
        },
        {
            title:'Quantity Distributed',
            key:'quantity',
            dataIndex:'quantity',
            width:'100px'
        },
    ]

    // const searchData = () => {
    //     if(profileInfo.userDesignation.id === "AD81065F-35E4-4488-B17B-EEA6A0E04711"){
    //         setFlag(true)
    //         setColumn([
    //             {
    //                 title:'FF Code',
    //                 key:'ffcode',
    //                 dataIndex:'ffcode',
    //                 width:'150px',
    //                 ...getColumnSearchProps('ffcode'),
    //             },
    //             {
    //                 title:'Team',
    //                 key:'team_Name',
    //                 dataIndex:'team_Name',
    //                 width:'150px',
    //                 ...getColumnSearchProps('team_Name'),
    //             },
    //             {
    //                 title: 'DR Name',
    //                 key: 'drname',
    //                 dataIndex: 'drname',
    //                 width: '150px',
    //                 ...getColumnSearchProps('drname'),
    //             },
    //             {
    //                 title: 'BU',
    //                 key: 'bu',
    //                 dataIndex: 'bu',
    //                 width: '150px',
    //                 ...getColumnSearchProps('bu'),
    //             },
    //             {
    //                 title: 'LM-1',
    //                 key: 'am',
    //                 dataIndex: 'am',
    //                 width: '150px',
    //                 ...getColumnSearchProps('am'),
    //             },
    //             {
    //                 title: 'LM-2',
    //                 key: 'rbm',
    //                 dataIndex: 'rbm',
    //                 width: '150px',
    //                 ...getColumnSearchProps('rbm'),
    //             },
    //             {
    //                 title: 'Total Samples Given',
    //                 key: 'totalsamplegiven',
    //                 dataIndex: 'totalsamplegiven',
    //                 width: '150px',
    //                 ...getColumnSearchProps('totalsamplegiven'),
    //             },
    //             {
    //                 title: 'reason',
    //                 key: 'remarks',
    //                 dataIndex: 'reason',
    //                 width: '150px',
    //                 ...getColumnSearchProps('remarks'),
    //             },
    //             {
    //                 title: 'Details',
    //                 key: '',
    //                 dataIndex: '',
    //                 width: '150px',
    //                 render:(_,row) => {
    //                     return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
    //                 },
    //             },
    //             {
    //                 title: '',
    //                 key: '',
    //                 dataIndex: '',
    //                 width: '250px',
    //                 render: (_,row) => {
    //                     return <Button type={"primary"} onClick={() => handleSaveReason(row)}>Save</Button>
    //                 }
    //             },
    //         ])
    //
    //         setDataSource([])
    //     } if(profileInfo.userDesignation.id === "24720986-A3EE-4DCA-9538-36F52625EB70"){
    //         setFlag(true)
    //         setColumn([
    //             {
    //                 title:'FF Code',
    //                 key:'ffcode',
    //                 dataIndex:'ffcode',
    //                 width:'150px',
    //                 ...getColumnSearchProps('ffcode'),
    //             },
    //             {
    //                 title:'Team',
    //                 key:'team_Name',
    //                 dataIndex:'team_Name',
    //                 width:'150px',
    //                 ...getColumnSearchProps('team_Name'),
    //             },
    //             {
    //                 title: 'DR Name',
    //                 key: 'drname',
    //                 dataIndex: 'drname',
    //                 width: '150px',
    //                 ...getColumnSearchProps('drname'),
    //             },
    //             {
    //                 title: 'BU',
    //                 key: 'bu',
    //                 dataIndex: 'bu',
    //                 width: '150px',
    //                 ...getColumnSearchProps('bu'),
    //             },
    //             {
    //                 title: 'LM-1',
    //                 key: 'am',
    //                 dataIndex: 'am',
    //                 width: '150px',
    //                 ...getColumnSearchProps('am'),
    //             },
    //             {
    //                 title: 'LM-2',
    //                 key: 'rbm',
    //                 dataIndex: 'rbm',
    //                 width: '150px',
    //                 ...getColumnSearchProps('rbm'),
    //             },
    //             {
    //                 title: 'Total Samples Given',
    //                 key: 'totalsamplegiven',
    //                 dataIndex: 'totalsamplegiven',
    //                 width: '150px',
    //                 ...getColumnSearchProps('totalsamplegiven'),
    //             },
    //
    //             {
    //                 title: 'Details',
    //                 key: '',
    //                 dataIndex: '',
    //                 width: '150px',
    //                 render:(_,row) => {
    //                     return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
    //                 },
    //             },
    //             {
    //                 title: '',
    //                 key: '',
    //                 dataIndex: '',
    //                 width: '250px',
    //                 render: (_,row) => {
    //                     return <Button type={"primary"} onClick={() => handleSaveReason(row)}>Save</Button>
    //                 }
    //             },
    //         ])
    //
    //         setDataSource([])
    //     }
    //
    // }

    const adminColumn = [
        {
            title:'FF Code',
            key:'ffcode',
            dataIndex:'ffcode',
            width:'150px',
            ...getColumnSearchProps('ffcode'),
        },
        {
            title:'Team',
            key:'team_Name',
            dataIndex:'team_Name',
            width:'150px',
            ...getColumnSearchProps('team_Name'),
        },
        {
            title: 'DR Name',
            key: 'drname',
            dataIndex: 'drname',
            width: '150px',
            ...getColumnSearchProps('drname'),
        },
        {
            title: 'BU',
            key: 'bu',
            dataIndex: 'bu',
            width: '150px',
            ...getColumnSearchProps('bu'),
        },
        {
            title: 'LM-1',
            key: 'am',
            dataIndex: 'am',
            width: '150px',
            ...getColumnSearchProps('am'),
        },
        {
            title: 'LM-2',
            key: 'rbm',
            dataIndex: 'rbm',
            width: '150px',
            ...getColumnSearchProps('rbm'),
        },
        {
            title: 'Total Samples Given',
            key: 'totalsamplegiven',
            dataIndex: 'totalsamplegiven',
            width: '150px',
            ...getColumnSearchProps('totalsamplegiven'),
        },
        {
            title: 'reason',
            key: 'remarks',
            dataIndex: 'reason',
            width: '150px',
            ...getColumnSearchProps('remarks'),
        },
        {
            title: 'Details',
            key: '',
            dataIndex: '',
            width: '150px',
            render:(_,row) => {
                return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
            },
        },
        // {
        //     title: '',
        //     key: '',
        //     dataIndex: '',
        //     width: '250px',
        //     render: (_,row) => {
        //         return <Button type={"primary"} onClick={() => handleSaveReason(row)}>Save</Button>
        //     }
        // },
    ]

    const nsmColumn = [
        {
            title:'FF Code',
            key:'ffcode',
            dataIndex:'ffcode',
            width:'150px',
            ...getColumnSearchProps('ffcode'),
        },
        {
            title:'Team',
            key:'team_Name',
            dataIndex:'team_Name',
            width:'150px',
            ...getColumnSearchProps('team_Name'),
        },
        {
            title: 'DR Name',
            key: 'drname',
            dataIndex: 'drname',
            width: '150px',
            ...getColumnSearchProps('drname'),
        },
        {
            title: 'BU',
            key: 'bu',
            dataIndex: 'bu',
            width: '150px',
            ...getColumnSearchProps('bu'),
        },
        {
            title: 'LM-1',
            key: 'am',
            dataIndex: 'am',
            width: '150px',
            ...getColumnSearchProps('am'),
        },
        {
            title: 'LM-2',
            key: 'rbm',
            dataIndex: 'rbm',
            width: '150px',
            ...getColumnSearchProps('rbm'),
        },
        {
            title: 'Total Samples Given',
            key: 'totalsamplegiven',
            dataIndex: 'totalsamplegiven',
            width: '150px',
            ...getColumnSearchProps('totalsamplegiven'),
        },
        // {
        //     title: 'Remark',
        //     key: 'remarks',
        //     dataIndex: 'remarks',
        //     width: '150px',
        //     ...getColumnSearchProps('remarks'),
        // },

        {
            title: 'Details',
            key: '',
            dataIndex: '',
            width: '150px',
            render:(_,row) => {
                return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
            },
        },
        {
            title: '',
            key: '',
            dataIndex: '',
            width: '250px',
            render: (_,row) => {
                return <Button type={"primary"} onClick={() => handleSaveReason(row)}>Save</Button>
            }
        },

    ]

    const formatedStartDateString = moment(startDate).format('yyyy-MM-DD').toString();
    const formatedEndDateString = moment(endDate).format('yyyy-MM-DD').toString();

    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"complianceDetailsList.XLSX")
    }

    useEffect(() => {
        if(profileInfo.userDesignation.id === "AD81065F-35E4-4488-B17B-EEA6A0E04711"){
            setData(complianceDetailsList?.map(item => {
                return {
                    'FF Code': item.ffcode,
                    'Team': item.team_Name,
                    'DR Name': item.drname,
                    'BU': item.bu,
                    'LM-1': item.am,
                    'LM-2': item.rbm,
                    'Total Sample Given': item.totalsamplegiven,
                    'Reason': item.reason,

                }
            }))
            console.log(complianceDetailsList)
        } else{
            setData(complianceDetailsList?.map(item => {
                return {
                    'FF Code': item.ffcode,
                    'Team': item.team_Name,
                    'DR Name': item.drname,
                    'BU': item.bu,
                    'LM-1': item.am,
                    'LM-2': item.rbm,
                    'Total Sample Given': item.totalsamplegiven,
                    'Remark': item.remark,


                }
            }))
            console.log(complianceDetailsList)
        }

    },[complianceDetailsList])


    const handleDetailExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(dataDetail);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"overSamplingDetailData.XLSX")
    }

    useEffect(() => {

        setDataDetail(overSamplingDetailData?.map(item => {
            return {
                'month': item.month,
                'territoryName': item.territoryName,
                'personId': item.personId,
                'personName': item.personName,
                'itemCategory': item.itemCategory,
                'itemId': item.itemId,
                'itemName': item.itemName,
                'batchNo': item.batchNo,
                'quantity':item.quantity
            }
        }))
        console.log(overSamplingDetailData)
    },[overSamplingDetailData])

    const handleBusinessUnit = (value) =>  {
        setBusinessUnit(value)
    }

    const handleDivision = (value) => {
        setDivision(value)
    }

    const getComplianceDetails = () => {

        handleComplianceDetailsList({
            certificate: authInfo.token,
            month: month,
            year: year,
        })
        // setDataFlag(true)
    }

    const handleDetails = (row) => {
        handleOverSamplingDetailData({
            certificate: authInfo.token,
            month: month,
            year: year,
            ffTerritory: row.ffcode,
            personCode: row.dr_ID
        })
        setDetails(true)
    }

    const handleSaveReason = (row) => {
        setComplianceData(row)
        setReasonModal(true)
    }

    const saveOverSampling = () => {
        let data = []
            let d = {
                "id" :complianceData.id,
                "reason" :reason,
                "remark" :complianceData.remarks
            }
            data.push(d)
        handleSaveOverSampling({
            certificate: authInfo.token,
            data: data
        })
        setReason('')
        setReasonModal(false)
    }

    useEffect(()=>{
        //searchData()
        handleComplianceDetailsList({
            certificate: authInfo.token,
            month: month,
            year: year,
        })
    },[saveOverSamplingSuccess])


    return(
        <>
            <TitleWidget title="Compliance Details List" />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    Month<br/>
                    <SelectMonthComponent value={month} onChange={(value) => setMonth(value)}/>
                </Col>
                <Col span={3}>
                    Year<br/>
                    <SelectYearComponent value={year} onChange={(value) => setYear(value)}/>
                </Col>
                <Col span={2}>
                    <br/>
                    <Button type={"primary"} onClick={()=>getComplianceDetails()} style={{width: "100%"}}>Search</Button>
                </Col>
                <Col span={16}>
                    {/*<div align='right'>*/}
                    {/*    <br/>*/}
                    {/*    <Button type={"primary"} onClick={()=> saveOverSampling()}>Save</Button>*/}
                    {/*</div>*/}
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={6}>
                    {data &&
                        (
                            <>
                                <CSVLink
                                    data={data}
                                    filename={"complianceDetailsList.csv"}
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                >
                                    <Button>CSV</Button>
                                </CSVLink>
                                &nbsp;
                                <Button onClick={handleExcel}>EXCEL</Button>
                                &nbsp;
                                {/*<Button onClick={handleDetailExcel} >Details</Button>*/}
                            </>
                        )
                    }

                </Col>
            </Row>
            <br/>

                <Table columns={(profileInfo.userDesignation.id === "AD81065F-35E4-4488-B17B-EEA6A0E04711") ? adminColumn : nsmColumn} scroll={{y: '100%'}} dataSource={complianceDetailsList}/>

            <Modal open={details} title="Compliance Details" footer={null} width={"80vw"} onCancel={() => {
                setDetails(false)
            }}>
                <Table columns={detailColumn} dataSource={overSamplingDetailData} />
            </Modal>
            <Modal open={reasonModal} title="Save" width={"80vw"}  onCancel={() => {
                setReasonModal(false)}} onOk={() => saveOverSampling()} okText={'Save'}>
                <SelectReasonComponent placeholder={"Select Reason"}  value={reason} onChange={e => setReason(e)}></SelectReasonComponent>
            </Modal>
        </>
    )
}

ComplianceDetailsListComponent.propTypes = {
    authInfo: PropTypes.any,
    complianceDetailsList: PropTypes.any,
    handleComplianceDetailsList: PropTypes.func,
    handleSaveOverSampling: PropTypes.func,
    saveOverSamplingSuccess: PropTypes.any,
    handleOverSamplingDetailData: PropTypes.func,
    overSamplingDetailData: PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const complianceDetailsList= selectComplianceDetailsListData(state)
    const saveOverSamplingSuccess = selectSaveOverSamplingSuccess(state)
    const overSamplingDetailData = selectOverSamplingDetailData(state)
    const profileInfo = selectProfileInfo(state)
    console.log(complianceDetailsList)
    return {authInfo,complianceDetailsList, saveOverSamplingSuccess,profileInfo, overSamplingDetailData}
}

const actions = {
    handleComplianceDetailsList : getComplianceDetailsStartAction,
    handleSaveOverSampling :saveOverSamplingStartAction,
    handleOverSamplingDetailData: overSamplingDetailsDataStartAction
}

export default connect(mapState, actions)(ComplianceDetailsListComponent)
