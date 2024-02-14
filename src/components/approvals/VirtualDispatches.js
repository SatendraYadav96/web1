import React, {useEffect, useRef, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Space, Table} from "antd";
import {ArrowRightOutlined, CheckOutlined, CloseCircleOutlined, CloseOutlined, InfoCircleOutlined, SearchOutlined, SyncOutlined, UnlockOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";

import {
    selectApprovePlanListData,
    selectRejectPlanListData,
    selectRejectPlanSuccess,
    selectSpecialPlanApprovalDetailsListData,
    selectSpecialPlanApprovalListData,
    selectVirtualApprovalDownload,
    selectVirtualPlanApprovalDetailsListData,
    selectVirtualPlanApprovalListData
} from "../../redux/selectors/monthlyApprovalSelector";
import {
    approvePlanStartAction,
    getMonthlyApprovalDetailsStartAction,
    getMonthlyApprovalStartAction,
    rejectPlanStartAction,
    specialPlanApprovalDetailsStartAction,
    specialPlanApprovalStartAction, virtualApprovalDownloadStartAction,
    virtualPlanApprovalDetailsStartAction,
    virtualPlanApprovalStartAction
} from "../../redux/actions/approval/monthlyApprovalActions";
import Highlighter from "react-highlight-words";
import CSVDownload from "react-csv/src/components/Download";
import XLSX from "xlsx";

const VirtualDispatchesComponent = ({authInfo,profileInfo,approvePlanList,rejectPlanList,virtualPlanApprovalList,virtualPlanApprovalDetailsList, handleRejectPlanList,
                                        rejectPlanSuccess,handleVirtualPlan, handleVirtualPlanDetails, virtualApprovalDownload, handleVirtualApprovalDownload}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [column, setColumn] = useState([])
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [details, setDetails] = useState(false)
    const searchInput = useRef(null);
    const [detailsColumn, setDetailsColumn] = useState([])
    const [openReject, setOpenReject] = useState(false)
    const [commentRejectModal, setCommentRejectModal] = useState(false)
    const [comment, setComment] = useState()
    const [planId, setPlanId] = useState()
    const [selectedItems, setSelectedItems] = useState([])
    const [view, setView] = useState(false)
    const [downloadData, setDownloadData] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [checkedArr, setCheckedArr] = useState([])


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleDetails = (row) => {
        console.log(row)
        handleVirtualPlanDetails({
            certificate: authInfo.token,
            planId: row.dispatchPlanID
        })
        setDetails(true)
    }



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

    const dataRow = []


    const handleChecked = (event,row) => {
        console.log(row)
        let invoice = row
        // event.target.checked ? setCheckedArr(current => [...current, row.invoiceNumber]) : checkedArr.filter(checked => checked.includes(row.invoiceNumber))
        if (event.target.checked) {
            setCheckedArr(current => [...current, row])

        }

        else if (event.target.checked === false) {
            setCheckedArr((current) => current.filter(checked => checked !== row))
            console.log("removed")
        }
    }


    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title: 'Tick',
                key: '',
                dataIndex: '',
                width: '30px',
                render:(_,row) => {
                    return <Checkbox onChange={(event) => handleChecked(event,row)}/>
                }
            }
            ,
            {
                title:'Team',
                key: 'teamName',
                dataIndex: 'teamName',
                width:'200px',
                ...getColumnSearchProps('teamName'),
            },
            {
                title:'Plan Purpose',
                key: 'planName',
                dataIndex: 'planName',
                width:'200px',
                ...getColumnSearchProps('planName'),
            },
            {
                title:'Brand Manager',
                key: 'userName',
                dataIndex: 'userName',
                width:'200px',
                ...getColumnSearchProps('userName'),
            },
            {
                title:'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width:'100px',
                ...getColumnSearchProps('requestedOn'),
            },
            {
                title:'Status',
                key: 'planStatus',
                dataIndex: 'planStatus',
                width:'100px',
            ...getColumnSearchProps('planStatus'),
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
                },
            },{
                title: 'Reject',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CloseOutlined />} disabled={row.planStatus === 'REVIEWED'} onClick={() => {
                        setOpenReject(true);
                        setPlanId(row.dispatchPlanID);
                    }}></Button>
                },
            },
            // {
            //     title: 'Download',
            //     key: '',
            //     dataIndex: '',
            //     width:'25px',
            //     render:(_,row) => {
            //         return <Checkbox/>
            //     },
            // },
        ]);
        setDetailsColumn([
            {
                title:'Plan Purpose',
                key: 'planPurpose',
                dataIndex: 'planPurpose',
                width:'200px',
            },
            {
                title:'Recipient Name',
                key: 'recipientName',
                dataIndex: 'recipientName',
                width:'200px',
            },
            {
                title: 'Recipient Code',
                key: 'recipientCode',
                dataIndex: 'recipientCode',
                width:'200px',
            },
            {
                title: 'Team',
                key: 'team',
                dataIndex: 'team',
                width:'200px',
            },
            {
                title: 'Cost Center',
                key: 'costCenter',
                dataIndex: 'costCenter',
                width:'200px',
            },
            {
                title: 'Item Name',
                key: 'itemName',
                dataIndex: 'itemName',
                width:'200px',
            },
            {
                title: 'Item Code',
                key: 'itemCode',
                dataIndex: 'itemCode',
                width:'200px',
            },
            {
                title: 'Quantity Allocated',
                key: 'quantity',
                dataIndex: 'quantity',
                width:'200px',
            },
            // {
            //     title: '',
            //     key: '',
            //     dataIndex: '',
            //     width: '100px',
            //     render: (_,row) => {
            //         return <Button onClick={() => setAllocationDetails(true)}>View Details</Button>
            //     }
            // }
        ]);
        setDataSource([
            {
                key:'',
                brandManager:'ARYAAN',
                status:'ACTIVE',
            }
        ])
    }

    const handleInvoice = (row) => {

    }

    const handleReject = (row) => {
        handleRejectPlanList({
            certificate: authInfo.token,
            plan: {
                // planId: row.dispatchPlanID,
                // apiId: row.dispatchPlanID,
                planId: planId,
                apiId: planId,
                approvalType: 1,
                comment: comment,
            },
        })
    }


    const searchInv = () => {
        handleVirtualPlan({
            certificate: authInfo.token,
            month: month,
            year: year,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
        })
        searchData()
    }

    useEffect(() => {
        if(rejectPlanSuccess){
            searchInv()
        }
    },[rejectPlanSuccess])



    // const rowSelection = {
    //
    //     onChange: (selectedRowKeys, selectedRows) => {
    //
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //
    //             setSelectedItems([selectedRows])
    //
    //
    //     },
    //
    //     getCheckboxProps: (row) => ({
    //         disabled: (row.stock) == 0
    //
    //
    //     }),
    //
    // }










    const handleDownload = () => {
        let data= [];
        checkedArr.forEach(i => {
            console.log(i)
                let d = {
                    'month':month,
                    'year':year,
                    'planId':i.dispatchPlanID
                }
                console.log(d)
                data.push(d)
            })
        console.log(data)
        handleVirtualApprovalDownload({
            certificate: authInfo.token,
            data: data
        })
    }

    useEffect(() => {
        console.log(virtualApprovalDownload)
        if (virtualApprovalDownload) {
            console.log("there is data")
            setDownloadData(virtualApprovalDownload.map(item => {
                return {
                    "recipientCode": item.recipientCode,
                    "recipientName": item.recipientName,
                    "designation": item.designation,
                    "address": item.address,
                    "zip": item.zip,
                    "state": item.state,
                    "city": item.city,
                    "invoiceNo": item.invoiceNo,
                    "invoiceDate": item.invoiceDate,
                    "productCode": item.productCode,
                    "productName": item.productName,
                    "brandName": item.brandName,
                    "brandCode": item.brandCode,
                    "category":item.category,
                    "batchNo":item.batchNo,
                    "dispatchedQuantity":item.dispatchedQuantity,
                    "expiryDate":item.expiryDate,
                    "subTeam":item.subTeam
                }
            }))
        } else {
            console.log('no data')
        }
        if (view) {
            if (downloadData.length > 0) {
                // csvLinkError.current.link.click()
                setView(false)
            }
        }

    },[virtualApprovalDownload])


    const handleExcel = () => {
        const wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(downloadData);
        XLSX.utils.book_append_sheet(wb,ws,"Sheet1")
        XLSX.writeFile(wb,"VirtualAllocation.xlsx")
    }

    return(
        <>
            <TitleWidget title={'Virtual Allocation Review'} />
            <Row gutter={[8,8]}>
                <Col span={3}>
                    <SelectYearComponent value={year} style={{width: "100%"}} onChange={(e) => setYear(e)}/>
                </Col>
                <Col span={3}>
                    <SelectMonthComponent value={month} style={{width: "100%"}} onChange={(e) => setMonth(e)}/>
                </Col>
                <Col span={3}>
                    <Button type={'primary'} onClick={() => searchInv()}>Submit</Button>
                </Col>
            </Row>
            <br/>
            <Row gutter={16}>
                <Space wrap style={{marginBottom:"-25px"}}>
                    <Button type="primary" onClick={()=>{handleDownload()
                        setView(true)}} >CSV</Button>


                </Space>


                {/*<Space wrap style={{marginBottom:"-25px"}}>*/}
                {/*    <Col span={3}>*/}
                {/*        <Button type={'primary'} style={{width: '100%'}} onClick={handleAllCsvDownload} >Csv All</Button>*/}
                {/*    </Col>*/}


                {/*</Space>*/}

                <Space wrap style={{marginBottom:"-25px" , marginLeft:"50px"}}>
                    <Col span={3}>
                        <Button type={'primary'} onClick={handleExcel}>Excel</Button>
                    </Col>
                </Space>
            </Row>


            <br/><br/>


            {/*{flag &&*/}
            {/*    <Table columns={column} rowSelection={{*/}
            {/*        type: 'selectionType',*/}
            {/*        ...rowSelection,*/}
            {/*    }} dataSource={virtualPlanApprovalList}/>*/}
            {/*}*/}


            <div>




                <Table

                    columns={column}
                    dataSource={virtualPlanApprovalList}
                />
            </div>


            <Modal open={details} title="Allocation For Approval" footer={null} width={"80vw"} onCancel={() => {
                setDetails(false)
            }}>
                <Table
                    columns={detailsColumn}
                    dataSource={virtualPlanApprovalDetailsList}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
            </Modal>
            {/*Plan Reject*/}
            <Modal title="Plan Reject!" open={openReject} onOk={() => {setOpenReject(false); setCommentRejectModal(true)}} onCancel={() => setOpenReject(false)}>
                <p>Are you sure, you want to reject the selected plan?</p>
            </Modal>
            <Modal title="Plan Reject!" open={commentRejectModal} onOk={handleReject} onCancel={() => setCommentRejectModal(false)}>
                <Input value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Modal>
            {downloadData.length > 0 && <CSVDownload
                data={downloadData}/>
                // target="_blank"></CSVDownload>
            }
        </>
    )
}

VirtualDispatchesComponent.propTypes = {
    authInfo: PropTypes.any,
    monthlyApprovalList: PropTypes.array,
    monthlyApprovalDetailsList: PropTypes.array,
    resetPlanList: PropTypes.array,
    rejectPlanList: PropTypes.array,
    virtualPlanApprovalDetailsList: PropTypes.array,
    handleMonthlyApproval: PropTypes.func,
    handleMonthlyApprovalDetails: PropTypes.func,
    handleApprovePlanList: PropTypes.func,
    handleVirtualPlanDetails: PropTypes.func,
    handleRejectPlanList: PropTypes.func,
    rejectPlanSuccess: PropTypes.any,
    virtualApprovalDownload: PropTypes.any,
    handleVirtualApprovalDownload: PropTypes.func
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const approvePlanList = selectApprovePlanListData(state)
    const rejectPlanList = selectRejectPlanListData(state)
    const virtualPlanApprovalList = selectVirtualPlanApprovalListData(state)
    const virtualPlanApprovalDetailsList = selectVirtualPlanApprovalDetailsListData(state)
    const rejectPlanSuccess = selectRejectPlanSuccess(state)
    const virtualApprovalDownload = selectVirtualApprovalDownload(state)
    return {authInfo,profileInfo,approvePlanList,rejectPlanList,virtualPlanApprovalList,virtualPlanApprovalDetailsList, rejectPlanSuccess, virtualApprovalDownload}
}

const actions = {
    handleMonthlyApproval: getMonthlyApprovalStartAction,
    handleMonthlyApprovalDetails: getMonthlyApprovalDetailsStartAction,
    handleApprovePlanList: approvePlanStartAction,
    handleRejectPlanList: rejectPlanStartAction,
    handleVirtualPlan: virtualPlanApprovalStartAction,
    handleVirtualPlanDetails: virtualPlanApprovalDetailsStartAction,
    handleVirtualApprovalDownload: virtualApprovalDownloadStartAction
}

export default connect(mapState, actions)(VirtualDispatchesComponent)
