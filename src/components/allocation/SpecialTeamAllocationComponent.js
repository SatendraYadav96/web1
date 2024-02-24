import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {selectAuthInfo, selectProfileInfo} from '../../redux/selectors/authSelectors'
import {connect} from 'react-redux'
import {Alert, Button, Col, Input, InputNumber, message, Modal, Row, Space, Table} from "antd";
import {
    allocateToAllTeamsAction, allocateToDifferentialAction,
    allocateToTeamAction,
    monthlyCommonAllocationStartAction,
    monthlyCommonTeamStartAction,
    monthlyDifferentialAllocationStartAction, specialAllocateToDifferentialAction, specialDifferentialAllocationSaveStartAction, specialDifferentialTeamStartAction,
    virtualAllocateToTeamAction,
    virtualCommonAllocationStartAction,
    virtualCommonTeamStartAction, virtualDifferentialAllocationStartAction
} from "../../redux/actions/allocation/allocationActions";
import {
    selectCommonAllocationDone,
    selectMonthlyCommonTeamListData,
    selectMonthlyCommonTeamListKeys,
    selectMonthlyDifferentialAllocation,
    selectSpecialDifferentialAllocation, selectSpecialDifferentialAllocationSave, selectSpecialDifferentialAllocationSaveSuccess,
    selectVirtualCommonTeamListData,
    selectVirtualCommonTeamListKeys,
    selectVirtualDifferentialAllocation
} from "../../redux/selectors/allocationSelectors";
import DifferentialAllocationComponent from "./DifferentialAllocationComponent";
import LabelComponent from "../../widgets/LabelComponent";
import TeamAllocationDetailsComponent from "./TeamAllocationDetailsComponent";
import ChangeAllocationComponent from "./ChangeAllocationComponent";
import ChangeVirtualAllocationComponent from "./ChangeVirtualAllocationComponent";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import * as events from "events";

const SpecialTeamAllocationComponent = ({item, teams, costCenterId,month, year, handleChangeDifferentialQuantity, handleSpecialDifferentialAllocationSave, inventoryId, commonAllocationDone, handleSaveCommonAllocation, handleChangeQuantity, handleAllocationToAllTeams, specialDifferentialTeam,
                                            handleSpecialDifferentialTeam,authInfo, profileInfo, teamKeys, specialDifferentialAllocationSaveSuccess,specialDifferentialAllocationSave}) => {
    const [showDifferential, setShowDifferential] = useState(false)
    const [teamForDifferential, setTeamForDifferential] = useState('')
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [column, setColumn] = useState([])
    const [keyList, setKeyList] = useState([])
    const [open, setOpen] = useState(false);
    console.log(item)
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


    const onChangeQuantity = (team, quantity) => {
        let qty = quantity.currentTarget.value
        if (qty % item.packSize !== 0) {
            setShowErrorMessage(true)
            setErrorMessage('Quantity is not a multiple of Pack Size')
            return;
        } else {
            setShowErrorMessage(false)
            setErrorMessage(null)
        }
        let total = 0
        let recipientID = null
        specialDifferentialTeam.forEach(t => {
            if (t.recipientId == team.recipientId) {
                recipientID = team.recipientId
                console.log(recipientID)
                total = total + qty
                // } else {
                //     if (t.quantity !== undefined) {
                //         total = total + t.quantity
                //     }
            }
        })
        // if (total > item.stock) {
        //     setShowErrorMessage(true)
        //     setErrorMessage('Quantity exceeds available quantity')
        //     return
        // }else {
        //     setShowErrorMessage(false)
        //     setErrorMessage(null)
        // }

        handleChangeDifferentialQuantity({
            recipientID,
            qty
        })
    }
    let sameKey;
    let sameKey1;
    let sameKey2;


    const columns = [
        {
            title: 'Team',
            dataIndex: 'team',
            key: '',
            ...getColumnSearchProps('team'),
        },
        {
            title: 'Zone',
            dataIndex: 'zone',
            key: '',
            ...getColumnSearchProps('zone'),
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: '',
            ...getColumnSearchProps('state'),
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: '',
            ...getColumnSearchProps('designation'),
        },
        {
            title: 'FF Name',
            dataIndex: 'employeeName',
            key: '',
            ...getColumnSearchProps('employeeName'),
        },
        {
            title: 'FF Code',
            dataIndex: 'employeeCode',
            key: '',
            ...getColumnSearchProps('employeeCode'),
        },
        {
            title: 'Headquarter',
            dataIndex: 'hq',
            key: '',
            ...getColumnSearchProps('hq'),
        },
        {
            title: 'Allocated Quantity',
            dataIndex: 'allocatedQuantity',
            key: '',
           // ...getColumnSearchProps('allocatedQuantity'),
        },
        {
            title: 'Qty',
            dataIndex: '',
            key: 'Qty',
            render: (_, row)=> {
                return <Input style={{width: '100px'}}
                              value={row.quantity}
                              onChange={(value)=> onChangeQuantity(row, value)}
                />
            }
        }
    ]

    const handleSave = () => {

    }

    const handleCancel = () => {
        setShowDifferential(false)
    }

    const openChangeAllocation = () => {
        // return navigate("/home/changeAllocation")
        setOpen(true)
    }

    const   SaveCommonAllocation = () => {

        let data = []
        specialDifferentialTeam.forEach( t => {
            if(t.quantity == undefined){
                t.quantity = 0
            }
            let allocationData = {}
            allocationData["dispatchPlanId"] = item.planId
            allocationData["recipientId"] = t.recipientId
            allocationData["inventoryId"] = inventoryId
            allocationData["quantity"] = t.quantity
            data.push(allocationData)
        })
        console.log(data)
        handleSpecialDifferentialAllocationSave({
            certificate: authInfo.token,
            data: data
        });

    }

    useEffect(() => {
        console.log(teams)
        if(specialDifferentialAllocationSaveSuccess){
            let d = []
            teams.forEach(i =>
                d.push(i.id)
            )
            handleSpecialDifferentialTeam({
                certificate:authInfo.token,
                ccmId: costCenterId,
                userId: profileInfo.id,
                month: month,
                year: year,
                inventoryId: inventoryId,
                planId: item.planId,
                teamId: d
            });
        }
    },[specialDifferentialAllocationSaveSuccess])



    useEffect(()=>{
        console.log(teams)
        let d = []
        teams.forEach(i =>
            d.push(i.id)
        )
        handleSpecialDifferentialTeam({
            certificate:authInfo.token,
            ccmId: costCenterId,
            userId: profileInfo.id,
            month: month,
            year: year,
            inventoryId: inventoryId,
            planId: item.planId,
            teamId: d
        });

    },[costCenterId])


    // useEffect(() => {
    //     if(specialDifferentialAllocationSaveSuccess){
    //         console.log(specialDifferentialAllocationSave)
    //         console.log(Object.keys(specialDifferentialAllocationSave).length !== 0)
    //         if(specialDifferentialAllocationSave!== undefined && Object.keys(specialDifferentialAllocationSave).length !== 0  && specialDifferentialAllocationSave.info == "error"){
    //             message.error(specialDifferentialAllocationSave.body.message);
    //         }else{
    //             message.success(specialDifferentialAllocationSave.body.message);
    //         }
    //     }
    //
    //
    // },[specialDifferentialAllocationSaveSuccess])


    return (
        <>
            {showErrorMessage &&
                <Alert message={errorMessage} type="error" />
            }
            <Row>
                <Col span={4}>
                    <LabelComponent>Qty Received: {item.qtyReceived}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Qty Dispatched: {item.qtyDispatched}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Pack Size: {item.packSize}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocated Quantity: {item.quantityAllocated}</LabelComponent>
                </Col>
                <Col span={4} offset={1}>
                    <LabelComponent>Allocation Balance: {item.stock}</LabelComponent>
                </Col>
            </Row>
            <span>Total Rows: <b>{specialDifferentialTeam?.length}</b></span>
                        <Table size={'small'} dataSource={specialDifferentialTeam}
                               columns={columns}
                               rowKey={'id'} loading={teams.length === 0}
                        />
                        <br/>
                        <Row gutter={[8,8]}>
                            <Col span={3} offset={21}>
                                <Button type={'primary'} onClick={() => SaveCommonAllocation()}>Allocate & Save</Button>
                            </Col>
                            {/*<Col span={3}>*/}
                            {/*    <Button type={'primary'}*/}
                            {/*            onClick={() => openChangeAllocation()}*/}
                            {/*    >Change</Button>*/}
                            {/*</Col>*/}
                        </Row>


            {/*<Table size={'small'} dataSource={monthlyCommonTeam}*/}
            {/*       columns={newColumns}*/}
            {/*       footer={() => `Total Allocations: ${total || 0}`}*/}
            {/*       rowKey={'id'} loading={teams.length === 0}*/}
            {/*/>*/}
            {/*<label>Total Allocations: {total || 0}</label>*/}

            {/*<Modal title="Differential Allocation"*/}
            {/*       width={'600'}*/}
            {/*       visible={showDifferential} onOk={handleSave} onCancel={handleCancel}>*/}
            {/*    <DifferentialAllocationComponent teamId={teamForDifferential}/>*/}
            {/*</Modal>*/}
        </>
    )
}

SpecialTeamAllocationComponent.propTypes = {
    authInfo: PropTypes.any,
    profileInfo: PropTypes.any,
    teams: PropTypes.array,
    item: PropTypes.any,
    total: PropTypes.number,
    commonAllocationDone: PropTypes.any,
    handleChangeQuantity: PropTypes.func,
    handleAllocationToAllTeams: PropTypes.func,
    specialDifferentialTeam:PropTypes.any,
    handleSpecialDifferentialTeam:PropTypes.func,
    teamKeys: PropTypes.any,
    handleSaveCommonAllocation: PropTypes.any,
    handleSpecialDifferentialAllocationSave: PropTypes.func,
    handleChangeDifferentialQuantity: PropTypes.func,
    specialDifferentialAllocationSaveSuccess: PropTypes.any,
    specialDifferentialAllocationSave:PropTypes.any
}

const mapState = (state) => {
    const authInfo = selectAuthInfo(state)
    const commonAllocationDone = selectCommonAllocationDone(state)
    const specialDifferentialTeam = selectSpecialDifferentialAllocation(state)
    const teamKeys = selectVirtualCommonTeamListKeys(state)
    const profileInfo = selectProfileInfo(state)
    console.log(specialDifferentialTeam)
    console.log(teamKeys)
    const specialDifferentialAllocationSave = selectSpecialDifferentialAllocationSave(state)
    const specialDifferentialAllocationSaveSuccess = selectSpecialDifferentialAllocationSaveSuccess(state)
    return { authInfo, commonAllocationDone,specialDifferentialTeam, profileInfo, teamKeys, specialDifferentialAllocationSaveSuccess,specialDifferentialAllocationSave }
}

const actions = {
    handleChangeQuantity: virtualAllocateToTeamAction,
    handleAllocationToAllTeams: allocateToAllTeamsAction,
    handleSpecialDifferentialTeam:specialDifferentialTeamStartAction,
    handleChangeDifferentialQuantity: specialAllocateToDifferentialAction,
    handleSpecialDifferentialAllocationSave: specialDifferentialAllocationSaveStartAction
}

export default connect(mapState, actions)(SpecialTeamAllocationComponent)

