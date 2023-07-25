import React, {useEffect, useState} from "react";
import TitleWidget from "../../widgets/TitleWidget";
import PropTypes from "prop-types";
import {selectAuthInfo, selectProfileInfo} from "../../redux/selectors/authSelectors";
import {connect} from "react-redux";
import {Button, Checkbox, Col, Input, Modal, Row, Select, Table} from "antd";
import {ArrowRightOutlined, CheckOutlined, CloseOutlined, InfoCircleOutlined,  SyncOutlined, UnlockOutlined} from "@ant-design/icons";
import SelectMonthComponent from "../widgets/SelectMonthComponent";
import SelectYearComponent from "../widgets/SelectYearComponent";
import SelectRecipientCodeComponent from "../widgets/SelectRecipientCodeComponent";
import {
    selectApprovePlanListData,
    selectMonthlyApprovalDetailsListData,
    selectMonthlyApprovalListData,
    selectMonthlyToSpecialListData,
    selectRejectPlanListData,
    selectResetPlanListData, selectSpecialPlanApprovalDetailsListData,
    selectSpecialPlanApprovalListData,
    selectUnlockPlanListData
} from "../../redux/selectors/monthlyApprovalSelector";
import {
    approvePlanStartAction,
    getMonthlyApprovalDetailsStartAction,
    getMonthlyApprovalStartAction,
    monthlyToSpecialStartAction,
    rejectPlanStartAction,
    resetPlanStartAction,
    specialPlanApprovalDetailsStartAction,
    specialPlanApprovalStartAction,
    unlockPlanStartAction
} from "../../redux/actions/approval/monthlyApprovalActions";

const AllocationDetails = () => {
    const [column, setColumn] = useState([
        {
            title:'Team',
            key: 'team',
            dataIndex: 'team',
            width:'200px',
        },
        {
            title:'Members',
            key: 'members',
            dataIndex: 'members',
            width:'200px',
        },
        {
            title:'Allocated',
            key: 'allocated',
            dataIndex: 'allocated',
            width:'200px',
        },
        {
            title: 'Allocate',
            key: '',
            dataIndex: '',
            width: '100px',
            render: (_,row) => {
                return <Input disabled/>
            }
        }
    ])
    const [dataSource, setDataSource]= useState([
        {
            key:'',
            team:'ARYAAN',
            members:'ARYAAN',
            allocated:'ARYAAN',
        }
    ])
    const [details, setDetails] = useState(false)

    return (
        <>
            <TitleWidget title={'Monthly Allocation Review'} />
            <h2>Cost Center</h2>
            <Row gutter={[8,8]}>
                <Col span={6}>
                    Available Stock
                </Col>
                <Col span={6}>
                    0
                </Col>
                <Col span={6}>
                    Item
                </Col>
                <Col span={6}>
                    EUNYKTA 2's
                </Col>
            </Row>
            <Row gutter={[8,8]}>
                <Col span={6}>
                    PO No.
                </Col>
                <Col span={6}>
                    O2PFH0007
                </Col>
                <Col span={6}>
                    Expiry Date
                </Col>
                <Col span={6}>
                    2024-09-29
                </Col>
            </Row>
            <Row gutter={[8,8]}>
                <Col span={6}>
                    Quantity Allocated
                </Col>
                <Col span={6}>
                    5800
                </Col>
                <Col span={6}>
                    Base Pack
                </Col>
                <Col span={6}>
                    25
                </Col>
            </Row>
            <Row gutter={[8,8]}>
                <Col span={6}>
                    Tag to QTR plan
                </Col>
                <Col span={6}>
                    <Select placeholder="Select Quater"/>
                </Col>
                <Col span={6}>
                    Item Category
                </Col>
                <Col span={6}>
                    <Select placeholder="Select ItemCategory"/>
                </Col>
            </Row>
            <br/>
            <div style={{border: "1px solid black"}}>
                <Table
                    columns={column}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
                <br/>
                <Row gutter={[8,8]}>
                    <Col span={22}></Col>
                    <Col span={2}>
                        <Button type="primary">View Details</Button>
                    </Col>
                </Row>
                <br/>
            </div>
        </>
    )
}

const SpecialDispatchesComponent = ({authInfo,specialPlanApprovalList,profileInfo,handleMonthlyApproval,monthlyApprovalDetailsList,handleSpecialPlan,handleMonthlyApprovalDetails,handleResetPlanList,handleUnlockPlanList,handleApprovePlanList,handleRejectPlanList,handleMonthlyToSpecialList,specialPlanApprovalDetailsList,handleSpecialPlanDetails}) => {

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth()+1;
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [planYear, setPlanYear] = useState()
    const [planMonth, setPlanMonth] = useState()
    const [column, setColumn] = useState([])
    const [detailsColumn, setDetailsColumn] = useState([])
    const [planColumn, setPlanColumn] = useState([])
    const [allocationDetails, setAllocationDetails] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState(false)
    const [open, setOpen] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [openMonthlyToSpecial, setOpenMonthlyToSpecial] = useState(false)
    const [planId, setPlanId] = useState()
    const [commentModal, setCommentModal] = useState(false)
    const [commentRejectModal, setCommentRejectModal] = useState(false)
    const [comment, setComment] = useState()
    const [planPurpose, setPlanPurpose] = useState()
    const [checked, setChecked] = useState(false);

    const searchData = () => {
        setFlag(true)
        setColumn([
            {
                title:'Plan Purpose',
                key: 'planName',
                dataIndex: 'planName',
                width:'200px',
            },
            {
                title:'Brand Manager',
                key: 'userName',
                dataIndex: 'userName',
                width:'200px',
            },
            {
                title:'Requested On',
                key: 'requestedOn',
                dataIndex: 'requestedOn',
                width:'100px',
            },
            {
                title:'Status',
                key: 'planStatus',
                dataIndex: 'planStatus',
                width:'100px',
            },
            {
                title: 'Details',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<InfoCircleOutlined/>} onClick={() => handleDetails(row)}></Button>
                },
            },
            {
                title: 'Review',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CheckOutlined />} onClick={() => {
                        setOpen(true);
                        setPlanId(row.dispatchPlanID);
                    }}></Button>
                },
            },
            {
                title: 'Reject',
                key: '',
                dataIndex: '',
                width:'50px',
                render:(_,row) => {
                    return <Button icon={<CloseOutlined />} onClick={() => {
                        setOpenReject(true);
                        setPlanId(row.dispatchPlanID);
                    }}></Button>
                },
            },
            {
                title:'Approved By',
                key: 'approvedBy',
                dataIndex: 'approvedBy',
                width:'100px',
            },

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
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Button onClick={() => setAllocationDetails(true)}>View Details</Button>
                }
            }
        ]);
        setPlanColumn([
            {
                title: 'Month',
                key: '',
                dataIndex: 'month',
                width:'100px',
                render:(_,row) => {
                    return <SelectMonthComponent onChange={(e) => setPlanMonth(e)}/>
                },
            },
            {
                title: 'Year',
                key: '',
                dataIndex: 'year',
                width:'100px',
                render:(_,row) => {
                    return <SelectYearComponent onChange={(e) => setPlanYear(e)}/>
                },
            },
            {
                title: 'Plan Purpose',
                key: '',
                dataIndex: 'planPurpose',
                width:'200px',
                render:(_,row) => {
                    return <Input placeholder='PLAN PURPOSE' onChange={(e) => setPlanPurpose(e.target.value)}/>
                },
            },
            {
                title: '',
                key: '',
                dataIndex: '',
                width: '100px',
                render: (_,row) => {
                    return <Checkbox checked={checked} onChange={handleChange}></Checkbox>
                }
            }
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

    const searchInv = () => {
        handleSpecialPlan({
            certificate: authInfo.token,
            month: month,
            year: year,
            userId: profileInfo.id,
            userDesgId: profileInfo.userDesignation.id,
        })
        searchData()
    }

    const handleDetails = (row) => {
        handleSpecialPlanDetails({
            certificate: authInfo.token,
            planId: row.dispatchPlanID,
        })
        setDetails(true)
    }

    const handleReview = () => {
        handleApprovePlanList({
            certificate: authInfo.token,
            plan: {
                planId: planId,
                // apiId: row.userID,
                approvalType: 0,
                comment: comment,
            },
        })
        setCommentModal(false)
    }

    const handleReject = (row) => {
        handleRejectPlanList({
            certificate: authInfo.token,
            plan: {
                planId: row.dispatchPlanID,
                apiId: row.dispatchPlanID,
                approvalType: 1,
                comment: comment,
            },
        })
    }

    useEffect(() => {
        console.log(specialPlanApprovalList)
    },[specialPlanApprovalList])

    return(
        <>
            <TitleWidget title={'Special Allocation Review'} />
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
            <br/><br/>
            {flag &&
                <Table columns={column} dataSource={specialPlanApprovalList}/>
            }
            <Modal open={details} title="Allocation For Approval" footer={null} width={"80vw"} onCancel={() => {
                setDetails(false)
                setAllocationDetails(false)
            }}>
                <Table
                    columns={detailsColumn}
                    dataSource={specialPlanApprovalDetailsList}
                    scroll={{
                        x: 100,
                    }}
                >
                </Table>
                {allocationDetails && <AllocationDetails/>}
            </Modal>

            {/*Plan Approval*/}
            <Modal title="Plan Approval!" open={open} onOk={() => {setOpen(false); setCommentModal(true)}} onCancel={() => setOpen(false)}>
                <p>Are you sure, you want to approve the selected plan?</p>
            </Modal>
            <Modal title="Plan Approval!" open={commentModal} onOk={handleReview} onCancel={() => setCommentModal(false)}>
                <Input value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Modal>

            {/*Plan Reject*/}
            <Modal title="Plan Reject!" open={openReject} onOk={() => {setOpenReject(false); setCommentRejectModal(true)}} onCancel={() => setOpenReject(false)}>
                <p>Are you sure, you want to reject the selected plan?</p>
            </Modal>
            <Modal title="Plan Reject!" open={commentRejectModal} onOk={handleReject} onCancel={() => setCommentRejectModal(false)}>
                <Input value={comment} onChange={(e) => setComment(e.target.value)}/>
            </Modal>
        </>
    )
}

SpecialDispatchesComponent.propTypes = {
    authInfo: PropTypes.any,
    monthlyApprovalList: PropTypes.array,
    monthlyApprovalDetailsList: PropTypes.array,
    resetPlanList: PropTypes.array,
    rejectPlanList: PropTypes.array,
    specialPlanApprovalDetailsList: PropTypes.array,
    handleMonthlyApproval: PropTypes.func,
    handleMonthlyApprovalDetails: PropTypes.func,
    handleApprovePlanList: PropTypes.func,
    handleSpecialPlanDetails: PropTypes.func,
    handleRejectPlanList: PropTypes.func,
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const profileInfo = selectProfileInfo(state)
    const approvePlanList = selectApprovePlanListData(state)
    const rejectPlanList = selectRejectPlanListData(state)
    const specialPlanApprovalList = selectSpecialPlanApprovalListData(state)
    const specialPlanApprovalDetailsList = selectSpecialPlanApprovalDetailsListData(state)
    return {authInfo,profileInfo,approvePlanList,rejectPlanList,specialPlanApprovalList,specialPlanApprovalDetailsList}
}

const actions = {
    handleMonthlyApproval: getMonthlyApprovalStartAction,
    handleMonthlyApprovalDetails: getMonthlyApprovalDetailsStartAction,
    handleApprovePlanList: approvePlanStartAction,
    handleRejectPlanList: rejectPlanStartAction,
    handleSpecialPlan: specialPlanApprovalStartAction,
    handleSpecialPlanDetails: specialPlanApprovalDetailsStartAction,
}

export default connect(mapState, actions)(SpecialDispatchesComponent)
